// مؤثّر الطقس على الفصل الأول من الرئيسية — يُحمَّل كسولاً من ChapterGate.astro بعد وصول الطقس
// (حدث va:weather من HeaderWeather.astro)، فلا يدخل حزمة الصفحة ولا يؤخّر الصورة الأولى.
// لوحة canvas واحدة تحت النص، بشدّة «ناعمة» (0.6) كما اعتُمدت في المعاينة 2026-11-14.
// تتوقف حين يخرج البطل من الشاشة أو تُخفى النافذة؛ ومع تقليل الحركة يُرسم إطار واحد ساكن.

type P = Record<string, number>;
const LEVEL = 0.6;

export function startWeatherFx(cv: HTMLCanvasElement, host: HTMLElement, state: string): () => void {
  const ctx = cv.getContext('2d');
  if (!ctx) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, parts: P[] = [], raf = 0, last = performance.now(), visible = true;
  let shoot: P | null = null, nextShoot = performance.now() + 2500;
  const R = (a: number, b: number) => a + Math.random() * (b - a);

  function seed() {
    parts = [];
    const n = (k: number) => Math.round(k * ((W * H) / 1e5) * LEVEL);
    const big = Math.max(W, H);
    switch (state) {
      case 'clear': for (let i = 0; i < n(5); i++) parts.push({ x: R(0, W), y: R(0, H), r: R(.6, 1.8), v: R(4, 12), ph: R(0, 6.28) }); break;
      case 'hot': for (let i = 0; i < n(7); i++) parts.push({ x: R(0, W), y: R(H * .35, H), r: R(.8, 2.2), v: R(10, 26), ph: R(0, 6.28) }); break;
      case 'dust':
        for (let i = 0; i < n(55); i++) parts.push({ x: R(0, W), y: R(0, H), r: R(.5, 2.2), v: R(30, 120), a: R(.15, .55), ph: R(0, 6.28) });
        for (let i = 0; i < 5; i++) parts.push({ band: 1, x: R(-W, W), y: R(H * .1, H * .9), w: R(W * .5, W * 1.1), h: R(40, 120), v: R(20, 50) });
        break;
      case 'cloud': for (let i = 0; i < 5; i++) parts.push({ x: R(-W * .3, W), y: R(H * .05, H * .9), r: R(big * .25, big * .5), v: R(6, 14) }); break;
      case 'rain': for (let i = 0; i < n(26); i++) parts.push({ x: R(-H * .3, W), y: R(-H, H), l: R(10, 26), v: R(520, 900), a: R(.18, .45) }); break;
      case 'fog': for (let i = 0; i < 7; i++) parts.push({ x: R(-W * .4, W), y: R(H * .45, H * 1.05), rx: R(W * .35, W * .7), ry: R(50, 130), v: R(8, 20), a: R(.10, .2) }); break;
      case 'night': for (let i = 0; i < n(18); i++) parts.push({ x: R(0, W), y: R(0, H * .62), r: R(.4, 1.4), ph: R(0, 6.28), sp: R(.6, 2) }); break;
    }
  }

  function resize() {
    const r = host.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = r.width; H = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  // الشمس في الزاوية العليا من جهة نهاية السطر (يسار العربية ويمين الإنجليزية)، فوق الصورة لا فوق العنوان
  const sunX = () => (document.documentElement.dir === 'rtl' ? W * .1 : W * .9);

  function draw(now: number) {
    const c = ctx!;
    const dt = Math.min((now - last) / 1000, .05); last = now;
    const t = now / 1000;
    c.clearRect(0, 0, W, H);
    if (state === 'clear' || state === 'hot') {
      const hot = state === 'hot', sx = sunX(), sy = -H * .05;
      const g = c.createRadialGradient(sx, sy, 0, sx, sy, Math.max(W, H) * (hot ? .75 : .6));
      const p = .5 + .5 * Math.sin(t * .4);
      g.addColorStop(0, `rgba(255,${hot ? 196 : 226},${hot ? 120 : 170},${(hot ? .42 : .30) * LEVEL + p * .05})`);
      g.addColorStop(1, 'rgba(255,220,160,0)');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      c.save(); c.translate(sx, sy); c.globalCompositeOperation = 'lighter';
      const L = Math.max(W, H) * 1.3, dir = sx < W / 2 ? 1 : -1;
      for (let i = 0; i < 6; i++) {
        const a0 = .35 + i * .19 + Math.sin(t * .08 + i) * .04, a = dir === 1 ? a0 : Math.PI - a0;
        c.beginPath(); c.moveTo(0, 0);
        c.lineTo(Math.cos(a - .025) * L, Math.sin(a - .025) * L); c.lineTo(Math.cos(a + .025) * L, Math.sin(a + .025) * L); c.closePath();
        c.fillStyle = `rgba(255,236,190,${(.035 + .02 * Math.sin(t * .5 + i * 1.7)) * LEVEL})`; c.fill();
      }
      c.restore();
      for (const q of parts) {
        q.y -= q.v * dt; q.x += Math.sin(t + q.ph) * 6 * dt;
        if (q.y < -5) { q.y = H + 5; q.x = R(0, W); }
        c.beginPath(); c.arc(q.x, q.y, q.r, 0, 6.28); c.fillStyle = `rgba(255,236,200,${.35 + .3 * Math.sin(t * 2 + q.ph)})`; c.fill();
      }
      if (hot) {
        for (let i = 0; i < 9; i++) {
          const y = H * (.62 + i * .042); c.beginPath();
          for (let x = 0; x <= W; x += 16) c.lineTo(x, y + Math.sin(x * .018 + t * 2.2 + i) * 3);
          c.strokeStyle = `rgba(255,214,160,${.05 * LEVEL})`; c.lineWidth = 7; c.stroke();
        }
      }
    } else if (state === 'dust') {
      for (const q of parts) {
        if (q.band) {
          q.x += q.v * dt; if (q.x > W) { q.x = -q.w; q.y = R(H * .1, H * .9); }
          const g = c.createLinearGradient(q.x, 0, q.x + q.w, 0);
          g.addColorStop(0, 'rgba(214,170,110,0)'); g.addColorStop(.5, `rgba(214,170,110,${.10 * LEVEL})`); g.addColorStop(1, 'rgba(214,170,110,0)');
          c.fillStyle = g; c.fillRect(q.x, q.y - q.h / 2, q.w, q.h); continue;
        }
        q.x += q.v * dt; q.y += Math.sin(t * 1.3 + q.ph) * 14 * dt;
        if (q.x > W + 4) { q.x = -4; q.y = R(0, H); }
        c.beginPath(); c.arc(q.x, q.y, q.r, 0, 6.28); c.fillStyle = `rgba(226,186,128,${q.a})`; c.fill();
      }
    } else if (state === 'cloud') {
      for (const q of parts) {
        q.x += q.v * dt; if (q.x - q.r > W) q.x = -q.r;
        const g = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.r);
        g.addColorStop(0, `rgba(4,24,24,${.30 * LEVEL})`); g.addColorStop(1, 'rgba(4,24,24,0)');
        c.fillStyle = g; c.fillRect(q.x - q.r, q.y - q.r, q.r * 2, q.r * 2);
      }
    } else if (state === 'rain') {
      c.lineCap = 'round'; c.lineWidth = 1;
      for (const q of parts) {
        q.y += q.v * dt; q.x += q.v * .18 * dt;
        if (q.y > H) { q.y = R(-60, -10); q.x = R(-H * .3, W); }
        c.beginPath(); c.moveTo(q.x, q.y); c.lineTo(q.x - q.l * .18, q.y - q.l); c.strokeStyle = `rgba(214,232,240,${q.a})`; c.stroke();
      }
    } else if (state === 'fog') {
      for (const q of parts) {
        q.x += q.v * dt; if (q.x - q.rx > W) q.x = -q.rx;
        c.save(); c.translate(q.x, q.y); c.scale(1, q.ry / q.rx);
        const g = c.createRadialGradient(0, 0, 0, 0, 0, q.rx);
        g.addColorStop(0, `rgba(236,238,232,${q.a * (.6 + LEVEL * .6)})`); g.addColorStop(1, 'rgba(236,238,232,0)');
        c.fillStyle = g; c.beginPath(); c.arc(0, 0, q.rx, 0, 6.28); c.fill(); c.restore();
      }
    } else if (state === 'night') {
      const mx = sunX(), my = H * .16;
      const g = c.createRadialGradient(mx, my, 0, mx, my, Math.min(W, H) * .32);
      g.addColorStop(0, `rgba(220,230,255,${.16 * LEVEL})`); g.addColorStop(1, 'rgba(220,230,255,0)');
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      for (const q of parts) {
        c.beginPath(); c.arc(q.x, q.y, q.r, 0, 6.28);
        c.fillStyle = `rgba(240,244,255,${.35 + .55 * (.5 + .5 * Math.sin(t * q.sp + q.ph))})`; c.fill();
      }
      if (!reduced) {
        if (!shoot && now > nextShoot) shoot = { x: R(W * .3, W), y: R(0, H * .25), life: 0 };
        if (shoot) {
          shoot.life += dt;
          const p = shoot.life / .9, x = shoot.x - p * 260, y = shoot.y + p * 110;
          const gr = c.createLinearGradient(x, y, x + 90, y - 38);
          gr.addColorStop(0, `rgba(255,255,255,${.8 * (1 - p)})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
          c.beginPath(); c.moveTo(x, y); c.lineTo(x + 90, y - 38); c.strokeStyle = gr; c.lineWidth = 1.4; c.stroke();
          if (p >= 1) { shoot = null; nextShoot = now + R(6000, 11000); }
        }
      }
    }
    c.globalCompositeOperation = 'source-over';
  }

  function loop() {
    cancelAnimationFrame(raf); raf = 0; last = performance.now();
    if (reduced) { draw(performance.now()); return; }
    const step = (now: number) => {
      if (!visible || document.hidden) { raf = 0; return; }
      draw(now); raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible && !raf) loop(); });
  io.observe(host);
  const onVis = () => { if (!document.hidden && !raf) loop(); };
  document.addEventListener('visibilitychange', onVis);
  let rt = 0;
  const onResize = () => { clearTimeout(rt); rt = window.setTimeout(() => { resize(); loop(); }, 150); };
  addEventListener('resize', onResize);
  resize(); loop();
  cv.classList.add('is-on');

  return () => {
    cancelAnimationFrame(raf); io.disconnect();
    document.removeEventListener('visibilitychange', onVis); removeEventListener('resize', onResize);
  };
}
