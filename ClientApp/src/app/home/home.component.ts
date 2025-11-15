import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated$ = this.authService?.currentUser$;
  currentTheme$ = this.themeService?.currentTheme$;
  currentLanguage$ = this.languageService?.currentLanguage$;

  features = [
    {
      iconName: 'community',
      title: 'Community Forum',
      description: 'Connect with fellow car enthusiasts, ask questions, and share knowledge'
    },
    {
      iconName: 'mechanic',
      title: 'Service Marketplace',
      description: 'Find trusted mechanics, garages, and automotive experts near you'
    },
    {
      iconName: 'guide',
      title: 'Knowledge Base',
      description: 'Access guides, tutorials, and expert advice for all your car needs'
    },
    {
      iconName: 'ai',
      title: 'AI Assistant',
      description: 'Get instant help with car diagnostics and maintenance recommendations'
    }
  ];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.isAuthenticated$ = this.authService.currentUser$;
    this.currentTheme$ = this.themeService.currentTheme$;
    this.currentLanguage$ = this.languageService.currentLanguage$;
  }

  ngOnInit(): void {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  trackByFeature(index: number, feature: any): string {
    return feature.iconName;
  }
}