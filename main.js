(function() {
  'use strict';

  // ========== STICKY HEADER ==========
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ========== MOBILE NAV ==========
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  var navOverlay = document.getElementById('nav-overlay');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (navToggle) { navToggle.classList.remove('active'); navToggle.setAttribute('aria-expanded', 'false'); }
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      var isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  if (navOverlay) navOverlay.addEventListener('click', closeNav);

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeNav);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      closeNav();
      if (navToggle) navToggle.focus();
    }
  });

  // ========== INTERSECTION OBSERVER — REVEAL ==========
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(function(el) { observer.observe(el); });
  } else {
    revealEls.forEach(function(el) { el.classList.add('visible'); });
  }

  // ========== HERO IMAGE ZOOM ON LOAD ==========
  var heroHome = document.querySelector('.hero-home');
  if (heroHome) {
    window.addEventListener('load', function() {
      heroHome.classList.add('loaded');
    });
  }

  // ========== PARALLAX EFFECT (subtle) ==========
  var parallaxImgs = document.querySelectorAll('.parallax-img');
  if (parallaxImgs.length && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      parallaxImgs.forEach(function(img) {
        var rect = img.parentElement.getBoundingClientRect();
        var speed = 0.15;
        var yPos = rect.top * speed;
        img.style.transform = 'translateY(' + yPos + 'px)';
      });
    }, { passive: true });
  }

  // ========== EMAIL FORM ==========
  var emailForms = document.querySelectorAll('.email-form');
  emailForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = form.querySelector('input[type="email"]');
      var btn = form.querySelector('button[type="submit"]');
      if (input && input.value) {
        var originalText = btn.textContent;
        btn.textContent = "You're In!";
        btn.disabled = true;
        btn.style.opacity = '0.7';
        input.disabled = true;
        input.value = '';
        input.placeholder = 'Check your inbox';
        setTimeout(function() {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.opacity = '';
          input.disabled = false;
          input.placeholder = 'Enter your email';
        }, 4000);
      }
    });
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 0;
        var pos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // ========== GALLERY DUPLICATION (for infinite scroll) ==========
  var galleryRow = document.querySelector('.gallery-row');
  if (galleryRow) {
    var items = galleryRow.innerHTML;
    galleryRow.innerHTML = items + items;
  }

  // ========== MARQUEE DUPLICATION ==========
  var marquee = document.querySelector('.marquee-content');
  if (marquee) {
    var content = marquee.innerHTML;
    marquee.innerHTML = content + content;
  }

})();
