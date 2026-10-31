document.documentElement.classList.add('js');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Live Stockholm clock in the top bar
const clock = document.getElementById('clock');
const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' });
const tick = () => { clock.textContent = fmt.format(new Date()); };
tick();
setInterval(tick, 15000);

// Full-screen menu
const root = document.documentElement;
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
const setMenu = (open) => {
  root.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.setAttribute('aria-hidden', !open);
};
menuBtn.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Scroll reveal (once)
const revealer = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.classList.add('in');
    revealer.unobserve(e.target);
  }
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal, .pills').forEach((el) => revealer.observe(el));

// Top bar switches to light text over the dark sections
const bar = document.querySelector('.bar');
const darkSections = [...document.querySelectorAll('.noir')];
const updateBar = () => {
  const y = bar.offsetHeight / 2;
  bar.classList.toggle('on-dark', darkSections.some((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= y && r.bottom >= y;
  }));
};
addEventListener('scroll', updateBar, { passive: true });
updateBar();

// Reel: lazy-load videos, play while visible, tap to toggle sound (one at a time)
const phones = [...document.querySelectorAll('.phone')];
const videoObserver = new IntersectionObserver((entries) => {
  for (const { target, isIntersecting } of entries) {
    const video = target.querySelector('video');
    if (isIntersecting && !video.src) {
      video.src = video.dataset.src;
    }
    if (isIntersecting && !reduceMotion) video.play().catch(() => {});
    else video.pause();
  }
}, { threshold: 0.5 });
phones.forEach((p) => videoObserver.observe(p));

phones.forEach((phone) => {
  phone.addEventListener('click', () => {
    const video = phone.querySelector('video');
    if (!phone.classList.contains('has-video')) return;
    const unmute = video.muted;
    phones.forEach((p) => { p.querySelector('video').muted = true; p.classList.remove('unmuted'); });
    video.muted = !unmute;
    phone.classList.toggle('unmuted', unmute);
    if (unmute) video.play().catch(() => {});
  });
});

// Show the CV button only once the PDF exists
const cv = document.getElementById('cv');
fetch(cv.getAttribute('href'), { method: 'HEAD' })
  .then((r) => { if (r.ok) cv.hidden = false; })
  .catch(() => {});
