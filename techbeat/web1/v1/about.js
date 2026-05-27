/* ============================================
   ALP GROUP INDIA — ABOUT PAGE JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- COUNTER ANIMATION FOR ABOUT STATS STRIP ----
  const astatNums = document.querySelectorAll('.astat-num');
  let countersStarted = false;

  function startAboutCounters() {
    if (countersStarted) return;
    const strip = document.querySelector('.about-stats-strip');
    if (!strip) return;
    const rect = strip.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      countersStarted = true;
      astatNums.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'), 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          num.textContent = Math.floor(current);
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', startAboutCounters, { passive: true });
  startAboutCounters();

  // ---- SCROLL REVEAL (re-run for about-page elements) ----
  const animEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

  function revealOnScroll() {
    const wh = window.innerHeight;
    animEls.forEach(el => {
      if (el.getBoundingClientRect().top < wh - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll, { passive: true });
  revealOnScroll(); // run on load

  // ---- BACK TO TOP ----
  const btn = document.getElementById('backToTop');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- NAVBAR SCROLL EFFECT ----
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  // ---- TIMELINE STAGGER ANIMATION ----
  // Add staggered delay to timeline items so they animate sequentially
  const timelineItems = document.querySelectorAll('.etv2-item');
  timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.07}s`;
  });

  // ---- PARALLAX SUBTLE EFFECT ON MEMORIAL SECTION ----
  const memorial = document.querySelector('.memorial-section');
  if (memorial) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rect = memorial.getBoundingClientRect();
      const offset = (rect.top + scrolled) - scrolled;
      const parallax = (scrolled - offset) * 0.15;
      memorial.style.backgroundPositionY = `calc(center + ${parallax}px)`;
    }, { passive: true });
  }

  // ---- PAGE HERO PARALLAX ----
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    window.addEventListener('scroll', () => {
      pageHero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
    }, { passive: true });
  }

  // ---- LEADER CARDS HOVER TILT ----
  const leaderCards = document.querySelectorAll('.leader-profile-card');
  leaderCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 5;
      const rotY = ((x - cx) / cx) * -5;
      this.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // ---- VALUE CARDS HOVER RIPPLE ----
  const valueCards = document.querySelectorAll('.value-card');
  valueCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transition = 'all 0.35s cubic-bezier(0.4,0,0.2,1)';
    });
  });

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = (nav ? nav.offsetHeight : 80) + 10;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ---- PILLAR CARDS COUNT UP ON HOVER ---- 
  // Visual pulse on hover for pillar number
  const pillarNums = document.querySelectorAll('.pillar-num');
  pillarNums.forEach(num => {
    const parent = num.closest('.pillar-card');
    if (parent) {
      parent.addEventListener('mouseenter', () => {
        num.style.fontSize = '5rem';
        num.style.opacity = '1';
      });
      parent.addEventListener('mouseleave', () => {
        num.style.fontSize = '';
        num.style.opacity = '';
      });
    }
  });

  // ---- NAVBAR MOBILE CLOSE ON LINK CLICK ----
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('#navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

});
