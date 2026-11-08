// سلوك صفحة «أدوات السفر» — الأدوات الخمس تحسب فور الإدخال، وتحفظ ما يلزم في localStorage
// (مفاتيح va-tools-*) داخل try/catch، والأرقام لاتينية دائماً (Intl بـ'en' و-nu-latn).
// النصوص من JSON داخل الصفحة (src/data/travel-tools.ts RUNTIME) — لا نصّ مكتوب هنا.
import type { Runtime } from '../data/travel-tools';

type Data = { lang: 'ar' | 'en'; R: Runtime; cities: Record<string, string>; ahsa: string };
type Person = { id: string; name: string };
type Expense = { id: string; title: string; amount: number; currency: string; rate: number; units: number; payer: string; participants: string[] };
type Trip = { people: Person[]; expenses: Expense[]; currency: string };
type PackItem = { id: string; text: string; done: boolean };
type Pack = { items: PackItem[]; config: Record<string, string> };

const AHSA = 'Asia/Riyadh';
const RATE_API = 'https://api.frankfurter.dev/v2/rate/';
// ثابت القواعد السعودية من مصدرَي الصفحة: 220 فولت و60 هرتز (Electrical Safety First)
const SA_VOLT = 220;
const SA_HZ = 60;

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ''));
const uid = (): string => {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
};
/** مفاتيح التخزين قائمة مغلقة — لا يدخل مفتاحاً شيءٌ من إدخال الزائر. */
type StoreKey = 'cur' | 'rates' | 'city' | 'trip' | 'pack';
const STORE_KEYS: ReadonlySet<string> = new Set<StoreKey>(['cur', 'rates', 'city', 'trip', 'pack']);
/** «الأولى إن تحقق الشرط وإلا الثانية» — بديل الشرطيات المتداخلة. */
const pick = <T>(pairs: [boolean, T][], fallback: T): T => pairs.find(([c]) => c)?.[1] ?? fallback;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
function read<T>(key: StoreKey, fallback: T): T {
  if (!STORE_KEYS.has(key)) return fallback;
  try {
    const v = localStorage.getItem('va-tools-' + key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

/* ---------- التوقيت: لحظات محتملة لوقت محلي في منطقة (التوقيت الصيفي قد يُكرّر وقتاً أو يُسقطه) ---------- */
function parts(instant: number, zone: string) {
  const out: Record<string, string> = {};
  for (const p of new Intl.DateTimeFormat('en-CA', { timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(instant))) {
    if (p.type !== 'literal') out[p.type] = p.value;
  }
  return out;
}
const localString = (instant: number, zone: string) => { const p = parts(instant, zone); return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`; };
function possibleInstants(local: string, zone: string): number[] {
  const target = Date.parse(local + 'Z');
  if (!Number.isFinite(target)) return [];
  const offsets = new Set<number>();
  for (let h = -36; h <= 36; h += 6) {
    const t = target + h * 3600000;
    const p = parts(t, zone);
    offsets.add(Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - t);
  }
  return [...offsets].map((o) => target - o).filter((t) => localString(t, zone) === local).sort((a, b) => a - b);
}

/* ---------- المصاريف: توزيع بالتساوي بوحدات صحيحة ثم تسوية بأقل التحويلات ---------- */
function split(units: number, people: string[]): [string, number][] {
  const base = Math.floor(units / people.length), rest = units % people.length;
  return people.map((p, i) => [p, base + (i < rest ? 1 : 0)]);
}
function settle(people: Person[], expenses: Expense[]) {
  const bal: Record<string, number> = Object.fromEntries(people.map((p) => [p.id, 0]));
  for (const e of expenses) {
    bal[e.payer] = (bal[e.payer] || 0) + e.units;
    for (const [p, n] of split(e.units, e.participants)) bal[p] = (bal[p] || 0) - n;
  }
  const debt = Object.entries(bal).filter(([, n]) => n < 0).map(([p, n]) => [p, -n] as [string, number]);
  const cred = Object.entries(bal).filter(([, n]) => n > 0);
  const transfers: { from: string; to: string; units: number }[] = [];
  let i = 0, j = 0;
  while (i < debt.length && j < cred.length) {
    const n = Math.min(debt[i][1], cred[j][1]);
    transfers.push({ from: debt[i][0], to: cred[j][0], units: n });
    debt[i][1] -= n; cred[j][1] -= n;
    if (!debt[i][1]) i++;
    if (!cred[j][1]) j++;
  }
  return transfers;
}

function initTools() {
  const root = document.querySelector<HTMLElement>('[data-tools]');
  const raw = document.querySelector('[data-tools-data]');
  if (!root || !raw || root.dataset.wired) return;
  root.dataset.wired = '1';
  const { lang, R, cities, ahsa } = JSON.parse(raw.textContent || '{}') as Data;
  const $ = <T extends HTMLElement = HTMLInputElement>(id: string) => document.getElementById('tt-' + id) as T;
  const status = $<HTMLElement>('status');
  let statusTimer = 0;
  const say = (msg: string) => { status.textContent = msg; window.clearTimeout(statusTimer); statusTimer = window.setTimeout(() => { status.textContent = ''; }, 5000); };
  const save = (key: StoreKey, data: unknown) => {
    if (!STORE_KEYS.has(key)) return;
    try {
      localStorage.setItem('va-tools-' + key, JSON.stringify(data));
    } catch {
      say(R.saveFail);
    }
  };
  // رموز العملات المسموحة = خيارات القائمة نفسها؛ أي قيمة أخرى تُرفض قبل الشبكة والتخزين
  const CODES: ReadonlySet<string> = new Set([...document.querySelectorAll<HTMLOptionElement>('#tt-cur-from option')].map((o) => o.value));
  const code = (c: string): string | null => (CODES.has(c) && /^[A-Z]{3}$/.test(c) ? c : null);
  const dateFmt = (zone: string) => new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-GB', { timeZone: zone, dateStyle: 'full' });
  const clockFmt = (zone: string) => new Intl.DateTimeFormat('en-GB', { timeZone: zone, hour: '2-digit', minute: '2-digit' });
  const fracDigits = (c: string) => { try { return new Intl.NumberFormat('en', { style: 'currency', currency: c }).resolvedOptions().maximumFractionDigits ?? 2; } catch { return 2; } };
  const money = (v: number, c: string) => new Intl.NumberFormat('en', { minimumFractionDigits: fracDigits(c), maximumFractionDigits: fracDigits(c) }).format(v) + ' ' + c;
  const download = (name: string, text: string) => {
    const url = URL.createObjectURL(new Blob(['﻿' + text], { type: 'text/plain;charset=utf-8' }));
    const a = el('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const dialog = $<HTMLDialogElement>('confirm');
  let confirmAction: (() => void) | null = null;
  const askReset = (title: string, action: () => void) => { $<HTMLElement>('confirm-title').textContent = title; confirmAction = action; dialog.showModal(); };
  $<HTMLButtonElement>('confirm-cancel').onclick = () => dialog.close();
  $<HTMLButtonElement>('confirm-ok').onclick = () => { dialog.close(); confirmAction?.(); };
  // العدد بصيغته: [الجمع العام، المفرد، المثنى، جمع القلة 3–10] — الإنجليزية تستعمل الأول والثاني
  const count = (n: number, w: string[]) => pick([[n === 1, w[1]], [n === 2 && lang === 'ar', w[2]], [lang === 'ar' && n >= 3 && n <= 10, `${n} ${w[3]}`]], `${n} ${w[0]}`);

  /* ---------- التبويبات ---------- */
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-tab]')];
  const show = (id: string, focus = false) => {
    for (const b of tabs) {
      const on = b.dataset.tab === id;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    }
    for (const p of root.querySelectorAll<HTMLElement>('[data-panel]')) p.hidden = p.dataset.panel !== id;
  };
  tabs.forEach((b, i) => {
    b.onclick = () => { show(b.dataset.tab!); try { history.replaceState(null, '', '#' + b.dataset.tab); } catch { /* sandboxed */ } };
    b.onkeydown = (e) => {
      const step = pick([[e.key === 'ArrowLeft', 1], [e.key === 'ArrowRight', -1]], 0);
      if (!step) return;
      e.preventDefault();
      const dir = document.dir === 'rtl' ? step : -step;
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      show(next.dataset.tab!, true);
    };
  });
  const initial = location.hash.slice(1);
  show(tabs.some((b) => b.dataset.tab === initial) ? initial : tabs[0].dataset.tab!);

  /* ---------- 1) العملة ---------- */
  let rate: number | null = null, serial = 0;
  const curOut = (net: string, gross: string, fees: string, line: string) => {
    $<HTMLElement>('cur-net').textContent = net; $<HTMLElement>('cur-gross').textContent = gross;
    $<HTMLElement>('cur-fees').textContent = fees; $<HTMLElement>('cur-line').textContent = line;
  };
  const calculate = () => {
    if (!rate) { curOut(R.dash, R.dash, R.dash, R.dash); return; }
    const from = $('cur-from').value, to = $('cur-to').value;
    const amount = $('cur-amount').valueAsNumber, pct = $('cur-pct').valueAsNumber || 0, fixed = $('cur-fixed').valueAsNumber || 0;
    const charges = (amount * pct) / 100 + fixed;
    if (!Number.isFinite(amount) || amount < 0 || amount > 1e9 || pct < 0 || pct > 99 || fixed < 0 || charges > amount) {
      curOut(R.dash, R.dash, R.dash, R.amountBad); return;
    }
    curOut(money((amount - charges) * rate, to), money(amount * rate, to), money(charges, from),
      `1 ${from} = ${new Intl.NumberFormat('en', { maximumSignificantDigits: 8 }).format(rate)} ${to}`);
  };
  const rateStatus = (msg: string, error = false) => { const s = $<HTMLElement>('cur-status'); s.textContent = msg; s.classList.toggle('is-error', error); };
  const refreshRate = async () => {
    const my = ++serial, from = code($('cur-from').value), to = code($('cur-to').value);
    if (!from || !to) { rateStatus(R.rateFail, true); return; }
    rate = null; calculate(); $('cur-manual').value = '';
    if (from === to) { rate = 1; rateStatus(R.rateSame); calculate(); return; }
    rateStatus(R.rateLoading);
    const pair = `${from}-${to}`;
    const cache = read<Record<string, { rate?: number; date?: string }>>('rates', {});
    try {
      const res = await fetch(RATE_API + encodeURIComponent(from) + '/' + encodeURIComponent(to), { signal: AbortSignal.timeout(12000) });
      if (!res.ok) throw new Error('rate');
      const data = (await res.json()) as { rate?: number; date?: string };
      if (typeof data.rate !== 'number' || !Number.isFinite(data.rate) || data.rate <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(data.date || '')) throw new Error('rate');
      if (my !== serial) return;
      rate = data.rate;
      cache[pair] = { rate: data.rate, date: data.date };
      save('rates', cache);
      rateStatus(fill(R.rateDate, { d: data.date! }));
      calculate();
    } catch {
      if (my !== serial) return;
      const cached = Object.hasOwn(cache, pair) ? cache[pair] : null;
      if (cached && typeof cached.rate === 'number' && cached.rate > 0) {
        rate = cached.rate;
        rateStatus(fill(R.rateCached, { d: cached.date || '' }), true);
        calculate();
      } else {
        rateStatus(R.rateFail, true);
      }
    }
  };
  const savePair = () => {
    const pairCodes = [code($('cur-from').value), code($('cur-to').value)];
    if (pairCodes.every(Boolean)) save('cur', pairCodes);
  };
  $<HTMLSelectElement>('cur-from').onchange = $<HTMLSelectElement>('cur-to').onchange = () => { savePair(); void refreshRate(); };
  $<HTMLButtonElement>('cur-swap').onclick = () => {
    const f = $('cur-from').value;
    $('cur-from').value = $('cur-to').value;
    $('cur-to').value = f;
    savePair();
    void refreshRate();
  };
  $<HTMLButtonElement>('cur-refresh').onclick = () => void refreshRate();
  for (const id of ['cur-amount', 'cur-pct', 'cur-fixed']) $(id).oninput = calculate;
  $<HTMLButtonElement>('cur-manual-use').onclick = () => {
    const n = $('cur-manual').valueAsNumber;
    if (!Number.isFinite(n) || n <= 0) { rateStatus(R.rateManualBad, true); return; }
    serial++; rate = n; rateStatus(R.rateManual); calculate();
  };
  const savedPair = read<string[]>('cur', []);
  const known = (c: string) => [...$<HTMLSelectElement>('cur-from').options].some((o) => o.value === c);
  if (Array.isArray(savedPair) && savedPair.length === 2 && known(savedPair[0]) && known(savedPair[1])) {
    $('cur-from').value = savedPair[0];
    $('cur-to').value = savedPair[1];
  }
  void refreshRate();

  /* ---------- 2) فرق التوقيت ---------- */
  const city = () => $<HTMLSelectElement>('time-city').value;
  const cityName = () => cities[city()] || city();
  const sourceIsAhsa = () => ($<HTMLInputElement>('time-src-ahsa')).checked;
  const fmtGap = (mins: number) => {
    const h = Math.floor(mins / 60), m = mins % 60;
    return [h ? count(h, R.hours) : '', m ? count(m, R.minutes) : ''].filter(Boolean).join(R.and);
  };
  const updateClocks = () => { $<HTMLElement>('time-clocks').textContent = `${clockFmt(AHSA).format(new Date())} · ${clockFmt(city()).format(new Date())}`; };
  const convertTime = () => {
    const local = $('time-when').value;
    const src = sourceIsAhsa() ? AHSA : city(), dst = sourceIsAhsa() ? city() : AHSA;
    $<HTMLElement>('time-dst-title').textContent = fill(R.inPlace, { place: sourceIsAhsa() ? cityName() : ahsa });
    updateClocks();
    if (!local) return;
    const matches = possibleInstants(local, src);
    $<HTMLElement>('time-repeat').hidden = matches.length < 2;
    if (!matches.length) {
      $<HTMLElement>('time-result').textContent = R.dash; $<HTMLElement>('time-date').textContent = '';
      $<HTMLElement>('time-diff').textContent = fill(R.gapNone, { city: cityName() }); return;
    }
    const instant = matches[Math.min(+$<HTMLSelectElement>('time-occ').value, matches.length - 1)];
    const target = localString(instant, dst);
    const dayShift = (Date.parse(target.slice(0, 10)) - Date.parse(local.slice(0, 10))) / 86400000;
    $<HTMLElement>('time-result').textContent = target.slice(11) + pick([[dayShift > 0, ` (${R.dayNext})`], [dayShift < 0, ` (${R.dayPrev})`]], '');
    $<HTMLElement>('time-date').textContent = dateFmt(dst).format(new Date(instant));
    const ahsaMinusCity = (Date.parse(localString(instant, AHSA) + 'Z') - Date.parse(localString(instant, city()) + 'Z')) / 60000;
    const gap = fmtGap(Math.abs(ahsaMinusCity));
    const diffMsg = pick([[ahsaMinusCity > 0, R.ahsaAhead], [ahsaMinusCity < 0, R.ahsaBehind]], R.sameTime);
    $<HTMLElement>('time-diff').textContent = fill(diffMsg, { city: cityName(), diff: gap });
  };
  const setNow = () => { $('time-when').value = localString(Date.now(), sourceIsAhsa() ? AHSA : city()); $<HTMLSelectElement>('time-occ').value = '0'; convertTime(); };
  const savedCity = read<string>('city', '');
  if (savedCity && Object.hasOwn(cities, savedCity)) $('time-city').value = savedCity;
  $<HTMLSelectElement>('time-city').onchange = () => {
    // المنطقة تُحفظ فقط إن كانت من قائمة المدن نفسها
    if (Object.hasOwn(cities, city())) save('city', city());
    if (sourceIsAhsa()) convertTime();
    else setNow();
  };
  for (const id of ['time-src-mine', 'time-src-ahsa']) $(id).onchange = setNow;
  $('time-when').oninput = convertTime;
  $<HTMLSelectElement>('time-occ').onchange = convertTime;
  $<HTMLButtonElement>('time-now').onclick = setNow;
  setNow();
  window.setInterval(updateClocks, 30000);

  /* ---------- 3) المصاريف ---------- */
  const blankTrip = (): Trip => ({ people: [], expenses: [], currency: 'SAR' });
  let trip = read<Trip>('trip', blankTrip());
  if (!Array.isArray(trip.people) || !Array.isArray(trip.expenses) || !known(trip.currency)) trip = blankTrip();
  const pname = (id: string) => trip.people.find((p) => p.id === id)?.name || '?';
  const factor = () => 10 ** fracDigits(trip.currency);
  const rateField = () => { const other = $('exp-currency').value !== trip.currency; $<HTMLElement>('exp-rate-wrap').hidden = !other; $('exp-rate').required = other; };
  const removeBtn = (label: string, onClick: () => void) => { const b = el('button', 'tt-x', '×'); b.type = 'button'; b.setAttribute('aria-label', fill(R.remove, { x: label })); b.onclick = onClick; return b; };
  const renderTrip = () => {
    const picked = new Set([...root.querySelectorAll<HTMLInputElement>('#tt-exp-split input:checked')].map((x) => x.value));
    const payer = $<HTMLSelectElement>('exp-payer').value;
    const people = $<HTMLElement>('exp-people'), payerSel = $<HTMLSelectElement>('exp-payer'), splitBox = $<HTMLElement>('exp-split');
    people.replaceChildren(); payerSel.replaceChildren(); splitBox.replaceChildren();
    for (const person of trip.people) {
      const chip = el('li', 'tt-chip', person.name);
      chip.append(removeBtn(person.name, () => {
        if (trip.expenses.some((e) => e.payer === person.id || e.participants.includes(person.id))) { say(R.personBusy); return; }
        trip.people = trip.people.filter((p) => p.id !== person.id); persistTrip();
      }));
      people.append(chip);
      payerSel.add(new Option(person.name, person.id));
      const label = el('label', 'tt-check'), box = el('input');
      box.type = 'checkbox'; box.value = person.id; box.checked = picked.size ? picked.has(person.id) : true;
      label.append(box, document.createTextNode(person.name));
      splitBox.append(label);
    }
    if (trip.people.some((p) => p.id === payer)) payerSel.value = payer;
    $<HTMLSelectElement>('exp-settle').value = trip.currency;
    $<HTMLSelectElement>('exp-settle').disabled = trip.expenses.length > 0;
    $<HTMLElement>('exp-count').textContent = trip.expenses.length ? fill(R.expCount, { e: trip.expenses.length, p: trip.people.length }) : R.expNone;
    $<HTMLElement>('exp-total').textContent = money(trip.expenses.reduce((s, e) => s + e.units, 0) / factor(), trip.currency);
    const balances = $<HTMLElement>('exp-balances'); balances.replaceChildren();
    const transfers = settle(trip.people, trip.expenses);
    if (!trip.expenses.length) balances.append(el('p', 'tt-note', R.settleEmpty));
    else if (!transfers.length) balances.append(el('p', 'tt-note', R.settleEven));
    for (const t of transfers) balances.append(el('p', 'tt-settle', fill(R.settleRow, { from: pname(t.from), to: pname(t.to), amount: money(t.units / factor(), trip.currency) })));
    const list = $<HTMLElement>('exp-list'); list.replaceChildren();
    for (const e of [...trip.expenses].reverse()) {
      const row = el('li', 'tt-row'), desc = el('div');
      desc.append(el('strong', undefined, e.title), el('small', undefined,
        fill(R.expLine, { payer: pname(e.payer), amount: money(e.amount, e.currency), who: e.participants.map(pname).join(R.listSep) }) + (e.currency !== trip.currency ? ' · ' + fill(R.manualRate, { r: e.rate }) : '')));
      row.append(desc, el('b', 'tt-num', money(e.units / factor(), trip.currency)),
        removeBtn(e.title, () => { trip.expenses = trip.expenses.filter((x) => x.id !== e.id); persistTrip(); }));
      list.append(row);
    }
    rateField();
  };
  const persistTrip = () => { save('trip', trip); renderTrip(); };
  $<HTMLFormElement>('exp-person-form').onsubmit = (ev) => {
    ev.preventDefault();
    const name = $('exp-person').value.trim();
    if (!name) return;
    if (trip.people.some((p) => p.name === name)) { say(R.personDup); return; }
    if (trip.people.length >= 30) { say(R.peopleMax); return; }
    const id = uid();
    trip.people.push({ id, name }); $('exp-person').value = ''; persistTrip();
    // المشارك الجديد يدخل القسمة افتراضياً (renderTrip يحفظ اختيار الباقين كما هو)
    const box = root.querySelector<HTMLInputElement>('#tt-exp-split input[value="' + id + '"]');
    if (box) box.checked = true;
  };
  $<HTMLSelectElement>('exp-settle').onchange = () => {
    const c = code($('exp-settle').value);
    if (trip.expenses.length || !c) return;
    trip.currency = c;
    $('exp-currency').value = c;
    persistTrip();
  };
  $<HTMLSelectElement>('exp-currency').onchange = () => { $('exp-rate').value = ''; rateField(); };
  $<HTMLFormElement>('exp-form').onsubmit = (ev) => {
    ev.preventDefault();
    const msg = $<HTMLElement>('exp-msg');
    const participants = [...root.querySelectorAll<HTMLInputElement>('#tt-exp-split input:checked')].map((x) => x.value);
    const amount = $('exp-amount').valueAsNumber, code = $('exp-currency').value, title = $('exp-title').value.trim();
    const r = code === trip.currency ? 1 : $('exp-rate').valueAsNumber;
    if (!trip.people.length || !participants.length || !$('exp-payer').value) { msg.textContent = R.expNeed; return; }
    const units = Math.round(amount * r * factor());
    if (!title || !Number.isFinite(r) || r <= 0 || !Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(units) || units <= 0 || units > 1e12) {
      msg.textContent = R.expBad;
      return;
    }
    trip.expenses.push({ id: uid(), title, amount, currency: code, rate: r, units, payer: $('exp-payer').value, participants });
    $('exp-title').value = ''; $('exp-amount').value = ''; msg.textContent = R.expAdded; persistTrip();
  };
  $<HTMLButtonElement>('exp-download').onclick = () => download('Al-Ahsa-trip-expenses.txt', [
    R.expFile, `${R.settleLabel}: ${trip.currency}`, '',
    ...trip.expenses.map((e) => `${e.title}: ${money(e.amount, e.currency)} · ${fill(R.expLine, { payer: pname(e.payer), amount: money(e.units / factor(), trip.currency), who: e.participants.map(pname).join(R.listSep) })}`),
    '', `${R.totalLabel}: ${$<HTMLElement>('exp-total').textContent}`, '',
    ...settle(trip.people, trip.expenses).map((t) => fill(R.settleRow, { from: pname(t.from), to: pname(t.to), amount: money(t.units / factor(), trip.currency) })),
  ].join('\n'));
  $<HTMLButtonElement>('exp-reset').onclick = () => askReset(R.resetTrip, () => { trip = blankTrip(); $('exp-currency').value = 'SAR'; persistTrip(); });
  $('exp-currency').value = trip.currency;
  renderTrip();

  /* ---------- 4) الحقيبة ---------- */
  const blankPack = (): Pack => ({ items: [], config: {} });
  let pack = read<Pack>('pack', blankPack());
  if (!Array.isArray(pack.items)) pack = blankPack();
  const packFields = ['days', 'weather', 'type', 'kids'];
  for (const k of packFields) if (pack.config?.[k]) $('pack-' + k).value = pack.config[k];
  const packProgress = () => {
    const done = pack.items.filter((i) => i.done).length, total = pack.items.length, pct = total ? Math.round((done / total) * 100) : 0;
    $<HTMLElement>('pack-pct').textContent = pct + '%';
    $<HTMLProgressElement>('pack-bar').value = pct;
    const doneNote = pct === 100 ? R.packDone : '';
    $<HTMLElement>('pack-count').textContent = total ? fill(R.packCount, { d: done, t: total }) + doneNote : R.packStart;
  };
  const renderPack = () => {
    const list = $<HTMLElement>('pack-list'); list.replaceChildren();
    for (const item of pack.items) {
      const row = el('li', 'tt-row tt-pack' + (item.done ? ' is-done' : '')), label = el('label', 'tt-check'), box = el('input');
      box.type = 'checkbox'; box.checked = item.done;
      box.onchange = () => { item.done = box.checked; row.classList.toggle('is-done', item.done); save('pack', pack); packProgress(); };
      label.append(box, document.createTextNode(item.text));
      row.append(label, removeBtn(item.text, () => { pack.items = pack.items.filter((i) => i.id !== item.id); save('pack', pack); renderPack(); }));
      list.append(row);
    }
    packProgress();
  };
  const addItems = (texts: string[]) => {
    for (const text of texts) {
      if (!pack.items.some((i) => i.text === text)) pack.items.push({ id: uid(), text, done: false });
    }
    save('pack', pack);
    renderPack();
  };
  $<HTMLFormElement>('pack-form').onsubmit = (ev) => {
    ev.preventDefault();
    const cfg = Object.fromEntries(packFields.map((k) => [k, $('pack-' + k).value]));
    pack.config = cfg;
    const days = Math.max(1, Math.min(60, Math.round(+cfg.days || 1)));
    const outfit = fill(R.outfit, { n: Math.min(days, 7) }) + (days > 7 ? R.outfitWash : '');
    const prefix = R.outfit.split('{n}')[0];
    const old = pack.items.find((i) => i.text.startsWith(prefix));
    if (old) old.text = outfit;
    const I = R.items;
    addItems([...I.base, ...(old ? [] : [outfit]),
      ...pick<string[]>([[cfg.weather === 'hot', I.hot], [cfg.weather === 'cool', I.cool]], []),
      ...pick<string[]>([[cfg.type === 'nature', I.nature], [cfg.type === 'business', I.business]], []),
      ...(cfg.kids === 'yes' ? I.kids : [])]);
    say(R.packBuilt);
  };
  $<HTMLFormElement>('pack-custom-form').onsubmit = (ev) => {
    ev.preventDefault();
    const t = $('pack-custom').value.trim();
    if (t) addItems([t]);
    $('pack-custom').value = '';
  };
  $<HTMLButtonElement>('pack-download').onclick = () => download('Al-Ahsa-packing-list.txt', [R.packFile, '', ...pack.items.map((i) => (i.done ? '[x] ' : '[ ] ') + i.text)].join('\n'));
  $<HTMLButtonElement>('pack-reset').onclick = () => askReset(R.resetPack, () => { pack.items = []; save('pack', pack); renderPack(); });
  renderPack();

  /* ---------- 5) الكهرباء ---------- */
  const checks = $<HTMLElement>('power-checks');
  const line = ([title, text]: readonly string[], warn: boolean) => {
    const li = el('li', 'tt-check-line' + (warn ? ' is-warn' : ''));
    li.append(el('strong', undefined, title), el('p', undefined, text));
    checks.append(li);
  };
  const showPower = () => {
    checks.replaceChildren();
    const plug = $('power-plug').value, volt = $('power-volt').value, hz = $('power-hz').value;
    line(pick([[plug === 'G', R.plugOk], [plug === 'other', R.plugAdapter]], R.plugUnknown), plug === 'other');
    const [lo, hi] = volt.split('-').map(Number);
    const vOk = SA_VOLT >= lo && SA_VOLT <= hi;
    line(pick([[volt === 'unknown', R.voltUnknown], [vOk, R.voltOk]], R.voltBad), volt !== 'unknown' && !vOk);
    const fOk = hz.split(',').map(Number).includes(SA_HZ);
    line(pick([[hz === 'unknown', R.hzUnknown], [fOk, R.hzOk]], R.hzBad), hz !== 'unknown' && !fOk);
  };
  for (const id of ['power-plug', 'power-volt', 'power-hz']) $<HTMLSelectElement>(id).onchange = showPower;
  showPower();
}

initTools();
document.addEventListener('astro:page-load', initTools);
