// ===========================
// Header scroll effect
// ===========================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ===========================
// Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu(open) {
  hamburger.classList.toggle('is-open', open);
  mobileMenu.classList.toggle('is-open', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('is-open');
  toggleMenu(!isOpen);
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu(false);
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) {
    toggleMenu(false);
  }
});

// ===========================
// Scroll Fade-in Animation
// ===========================
const fadeElements = document.querySelectorAll(
  '.about-grid, .menu-slider-container, .hours-wrap, .kitchen-car-content, .access-grid, .contact-card, .section-header, .feature-item, .info-card, .access-item'
);

fadeElements.forEach(el => {
  el.classList.add('fade-in-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for multiple elements
      const siblings = Array.from(entry.target.parentElement.children);
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ===========================
// Active nav link on scroll
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.backgroundColor = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--sky-main)';
          link.style.backgroundColor = 'var(--sky-lightest)';
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ===========================
// Menu Image Slider (Manual Carousel)
// ===========================
const slides = document.querySelectorAll('.menu-slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const counter = document.getElementById('slider-counter');
let currentSlide = 0;
const totalSlides = slides.length;

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  if (counter) {
    counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  }
}

if (prevBtn && nextBtn && slides.length > 0) {
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });
}

// ===========================
// Hero Image Slider (Auto Carousel)
// ===========================
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;
const totalHeroSlides = heroSlides.length;

function nextHeroSlide() {
  if (totalHeroSlides > 0) {
    heroSlides[currentHeroSlide].classList.remove('active');
    currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
    heroSlides[currentHeroSlide].classList.add('active');
  }
}

if (totalHeroSlides > 1) {
  setInterval(nextHeroSlide, 5000);
}
