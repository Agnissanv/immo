/* ============================
   IMMO — main.js
   Lenis + GSAP ScrollTrigger
   ============================ */

// ─── REGISTER PLUGINS (OBLIGATOIRE) ──────────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── LENIS SMOOTH SCROLL ─────────────────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

lenis.on('scroll', ScrollTrigger.update);

// ─── NAV SCROLL BEHAVIOR ─────────────────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ─── NAV ACTIVE LINK (fonctionne en file:// et http://) ──────────────────
const rawPath = window.location.pathname;
const currentPage = rawPath.substring(rawPath.lastIndexOf('/') + 1) || 'index.html';

document.querySelectorAll('.nav-link').forEach(link => {
  const href = (link.getAttribute('href') || '').replace('./', '');
  const isHome = (href === 'index.html') && (currentPage === '' || currentPage === 'index.html');
  const isMatch = href === currentPage;
  if (isHome || isMatch) {
    link.classList.add('active');
  }
});

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── REVEAL ANIMATIONS ───────────────────────────────────────────────────
function initReveal() {
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.stagger-children').forEach(parent => {
    const children = Array.from(parent.children);
    children.forEach((child, i) => {
      gsap.from(child, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power4.out',
        delay: i * 0.12,
        scrollTrigger: { trigger: parent, start: 'top 85%' }
      });
    });
  });
}

// ─── COUNTER ANIMATION ───────────────────────────────────────────────────
function initCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let counted = false;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (counted) return;
        counted = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });
}

// ─── PARALLAX ────────────────────────────────────────────────────────────
function initParallax() {
  gsap.utils.toArray('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
    gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────
initReveal();
initCounters();
initParallax();
