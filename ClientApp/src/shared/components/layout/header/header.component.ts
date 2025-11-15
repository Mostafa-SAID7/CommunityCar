import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated$ = this.authService?.currentUser$;
  currentTheme$ = this.themeService?.currentTheme$;
  currentLanguage$ = this.languageService?.currentLanguage$;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.isAuthenticated$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.currentTheme$;
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  logout(): void {
    this.authService.logout();
  }
}