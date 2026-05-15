/* ============================================
   YASH SABE PORTFOLIO — script.js
   Features:
   - Typing effect (hero section)
   - Scroll reveal animation
   - Active navbar link highlighting
   - Navbar shrink on scroll
   - Mobile hamburger menu
   - Score bar animation (education section)
   ============================================ */

/* ===========================
   1. TYPING EFFECT
   =========================== */
const typedEl = document.getElementById('typed-text');

// Words to cycle through
const words = ['Student Developer', 'Problem Solver', 'Web Enthusiast', 'Tech Explorer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = words[wordIndex];

  // Add or remove a character
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  // Decide speed: faster when deleting
  let speed = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    // Pause at end of word, then start deleting
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

// Start typing after a short delay
setTimeout(typeLoop, 800);


/* ===========================
   2. SCROLL REVEAL
   Uses IntersectionObserver for performance
   =========================== */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate score bars when edu section enters view
      const bar = entry.target.querySelector('.score-bar');
      if (bar) {
        const pct = getComputedStyle(bar).getPropertyValue('--pct').trim();
        bar.style.width = pct;
      }
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


/* ===========================
   3. NAVBAR: SHRINK + ACTIVE LINK
   =========================== */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Shrink navbar after 60px scroll
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Determine which section is in view
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120; // offset for fixed nav
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  // Highlight matching nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load


/* ===========================
   4. MOBILE HAMBURGER MENU
   =========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ===========================
   5. SCORE BARS (Education)
   Triggered by IntersectionObserver above
   when .edu-card becomes visible.
   Also handled here for direct page load.
   =========================== */
// If user lands directly on education section (page already scrolled),
// ensure bars animate correctly via the existing revealObserver.
// The observer already handles .score-bar via querySelector above.
