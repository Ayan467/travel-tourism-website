// navbar scroll effect
const nav = document.querySelector('.site-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// fade-up scroll observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// testimonial slider
const track = document.querySelector('.testi-track');
const dots = document.querySelectorAll('.testi-dot');
let current = 0;

function goToSlide(idx) {
  if (!track) return;
  current = idx;
  track.style.transform = `translateX(-${100 * current}%)`;
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

// auto advance
if (track) {
  setInterval(() => {
    const total = document.querySelectorAll('.testi-slide').length;
    goToSlide((current + 1) % total);
  }, 5000);
}

// counter animation (hero stats)
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count.toLocaleString() + (el.dataset.suffix || '');
  }, 25);
}

const counters = document.querySelectorAll('.counter');
if (counters.length) {
  // small delay for hero
  setTimeout(() => {
    counters.forEach(c => animateCount(c));
  }, 600);
}

// booking form validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'fullName', msg: 'nameError', check: v => v.trim().length >= 2 },
      { id: 'email', msg: 'emailError', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'phone', msg: 'phoneError', check: v => /^[0-9+\-\s()]{7,15}$/.test(v.trim()) },
      { id: 'destination', msg: 'destError', check: v => v !== '' },
      { id: 'travelDate', msg: 'dateError', check: v => v !== '' },
      { id: 'travelers', msg: 'travelersError', check: v => parseInt(v) > 0 },
      { id: 'budget', msg: 'budgetError', check: v => v !== '' },
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errEl = document.getElementById(f.msg);
      if (!input) return;
      const ok = f.check(input.value);
      input.classList.toggle('error-field', !ok);
      if (errEl) errEl.classList.toggle('show', !ok);
      if (!ok) valid = false;
    });

    if (valid) {
      bookingForm.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
      window.scrollTo({ top: document.getElementById('formSuccess').offsetTop - 100, behavior: 'smooth' });
    }
  });

  // clear errors on input
  bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error-field');
      const errId = input.id + 'Error';
      const err = document.getElementById(errId);
      if (err) err.classList.remove('show');
    });
  });
}

// set min date on travel date input
const dateInput = document.getElementById('travelDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
