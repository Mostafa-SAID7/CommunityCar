import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shimmer-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="shimmer-container" [style.width]="width" [style.height]="height">
      <div class="shimmer-overlay"></div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .shimmer-container {
      position: relative;
      overflow: hidden;
      border-radius: 0.375rem;
    }

    .shimmer-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
      animation: shimmer-slide 1.5s infinite;
      pointer-events: none;
    }

    @keyframes shimmer-slide {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .dark .shimmer-overlay {
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
    }
  `]
})
export class ShimmerPlaceholderComponent {
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
}