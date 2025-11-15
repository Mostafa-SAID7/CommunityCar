import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private supportedLanguages = ['en', 'ar'];

  constructor() {
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.currentLanguageSubject.next(lang);
      localStorage.setItem('language', lang);
      // Update document direction for RTL support
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }
}