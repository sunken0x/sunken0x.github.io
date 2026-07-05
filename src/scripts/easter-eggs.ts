import { createKonami } from '../lib/konami';

// Console banner
console.log(
  '%c SUNKEN0X %c look harder.',
  'background: #ff00aa; color: #000; font-weight: bold; padding: 2px 6px;',
  'color: #00f0ff;',
);
console.log('%chint: the 0 in the wordmark likes attention.', 'color: #888;');

// Konami → jump to hidden route
const konami = createKonami(() => {
  document.documentElement.style.transition = 'filter 0.6s';
  document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
  setTimeout(() => { window.location.href = '/_hidden/echoes'; }, 600);
});
window.addEventListener('keydown', (e) => konami.handle(e));

// 0-hover trigger on the wordmark's zero
document.querySelectorAll<HTMLElement>('[data-egg="0"]').forEach((el) => {
  let timer: number | null = null;
  el.addEventListener('mouseenter', () => {
    timer = window.setTimeout(() => {
      el.style.textShadow = '4px 0 #ff00aa, -4px 0 #00f0ff, 0 0 16px #ff00aa';
      el.setAttribute('title', '↗ /_hidden/echoes');
      const link = document.createElement('a');
      link.href = '/_hidden/echoes';
      link.textContent = '→';
      link.style.cssText = 'position:fixed;bottom:8px;left:8px;color:#ff00aa;font-family:var(--font-mono);text-decoration:none;font-size:10px;';
      link.id = 'egg-hint';
      document.body.appendChild(link);
    }, 1500);
  });
  el.addEventListener('mouseleave', () => {
    if (timer) clearTimeout(timer);
    el.style.textShadow = '';
    document.getElementById('egg-hint')?.remove();
  });
});
