// Hero Slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
let heroIndex = 0;
setInterval(() => {
  heroSlides[heroIndex].classList.remove('active');
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add('active');
}, 4000);

// Menu Responsivo
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
navMenu.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('active'))
);

// Carrossel
const groups = document.querySelectorAll('.carousel-group');
const totalGroups = groups.length;
let groupIndex = 0;
let carouselInterval;

function showGroup(i) {
  document.querySelector('.carousel-groups').style.transform = `translateX(${-i * 100}%)`;
}
function nextGroup() { groupIndex = (groupIndex + 1) % totalGroups; showGroup(groupIndex); }
function prevGroup() { groupIndex = (groupIndex - 1 + totalGroups) % totalGroups; showGroup(groupIndex); }
function startCarousel() { carouselInterval = setInterval(nextGroup, 5000); }
function stopCarousel() { clearInterval(carouselInterval); }

document.getElementById('next').addEventListener('click', nextGroup);
document.getElementById('prev').addEventListener('click', prevGroup);

const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopCarousel);
carouselContainer.addEventListener('mouseleave', startCarousel);
document.addEventListener('visibilitychange', () => document.hidden ? stopCarousel() : startCarousel());
startCarousel();

// Lightbox
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const galleryImgs = [...document.querySelectorAll('.gallery-item img')];
let currentIdx = 0;

function openLightbox(index) {
  currentIdx = index;
  lightboxImage.src = galleryImgs[index].src;
  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';
}
function lightboxNext() { currentIdx = (currentIdx + 1) % galleryImgs.length; lightboxImage.src = galleryImgs[currentIdx].src; }
function lightboxPrev() { currentIdx = (currentIdx - 1 + galleryImgs.length) % galleryImgs.length; lightboxImage.src = galleryImgs[currentIdx].src; }

document.querySelector('.gallery-grid').addEventListener('click', e => {
  const img = e.target.closest('.gallery-item img');
  if (img) openLightbox(galleryImgs.indexOf(img));
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', lightboxPrev);
document.querySelector('.lightbox-next').addEventListener('click', lightboxNext);
lightboxModal.addEventListener('click', e => { if (e.target === lightboxModal) closeLightbox(); });

document.addEventListener('keydown', e => {
  if (!lightboxModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowLeft') lightboxPrev();
});

// Filtros da galeria
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
        item.classList.add('visible');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Animação de entrada da galeria via IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
