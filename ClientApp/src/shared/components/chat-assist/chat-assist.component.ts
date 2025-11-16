import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-assist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 right-6 z-50">
      <!-- Chat Toggle Button -->
      <button
        (click)="toggleChat()"
        class="chat-toggle-btn bg-primary hover:bg-primary-hover text-white p-4 rounded-2xl shadow-elevation-3 transition-all duration-300 hover:shadow-elevation-4 hover:scale-105 active:scale-95"
        [class.rotate-180]="isOpen"
        aria-label="AI Chat Assistant">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </button>

      <!-- Chat Window -->
      <div
        *ngIf="isOpen"
        class="chat-window absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] h-[32rem] bg-surface dark:bg-surface-dark rounded-3xl shadow-elevation-5 border border-outline dark:border-outline-dark overflow-hidden animate-slideUp">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="chat-header flex items-center justify-between p-6 bg-surface-variant dark:bg-surface-variant-dark border-b border-outline dark:border-outline-dark">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-on-surface dark:text-on-surface-dark">AI Assistant</h3>
                <p class="text-sm text-on-surface-variant dark:text-on-surface-variant-dark">Online</p>
              </div>
            </div>
            <button
              (click)="toggleChat()"
              class="close-btn w-8 h-8 rounded-full hover:bg-on-surface-variant/10 dark:hover:bg-on-surface-variant-dark/10 flex items-center justify-center transition-colors"
              aria-label="Close chat">
              <svg class="w-5 h-5 text-on-surface-variant dark:text-on-surface-variant-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Messages Area -->
          <div class="messages-area flex-1 p-6 overflow-y-auto bg-surface-container dark:bg-surface-container-dark">
            <div class="space-y-4">
              <!-- Bot Message -->
              <div class="message-bubble bot-message flex justify-start animate-fadeIn">
                <div class="message-content bg-primary-container dark:bg-primary-container-dark text-on-primary-container dark:text-on-primary-container-dark px-4 py-3 rounded-2xl rounded-tl-md max-w-xs shadow-sm">
                  <p class="text-sm leading-relaxed">Hello! How can I help you with your car questions today?</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="input-area p-6 bg-surface dark:bg-surface-dark border-t border-outline dark:border-outline-dark">
            <div class="flex space-x-3">
              <div class="flex-1 relative">
                <input
                  #messageInput
                  type="text"
                  placeholder="Ask me anything about cars..."
                  class="message-input w-full px-4 py-3 pr-12 bg-surface-container dark:bg-surface-container-dark border border-outline dark:border-outline-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-on-surface dark:text-on-surface-dark placeholder-on-surface-variant dark:placeholder-on-surface-variant-dark transition-all duration-200"
                  (keyup.enter)="sendMessage(messageInput.value); messageInput.value=''">
                <button
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-on-surface-variant dark:text-on-surface-variant-dark hover:text-primary transition-colors"
                  aria-label="Attach file">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
              </div>
              <button
                (click)="sendMessage(messageInput.value); messageInput.value=''"
                class="send-btn bg-primary hover:bg-primary-hover disabled:bg-on-surface/20 disabled:hover:bg-on-surface/20 text-white p-3 rounded-2xl shadow-elevation-2 hover:shadow-elevation-3 active:shadow-elevation-1 transition-all duration-200 disabled:cursor-not-allowed"
                [disabled]="!messageInput?.value?.trim()"
                aria-label="Send message">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Material Design 3 Color Tokens */
    :host {
      --md-sys-color-primary: var(--primary);
      --md-sys-color-primary-hover: var(--primary-hover);
      --md-sys-color-surface: #ffffff;
      --md-sys-color-surface-dark: #0f0f0f;
      --md-sys-color-surface-variant: #f5f5f5;
      --md-sys-color-surface-variant-dark: #1e1e1e;
      --md-sys-color-surface-container: #fafafa;
      --md-sys-color-surface-container-dark: #121212;
      --md-sys-color-primary-container: #fff3e0;
      --md-sys-color-primary-container-dark: #2a2a2a;
      --md-sys-color-on-primary-container: #8f4f00;
      --md-sys-color-on-primary-container-dark: #ffb74d;
      --md-sys-color-on-surface: #1e1e1e;
      --md-sys-color-on-surface-dark: #e0e0e0;
      --md-sys-color-on-surface-variant: #757575;
      --md-sys-color-on-surface-variant-dark: #a0a0a0;
      --md-sys-color-outline: #e0e0e0;
      --md-sys-color-outline-dark: #404040;
    }

    /* Elevation Shadows */
    .shadow-elevation-1 { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15); }
    .shadow-elevation-2 { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15); }
    .shadow-elevation-3 { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15); }
    .shadow-elevation-4 { box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3), 0 6px 10px 4px rgba(0, 0, 0, 0.15); }
    .shadow-elevation-5 { box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.3), 0 8px 12px 6px rgba(0, 0, 0, 0.15); }

    /* Animations */
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slideUp {
      animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out;
    }

    /* Component Styles */
    .chat-toggle-btn {
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .chat-window {
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .chat-header {
      background: linear-gradient(135deg, var(--md-sys-color-surface-variant) 0%, var(--md-sys-color-surface) 100%);
    }

    .message-bubble {
      margin-bottom: 1rem;
    }

    .message-content {
      position: relative;
      word-wrap: break-word;
      max-width: 280px;
    }

    .bot-message .message-content::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid var(--md-sys-color-primary-container);
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
    }

    .user-message {
      justify-content: flex-end;
    }

    .user-message .message-content {
      background: var(--md-sys-color-primary);
      color: white;
    }

    .user-message .message-content::before {
      content: '';
      position: absolute;
      bottom: -2px;
      right: -8px;
      width: 0;
      height: 0;
      border-right: 8px solid var(--md-sys-color-primary);
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
    }

    .message-input {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 14px;
      line-height: 20px;
    }

    .message-input:focus {
      box-shadow: 0 0 0 2px rgba(255, 105, 0, 0.2);
    }

    .send-btn {
      min-width: 48px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .send-btn:active {
      transform: scale(0.95);
    }

    .close-btn:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    /* Dark mode adjustments */
    .dark .chat-window {
      border-color: rgba(255, 255, 255, 0.1);
    }

    .dark .chat-header {
      background: linear-gradient(135deg, var(--md-sys-color-surface-variant-dark) 0%, var(--md-sys-color-surface-dark) 100%);
    }

    /* Responsive adjustments */
    @media (max-width: 480px) {
      .chat-window {
        width: calc(100vw - 2rem);
        height: calc(100vh - 8rem);
        bottom: 5rem;
      }
    }
  `]
})
export class ChatAssistComponent {
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage(message: string) {
    if (message && message.trim()) {
      // TODO: Implement message sending logic
      console.log('Sending message:', message.trim());
      // For now, just log the message
      // You can integrate with your chat service here
    }
  }
}