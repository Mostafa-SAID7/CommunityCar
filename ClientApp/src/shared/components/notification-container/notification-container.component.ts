import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute top-16 right-6 md:right-10 z-50 space-y-2 max-w-sm w-full pointer-events-none">
      <div
        *ngFor="let notification of notifications$ | async"
        class="notification-item animate-slide-in-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 flex items-start space-x-3 pointer-events-auto"
        [ngClass]="getNotificationClasses(notification.type)"
        style="backdrop-filter: none;">
        <div class="flex-shrink-0">
          <svg class="w-6 h-6" [ngClass]="getIconClasses(notification.type)" fill="currentColor" viewBox="0 0 20 20" [attr.aria-label]="getAriaLabel(notification.type)">
            <path *ngIf="notification.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            <path *ngIf="notification.type === 'error'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            <path *ngIf="notification.type === 'warning'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            <path *ngIf="notification.type === 'info'" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {{ notification.message }}
          </p>
        </div>
        <div class="flex-shrink-0">
          <button
            (click)="removeNotification(notification.id)"
            class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary rounded-full bg-white dark:bg-gray-800 p-1"
            aria-label="Dismiss notification">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-slide-in-right {
      animation: slideInRight 0.35s cubic-bezier(0.4,0,0.2,1);
    }
    @keyframes slideInRight {
      from {
        transform: translateX(80px) scale(0.95);
        opacity: 0;
        filter: blur(8px);
      }
      to {
        transform: translateX(0) scale(1);
        opacity: 1;
        filter: blur(0);
      }
    }
    .notification-item {
      max-width: 420px;
      border-radius: 1.5rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 1.5px 4px rgba(0,0,0,0.10);
      margin-right: 0;
      margin-left: auto;
      pointer-events: auto;
      backdrop-filter: blur(16px) saturate(180%);
      background: linear-gradient(120deg, rgba(255,255,255,0.85) 60%, rgba(245,245,255,0.95) 100%);
      border: 1.5px solid rgba(200,200,255,0.18);
      transition: box-shadow 0.2s, transform 0.2s, background 0.2s;
      will-change: transform, box-shadow, background;
    }
    .notification-item:focus-within {
      box-shadow: 0 0 0 3px var(--color-primary, #2563eb), 0 8px 32px rgba(0,0,0,0.18);
      transform: scale(1.02);
      background: linear-gradient(120deg, rgba(245,245,255,0.98) 60%, rgba(255,255,255,0.92) 100%);
    }
    .notification-item:hover {
      box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 1.5px 4px rgba(0,0,0,0.12);
      transform: scale(1.01);
    }
    .notification-item:active {
      box-shadow: 0 4px 16px rgba(0,0,0,0.16);
      transform: scale(0.99);
    }
    .notification-item .text-sm {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 0.01em;
      color: var(--color-text, #222);
      text-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    .notification-item .text-gray-900 {
      color: var(--color-text, #222) !important;
    }
    .notification-item .dark\\:text-white {
      color: var(--color-text-dark, #f3f4f6) !important;
    }
    .notification-item button {
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .notification-item button:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-primary, #2563eb);
      background: rgba(245,245,255,0.98);
    }
    .notification-item button:hover {
      color: var(--color-primary, #2563eb);
      background: rgba(245,245,255,0.96);
    }
    .notification-item svg {
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.04));
    }
    @media (max-width: 640px) {
      .notification-item {
        max-width: calc(100vw - 1.5rem);
        padding: 1rem 0.75rem;
      }
    }
    @media (max-width: 400px) {
      .notification-item {
        max-width: calc(100vw - 0.5rem);
        padding: 0.75rem 0.5rem;
      }
    }
  `]
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  @Input() position: 'header' | 'default' = 'header';
  notifications$!: Observable<Notification[]>;
  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  getNotificationClasses(type: string): string {
    const baseClasses = 'notification-item text-white border-l-4';
    switch (type) {
      case 'success': return `${baseClasses} border-green-500 bg-gradient-to-r from-green-100/80 via-white/80 to-green-50/80 dark:from-green-900/40 dark:to-green-800/40`;
      case 'error': return `${baseClasses} border-red-500 bg-gradient-to-r from-red-100/80 via-white/80 to-red-50/80 dark:from-red-900/40 dark:to-red-800/40`;
      case 'warning': return `${baseClasses} border-yellow-500 bg-gradient-to-r from-yellow-100/80 via-white/80 to-yellow-50/80 dark:from-yellow-900/40 dark:to-yellow-800/40`;
      case 'info': return `${baseClasses} border-blue-500 bg-gradient-to-r from-blue-100/80 via-white/80 to-blue-50/80 dark:from-blue-900/40 dark:to-blue-800/40`;
      default: return `${baseClasses} border-gray-500 bg-gradient-to-r from-gray-100/80 via-white/80 to-gray-50/80 dark:from-gray-900/40 dark:to-gray-800/40`;
    }
  }

  getIconClasses(type: string): string {
    switch (type) {
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  }

  getAriaLabel(type: string): string {
    switch (type) {
      case 'success': return 'Success notification';
      case 'error': return 'Error notification';
      case 'warning': return 'Warning notification';
      case 'info': return 'Information notification';
      default: return 'Notification';
    }
  }
}