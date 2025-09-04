// theme toggle and mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  tsParticles.load("tsparticles", {
    fullScreen: { enable: false },
    background: { color: "#f8f8fb" }, // match your site background
    particles: {
      number: { value: 30, density: { enable: true, area: 800 } },
      color: { value: "#bbbbbb" },
      opacity: { value: 0.15, random: true },
      size: { value: 2, random: true },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: { default: "out" } },
      links: { enable: true, distance: 120, color: "#bbbbbb", opacity: 0.08, width: 1 }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "attract" }
      },
      modes: {
        repulse: { distance: 90, duration: 0.4 },
        attract: { distance: 200, duration: 0.7 }
      }
    },
    detectRetina: true
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
  const nav = document.getElementById('main-nav');
  const burger = document.getElementById('hamburger');
  const storageKey = 'tg_theme';

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem(storageKey, mode); } catch (e) {}
    if (themeBtn) themeBtn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon', 'fa-sun');
      themeIcon.classList.add(mode === 'dark' ? 'fa-moon' : 'fa-sun');
    }
  }

  const stored = (() => { try { return localStorage.getItem(storageKey); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(stored || (prefersDark ? 'dark' : 'light'));

  themeBtn && themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  if (nav && burger) {
    const links = nav.querySelectorAll('a');
    let menuOpen = false;

    function setMenu(open) {
      menuOpen = open;
      nav.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      if (open && links[0]) links[0].focus();
    }

    burger.addEventListener('click', () => setMenu(!menuOpen));
    links.forEach(l => l.addEventListener('click', () => setMenu(false)));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuOpen) {
        setMenu(false);
        burger.focus();
      } else if (e.key === 'Tab' && menuOpen && links.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && menuOpen) setMenu(false);
      }, 200);
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
