const header = document.getElementById('siteHeader');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const privacyOpen = document.getElementById('privacyOpen');
const privacyClose = document.getElementById('privacyClose');
const privacyModal = document.getElementById('privacyModal');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
let lastScroll = 0;

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  menuButton.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuButton.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  header.classList.toggle('is-scrolled', currentScroll > 80);
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.classList.add('header-hidden');
    closeMobileMenu();
  } else {
    header.classList.remove('header-hidden');
  }
  lastScroll = Math.max(currentScroll, 0);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

function openPrivacy() {
  privacyModal.classList.remove('hidden');
  privacyModal.classList.add('flex');
  document.body.classList.add('modal-open');
}

function closePrivacy() {
  privacyModal.classList.add('hidden');
  privacyModal.classList.remove('flex');
  document.body.classList.remove('modal-open');
}

privacyOpen.addEventListener('click', openPrivacy);
privacyClose.addEventListener('click', closePrivacy);
privacyModal.addEventListener('click', (event) => {
  if (event.target === privacyModal) closePrivacy();
});

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.image;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('modal-open');
  });
});

function closeLightbox() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.classList.remove('modal-open');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePrivacy();
    closeLightbox();
    closeMobileMenu();
  }
});
