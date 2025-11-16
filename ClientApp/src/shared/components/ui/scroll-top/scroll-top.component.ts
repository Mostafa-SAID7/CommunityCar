import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, throttleTime, animationFrameScheduler } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface ScrollConfig {
  threshold: number;
  offset: { right: string; bottom: string };
  showAtBottom: boolean;
  smoothScroll: boolean;
  scrollDuration: number;
  enableKeyboard: boolean;
}

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="scroll-top-btn"
      [class.visible]="isVisible()"
      [class.at-bottom]="atBottom()"
      [class.scrolling]="isScrolling()"
      [style.right]="config().offset.right"
      [style.bottom]="config().offset.bottom"
      (click)="scrollToTop()"
      [attr.aria-label]="'Scroll to top'"
      [attr.aria-hidden]="!isVisible()"
      [attr.tabindex]="isVisible() ? 0 : -1"
      #scrollButton>
      
      <!-- Progress Circle -->
      <div class="progress-ring" *ngIf="showProgress()">
        <svg class="progress-svg" width="48" height="48" viewBox="0 0 48 48">
          <circle
            class="progress-circle-bg"
            cx="24"
            cy="24"
            r="20"
            [attr.stroke]="getCSSVariable('--border')"
            stroke-width="2"
            fill="none" />
          <circle
            class="progress-circle"
            cx="24"
            cy="24"
            r="20"
            [attr.stroke]="getCSSVariable('--primary')"
            stroke-width="2"
            fill="none"
            [style.stroke-dasharray]="'125.6'"
            [style.stroke-dashoffset]="getProgressOffset()" />
        </svg>
      </div>

      <!-- Main Icon -->
      <div class="icon-container">
        <svg class="scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
        
        <!-- Alternative icon when at bottom -->
        <svg *ngIf="atBottom()" class="bottom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>

      <!-- Tooltip -->
      <div class="tooltip" [class.show]="showTooltip()">
        {{ atBottom() ? 'Scroll to top' : 'Back to top' }}
        <span class="keyboard-hint" *ngIf="config().enableKeyboard">(Home)</span>
      </div>

      <!-- Ripple Effect -->
      <div class="ripple" *ngIf="showRipple()"></div>
    </button>
  `,
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  private readonly defaultConfig: ScrollConfig = {
    threshold: 300,
    offset: { right: '2rem', bottom: '6rem' },
    showAtBottom: true,
    smoothScroll: true,
    scrollDuration: 800,
    enableKeyboard: true
  };

  // Reactive signals
  readonly config = signal<ScrollConfig>(this.defaultConfig);
  readonly scrollPosition = signal(0);
  readonly scrollProgress = signal(0);
  readonly isVisible = computed(() => {
    const pos = this.scrollPosition();
    const threshold = this.config().threshold;
    const showAtBottom = this.config().showAtBottom;
    
    if (this.atBottom() && showAtBottom) return true;
    return pos > threshold;
  });
  readonly atBottom = computed(() => {
    if (!this.isBrowser) return false;
    const pos = this.scrollPosition();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    return pos >= maxScroll - 100; // 100px from bottom
  });
  readonly isScrolling = signal(false);
  readonly showTooltip = signal(false);
  readonly showRipple = signal(false);

  private scrollSubscription: any;
  private resizeSubscription: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.initializeScrollListener();
    this.initializeResizeListener();
    this.checkScrollPosition();
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
    this.resizeSubscription?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.updateScrollPosition();
  }

  @HostListener('window:keydown.home', ['$event'])
  onHomeKeyPress(event: Event): void {
    if (!this.config().enableKeyboard || !this.isVisible()) return;
    
    event.preventDefault();
    this.scrollToTop();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.showTooltip.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.showTooltip.set(false);
  }

  scrollToTop(): void {
    if (!this.isBrowser) return;

    this.showRipple.set(true);
    setTimeout(() => this.showRipple.set(false), 600);

    this.isScrolling.set(true);

    const targetPosition = 0;
    const startPosition = this.scrollPosition();
    const distance = -startPosition;
    const startTime = performance.now();
    const duration = this.config().smoothScroll ? this.config().scrollDuration : 0;

    if (!this.config().smoothScroll || duration === 0) {
      window.scrollTo({ top: 0 });
      this.isScrolling.set(false);
      return;
    }

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo({
        top: startPosition + distance * easeProgress
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        this.isScrolling.set(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  getProgressOffset(): string {
    const progress = this.scrollProgress();
    const circumference = 125.6; // 2 * π * 20
    return ((100 - progress) / 100 * circumference).toString();
  }

  getCSSVariable(name: string): string {
    if (!this.isBrowser) return '';
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '';
  }

  showProgress(): boolean {
    return this.config().smoothScroll && this.scrollProgress() > 0;
  }

  // Configuration methods
  setThreshold(threshold: number): void {
    this.config.update(cfg => ({ ...cfg, threshold }));
  }

  setOffset(right: string, bottom: string): void {
    this.config.update(cfg => ({
      ...cfg,
      offset: { right, bottom }
    }));
  }

  setSmoothScroll(enabled: boolean): void {
    this.config.update(cfg => ({ ...cfg, smoothScroll: enabled }));
  }

  setScrollDuration(duration: number): void {
    this.config.update(cfg => ({ ...cfg, scrollDuration: duration }));
  }

  private initializeScrollListener(): void {
    this.scrollSubscription = fromEvent(window, 'scroll', { passive: true })
      .pipe(
        throttleTime(50, animationFrameScheduler),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.updateScrollPosition();
        this.updateScrollProgress();
      });
  }

  private initializeResizeListener(): void {
    this.resizeSubscription = fromEvent(window, 'resize', { passive: true })
      .pipe(
        throttleTime(100, animationFrameScheduler),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.updateScrollPosition();
        this.updateScrollProgress();
      });
  }

  private updateScrollPosition(): void {
    if (!this.isBrowser) return;
    
    const scrollTop = window.pageYOffset || 
                     document.documentElement.scrollTop || 
                     document.body.scrollTop || 0;
    this.scrollPosition.set(scrollTop);
  }

  private updateScrollProgress(): void {
    if (!this.isBrowser) return;

    const scrollTop = this.scrollPosition();
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    this.scrollProgress.set(Math.min(progress, 100));
  }

  private checkScrollPosition(): void {
    this.updateScrollPosition();
    this.updateScrollProgress();
  }
}