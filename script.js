(function () {
  "use strict";

  var html = document.documentElement;
  var langToggle = document.getElementById("langToggle");
  var STORAGE_KEY = "ines-portfolio-lang";

  function applyLang(lang) {
    if (lang === "en") {
      html.classList.add("lang-en");
      html.setAttribute("lang", "en");
    } else {
      html.classList.remove("lang-en");
      html.setAttribute("lang", "fr");
    }
  }

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — ignore, language just won't persist */
    }
  }

  // Initial language: stored preference, else browser language, else French.
  var initialLang = getStoredLang();
  if (!initialLang) {
    initialLang = (navigator.language || "").toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
  }
  applyLang(initialLang);

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = html.classList.contains("lang-en") ? "fr" : "en";
      applyLang(next);
      storeLang(next);
    });
  }

  // Mobile menu toggle
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Navbar shadow on scroll
  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 8px 24px -16px rgba(124, 58, 237, .35)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Reveal-on-scroll animation
  var revealTargets = document.querySelectorAll(
    ".about-card, .skill-card, .timeline-item, .project-card, .edu-item, .contact-card"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
