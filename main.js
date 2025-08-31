// theme toggle (light/dark) with persistence
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-toggle-icon');
  const nav  = document.getElementById('main-nav');
  const burger = document.getElementById('hamburger');

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch {}
    if (icon) {
      icon.classList.remove('fa-moon', 'fa-sun');
      icon.classList.add(mode === 'dark' ? 'fa-moon' : 'fa-sun');
    }
  }

  // initialize from storage or system preference
  const stored = (() => { try { return localStorage.getItem('theme'); } catch { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(stored || (prefersDark ? 'dark' : 'light'));

  if (btn) {
    btn.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  if (nav && burger) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // rotating word carousel for hero subtitle
  const carousel = document.getElementById('word-carousel');
  const words = ['scalability', 'automation', 'security'];
  let idx = 0;
  if (carousel) {
    setInterval(() => {
      idx = (idx + 1) % words.length;
      carousel.textContent = words[idx];
    }, 3000);
  }

  // remove typewriter cursor after animation
  const tw = document.querySelector('.typewriter');
  if (tw) {
    tw.addEventListener('animationend', () => {
      tw.style.borderRight = 'none';
    });
  }
});
