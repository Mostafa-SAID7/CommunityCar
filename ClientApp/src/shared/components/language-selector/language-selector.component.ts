import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        (click)="toggleDropdown()"
        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <span class="text-lg">{{ currentLanguage.flag }}</span>
        <span class="text-sm font-medium">{{ currentLanguage.code.toUpperCase() }}</span>
        <svg class="w-4 h-4 transition-transform" [class.rotate-180]="isOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div *ngIf="isOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
        <div class="py-1">
          <button
            *ngFor="let language of languages"
            (click)="selectLanguage(language)"
            class="flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            [class.bg-primary]="language.code === currentLanguage.code"
            [class.text-white]="language.code === currentLanguage.code">
            <span class="text-lg">{{ language.flag }}</span>
            <span>{{ language.name }}</span>
          </button>
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
export class LanguageSelectorComponent implements OnInit {
  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  currentLanguage: Language = this.languages[0];
  isOpen = false;

  ngOnInit() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLanguage = this.languages.find(l => l.code === savedLang) || this.languages[0];
    this.applyLanguage(this.currentLanguage);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(language: Language) {
    this.currentLanguage = language;
    this.isOpen = false;
    this.applyLanguage(language);
  }

  private applyLanguage(language: Language) {
    localStorage.setItem('language', language.code);

    // Set document direction for RTL support
    document.documentElement.setAttribute('dir', language.code === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language.code);

    // Here you would typically update the Angular i18n service
    // For now, we'll just update the DOM direction
  }
}