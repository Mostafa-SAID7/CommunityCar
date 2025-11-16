import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal, computed, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Services


// Interfaces
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
  gradient: string;
}

export interface BrandInfo {
  name: string;
  description: string;
  logo: {
    light: string;
    dark: string;
  };
  founded?: number;
  tagline: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
  description?: string;
}

export interface AppDownload {
  platform: 'ios' | 'android' | 'web';
  url: string;
  label: string;
  sublabel: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);


  // Signals for reactive state management
  readonly isBrowser = signal(false);
  readonly isVisible = signal(false);
  readonly newsletterEmail = signal('');
  readonly newsletterSubmitted = signal(false);
  readonly newsletterLoading = signal(false);
  readonly newsletterError = signal('');
  readonly currentYear = signal(new Date().getFullYear());


  // Computed values
  readonly showSuccessMessage = computed(() => this.newsletterSubmitted());
  readonly yearsActive = computed(() => {
    const startYear = this.brand.founded || 2024;
    return startYear === this.currentYear() 
      ? this.currentYear().toString() 
      : `${startYear} - ${this.currentYear()}`;
  });

  // Brand information
  readonly brand: BrandInfo = {
    name: 'CommunityCar',
    description: 'Revolutionizing shared mobility through community-driven solutions and AI-powered assistance for smarter, sustainable transportation.',
    logo: {
      light: '/assets/images/logo-light.svg',
      dark: '/assets/images/logo-dark.svg'
    },
    founded: 2024,
    tagline: 'Drive Smarter, Together'
  };

  // Footer sections
  readonly sections: FooterSection[] = [
    {
      title: 'Quick Links',
      description: 'Access our most popular features and services',
      links: [
        { 
          label: 'Community Forum', 
          href: '/community', 
          icon: 'forum',
          description: 'Join discussions with car enthusiasts'
        },
        { 
          label: 'Service Marketplace', 
          href: '/services', 
          icon: 'store',
          description: 'Find trusted mechanics and services'
        },
        { 
          label: 'Knowledge Base', 
          href: '/content', 
          icon: 'library_books',
          description: 'Learn from expert guides and tutorials'
        },
        { 
          label: 'AI Assistant', 
          href: '/ai-assistant', 
          icon: 'smart_toy',
          description: 'Get instant help with car questions'
        }
      ]
    },
    {
      title: 'Support',
      description: 'Get help and learn about our policies',
      links: [
        { 
          label: 'Help Center', 
          href: '/help', 
          icon: 'help',
          description: 'Find answers to common questions'
        },
        { 
          label: 'Contact Us', 
          href: '/contact', 
          icon: 'contact_mail',
          description: 'Reach out to our support team'
        },
        { 
          label: 'Privacy Policy', 
          href: '/privacy', 
          icon: 'privacy_tip',
          description: 'Learn how we protect your data',
          external: true
        },
        { 
          label: 'Terms of Service', 
          href: '/terms', 
          icon: 'description',
          description: 'Read our terms and conditions',
          external: true
        }
      ]
    },
    {
      title: 'Features',
      description: 'Explore our platform capabilities',
      links: [
        { 
          label: 'Car Sharing', 
          href: '/sharing', 
          icon: 'car_rental',
          description: 'Share rides and reduce costs'
        },
        { 
          label: 'Maintenance Tracking', 
          href: '/maintenance', 
          icon: 'build',
          description: 'Track your vehicle maintenance'
        },
        { 
          label: 'Route Planning', 
          href: '/routes', 
          icon: 'route',
          description: 'Plan optimal routes and trips'
        },
        { 
          label: 'Cost Calculator', 
          href: '/calculator', 
          icon: 'calculate',
          description: 'Calculate trip costs and savings'
        }
      ]
    }
  ];

  // Social links with gradients
  readonly socialLinks: SocialLink[] = [
    {
      platform: 'facebook',
      url: 'https://facebook.com/communitycar',
      icon: 'facebook',
      ariaLabel: 'Follow us on Facebook',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/communitycar',
      icon: 'instagram',
      ariaLabel: 'Follow us on Instagram',
      gradient: 'from-purple-600 via-pink-600 to-red-600'
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/communitycar',
      icon: 'twitter',
      ariaLabel: 'Follow us on Twitter',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/company/communitycar',
      icon: 'linkedin',
      ariaLabel: 'Follow us on LinkedIn',
      gradient: 'from-blue-700 to-blue-900'
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/communitycar',
      icon: 'youtube',
      ariaLabel: 'Watch us on YouTube',
      gradient: 'from-red-600 to-red-800'
    },
    {
      platform: 'tiktok',
      url: 'https://tiktok.com/@communitycar',
      icon: 'tiktok',
      ariaLabel: 'Follow us on TikTok',
      gradient: 'from-black to-gray-800'
    },
    {
      platform: 'github',
      url: 'https://github.com/communitycar',
      icon: 'github',
      ariaLabel: 'View our code on GitHub',
      gradient: 'from-gray-800 to-black'
    },
    {
      platform: 'discord',
      url: 'https://discord.gg/communitycar',
      icon: 'discord',
      ariaLabel: 'Join our Discord server',
      gradient: 'from-indigo-600 to-purple-700'
    }
  ];

  // App download links
  readonly appDownloads: AppDownload[] = [
    {
      platform: 'ios',
      url: 'https://apps.apple.com/app/communitycar',
      label: 'App Store',
      sublabel: 'Download on the',
      icon: 'apple',
      badge: 'Featured'
    },
    {
      platform: 'android',
      url: 'https://play.google.com/store/apps/details?id=com.communitycar',
      label: 'Google Play',
      sublabel: 'Get it on',
      icon: 'android',
      badge: 'Popular'
    },
    {
      platform: 'web',
      url: '/web-app',
      label: 'Web App',
      sublabel: 'Use in browser',
      icon: 'language',
      badge: 'New'
    }
  ];


  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
    
    if (this.isBrowser()) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible.set(true);
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    setTimeout(() => {
      const elements = document.querySelectorAll('.footer-observe');
      elements.forEach(el => this.observer?.observe(el));
    }, 100);
  }


  openAppStore(download: AppDownload): void {
    if (this.isBrowser()) {
      if (download.platform === 'web') {
        window.open(download.url, '_self');
      } else {
        window.open(download.url, '_blank', 'noopener,noreferrer');
      }
    }
  }

  onSubmitNewsletter(event: Event): void {
    event.preventDefault();

    const email = this.newsletterEmail().trim();
    if (!this.isValidEmail(email)) return;

    this.newsletterLoading.set(true);
    this.newsletterError.set('');

    this.apiService.post('/newsletter/subscribe', { email })
      .subscribe({
        next: (response) => {
          this.newsletterSubmitted.set(true);
          this.newsletterLoading.set(false);
          this.newsletterEmail.set('');

          // Reset success message after 5 seconds
          setTimeout(() => {
            this.newsletterSubmitted.set(false);
          }, 5000);
        },
        error: (error) => {
          this.newsletterLoading.set(false);
          this.newsletterError.set('Failed to subscribe. Please try again.');

          // Clear error after 5 seconds
          setTimeout(() => {
            this.newsletterError.set('');
          }, 5000);
        }
      });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getGradientStyle(gradient: string): { [key: string]: string } {
    const gradients: { [key: string]: string } = {
      'from-blue-600 to-blue-800': 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      'from-purple-600 via-pink-600 to-red-600': 'linear-gradient(135deg, #9333ea 0%, #db2777 50%, #dc2626 100%)',
      'from-blue-400 to-blue-600': 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
      'from-blue-700 to-blue-900': 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
      'from-red-600 to-red-800': 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      'from-black to-gray-800': 'linear-gradient(135deg, #000000 0%, #1f2937 100%)',
      'from-gray-800 to-black': 'linear-gradient(135deg, #1f2937 0%, #000000 100%)',
      'from-indigo-600 to-purple-700': 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
    };
    return { 'background': gradients[gradient] || gradients['from-blue-600 to-blue-800'] };
  }

  getIconPath(icon: string): string {
    const icons: { [key: string]: string } = {
      'forum': 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      'store': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
      'library_books': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      'smart_toy': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      'help': 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'contact_mail': 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'privacy_tip': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      'description': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      'car_rental': 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
      'build': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'route': 'M9 17.25V21m6-3.75V21m3-12a3 3 0 11-6 0 3 3 0 016 0zM4.5 9.75a3 3 0 011.41-2.55l5.09-2.54a3 3 0 012.68 0l5.09 2.54a3 3 0 011.41 2.55V18a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18V9.75z',
      'calculate': 'M9 7h6m0 10v-4m-3 4h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
    };
    return icons[icon] || '';
  }

  // TrackBy functions for performance
  trackBySection(index: number, section: FooterSection): string {
    return section.title;
  }

  trackByLink(index: number, link: FooterLink): string {
    return link.href;
  }

  trackBySocial(index: number, social: SocialLink): string {
    return social.platform;
  }

  trackByApp(index: number, app: AppDownload): string {
    return app.platform;
  }
}