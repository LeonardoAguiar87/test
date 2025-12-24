class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

// Contador de caracteres para o campo de mensagem
document.addEventListener('DOMContentLoaded', function() {
  const textarea = document.getElementById('mensagem');
  const caracteresAtual = document.querySelector('.caracteres-atual');
  const caracteresMaximo = document.querySelector('.caracteres-maximo');
  
  if (textarea && caracteresAtual) {
    // Atualiza o contador inicial
    caracteresAtual.textContent = textarea.value.length;
    caracteresMaximo.textContent = textarea.maxLength;
    
    // Atualiza o contador conforme o usuário digita
    textarea.addEventListener('input', function() {
      caracteresAtual.textContent = this.value.length;
      
      // Alerta visual quando atingir o limite
      if (this.value.length >= this.maxLength) {
        this.style.borderColor = '#F53535';
        caracteresAtual.style.color = '#F53535';
      } else {
        this.style.borderColor = '';
        caracteresAtual.style.color = '#253E5C';
      }
    });
  }
  
  // Validação simples do formulário
  const form = document.querySelector('.contato-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const nome = document.getElementById('nome');
      const email = document.getElementById('email');
      const mensagem = document.getElementById('mensagem');
      let isValid = true;
      
      // Remove estilos de erro anteriores
      [nome, email, mensagem].forEach(field => {
        field.style.borderColor = '';
      });
      
      // Validação de campos vazios
      if (!nome.value.trim()) {
        nome.style.borderColor = '#F53535';
        nome.focus();
        isValid = false;
      }
      
      if (!email.value.trim()) {
        email.style.borderColor = '#F53535';
        if (isValid) email.focus();
        isValid = false;
      }
      
      if (!mensagem.value.trim()) {
        mensagem.style.borderColor = '#F53535';
        if (isValid) mensagem.focus();
        isValid = false;
      }
      
      // Validação básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value && !emailRegex.test(email.value)) {
        email.style.borderColor = '#F53535';
        email.focus();
        isValid = false;
      }
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos corretamente.');
      }
    });
  }
});


// Animate On Scroll - Intersection Observer
const observerOptions = {
  threshold: 0.1, // 10% do elemento visível
  rootMargin: '0px 0px -50px 0px' // Margem inferior para ativar antes
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Observar todos os elementos com classe 'reveal'
document.addEventListener('DOMContentLoaded', function() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-fast, .reveal-left, .reveal-right');
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
  
  // Opcional: Adicionar delay progressivo para elementos em sequência
  const cards = document.querySelectorAll('.curso-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
});


// CARROSSEL SIMPLIFICADO - VERSÃO GARANTIDA FUNCIONAR
document.addEventListener('DOMContentLoaded', function() {
  initSimpleCarousel();
});

function initSimpleCarousel() {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;
  
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prevBtn = carousel.querySelector('.carousel-btn-prev');
  const nextBtn = carousel.querySelector('.carousel-btn-next');
  const indicators = Array.from(carousel.querySelectorAll('.carousel-indicator'));
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Função para mostrar slide específico
  function showSlide(index) {
    // Garante que o índice está dentro dos limites
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    // Atualiza índice atual
    currentIndex = index;
    
    // Esconde todos os slides
    slides.forEach(slide => {
      slide.style.display = 'none';
      slide.classList.remove('active');
    });
    
    // Mostra slide atual
    slides[currentIndex].style.display = 'flex';
    slides[currentIndex].classList.add('active');
    
    // Atualiza indicadores
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
    
    console.log('Mostrando slide:', currentIndex + 1, 'de', totalSlides);
  }
  
  // Função para próximo slide
  function nextSlide() {
    showSlide(currentIndex + 1);
  }
  
  // Função para slide anterior
  function prevSlide() {
    showSlide(currentIndex - 1);
  }
  
  // Configura layout responsivo
  function setupResponsiveLayout() {
    const isMobile = window.innerWidth <= 1000;
    
    if (isMobile) {
      // Modo carrossel (mobile)
      carousel.style.overflow = 'hidden';
      showSlide(currentIndex); // Mostra apenas um slide
      
      // Mostra controles
      if (prevBtn) prevBtn.style.display = 'flex';
      if (nextBtn) nextBtn.style.display = 'flex';
      
    } else {
      // Modo grid (desktop)
      carousel.style.overflow = 'visible';
      
      // Mostra todos os slides
      slides.forEach(slide => {
        slide.style.display = 'flex';
        slide.style.flex = '0 0 auto';
        slide.style.width = '325px';
      });
      
      // Ajusta o track
      if (track) {
        track.style.display = 'flex';
        track.style.justifyContent = 'center';
        track.style.gap = '40px';
        track.style.flexWrap = 'wrap';
      }
      
      // Esconde controles
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });
  
  // Detecta redimensionamento da janela
  window.addEventListener('resize', setupResponsiveLayout);
  
  // Inicializa
  setupResponsiveLayout();
  showSlide(0); // Mostra primeiro slide
  
  console.log('Carrossel simples inicializado com sucesso!');
}