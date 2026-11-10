// C78 — رؤوس HTTP مصدرها ملف واحد: public/_headers (يُنسخ إلى dist/_headers عند البناء).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بنصَّي netlify.toml وdist/_headers،
// ويستدعيها اختبار الكسر بنسخ معدَّلة في الذاكرة.
//
// كانت القواعد مكرّرة في netlify.toml ([[headers]]) وpublic/_headers بلا فحص يقابل بينهما،
// فتعديل أحد الملفين دون الآخر يمرّ صامتاً ويُرسل Netlify الرأس مرتين بقيمتين.
//
// يحرس:
//   (أ) لا جدول [[headers]] في netlify.toml.
//   (ب) إيجاباً: dist/_headers يحمل كل قاعدة في REQUIRED بقيمتها — فلا يصير الحارس فارغاً
//       إن حُذف الملف أو أُفرغ.
//   (ج) لا مسار مكرّر ولا رأس مكرّر داخل المسار الواحد.

/** القواعد اللازمة: المسار ← [اسم الرأس، نمط يطابق قيمته] */
export const REQUIRED = [
  ['/fonts/*', 'Cache-Control', /^public, max-age=31536000, immutable$/],
  ['/_astro/*', 'Cache-Control', /^public, max-age=31536000, immutable$/],
  ['/vendor/*', 'Cache-Control', /^public, max-age=31536000, immutable$/],
  ['/img/*', 'Cache-Control', /^public, max-age=2592000$/],
  ['/video/*', 'Cache-Control', /^public, max-age=2592000$/],
  ['/llms.txt', 'Content-Type', /^text\/plain; charset=utf-8$/],
  ['/*', 'X-Content-Type-Options', /^nosniff$/],
  ['/*', 'Referrer-Policy', /^strict-origin-when-cross-origin$/],
  ['/*', 'X-Frame-Options', /^SAMEORIGIN$/],
  ['/*', 'Strict-Transport-Security', /^max-age=31536000; includeSubDomains$/],
  ['/*', 'Permissions-Policy', /(?:^|, )geolocation=\(self\)(?:,|$)/],
];

/** توجيهات CSP التي لا تسقط من السياسة أياً كان وضعها */
export const CSP_DIRECTIVES = ["default-src 'self'", "object-src 'none'", "base-uri 'self'", "form-action 'self'"];
export const CSP_HEADERS = ['Content-Security-Policy', 'Content-Security-Policy-Report-Only'];

/**
 * يحلّل ملف _headers إلى خريطة: المسار ← [[الاسم، القيمة]، …] مع المكرّرات كما وردت.
 * @param {string} text
 * @returns {{rules: Map<string, [string, string][]>, dupPaths: string[], orphans: string[]}}
 */
export function parseHeadersFile(text) {
  const rules = new Map();
  const dupPaths = [];
  const orphans = [];
  let cur = null;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (raw[0] !== ' ' && raw[0] !== '\t') {
      cur = line;
      if (rules.has(cur)) dupPaths.push(cur);
      else rules.set(cur, []);
      continue;
    }
    const colon = line.indexOf(':');
    if (cur === null || colon < 1) { orphans.push(line); continue; }
    rules.get(cur).push([line.slice(0, colon).trim(), line.slice(colon + 1).trim()]);
  }
  return { rules, dupPaths, orphans };
}

/**
 * @param {{toml: string, headers: string}} input نص netlify.toml ونص dist/_headers
 * @returns {{problems: string[], stats: {paths: number, headers: number, cspMode: string}}}
 */
export function checkHeaders({ toml, headers }) {
  const problems = [];
  const tomlTables = toml.split(/\r?\n/).filter((l) => l.trim().startsWith('[[headers]]')).length;
  if (tomlTables) problems.push(`netlify.toml يحمل ${tomlTables} جدول [[headers]] — الرؤوس في public/_headers وحده`);

  const { rules, dupPaths, orphans } = parseHeadersFile(headers);
  for (const p of dupPaths) problems.push(`_headers: المسار ${p} مكرّر`);
  for (const o of orphans) problems.push(`_headers: سطر خارج أي مسار أو بلا نقطتين ⇐ «${o.slice(0, 60)}»`);

  let count = 0;
  for (const [p, list] of rules) {
    count += list.length;
    const names = list.map(([n]) => n.toLowerCase());
    for (const n of new Set(names)) {
      if (names.filter((x) => x === n).length > 1) problems.push(`_headers: الرأس ${n} مكرّر في ${p}`);
    }
  }

  const valueOf = (p, name) => {
    const hit = (rules.get(p) ?? []).find(([n]) => n.toLowerCase() === name.toLowerCase());
    return hit ? hit[1] : null;
  };
  for (const [p, name, re] of REQUIRED) {
    const v = valueOf(p, name);
    if (v === null) problems.push(`_headers: ${p} بلا ${name}`);
    else if (!re.test(v)) problems.push(`_headers: ${p} ${name} بقيمة غير متوقعة ⇐ «${v.slice(0, 80)}»`);
  }

  const cspNames = CSP_HEADERS.filter((n) => valueOf('/*', n) !== null);
  if (cspNames.length === 0) problems.push('_headers: /* بلا سياسة أمان المحتوى (CSP)');
  for (const n of cspNames) {
    const directives = valueOf('/*', n).split(';').map((d) => d.trim().replace(/\s+/g, ' '));
    for (const d of CSP_DIRECTIVES) {
      if (!directives.includes(d)) problems.push(`_headers: ${n} بلا التوجيه «${d}»`);
    }
  }

  return { problems, stats: { paths: rules.size, headers: count, cspMode: cspNames.join(' + ') || 'none' } };
}
