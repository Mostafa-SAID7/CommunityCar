import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-shimmer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="shimmer-bg animate-shimmer"
      [style.width]="width"
      [style.height]="height"
      [style.border-radius]="borderRadius"
    ></div>
  `,
  styles: [`
    .shimmer-bg {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
    }

    .animate-shimmer {
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .dark .shimmer-bg {
      background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
      background-size: 200% 100%;
    }
  `]
})
export class ContentShimmerComponent {
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() borderRadius: string = '0.25rem';
}