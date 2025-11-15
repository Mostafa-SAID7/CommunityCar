import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  template: `
    <div class="loader-container" [ngClass]="containerClass" *ngIf="show">
      <div class="loader-spinner" [ngClass]="spinnerClass" [attr.aria-label]="loadingText">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="loader-text" *ngIf="text" [ngClass]="textClass">
        {{ text }}
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() show = true;
  @Input() text = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'primary' | 'secondary' | 'white' = 'primary';
  @Input() containerClass = '';
  @Input() spinnerClass = '';
  @Input() textClass = '';

  get loadingText(): string {
    return this.text || 'Loading...';
  }
}