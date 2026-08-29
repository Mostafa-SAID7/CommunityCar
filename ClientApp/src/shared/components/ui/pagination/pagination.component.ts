import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';

export interface PaginationConfig {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  maxPagesToShow?: number;
}

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, TranslatePipe],
  template: `
    <nav *ngIf="totalPages > 1" class="pagination-nav" [attr.aria-label]="ariaLabel">
      <ul class="pagination-list">

        <!-- Previous Button -->
        <li class="pagination-item">
          <button
            type="button"
            class="pagination-btn pagination-btn-prev"
            [disabled]="currentPage === 1"
            (click)="goToPage(currentPage - 1)"
            [attr.aria-label]="'Previous page'">
            <svg *ngIf="showIcons" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
            <span *ngIf="showText">{{ 'Previous' | translate }}</span>
          </button>
        </li>

        <!-- First Page + Ellipsis -->
        <li *ngIf="showFirstEllipsis" class="pagination-item">
          <button
            type="button"
            class="pagination-btn"
            (click)="goToPage(1)"
            [attr.aria-label]="'Go to page 1'">
            1
          </button>
        </li>
        <li *ngIf="showFirstEllipsis" class="pagination-item pagination-ellipsis">
          <span class="pagination-ellipsis-text">...</span>
        </li>

        <!-- Page Numbers -->
        <li *ngFor="let page of visiblePages" class="pagination-item">
          <button
            type="button"
            class="pagination-btn"
            [class.active]="page === currentPage"
            (click)="goToPage(page)"
            [attr.aria-label]="'Go to page ' + page"
            [attr.aria-current]="page === currentPage ? 'page' : null">
            {{ page }}
          </button>
        </li>

        <!-- Last Page + Ellipsis -->
        <li *ngIf="showLastEllipsis" class="pagination-item pagination-ellipsis">
          <span class="pagination-ellipsis-text">...</span>
        </li>
        <li *ngIf="showLastEllipsis" class="pagination-item">
          <button
            type="button"
            class="pagination-btn"
            (click)="goToPage(totalPages)"
            [attr.aria-label]="'Go to page ' + totalPages">
            {{ totalPages }}
          </button>
        </li>

        <!-- Next Button -->
        <li class="pagination-item">
          <button
            type="button"
            class="pagination-btn pagination-btn-next"
            [disabled]="currentPage === totalPages"
            (click)="goToPage(currentPage + 1)"
            [attr.aria-label]="'Next page'">
            <span *ngIf="showText">{{ 'Next' | translate }}</span>
            <svg *ngIf="showIcons" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </li>
      </ul>

      <!-- Optional Info -->
      <div *ngIf="showInfo" class="pagination-info">
        {{ getInfoText() }}
      </div>
    </nav>
  `
})
export class PaginationComponent implements OnChanges {
  @Input() config!: PaginationConfig;
  @Input() showIcons = true;
  @Input() showText = false;
  @Input() showInfo = false;
  @Input() ariaLabel = 'Pagination navigation';

  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;
  totalPages = 1;
  visiblePages: number[] = [];
  showFirstEllipsis = false;
  showLastEllipsis = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChange.emit(page);
      this.updateVisiblePages();
    }
  }

  updatePagination(): void {
    this.currentPage = this.config.currentPage;
    this.totalPages = Math.ceil(this.config.totalItems / this.config.itemsPerPage);
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const maxPages = this.config.maxPagesToShow || 5;
    const halfMax = Math.floor(maxPages / 2);

    let startPage = Math.max(1, this.currentPage - halfMax);
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    this.visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.visiblePages.push(i);
    }

    this.showFirstEllipsis = startPage > 2;
    this.showLastEllipsis = endPage < this.totalPages - 1;
  }

  getInfoText(): string {
    const startItem = (this.currentPage - 1) * this.config.itemsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.config.itemsPerPage, this.config.totalItems);

    return `${startItem}-${endItem} of ${this.config.totalItems} items`;
  }
}