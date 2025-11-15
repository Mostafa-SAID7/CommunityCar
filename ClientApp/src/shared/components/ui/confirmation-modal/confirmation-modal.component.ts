import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationConfig {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
  showCancelButton?: boolean;
  closeOnBackdropClick?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="show" (click)="onBackdropClick($event)">
      <div class="modal-container" [ngClass]="[size, type]" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-icon" *ngIf="showIcon">
            <svg *ngIf="type === 'warning'" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <svg *ngIf="type === 'danger'" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
            </svg>
            <svg *ngIf="type === 'success'" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 1 1.079-.02l3.992-4.99a.75.75 0 0 1 1.071 1.05l-4.016 4.99a.646.646 0 0 1-.025.02L8.52 9.417l3.493-3.493a.75.75 0 0 1 1.06 0z"/>
            </svg>
            <svg *ngIf="type === 'info'" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            </svg>
          </div>
          <h3 class="modal-title" *ngIf="config.title">{{ config.title }}</h3>
          <button
            type="button"
            class="modal-close"
            (click)="cancel()"
            [attr.aria-label]="'Close modal'">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <p class="modal-message">{{ config.message }}</p>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button
            *ngIf="config.showCancelButton !== false"
            type="button"
            class="btn btn-secondary"
            (click)="cancel()">
            {{ config.cancelText || 'Cancel' }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            [ngClass]="type"
            (click)="confirm()"
            [disabled]="isLoading">
            <span *ngIf="isLoading" class="loading-spinner"></span>
            {{ config.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() config!: ConfirmationConfig;
  @Input() isLoading = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  showIcon = true;

  get size(): string {
    return this.config.size || 'md';
  }

  get type(): string {
    return this.config.type || 'info';
  }

  ngOnInit(): void {
    // Prevent body scroll when modal is open
    if (this.show) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    // Restore body scroll
    document.body.style.overflow = '';
  }

  confirm(): void {
    this.confirmed.emit();
  }

  cancel(): void {
    this.cancelled.emit();
    this.closed.emit();
  }

  onBackdropClick(event: Event): void {
    if (this.config.closeOnBackdropClick !== false) {
      this.cancel();
    }
  }

  // Handle escape key
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.show) {
      this.cancel();
    }
  }
}