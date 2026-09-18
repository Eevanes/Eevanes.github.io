const revealItems = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];

const setActiveNav = () => {
  const marker = window.scrollY + window.innerHeight * 0.32;
  const active = sections.reduce((current, section) => (
    section.offsetTop <= marker ? section.id : current
  ), 'top');

  navLinks.forEach((link) => {
    const target = link.getAttribute('href').slice(1);
    const matches = active === target || (active === 'top' && target === 'work');
    link.classList.toggle('is-active', matches);
  });
};

window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

const toast = document.querySelector('.contact-toast');
let toastTimer;

document.querySelectorAll('[data-placeholder-contact], [data-project-note]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    toast.textContent = link.dataset.message || 'Contact link will be added when you provide it.';
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  });
});
