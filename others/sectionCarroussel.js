const sectionsTrack = document.getElementById("sections-track");
const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");

const totalSections = sectionsTrack.children.length;

let currentIndex = 0;

function updateCarousel() {
  sectionsTrack.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

function updateCarouselTo(sectionIndex) {
  currentIndex = sectionIndex;
  updateCarousel();
}

backButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

forwardButton.addEventListener("click", () => {
  if (currentIndex < totalSections - 1) {
    currentIndex++;
    updateCarousel();
  }
});
