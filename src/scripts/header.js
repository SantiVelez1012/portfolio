// Header Controller Class
class HeaderController {
  constructor() {
    this.mobileMenuButton = null;
    this.mobileMenu = null;
    this.hamburgerIcon = null;
    this.closeIcon = null;
    this.themeSwitcher = null;
    this.lightIcon = null;
    this.darkIcon = null;

    this.initializeElements();
    this.setupEventListeners();
    this.initializeTheme();
  }

  initializeElements() {
    this.mobileMenuButton = document.querySelector('.mobile-menu-button');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.hamburgerIcon = this.mobileMenuButton?.querySelector('svg:first-child') || null;
    this.closeIcon = this.mobileMenuButton?.querySelector('svg:last-child') || null;
    this.themeSwitcher = document.querySelector('.theme-switcher');
    this.lightIcon = document.querySelector('.theme-icon-light');
    this.darkIcon = document.querySelector('.theme-icon-dark');
  }

  setupEventListeners() {
    this.setupMobileMenuToggle();
    this.setupMobileMenuLinks();
    this.setupSmoothScrolling();
    this.setupThemeSwitcher();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    this.setTheme(theme);
  }

  setupThemeSwitcher() {
    this.themeSwitcher?.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon(theme);
  }

  updateThemeIcon(theme) {
    if (theme === 'dark') {
      this.lightIcon?.classList.add('hidden');
      this.darkIcon?.classList.remove('hidden');
    } else {
      this.lightIcon?.classList.remove('hidden');
      this.darkIcon?.classList.add('hidden');
    }
  }

  setupMobileMenuToggle() {
    this.mobileMenuButton?.addEventListener('click', () => {
      const isExpanded = this.mobileMenuButton?.getAttribute('aria-expanded') === 'true';
      
      this.mobileMenuButton?.setAttribute('aria-expanded', (!isExpanded).toString());
      this.mobileMenu?.classList.toggle('hidden');
      this.hamburgerIcon?.classList.toggle('hidden');
      this.closeIcon?.classList.toggle('hidden');
    });
  }

  setupMobileMenuLinks() {
    const mobileMenuLinks = this.mobileMenu?.querySelectorAll('a');
    mobileMenuLinks?.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }

  closeMobileMenu() {
    this.mobileMenu?.classList.add('hidden');
    this.mobileMenuButton?.setAttribute('aria-expanded', 'false');
    this.hamburgerIcon?.classList.remove('hidden');
    this.closeIcon?.classList.add('hidden');
  }

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const targetId = target?.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeaderController();
});