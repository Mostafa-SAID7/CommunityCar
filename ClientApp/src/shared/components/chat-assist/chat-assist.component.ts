import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-assist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 right-20 z-40">
      <button
        (click)="toggleChat()"
        class="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        [class.rotate-180]="isOpen"
        aria-label="AI Chat Assistant">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </button>

      <div *ngIf="isOpen" class="absolute bottom-16 right-0 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
            <button (click)="toggleChat()" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="flex-1 p-4 overflow-y-auto">
            <div class="space-y-4">
              <div class="flex justify-start">
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                  <p class="text-sm text-gray-800 dark:text-gray-200">Hello! How can I help you with your car questions today?</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex space-x-2">
              <input
                type="text"
                placeholder="Ask me anything about cars..."
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
              <button class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rotate-180 {
      transform: rotate(180deg);
    }
  `]
})
export class ChatAssistComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }
}