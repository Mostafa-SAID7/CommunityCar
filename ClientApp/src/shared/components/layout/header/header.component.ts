import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated$!: Observable<User | null>;
  currentTheme$!: Observable<string>;
  currentLanguage$!: Observable<string>;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.currentTheme$;
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  ngOnInit(): void {
    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.closeDropdown.bind(this));
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.languageService.setLanguage(lang);
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/auth/login']);
  }

  private closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.dropdown-menu');
    const dropdownButton = target.closest('.dropdown-button');

    if (!dropdown && !dropdownButton) {
      this.isDropdownOpen = false;
    }
  }
}