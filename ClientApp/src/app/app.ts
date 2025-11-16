import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplashScreenComponent } from '../shared/components/ui/splash-screen/splash-screen.component';
import { NotificationContainerComponent } from '../shared/components/notification-container/notification-container.component';
import { LanguageSelectorComponent } from '../shared/components/ui/language-selector/language-selector.component';
import { ThemeToggleComponent } from '../shared/components/ui/theme-toggle/theme-toggle.component';
import { ScrollTopComponent } from '../shared/components/ui/scroll-top/scroll-top.component';
import { ChatAssistComponent } from '../shared/components/chat-assist/chat-assist.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, SplashScreenComponent, NotificationContainerComponent, LanguageSelectorComponent, ThemeToggleComponent, ScrollTopComponent, ChatAssistComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Community Car');
  isLoading = signal(true);

  ngOnInit(): void {
    // Simulate app initialization
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2500);
  }
}
