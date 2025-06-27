document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    const slideWidth = slides[0].getBoundingClientRect().width;

    slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        updateCarousel(index);
      });
      indicatorsContainer.appendChild(indicator);
    });

    const indicators = Array.from(indicatorsContainer.children);
    let currentIndex = 0;

    const updateCarousel = (targetIndex) => {
      if (targetIndex < 0) targetIndex = slides.length - 1;
      if (targetIndex >= slides.length) targetIndex = 0;

      track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';

      slides[currentIndex].classList.remove('active');
      slides[targetIndex].classList.add('active');

      indicators[currentIndex].classList.remove('active');
      indicators[targetIndex].classList.add('active');

      currentIndex = targetIndex;
    };

    nextButton.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
    });

    prevButton.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
    });

    updateCarousel(0);
  }

  // --- LÓGICA DO EFEITO DE DIGITAÇÃO ---
  const typingEffect = document.querySelector('.typing-effect');

  if (typingEffect) {
    const texts = ['vendas', 'prospecções', 'relacionamentos', 'recorrências'];
    let count = 0;
    let index = 0;
    let isDeleting = false;

    function type() {
      const currentText = texts[count];

      if (isDeleting) {
        typingEffect.textContent = currentText.substring(0, index--);
      } else {
        typingEffect.textContent = currentText.substring(0, index++);
      }

      if (!isDeleting && index > currentText.length) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else if (isDeleting && index < 0) {
        isDeleting = false;
        count = (count + 1) % texts.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 150);
      }
    }

    type();
  }
});
