document.addEventListener('DOMContentLoaded', () => {

  /* --- Footer year --- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* --- Lightbox Elements --- */
  const images = Array.from(document.querySelectorAll('.gallery-grid img'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');

  let currentIndex = 0;

  /* --- OPEN LIGHTBOX --- */
  function openLightbox(index) {
    currentIndex = index;
    const img = images[index];

    lbImage.src = img.src;
    lbCaption.textContent = img.dataset.caption || "";

    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  /* --- CLOSE LIGHTBOX --- */
  function closeLightbox() {
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  /* --- EVENT LISTENERS --- */
  images.forEach((img, idx) => {
    img.addEventListener("click", () => openLightbox(idx));
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  /* --- Keyboard Support --- */
  document.addEventListener("keydown", e => {
    if (lightbox.getAttribute("aria-hidden") === "true") return;

    if (e.key === "Escape") closeLightbox();
  });

  /* --- Story Modal --- */
  const storyModal = document.getElementById("storyModal");
  const storyOpenButtons = document.querySelectorAll("[data-story-open]");
  const storyClose = document.querySelector(".story-close");

  if (storyModal && storyOpenButtons.length) {
    storyOpenButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        storyModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    storyClose.addEventListener("click", () => {
      storyModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });

    storyModal.addEventListener("click", e => {
      if (e.target === storyModal) {
        storyModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    });
  }
});
