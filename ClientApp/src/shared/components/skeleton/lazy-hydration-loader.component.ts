import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentShimmerComponent } from './content-shimmer.component';

@Component({
  selector: 'app-lazy-hydration-loader',
  standalone: true,
  imports: [CommonModule, ContentShimmerComponent],
  template: `
    <div class="lazy-hydration-container">
      @if (!isLoaded) {
        <div class="skeleton-wrapper">
          <ng-content select="[skeleton]"></ng-content>
        </div>
      } @else {
        <div class="content-wrapper" [class.fade-in]="animateHydration">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    .lazy-hydration-container {
      position: relative;
      min-height: 2rem;
    }

    .skeleton-wrapper {
      opacity: 1;
      transition: opacity 0.3s ease-out;
    }

    .content-wrapper {
      opacity: 0;
      animation: fadeInContent 0.5s ease-out forwards;
    }

    .content-wrapper.fade-in {
      animation: fadeInContent 0.5s ease-out forwards;
    }

    @keyframes fadeInContent {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LazyHydrationLoaderComponent implements OnInit, OnDestroy {
  @Input() loadingDelay: number = 100;
  @Input() animateHydration: boolean = true;
  @Input() isLoaded: boolean = false;
  @Output() loadStart = new EventEmitter<void>();
  @Output() loadComplete = new EventEmitter<void>();

  private timeoutId?: number;

  ngOnInit(): void {
    if (!this.isLoaded) {
      this.loadStart.emit();
      this.timeoutId = window.setTimeout(() => {
        this.isLoaded = true;
        this.loadComplete.emit();
      }, this.loadingDelay);
    }
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}