import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TranslationData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('en');
  private translations = new Map<string, TranslationData>();

  constructor() {
    // Load default language
    this.loadTranslations('en');
  }

  /**
   * Get current language observable
   */
  get currentLanguage$(): Observable<string> {
    return this.currentLanguage.asObservable();
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  /**
   * Set language
   */
  async setLanguage(language: string): Promise<void> {
    if (this.currentLanguage.value === language) {
      return;
    }

    try {
      await this.loadTranslations(language);
      this.currentLanguage.next(language);

      // Update document direction for RTL languages
      document.documentElement.dir = this.isRTL(language) ? 'rtl' : 'ltr';
      document.documentElement.lang = language;

      // Store in localStorage
      localStorage.setItem('language', language);
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  /**
   * Get translation by key
   */
  translate(key: string, params?: Record<string, any>): string {
    const keys = key.split('.');
    let value: any = this.translations.get(this.currentLanguage.value);

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    if (typeof value === 'string' && params) {
      return this.interpolate(value, params);
    }

    return value || key;
  }

  /**
   * Get translation observable (for reactive updates)
   */
  getTranslation(key: string): Observable<string> {
    return new Observable(subscriber => {
      const translate = () => {
        subscriber.next(this.translate(key));
      };

      translate();
      const subscription = this.currentLanguage$.subscribe(translate);

      return () => subscription.unsubscribe();
    });
  }

  /**
   * Check if language is RTL
   */
  private isRTL(language: string): boolean {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(language);
  }

  /**
   * Load translations for a language
   */
  private async loadTranslations(language: string): Promise<void> {
    if (this.translations.has(language)) {
      return;
    }

    try {
      // Load common translations
      const commonResponse = await fetch(`/assets/i18n/${language}/common.json`);
      if (!commonResponse.ok) {
        throw new Error(`Failed to load common translations for ${language}`);
      }

      const commonData: TranslationData = await commonResponse.json();

      // Load auth translations
      const authResponse = await fetch(`/assets/i18n/${language}/auth.json`);
      const authData: TranslationData = authResponse.ok ? await authResponse.json() : {};

      // Merge translations
      const mergedData = {
        ...commonData,
        auth: authData
      };

      this.translations.set(language, mergedData);
    } catch (error) {
      console.error(`Error loading translations for ${language}:`, error);
      // Fallback to English if loading fails
      if (language !== 'en') {
        await this.loadTranslations('en');
      }
    }
  }

  /**
   * Interpolate parameters in translation strings
   */
  private interpolate(text: string, params: Record<string, any>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }

  /**
   * Initialize language from localStorage or browser
   */
  initializeLanguage(): void {
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];

    const language = savedLanguage || (['en', 'ar'].includes(browserLanguage) ? browserLanguage : 'en');
    this.setLanguage(language);
  }
}