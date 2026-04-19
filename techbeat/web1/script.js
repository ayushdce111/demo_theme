/* ============================================
   ALP GROUP INDIA — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR SCROLL EFFECT ----
  const nav = document.getElementById('mainNav');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // Active nav link
    updateActiveNav();
    // Back to top
    updateBackToTop();
    // Animate on scroll
    animateOnScroll();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  // handleScroll();

  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === '#' + current) link.classList.add('active');
    });
  }

  // ---- SMOOTH SCROLL FOR NAV LINKS ----
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = nav.offsetHeight + 10;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // Close mobile menu
          const collapse = document.querySelector('#navbarNav');
          if (collapse && collapse.classList.contains('show')) {
            bootstrap.Collapse.getInstance(collapse)?.hide();
          }
        }
      }
    });
  });

  // ---- BACK TO TOP ----
  const btn = document.getElementById('backToTop');
  function updateBackToTop() {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- SCROLL REVEAL ANIMATIONS ----
  const animElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

  function animateOnScroll() {
    const windowH = window.innerHeight;
    animElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowH - 80) {
        el.classList.add('visible');
      }
    });
  }

  // Run on load too
  // animateOnScroll();

  // ---- COUNTER ANIMATION ----
  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      countersStarted = true;
      statNums.forEach(num => {
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

  window.addEventListener('scroll', startCounters, { passive: true });
  // startCounters();

  // ---- NAVBAR COLLAPSE ON RESIZE ----
  window.addEventListener('resize', () => {
    const collapse = document.querySelector('#navbarNav');
    if (window.innerWidth > 991 && collapse && collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });

  // ---- FORM SUBMIT SIMULATION ----
  const contactBtn = document.querySelector('.contact-form-card .btn-primary-alp');
  if (contactBtn) {
    contactBtn.addEventListener('click', function (e) {
      const inputs = document.querySelectorAll('.alp-input');
      let filled = true;
      inputs.forEach(inp => {
        if (inp.value.trim() === '') filled = false;
      });
      if (!filled) {
        this.textContent = 'Please fill all fields';
        this.style.background = '#666';
        setTimeout(() => {
          this.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
          this.style.background = '';
        }, 2000);
        return;
      }
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-check me-2"></i> Message Sent!';
        this.style.background = '#27ae60';
        inputs.forEach(inp => (inp.value = ''));
        setTimeout(() => {
          this.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
          this.style.background = '';
        }, 3000);
      }, 1500);
    });
  }

  // ---- HERO CAROUSEL KEYBOARD ----
  document.addEventListener('keydown', function (e) {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    if (e.key === 'ArrowLeft') bsCarousel?.prev();
    if (e.key === 'ArrowRight') bsCarousel?.next();
  });



handleScroll();
startCounters();
animateOnScroll();


});


