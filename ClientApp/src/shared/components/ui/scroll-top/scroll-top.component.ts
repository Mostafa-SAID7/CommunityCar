import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { fromEvent, throttleTime, animationFrameScheduler } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronUp, heroArrowUp } from '@ng-icons/heroicons/outline';

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
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroChevronUp, heroArrowUp })],
  template: `
    <button
      type="button"
      class="fixed z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 focus-ring group"
      [class.translate-y-0]="isVisible()"
      [class.opacity-100]="isVisible()"
      [class.pointer-events-auto]="isVisible()"
      [class.translate-y-16]="!isVisible()"
      [class.opacity-0]="!isVisible()"
      [class.pointer-events-none]="!isVisible()"
      [style.right]="config().offset.right"
      [style.bottom]="config().offset.bottom"
      (click)="scrollToTop()"
      [attr.aria-label]="'Scroll to top'"
      [attr.aria-hidden]="!isVisible()"
      [attr.tabindex]="isVisible() ? 0 : -1"
      #scrollButton>
      
      <!-- Progress Circle -->
      <div class="absolute inset-0 w-full h-full pointer-events-none" *ngIf="showProgress()">
        <svg class="w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle
            class="text-primary-700/30"
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            stroke-width="3"
            fill="none" />
          <circle
            class="text-white transition-all duration-150 ease-out"
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            [style.stroke-dasharray]="'125.6'"
            [style.stroke-dashoffset]="getProgressOffset()" />
        </svg>
      </div>

      <!-- Main Icon -->
      <div class="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1" [class.animate-bounce]="isScrolling()">
        <ng-icon [name]="atBottom() ? 'heroArrowUp' : 'heroChevronUp'" class="w-6 h-6"></ng-icon>
      </div>

      <!-- Tooltip -->
      <div class="absolute right-full mr-4 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        {{ atBottom() ? 'Scroll to top' : 'Back to top' }}
        <span class="text-slate-400 ml-1" *ngIf="config().enableKeyboard">(Home)</span>
      </div>

      <!-- Ripple Effect (Optional visual pop) -->
      <div class="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-500" [class.animate-ping]="showRipple()"></div>
    </button>
  `
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