import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private supportedLanguages = ['en', 'ar'];

  constructor(private translationService: TranslationService) {
    // Initialize translation service
    this.translationService.initializeLanguage();
  }

  get currentLanguage$(): Observable<string> {
    return this.translationService.currentLanguage$;
  }

  setLanguage(lang: string): void {
    if (this.supportedLanguages.includes(lang)) {
      this.translationService.setLanguage(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translationService.getCurrentLanguage();
  }

  getSupportedLanguages(): string[] {
    return this.supportedLanguages;
  }

  translate(key: string, params?: Record<string, any>): string {
    return this.translationService.translate(key, params);
  }

  getTranslation(key: string): Observable<string> {
    return this.translationService.getTranslation(key);
  }
}