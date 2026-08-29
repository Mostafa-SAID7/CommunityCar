import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LordiconDirective } from '../../../directives/lordicon.directive';
import { ThemeService } from '../../../../core/services/theme.service';
import { LanguageService } from '../../../../core/services/language.service';
import { LoaderService } from '../../../../core/services/loader.service';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',

})
export class SplashScreenComponent implements OnInit, OnDestroy {
  isLoading = true;
  currentTheme = 'light';
  currentLanguage = 'en';
  appName = 'Community Car';

  private subscriptions: Subscription[] = [];
  private startTime: number = 0;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.subscriptions.push(
      this.themeService.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
      })
    );

    // Subscribe to language changes
    this.subscriptions.push(
      this.languageService.currentLanguage$.subscribe(lang => {
        this.currentLanguage = lang;
      })
    );

    // Subscribe to loading state
    this.subscriptions.push(
      this.loaderService.loading$.subscribe(loading => {
        this.isLoading = loading;
      })
    );

    // Set start time for progress calculation
    this.startTime = Date.now();

    // Simulate app initialization
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private async initializeApp(): Promise<void> {
    // Simulate loading time for perceived performance
    await this.delay(2000);

    // Mark as loaded
    this.isLoading = false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getTagline(): string {
    const taglines = {
      en: 'Connecting Car Enthusiasts Worldwide',
      ar: 'ربط عشاق السيارات حول العالم'
    };
    return taglines[this.currentLanguage as keyof typeof taglines] || taglines.en;
  }

  getLoadingText(): string {
    const loadingTexts = {
      en: 'Loading your community...',
      ar: 'جاري تحميل مجتمعك...'
    };
    return loadingTexts[this.currentLanguage as keyof typeof loadingTexts] || loadingTexts.en;
  }

  getProgress(): number {
    // Simulate progress based on time
    const elapsed = Date.now() - this.startTime;
    const progress = Math.min((elapsed / 2000) * 100, 100);
    return progress;
  }
}