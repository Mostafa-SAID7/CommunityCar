import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  type?: 'text' | 'suggestion';
}

interface Suggestion {
  id: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-chat-assist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-assist.component.html',
  styleUrls: ['./chat-assist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAssistComponent implements OnInit, OnDestroy {
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  isOpen = false;
  isMinimized = false;
  isTyping = false;
  newMessageCount = 0;

  message = '';
  messages: ChatMessage[] = [
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant. How can I help you with your car questions today?',
      sender: 'bot',
      timestamp: new Date(),
      status: 'sent'
    }
  ];

  quickSuggestions: Suggestion[] = [
    { id: 's1', text: 'Car maintenance tips', icon: '🔧' },
    { id: 's2', text: 'Fuel efficiency', icon: '⛽' },
    { id: 's3', text: 'Troubleshooting', icon: '🚨' },
    { id: 's4', text: 'Latest models', icon: '🚗' }
  ];

  private readonly destroy$ = new Subject<void>();
  private readonly typingDelay = 1000;

  ngOnInit(): void {
    // Initialize component
    this.loadChatHistory();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen) {
      this.closeChat();
    }
  }

  @HostListener('document:keydown.control.k', ['$event'])
  onQuickAccess(event: Event): void {
    event.preventDefault();
    this.toggleChat();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.newMessageCount = 0;
      this.focusInput();
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  minimizeChat(): void {
    this.isMinimized = true;
  }

  maximizeChat(): void {
    this.isMinimized = false;
    setTimeout(() => this.scrollToBottom(), 100);
  }

  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }

  sendMessage(content?: string): void {
    const messageContent = content || this.message.trim();
    
    if (!messageContent) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    this.messages.push(userMessage);
    this.message = '';
    this.newMessageCount++;
    
    this.scrollToBottom();
    this.simulateBotResponse(messageContent);
    this.focusInput();
  }

  sendSuggestion(suggestion: Suggestion): void {
    this.sendMessage(suggestion.text);
  }

  private simulateBotResponse(userMessage: string): void {
    this.isTyping = true;
    
    setTimeout(() => {
      this.isTyping = false;
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: this.generateResponse(userMessage),
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      };

      this.messages.push(botResponse);
      this.scrollToBottom();
    }, this.typingDelay);
  }

  private generateResponse(userMessage: string): string {
    const responses = [
      "I understand you're asking about cars. Based on my knowledge, I can help you with that. Could you provide more specific details?",
      "That's an interesting question about automotive topics. Let me look into that for you and provide a comprehensive answer.",
      "I have several resources about that subject. Here's what I recommend based on your query...",
      "Many car enthusiasts ask similar questions. The best approach usually depends on your specific vehicle and driving conditions."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private focusInput(): void {
    setTimeout(() => {
      this.messageInput?.nativeElement?.focus();
    }, 0);
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }

  private loadChatHistory(): void {
    // TODO: Implement chat history loading from storage
  }

  clearChat(): void {
    this.messages = [
      {
        id: '1',
        content: 'Hello! I\'m your AI assistant. How can I help you with your car questions today?',
        sender: 'bot',
        timestamp: new Date(),
        status: 'sent'
      }
    ];
  }

  trackByMessageId(index: number, message: ChatMessage): string {
    return message.id;
  }

  trackBySuggestionId(index: number, suggestion: Suggestion): string {
    return suggestion.id;
  }
}