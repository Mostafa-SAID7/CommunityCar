import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from '../shared/components/ui/splash-screen/splash-screen.component';
import { NotificationContainerComponent } from '../shared/components/notification-container/notification-container.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { PageSkeletonLoaderComponent } from '../shared/components/skeleton/page-skeleton-loader.component';
import { ThemeToggleComponent } from '../shared/components/ui/theme-toggle/theme-toggle.component';
import { LanguageSelectorComponent } from '../shared/components/ui/language-selector/language-selector.component';
import { ScrollTopComponent } from '../shared/components/ui/scroll-top/scroll-top.component';
import { ChatAssistComponent } from '../shared/components/chat-assist/chat-assist.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SplashScreenComponent, NotificationContainerComponent, FooterComponent, PageSkeletonLoaderComponent, ThemeToggleComponent, LanguageSelectorComponent, ScrollTopComponent, ChatAssistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  protected readonly title = signal('Community Car');
  isLoading = signal(true);
  isNavigating = signal(false);
  showSkeletonFirst = signal(true); // Skeleton-first rendering
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Skeleton-first rendering: Show skeletons immediately
    // Then transition to splash screen, then to content

    // Listen to router events for navigation loading
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isNavigating.set(false);
      }
    });

    // Optimistic layout rendering pipeline
    setTimeout(() => {
      this.showSkeletonFirst.set(false);
      // Simulate app initialization after skeleton
      setTimeout(() => {
        this.isLoading.set(false);
      }, 2000);
    }, 500);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}