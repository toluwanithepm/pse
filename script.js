var carouselInner = document.querySelector('.carousel-inner');
var carouselItems = document.querySelectorAll('.carousel-item');
var currentIndex = 0;
var isTransitioning = false;

function goToSlide(index) {
  if (isTransitioning) return;

  carouselInner.style.transform = 'translateX(' + (-index * 100) + '%)';
  currentIndex = index;
  isTransitioning = true;

  setTimeout(function() {
    isTransitioning = false;
  }, 500);

  updateActiveState();
}

function goToNextSlide() {
  var nextIndex = (currentIndex + 1) % carouselItems.length;
  goToSlide(nextIndex);
}

function goToPrevSlide() {
  var prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  goToSlide(prevIndex);
}

function updateActiveState() {
  carouselItems.forEach(function(item, index) {
    if (index === currentIndex) {
      item.classList.add('active');
      item.classList.remove('inactive');
    } else {
      item.classList.add('inactive');
      item.classList.remove('active');
    }
  });
}

document.querySelector('.carousel-prev').addEventListener('click', function(event) {
  event.preventDefault();
  goToPrevSlide();
});

document.querySelector('.carousel-next').addEventListener('click', function(event) {
  event.preventDefault();
  goToNextSlide();
});

var touchStartX = 0;
var touchEndX = 0;
var swipeThreshold = 50;

document.addEventListener('touchstart', function(event) {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener('touchend', function(event) {
  touchEndX = event.changedTouches[0].clientX;
  
  if (touchStartX - touchEndX > swipeThreshold) {
    goToNextSlide();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    goToPrevSlide();
  }
});
