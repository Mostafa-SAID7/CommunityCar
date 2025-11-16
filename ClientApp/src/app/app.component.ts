import { Component, signal, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from '../shared/components/ui/splash-screen/splash-screen.component';
import { NotificationContainerComponent } from '../shared/components/notification-container/notification-container.component';
import { HeaderComponent } from '../shared/components/layout/header/header.component';
import { FooterComponent } from '../shared/components/layout/footer/footer.component';
import { PageSkeletonLoaderComponent } from '../shared/components/skeleton/page-skeleton-loader.component';
import { ScrollTopComponent } from '../shared/components/ui/scroll-top/scroll-top.component';
import { ChatAssistComponent } from '../shared/components/chat-assist/chat-assist.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SplashScreenComponent, NotificationContainerComponent, HeaderComponent, FooterComponent, PageSkeletonLoaderComponent, ScrollTopComponent, ChatAssistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly title = signal('Community Car');
  isLoading = signal(true);
  isNavigating = signal(false);
  showSkeletonFirst = signal(true); // Skeleton-first rendering
  navigationError = signal<string | null>(null);
  private router = inject(Router);
  private routerSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    // Skeleton-first rendering: Show skeletons immediately
    // Then transition to splash screen, then to content

    // Listen to router events for navigation loading and errors
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isNavigating.set(true);
        this.navigationError.set(null); // Clear any previous errors
      } else if (event instanceof NavigationEnd) {
        this.isNavigating.set(false);
      } else if (event instanceof NavigationCancel) {
        this.isNavigating.set(false);
      } else if (event instanceof NavigationError) {
        this.isNavigating.set(false);
        this.navigationError.set('Navigation failed. Please try again.');
        console.error('Navigation error:', event.error);
      }
    });

    // Optimistic layout rendering pipeline with proper timing
    this.initializeApp();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  private initializeApp(): void {
    // Show skeleton for minimum time to prevent flash
    setTimeout(() => {
      this.showSkeletonFirst.set(false);
      // Simulate app initialization (replace with real init logic)
      setTimeout(() => {
        this.isLoading.set(false);
      }, 1500); // Reduced from 2000 for better UX
    }, 300); // Reduced from 500
  }
}