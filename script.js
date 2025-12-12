document.addEventListener('DOMContentLoaded', () => {

  /* --- Footer year --- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* --- Lightbox Elements --- */
  const images = Array.from(document.querySelectorAll('.gallery-grid img'));
  const lightbox = document.getElementById('lightbox');

  const lbImage = document.getElementById('lightboxImage');
  const lbTitle = document.getElementById('lbTitle');
  const lbYear = document.getElementById('lbYear');
  const lbMedium = document.getElementById('lbMedium');
  const lbSize = document.getElementById('lbSize');
  const lbProvenance = document.getElementById('lbProvenance');
  const lbNotes = document.getElementById('lbNotes');

  const closeBtn = document.getElementById('lightboxClose');
  const nextBtn = document.getElementById('lightboxNext');
  const prevBtn = document.getElementById('lightboxPrev');

  let currentIndex = 0;

  /* --- OPEN LIGHTBOX --- */
  function openLightbox(index) {
    currentIndex = index;
    const img = images[index];

    lbImage.src = img.src;
    lbTitle.textContent = img.dataset.title;
    lbYear.textContent = img.dataset.year;
    lbMedium.textContent = img.dataset.medium;
    lbSize.textContent = img.dataset.size;
    lbProvenance.textContent = img.dataset.provenance;
    lbNotes.textContent = img.dataset.notes;

    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  /* --- CLOSE LIGHTBOX --- */
  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  /* --- NEXT / PREVIOUS --- */
  function nextImage() {
    openLightbox((currentIndex + 1) % images.length);
  }

  function prevImage() {
    openLightbox((currentIndex - 1 + images.length) % images.length);
  }

  /* --- EVENT LISTENERS --- */
  images.forEach((img, idx) => {
    img.addEventListener("click", () => openLightbox(idx));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* --- Keyboard Support --- */
  document.addEventListener("keydown", e => {
    if (lightbox.getAttribute("aria-hidden") === "true") return;

    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  });

  // Story modal
const storyModal = document.getElementById("storyModal");
const storyOpenButtons = document.querySelectorAll("[data-story-open]");
const storyClose = document.querySelector(".story-close");

storyOpenButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    storyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // lock scroll
  });
});

storyClose.addEventListener("click", () => {
  storyModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // restore scroll
});

// Close on background click
storyModal.addEventListener("click", e => {
  if (e.target === storyModal) {
    storyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
});


