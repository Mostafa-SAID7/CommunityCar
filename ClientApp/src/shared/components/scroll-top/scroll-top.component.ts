import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      *ngIf="isVisible"
      (click)="scrollToTop()"
      class="fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-hover text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Scroll to top">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    </button>
  `,
  styles: [`
    button {
      transition: all 0.3s ease;
    }
  `]
})
export class ScrollTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}