import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  imports: [CommonModule],
  template: `
    <div class="language-selector">
      <select
        class="language-select"
        [value]="currentLanguage"
        (change)="onLanguageChange($event)"
        [attr.aria-label]="'app.language' | translate">
        <option
          *ngFor="let lang of supportedLanguages"
          [value]="lang.code"
          [selected]="lang.code === currentLanguage">
          {{ lang.name }}
        </option>
      </select>
      <div class="language-dropdown" *ngIf="dropdownMode">
        <button
          type="button"
          class="language-btn"
          (click)="toggleDropdown()"
          [attr.aria-expanded]="isDropdownOpen"
          [attr.aria-label]="'app.language' | translate">
          <span class="language-flag">{{ getLanguageFlag(currentLanguage) }}</span>
          <span class="language-name">{{ getLanguageName(currentLanguage) }}</span>
          <svg class="dropdown-arrow" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        </button>
        <div class="dropdown-menu" *ngIf="isDropdownOpen">
          <button
            *ngFor="let lang of supportedLanguages"
            type="button"
            class="dropdown-item"
            [class.active]="lang.code === currentLanguage"
            (click)="selectLanguage(lang.code)">
            <span class="language-flag">{{ lang.flag }}</span>
            <span class="language-name">{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  currentLanguage = 'en';
  supportedLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];
  isDropdownOpen = false;
  dropdownMode = false;

  private destroy$ = new Subject<void>();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLanguage = lang;
      });

    // Close dropdown when clicking outside
    document.addEventListener('click', this.closeDropdown.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.closeDropdown.bind(this));
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectLanguage(target.value);
  }

  selectLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
    this.isDropdownOpen = false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getLanguageName(code: string): string {
    const lang = this.supportedLanguages.find(l => l.code === code);
    return lang ? lang.name : code;
  }

  getLanguageFlag(code: string): string {
    const lang = this.supportedLanguages.find(l => l.code === code);
    return lang ? lang.flag : '';
  }

  private closeDropdown(event: Event): void {
    const target = event.target as HTMLElement;
    const selector = target.closest('.language-selector');

    if (!selector) {
      this.isDropdownOpen = false;
    }
  }
}