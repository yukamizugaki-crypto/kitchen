// ===========================
// Header scroll effect
// ===========================
const header = document.getElementById('header');

function checkHeaderScroll() {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', checkHeaderScroll, { passive: true });
document.addEventListener('DOMContentLoaded', checkHeaderScroll);

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
// Main Plate Slider (Manual Carousel)
// ===========================
const plateSlides = document.querySelectorAll('.plate-slide');
const platePrevBtn = document.getElementById('platePrevBtn');
const plateNextBtn = document.getElementById('plateNextBtn');
const plateCounter = document.getElementById('plateCounter');
let currentPlateSlide = 0;
const totalPlateSlides = plateSlides.length;

function updatePlateSlider() {
  plateSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentPlateSlide);
  });
  if (plateCounter) {
    plateCounter.textContent = `${currentPlateSlide + 1} / ${totalPlateSlides}`;
  }
}

if (platePrevBtn && plateNextBtn && totalPlateSlides > 0) {
  platePrevBtn.addEventListener('click', () => {
    currentPlateSlide = (currentPlateSlide - 1 + totalPlateSlides) % totalPlateSlides;
    updatePlateSlider();
  });

  plateNextBtn.addEventListener('click', () => {
    currentPlateSlide = (currentPlateSlide + 1) % totalPlateSlides;
    updatePlateSlider();
  });
}

// ===========================
// Kitchen Car Menu Slider (Manual Carousel 1 - 3)
// ===========================
const kcSlides = document.querySelectorAll('.kc-menu-slide');
const kcPrevBtn = document.getElementById('kcPrevBtn');
const kcNextBtn = document.getElementById('kcNextBtn');
const kcCounter = document.getElementById('kcCounter');
let currentKcSlide = 0;
const totalKcSlides = kcSlides.length;

function updateKcSlider() {
  kcSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentKcSlide);
  });
  if (kcCounter) {
    const currentSpan = kcCounter.querySelector('.kc-current');
    const totalSpan = kcCounter.querySelector('.kc-total');
    if (currentSpan && totalSpan) {
      currentSpan.textContent = currentKcSlide + 1;
      totalSpan.textContent = totalKcSlides;
    } else {
      kcCounter.textContent = `${currentKcSlide + 1} / ${totalKcSlides}`;
    }
  }
}

if (kcPrevBtn && kcNextBtn && totalKcSlides > 0) {
  kcPrevBtn.addEventListener('click', () => {
    currentKcSlide = (currentKcSlide - 1 + totalKcSlides) % totalKcSlides;
    updateKcSlider();
  });

  kcNextBtn.addEventListener('click', () => {
    currentKcSlide = (currentKcSlide + 1) % totalKcSlides;
    updateKcSlider();
  });
}


