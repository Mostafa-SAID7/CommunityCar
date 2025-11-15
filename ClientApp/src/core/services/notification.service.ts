import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  showSuccess(message: string, title = 'Success', duration = 5000): void {
    this.addNotification('success', title, message, duration);
  }

  showError(message: string, title = 'Error', duration = 0): void {
    this.addNotification('error', title, message, duration);
  }

  showInfo(message: string, title = 'Info', duration = 5000): void {
    this.addNotification('info', title, message, duration);
  }

  showWarning(message: string, title = 'Warning', duration = 7000): void {
    this.addNotification('warning', title, message, duration);
  }

  private addNotification(type: Notification['type'], title: string, message: string, duration: number): void {
    const notification: Notification = {
      id: this.generateId(),
      type,
      title,
      message,
      timestamp: new Date(),
      isRead: false,
      duration
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Auto remove after duration if specified
    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(notification.id);
      }, duration);
    }
  }

  removeNotification(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(updatedNotifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }

  markAsRead(id: string): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = currentNotifications.map(n =>
      n.id === id ? { ...n, isRead: true } : n
    );
    this.notificationsSubject.next(updatedNotifications);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}