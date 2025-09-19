export class HeaderController {
  private mobileMenuButton: HTMLElement | null = null;
  private mobileMenu: HTMLElement | null = null;
  private hamburgerIcon: SVGElement | null = null;
  private closeIcon: SVGElement | null = null;
  private themeSwitcher: HTMLElement | null = null;
  private lightIcon: SVGElement | null = null;
  private darkIcon: SVGElement | null = null;

  constructor() {
    this.initializeElements();
    this.setupEventListeners();
    this.initializeTheme();
  }

  private initializeElements(): void {
    this.mobileMenuButton = document.querySelector('.mobile-menu-button');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.hamburgerIcon = this.mobileMenuButton?.querySelector('svg:first-child') || null;
    this.closeIcon = this.mobileMenuButton?.querySelector('svg:last-child') || null;
    this.themeSwitcher = document.querySelector('.theme-switcher');
    this.lightIcon = document.querySelector('.theme-icon-light');
    this.darkIcon = document.querySelector('.theme-icon-dark');
  }

  private setupEventListeners(): void {
    this.setupMobileMenuToggle();
    this.setupMobileMenuLinks();
    this.setupSmoothScrolling();
    this.setupThemeSwitcher();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    this.setTheme(theme);
  }

  private setupThemeSwitcher(): void {
    this.themeSwitcher?.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  private toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private setTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon(theme);
  }

  private updateThemeIcon(theme: string): void {
    if (theme === 'dark') {
      this.lightIcon?.classList.add('hidden');
      this.darkIcon?.classList.remove('hidden');
    } else {
      this.lightIcon?.classList.remove('hidden');
      this.darkIcon?.classList.add('hidden');
    }
  }

  private setupMobileMenuToggle(): void {
    this.mobileMenuButton?.addEventListener('click', () => {
      const isExpanded = this.mobileMenuButton?.getAttribute('aria-expanded') === 'true';
      
      this.mobileMenuButton?.setAttribute('aria-expanded', (!isExpanded).toString());
      this.mobileMenu?.classList.toggle('hidden');
      this.hamburgerIcon?.classList.toggle('hidden');
      this.closeIcon?.classList.toggle('hidden');
    });
  }

  private setupMobileMenuLinks(): void {
    const mobileMenuLinks = this.mobileMenu?.querySelectorAll('a');
    mobileMenuLinks?.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }

  private closeMobileMenu(): void {
    this.mobileMenu?.classList.add('hidden');
    this.mobileMenuButton?.setAttribute('aria-expanded', 'false');
    this.hamburgerIcon?.classList.remove('hidden');
    this.closeIcon?.classList.add('hidden');
  }

  private setupSmoothScrolling(): void {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
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