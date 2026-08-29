import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Observable, Subject, map } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { User } from '../../../../core/models/user.model';

// Interfaces
export interface NavigationItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
  requiresAuth?: boolean;
  isActive?: boolean;
}

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Services
  private readonly authService = inject(AuthService);
  private readonly themeService = inject(ThemeService);
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  // View Children
  @ViewChild('mobileMenu') mobileMenu!: ElementRef<HTMLDivElement>;
  @ViewChild('userDropdown') userDropdown!: ElementRef<HTMLDivElement>;

  // Observable streams for reactive state management
  readonly isAuthenticated$: Observable<User | null>;
  readonly currentTheme$: Observable<string>;
  readonly currentLanguage$: Observable<string>;

  // Signals for local state
  readonly isDropdownOpen = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeRoute = signal('');

  // Computed values
  readonly dropdownState = computed(() => ({
    isOpen: this.isDropdownOpen(),
    ariaExpanded: this.isDropdownOpen().toString()
  }));

  readonly mobileMenuState = computed(() => ({
    isOpen: this.isMobileMenuOpen(),
    ariaExpanded: this.isMobileMenuOpen().toString()
  }));

  // Navigation items
  readonly navigationItems: NavigationItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: '📊', requiresAuth: true },
    { label: 'Projects', route: '/projects', icon: '🚀', requiresAuth: true },
    { label: 'Analytics', route: '/analytics', icon: '📈', requiresAuth: true },
    { label: 'Community', route: '/community', icon: '👥', badge: 3 },
    { label: 'Rewards', route: '/gamification', icon: '🏆', badge: 5 },
    { label: 'Marketplace', route: '/marketplace', icon: '🛒' },
    { label: 'Knowledge Base', route: '/knowledge', icon: '📚' }
  ];

  // Language options
  readonly languageOptions: LanguageOption[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪', dir: 'rtl' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' }
  ];

  // Constants
  private readonly SCROLL_THRESHOLD = 50;
  private readonly DROPDOWN_MENU_SELECTOR = '.dropdown-menu';
  private readonly DROPDOWN_BUTTON_SELECTOR = '.dropdown-button';

  private readonly destroy$ = new Subject<void>();

  constructor() {
    // Initialize observables
    this.isAuthenticated$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.currentTheme$;
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  ngOnInit(): void {
    this.initializeRouterListener();
    this.initializeScrollListener();
    this.initializeClickOutsideListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Toggles the application theme between light and dark modes
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.cdr.markForCheck();
  }

  /**
   * Sets the application language based on user selection
   */
  setLanguage(langCode: string): void {
    const language = this.languageOptions.find(lang => lang.code === langCode);
    if (language) {
      this.languageService.setLanguage(langCode);
      document.documentElement.dir = language.dir;
      this.cdr.markForCheck();
    }
  }

  /**
   * Toggles the user dropdown menu visibility
   */
  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  /**
   * Toggles the mobile navigation menu visibility
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
    
    // Prevent body scroll when mobile menu is open
    if (this.isMobileMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Closes both dropdown and mobile menu
   */
  closeAllMenus(): void {
    this.isDropdownOpen.set(false);
    this.isMobileMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  /**
   * Logs out the current user and navigates to login page
   */
  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      this.closeAllMenus();
      await this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  /**
   * Navigates to a route and closes mobile menu
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeAllMenus();
  }

  /**
   * Checks if user can access a navigation item
   */
  canShowNavigation(item: NavigationItem): boolean {
    if (!item.requiresAuth) return true;
    return this.authService.isAuthenticated();
  }

  /**
   * Gets user initials for avatar
   */
  getUserInitials(user: User): string {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  }

  /**
   * Gets user display name
   */
  getUserDisplayName(user: User): string {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email.split('@')[0];
  }

  // Event listeners
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled.set(scrollY > this.SCROLL_THRESHOLD);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.handleDocumentClick(event);
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    this.closeAllMenus();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // Close menus on escape key
    if (event.key === 'Escape') {
      this.closeAllMenus();
    }
  }

  private initializeRouterListener(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.activeRoute.set(event.urlAfterRedirects);
          this.closeAllMenus();
          this.cdr.markForCheck();
        }
      });
  }

  private initializeScrollListener(): void {
    if (typeof window !== 'undefined') {
      this.onWindowScroll(); // Initial check
    }
  }

  private initializeClickOutsideListener(): void {
    // Additional safety for click outside handling
    document.addEventListener('click', (event) => {
      this.handleDocumentClick(event);
    });
  }

  private handleDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Close dropdown if click is outside
    if (this.isDropdownOpen() && 
        !target.closest(this.DROPDOWN_MENU_SELECTOR) && 
        !target.closest(this.DROPDOWN_BUTTON_SELECTOR)) {
      this.isDropdownOpen.set(false);
    }

    // Close mobile menu if click is outside
    if (this.isMobileMenuOpen() && 
        this.mobileMenu?.nativeElement && 
        !this.mobileMenu.nativeElement.contains(target) &&
        !target.closest('.mobile-toggle')) {
      this.closeAllMenus();
    }
  }

  // TrackBy functions for performance
  trackByNavigationItem(index: number, item: NavigationItem): string {
    return item.route;
  }

  trackByLanguage(index: number, language: LanguageOption): string {
    return language.code;
  }
}