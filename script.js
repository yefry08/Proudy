
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElem(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
});

addEventOnElem(overlay, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
});

/**
 * Carousel functionality
 */
const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const dots = carousel.querySelectorAll(".dot");
  let currentIndex = 0;
  let numVisible = 1;

  const updateNumVisible = () => {
    if (slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;
    numVisible = Math.floor(carousel.offsetWidth / slideWidth);
    const maxIndex = slides.length - numVisible;
    if (currentIndex > maxIndex) {
      currentIndex = Math.max(0, maxIndex);
    }
    updateCarousel();
  };

  const updateCarousel = () => {
    if (slides.length === 0) return;
    const slideWidth = slides[0].offsetWidth;
    const translateX = -currentIndex * slideWidth;
    track.style.transform = `translateX(${translateX}px)`;

    // Update active dot (first visible slide)
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= slides.length - numVisible;
  };

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < slides.length - numVisible) {
      currentIndex++;
      updateCarousel();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Initialize
  updateNumVisible();
  window.addEventListener("resize", updateNumVisible);
});
