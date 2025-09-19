class HeroController {
  constructor() {
    this.heroSection = null;
    this.scrollIndicator = null;
    this.techItems = [];
    
    this.initializeElements();
    this.setupEventListeners();
    this.initializeAnimations();
  }

  initializeElements() {
    this.heroSection = document.querySelector('.hero-section');
    this.scrollIndicator = document.querySelector('.hero-scroll-indicator');
    this.techItems = document.querySelectorAll('.tech-item');
  }

  setupEventListeners() {
    this.setupScrollIndicator();
    this.setupTechStackInteractions();
    this.setupScrollAnimations();
  }

  setupScrollIndicator() {
    this.scrollIndicator?.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  setupTechStackInteractions() {
    this.techItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'techPulse 0.6s ease-out';
      });

      item.addEventListener('animationend', () => {
        item.style.animation = '';
      });
    });
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.hero-content > *');
    animatedElements.forEach(el => observer.observe(el));
  }

  initializeAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes techPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hero-content > *.animate-in {
        opacity: 1;
        transform: translateY(0);
      }

      .hero-content > *:nth-child(1).animate-in { transition-delay: 0.1s; }
      .hero-content > *:nth-child(2).animate-in { transition-delay: 0.2s; }
      .hero-content > *:nth-child(3).animate-in { transition-delay: 0.3s; }
      .hero-content > *:nth-child(4).animate-in { transition-delay: 0.4s; }
      .hero-content > *:nth-child(5).animate-in { transition-delay: 0.5s; }
      .hero-content > *:nth-child(6).animate-in { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroController();
});