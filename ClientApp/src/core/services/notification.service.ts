import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string): void {
    // Implement success notification
    console.log('Success:', message);
  }

  showError(message: string): void {
    // Implement error notification
    console.error('Error:', message);
  }

  showInfo(message: string): void {
    // Implement info notification
    console.log('Info:', message);
  }

  showWarning(message: string): void {
    // Implement warning notification
    console.warn('Warning:', message);
  }
}