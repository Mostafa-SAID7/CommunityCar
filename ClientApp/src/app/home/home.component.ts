import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';
import { LanguageService } from '../../core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuthenticated$!: any;
  currentTheme$!: any;
  currentLanguage$!: any;

  private subscriptions: Subscription = new Subscription();

  features = [
    {
      iconName: 'community',
      title: 'Community Forum',
      description: 'Connect with fellow car enthusiasts, ask questions, and share knowledge',
      route: '/community'
    },
    {
      iconName: 'mechanic',
      title: 'Service Marketplace',
      description: 'Find trusted mechanics, garages, and automotive experts near you',
      route: '/services'
    },
    {
      iconName: 'guide',
      title: 'Knowledge Base',
      description: 'Access guides, tutorials, and expert advice for all your car needs',
      route: '/content'
    },
    {
      iconName: 'ai',
      title: 'AI Assistant',
      description: 'Get instant help with car diagnostics and maintenance recommendations',
      route: '/ai-assistant'
    }
  ];

  stats = [
    { label: 'Active Users', value: '10,000+', icon: 'user' },
    { label: 'Expert Mechanics', value: '500+', icon: 'mechanic' },
    { label: 'Car Brands', value: '50+', icon: 'car' },
    { label: 'Cities Covered', value: '100+', icon: 'community' }
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

  ngOnInit(): void {
    // Component initialization logic can be added here
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
  }

  trackByFeature(index: number, feature: any): string {
    return feature.iconName;
  }

  trackByStat(index: number, stat: any): string {
    return stat.icon;
  }
}