import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const safe = <T,>(fn: () => T) => { try { return fn(); } catch { return null; } };

/* ---------- nav ---------- */
const nav = $('.nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 4);
onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

// live clock in India time + today's date on the dateline
const clock = $('[data-clock]');
const tickClock = () => {
  if (clock) clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
};
tickClock(); setInterval(tickClock, 15000);
const today = $('[data-today]');
if (today) today.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// letterpress "LET'S TALK": each block of type drops in and presses into place
const type = $('[data-type]');
if (type && !reduced) {
  const blocks = $$('i', type);
  // set the type: drop, press (squash), settle
  gsap.timeline({ delay: 0.45 })
    .from(blocks, {
      y: -30, opacity: 0, rotate: () => gsap.utils.random(-14, 14), duration: 0.42,
      stagger: 0.07, ease: 'power3.in',
    })
    .to(blocks, { scaleY: 0.8, scaleX: 1.12, duration: 0.07, stagger: 0.07, ease: 'power2.out' }, 0.42)
    .to(blocks, { scaleY: 1, scaleX: 1, duration: 0.4, stagger: 0.07, ease: 'elastic.out(1.1, 0.4)', clearProps: 'transform' }, 0.49);
  // re-ink on hover and now and then: a press wave runs across the blocks
  let pressing = false;
  const press = () => {
    if (pressing) return;
    pressing = true;
    gsap.timeline({ onComplete: () => { pressing = false; } })
      .to(blocks, { y: 2, scaleY: 0.88, duration: 0.1, stagger: 0.045, ease: 'power2.in' })
      .to(blocks, { y: 0, scaleY: 1, duration: 0.45, stagger: 0.045, ease: 'elastic.out(1, 0.45)', clearProps: 'transform' }, 0.1);
  };
  $('[data-status]')?.addEventListener('mouseenter', press);
  setInterval(() => { if (!document.hidden && window.scrollY < 40) press(); }, 12000);
}

/* ---------- edition switch: Plain English / Technical ---------- */
const modeBtns = $$<HTMLButtonElement>('[data-mode-btn]');
const thumb = $('.mode-thumb');
function moveThumb(animate: boolean) {
  const on = modeBtns.find((b) => b.getAttribute('aria-checked') === 'true');
  if (!on || !thumb) return;
  gsap.to(thumb, { x: on.offsetLeft, width: on.offsetWidth, duration: animate ? 0.35 : 0, ease: 'power3.out' });
}
function setMode(mode: string, animate = true) {
  if (document.body.dataset.mode === mode && animate) return;
  modeBtns.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.modeBtn === mode)));
  moveThumb(animate);
  const swap = () => { document.body.dataset.mode = mode; ScrollTrigger.refresh(); };
  safe(() => localStorage.setItem('mode', mode));
  if (!animate || reduced) return swap();
  const duals = $$('.dual').filter((d) => d.getBoundingClientRect().bottom > 0 && d.getBoundingClientRect().top < innerHeight);
  gsap.to(duals, {
    opacity: 0, y: -4, duration: 0.15, ease: 'power1.in',
    onComplete: () => { swap(); gsap.fromTo(duals, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: 'power2.out', clearProps: 'transform' }); },
  });
}
modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.modeBtn!)));
setMode(safe(() => localStorage.getItem('mode')) === 'tech' ? 'tech' : 'plain', false);
document.fonts.ready.then(() => moveThumb(false));
window.addEventListener('resize', () => moveThumb(false));

/* ---------- front page: nameplate letters, stamp, rise ---------- */
const plate = $('[data-nameplate]');
if (plate && !reduced) {
  const text = plate.textContent ?? '';
  plate.textContent = '';
  const chars = [...text].map((c) => {
    const s = document.createElement('span');
    s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
    s.textContent = c === ' ' ? ' ' : c;
    plate.append(s);
    return s;
  });
  gsap.from(chars, { yPercent: 70, opacity: 0, rotate: () => gsap.utils.random(-8, 8), duration: 0.9, stagger: 0.035, ease: 'power4.out', delay: 0.15 });
}
// 'clipping' title: the clipping drops onto the page, then the tape is pressed on
const clip = $('[data-clip]');
if (clip && !reduced) {
  gsap.timeline({ delay: 0.15 })
    .from(clip, { y: -60, rotate: -7, opacity: 0, scale: 1.04, duration: 0.75, ease: 'power3.out' })
    .from('[data-tape]', { scaleX: 0.2, opacity: 0, duration: 0.3, ease: 'back.out(2)' }, '-=0.15');
}

// 'poster' title: each word slams down in turn, then the barcode strip prints across
const po = $('[data-po]');
if (po && !reduced) {
  gsap.timeline({ delay: 0.15 })
    .from($$('.po-w', po), { scale: 1.5, opacity: 0, filter: 'blur(8px)', duration: 0.38, stagger: 0.16, ease: 'power4.in', clearProps: 'filter,transform' })
    .to(po, { y: 3, duration: 0.05, yoyo: true, repeat: 1, ease: 'power1.inOut', clearProps: 'transform' })
    .from('[data-po-code]', { scaleX: 0, duration: 0.7, ease: 'power3.out' }, '-=0.05');
}

// 'editorial' title: the name is wiped on from left to right, then the side column slides in
const ed = $('[data-ed]');
if (ed && !reduced) {
  const side = $('[data-ed-side]')!;
  gsap.timeline({ delay: 0.15 })
    .fromTo(ed, { clipPath: 'inset(0 100% -10% 0)', x: -24 }, { clipPath: 'inset(0 0% -10% 0)', x: 0, duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath,transform' })
    .from($('.ed-bar', side), { scaleY: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35')
    .from([...side.children].filter((c) => !c.classList.contains('ed-bar')), { x: 18, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.3');
}

// 'times' title: letters rise out of the line like type coming off the press
const times = $('[data-times]');
if (times && !reduced) {
  gsap.timeline({ delay: 0.15 })
    .from($('.tt-the', times), { y: 10, opacity: 0, duration: 0.5, ease: 'power3.out' })
    .from($$('.tt-c', times), { yPercent: 105, duration: 0.8, stagger: 0.045, ease: 'power4.out' }, '-=0.25')
    .from('[data-tt-by]', { y: 8, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35');
}

// crossword title: squares appear, then letters type in like someone solving it
const xw = $('[data-xw]');
if (xw && !reduced) {
  const cells = $$('.xw-cell', xw).sort((a, b) => Number(a.dataset.o) - Number(b.dataset.o));
  const letters = cells.map((c) => $('b', c)!);
  gsap.set(letters, { opacity: 0 });
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from(cells, { scale: 0.4, opacity: 0, duration: 0.35, stagger: { each: 0.025, from: 'start' }, ease: 'back.out(2)' });
  cells.forEach((c, i) => {
    tl.add(() => { cells.forEach((x) => x.classList.remove('cur')); c.classList.add('cur'); }, `>${i ? 0 : 0.1}`)
      .fromTo(letters[i], { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.1, ease: 'power3.out' }, '<');
  });
  tl.add(() => cells.forEach((x) => x.classList.remove('cur')), '+=0.25')
    .fromTo($$('.xw-cell.hot', xw), { backgroundColor: 'rgba(176,65,43,0.25)' }, { backgroundColor: 'rgba(176,65,43,0)', duration: 0.9, clearProps: 'backgroundColor' });
}

// 'press' masthead: the name starts as an outline and ink rolls across it, left to right
const ink = $('[data-press]');
if (ink && !reduced) {
  gsap.timeline({ delay: 0.2 })
    .set(ink, { '--fill': '0%', '--roller': 1 })
    .to(ink, { '--fill': '100%', duration: 1.5, ease: 'power2.inOut' })
    .to(ink, { '--roller': 0, duration: 0.25 }, '-=0.15');
}
if (!reduced) {
  gsap.from('[data-rise]', { y: 18, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', delay: 0.35 });
  const stamp = $('[data-stamp]');
  if (stamp) {
    gsap.timeline({ delay: 1.3 })
      .from(stamp, { scale: 2.6, opacity: 0, duration: 0.32, ease: 'power4.in' })
      .to('.front-grid', { y: 2, duration: 0.05, yoyo: true, repeat: 1, ease: 'power1.inOut', clearProps: 'transform' });
  }
}

// numbers count up when they scroll into view
$$<HTMLElement>('[data-count]').forEach((el) => {
  const end = Number(el.dataset.count);
  if (reduced) return;
  const o = { v: 0 };
  el.textContent = '0';
  gsap.to(o, {
    v: end, duration: 1.4, ease: 'power2.out',
    onUpdate: () => { el.textContent = String(Math.round(o.v)); },
    scrollTrigger: { trigger: el, start: 'top 92%', once: true },
  });
});

/* ---------- news ticker ---------- */
const track = $('[data-ticker]');
if (track && !reduced) {
  let loop: gsap.core.Tween | null = null;
  const build = () => {
    loop?.kill();
    gsap.set(track, { x: 0 });
    const half = track.scrollWidth / 2;
    loop = gsap.to(track, { x: -half, duration: half / 45, ease: 'none', repeat: -1 });
  };
  document.fonts.ready.then(build);
  track.addEventListener('mouseenter', () => loop?.timeScale(0.2));
  track.addEventListener('mouseleave', () => loop?.timeScale(1));
}

/* ---------- explainer strip: the red line follows your scroll ---------- */
const strip = $('[data-strip]');
const panels = $$('[data-panel]');
if (strip && panels.length) {
  const light = (p: number) => panels.forEach((el, i) => el.classList.toggle('on', p >= i / (panels.length - 1) - 0.02));
  if (reduced) { gsap.set(strip, { '--p': 1 }); light(1); }
  else {
    gsap.to(strip, {
      '--p': 1, ease: 'none',
      scrollTrigger: {
        trigger: strip, start: () => (innerWidth <= 680 ? 'top 70%' : 'top 80%'), end: () => (innerWidth <= 680 ? 'bottom 60%' : 'top 30%'), scrub: 0.4,
        onUpdate: (st) => light(st.progress),
      },
    });
    gsap.from(panels, { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: strip, start: 'top 85%' } });
  }
}

/* ---------- classifieds: tap a tool for a plain-English explanation ---------- */
$$('[data-group]').forEach((g) => {
  const box = $('[data-explain]', g)!;
  const tools = $$<HTMLButtonElement>('.tool', g);
  tools.forEach((t) => t.addEventListener('click', () => {
    const was = t.getAttribute('aria-expanded') === 'true';
    tools.forEach((x) => x.setAttribute('aria-expanded', 'false'));
    if (was) { box.classList.remove('has'); box.innerHTML = '<span>Tap a tool to see what it is.</span>'; return; }
    t.setAttribute('aria-expanded', 'true');
    box.classList.add('has');
    box.innerHTML = '';
    const b = document.createElement('b'); b.textContent = `${t.textContent}: `;
    box.append(b, document.createTextNode(t.dataset.desc ?? ''));
    if (!reduced) gsap.fromTo(box, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
  }));
});

/* ---------- letters: copy email ---------- */
$$<HTMLButtonElement>('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const ok = await safe(() => navigator.clipboard.writeText(b.dataset.copy!).then(() => true, () => false));
  const label = b.textContent;
  b.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C';
  b.classList.add('done');
  setTimeout(() => { b.textContent = label; b.classList.remove('done'); }, 1800);
}));

/* ---------- gentle reveals ---------- */
if (!reduced) {
  $$('.sec-head').forEach((h) => gsap.from(h.children, { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 86%' } }));
  $$('[data-job]').forEach((j) => gsap.from(j.children, { y: 26, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: j, start: 'top 84%' } }));
  gsap.from('[data-group]', { y: 24, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: '.classifieds', start: 'top 85%' } });
  $$('[data-notice]').forEach((n) => gsap.from(n, { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: n, start: 'top 90%' } }));
  gsap.from('[data-letter]', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-letter]', start: 'top 88%' } });
}
document.fonts.ready.then(() => ScrollTrigger.refresh());
