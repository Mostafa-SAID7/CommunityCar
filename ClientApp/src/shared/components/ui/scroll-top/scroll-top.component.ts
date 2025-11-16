import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="scroll-top-btn"
      [class.visible]="isVisible"
      [ngStyle]="{ right: '2rem', bottom: '6.5rem' }"
      (click)="scrollToTop()"
      [attr.aria-label]="'Scroll to top'"
      *ngIf="isVisible">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 1-.5-.5V5.707l-2.146 2.147a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5a.5.5 0 0 1-.5.5z"/>
      </svg>
    </button>
  `,
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit, OnDestroy {
  isVisible = false;
  private scrollThreshold = 300;
  private scrollListener?: () => void;

  ngOnInit(): void {
    // Check initial scroll position
    this.checkScrollVisibility();

    // Add scroll listener
    this.scrollListener = () => this.checkScrollVisibility();
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkScrollVisibility();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private checkScrollVisibility(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollTop > this.scrollThreshold;
  }

  getPrimaryColor(): string {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#8D0707';
  }

  getPrimaryTextColor(): string {
    return getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#fff';
  }
}