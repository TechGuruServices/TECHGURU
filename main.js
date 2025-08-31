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
});
