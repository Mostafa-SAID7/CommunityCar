import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <div
        *ngFor="let notification of notifications$ | async"
        class="notification-item animate-slide-in-right bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 flex items-start space-x-3"
        [ngClass]="getNotificationClasses(notification.type)">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" [ngClass]="getIconClasses(notification.type)" fill="currentColor" viewBox="0 0 20 20" [attr.aria-label]="getAriaLabel(notification.type)">
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
            class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
      animation: slideInRight 0.3s ease-out;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .notification-item {
      max-width: 400px;
    }

    @media (max-width: 640px) {
      .notification-item {
        max-width: calc(100vw - 2rem);
      }
    }
  `]
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
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
    const baseClasses = 'text-white border-l-4';
    switch (type) {
      case 'success': return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-900/20`;
      case 'error': return `${baseClasses} border-red-500 bg-red-50 dark:bg-red-900/20`;
      case 'warning': return `${baseClasses} border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20`;
      case 'info': return `${baseClasses} border-blue-500 bg-blue-50 dark:bg-blue-900/20`;
      default: return `${baseClasses} border-gray-500 bg-gray-50 dark:bg-gray-900/20`;
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