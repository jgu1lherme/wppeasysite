document.addEventListener('DOMContentLoaded', () => {

  // --- LÓGICA DO MENU HAMBÚRGUER ---
  const menuButton = document.querySelector('.nav-menu-button');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-menu');
      const icon = menuButton.querySelector('i');
      if (navLinks.classList.contains('mobile-menu')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Fecha o menu ao clicar em um item
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-menu')) {
          navLinks.classList.remove('mobile-menu');
          const icon = menuButton.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (slides.length > 0 && nextButton && prevButton && indicatorsContainer) {
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
          const currentSlideWidth = slides[0].getBoundingClientRect().width;
          if (targetIndex < 0) targetIndex = slides.length - 1;
          if (targetIndex >= slides.length) targetIndex = 0;

          track.style.transform = 'translateX(-' + currentSlideWidth * targetIndex + 'px)';

          slides.forEach(slide => slide.classList.remove('active'));
          slides[targetIndex].classList.add('active');
          
          if(indicators.length > 0) {
            indicators.forEach(indicator => indicator.classList.remove('active'));
            indicators[targetIndex].classList.add('active');
          }

          currentIndex = targetIndex;
        };

        nextButton.addEventListener('click', () => {
          updateCarousel(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
          updateCarousel(currentIndex - 1);
        });
        
        window.addEventListener('resize', () => {
            updateCarousel(currentIndex);
        });

        updateCarousel(0);
    }
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

  // --- LÓGICA DO BOTÃO WHATSAPP NO MOBILE ---
  const whatsappContainer = document.querySelector('.whatsapp-container');

  if (whatsappContainer) {
    whatsappContainer.addEventListener('click', function(event) {
      // Previne que o clique no card principal siga um link (caso houvesse um)
      // Permite que os links reais dentro das opções funcionem
      if (event.target.closest('.whatsapp-container') && !event.target.closest('.whatsapp-options a')) {
        event.preventDefault();
      }
      
      // Alterna a classe 'is-active' apenas no container do WhatsApp
      this.classList.toggle('is-active');
      
      // Impede que o clique se propague para o 'document' e feche o menu imediatamente
      event.stopPropagation();
    });

    // Fecha o menu do WhatsApp se clicar em qualquer outro lugar da página
    document.addEventListener('click', function(event) {
      if (whatsappContainer.classList.contains('is-active') && !whatsappContainer.contains(event.target)) {
        whatsappContainer.classList.remove('is-active');
      }
    });
  }
});
