import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LordiconService {
  private scriptLoaded = false;

  constructor() {
    this.initializeLordicon();
  }

  private initializeLordicon(): void {
    if (typeof window !== 'undefined' && !this.scriptLoaded) {
      // Load Lordicon script dynamically if not already loaded
      if (!document.querySelector('script[src*="lordicon"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.lordicon.com/lordicon-1.0.0.js';
        script.async = true;
        script.onload = () => {
          this.scriptLoaded = true;
        };
        document.head.appendChild(script);
      } else {
        this.scriptLoaded = true;
      }
    }
  }

  createIconElement(iconUrl: string, options: LordiconOptions = {}): HTMLElement {
    const defaultOptions: LordiconOptions = {
      height: 32,
      width: 32,
      trigger: 'hover',
      colors: 'primary:#3b82f6,secondary:#8b5cf6',
      ...options
    };

    // Create Lordicon element
    const lordiconElement = document.createElement('lord-icon');
    lordiconElement.setAttribute('src', iconUrl);
    lordiconElement.setAttribute('trigger', defaultOptions.trigger!);
    lordiconElement.setAttribute('colors', defaultOptions.colors!);
    lordiconElement.setAttribute('style', `width:${defaultOptions.width}px;height:${defaultOptions.height}px`);

    // Add accessibility attributes
    lordiconElement.setAttribute('aria-hidden', 'true');

    return lordiconElement;
  }

  // Predefined icon URLs for common use cases
  getIconUrl(iconName: string): string {
    const iconUrls: { [key: string]: string } = {
      car: 'https://cdn.lordicon.com/ujkjyika.json',
      user: 'https://cdn.lordicon.com/hrjifpbq.json',
      home: 'https://cdn.lordicon.com/wmwqvixz.json',
      search: 'https://cdn.lordicon.com/msoeawqm.json',
      notification: 'https://cdn.lordicon.com/vyukcgvf.json',
      settings: 'https://cdn.lordicon.com/dycatgju.json',
      login: 'https://cdn.lordicon.com/mtdvyksb.json',
      logout: 'https://cdn.lordicon.com/moscwhoj.json',
      loading: 'https://cdn.lordicon.com/xjbsduiy.json',
      success: 'https://cdn.lordicon.com/hpivxauj.json',
      error: 'https://cdn.lordicon.com/gsqxdzog.json',
      warning: 'https://cdn.lordicon.com/vyukcgvf.json',
      community: 'https://cdn.lordicon.com/srdbqqpm.json',
      mechanic: 'https://cdn.lordicon.com/ujkjyika.json',
      guide: 'https://cdn.lordicon.com/nocvdjmh.json',
      ai: 'https://cdn.lordicon.com/rqqkvjqo.json',
      heart: 'https://cdn.lordicon.com/igcihljn.json',
      star: 'https://cdn.lordicon.com/rhgmpztb.json',
      chat: 'https://cdn.lordicon.com/hpivxauj.json',
      share: 'https://cdn.lordicon.com/uvqczhkv.json'
    };

    return iconUrls[iconName] || iconUrls['user'];
  }

  isLoaded(): boolean {
    return this.scriptLoaded;
  }
}

export interface LordiconOptions {
  height?: number;
  width?: number;
  trigger?: string;
  colors?: string;
  delay?: string;
  stroke?: string;
  state?: string;
}