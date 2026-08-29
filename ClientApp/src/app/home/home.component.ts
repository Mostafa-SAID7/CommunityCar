import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

// Interfaces
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  stats?: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  // Signals for reactive state management
  readonly isLoading = signal(true);
  readonly isVisible = signal(false);
  readonly animatedStats = signal<{ [key: string]: number }>({});
  
  // Computed values
  readonly showContent = computed(() => !this.isLoading());
  readonly animationState = computed(() => this.isVisible() ? 'visible' : 'hidden');

  // Data
  readonly features: Feature[] = [
    {
      id: 'community',
      title: 'Vibrant Community',
      description: 'Connect with thousands of car enthusiasts, share experiences, and get advice from fellow members in our active forums and groups.',
      icon: 'community',
      gradient: 'from-orange-500 to-red-600',
      stats: '10K+ Members'
    },
    {
      id: 'services',
      title: 'Expert Services',
      description: 'Find certified mechanics, garages, and automotive experts in your area with verified reviews and ratings from the community.',
      icon: 'services',
      gradient: 'from-purple-500 to-pink-600',
      stats: '500+ Experts'
    },
    {
      id: 'parts',
      title: 'Quality Parts',
      description: 'Browse and purchase genuine parts from trusted vendors with warranty, quality assurance, and competitive pricing.',
      icon: 'parts',
      gradient: 'from-blue-500 to-cyan-600',
      stats: '1K+ Parts'
    },
    {
      id: 'support',
      title: '24/7 Support',
      description: 'Get round-the-clock assistance from our dedicated support team and community moderators for all your automotive needs.',
      icon: 'support',
      gradient: 'from-green-500 to-emerald-600',
      stats: 'Always Online'
    }
  ];

  readonly stats: Stat[] = [
    { value: '10,000', label: 'Community Members', suffix: '+' },
    { value: '500', label: 'Certified Mechanics', suffix: '+' },
    { value: '1,000', label: 'Parts Available', suffix: '+' },
    { value: '24/7', label: 'Support Available' }
  ];

  readonly testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Car Enthusiast',
      content: 'CommunityCar helped me find the perfect mechanic for my vintage Mustang. The community reviews saved me time and money!',
      avatar: 'SJ'
    },
    {
      name: 'Mike Chen',
      role: 'Auto Technician',
      content: 'As a mechanic, this platform has connected me with genuine customers who appreciate quality work. Highly recommended!',
      avatar: 'MC'
    },
    {
      name: 'Emily Davis',
      role: 'Parts Supplier',
      content: 'The marketplace feature has boosted our parts sales by 40%. Great platform for connecting with car enthusiasts.',
      avatar: 'ED'
    }
  ];

  private observer?: IntersectionObserver;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // Simulate loading for skeleton demo
    setTimeout(() => {
      this.isLoading.set(false);
      this.initializeAnimations();
    }, 1200);

    if (this.isBrowser) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private initializeAnimations(): void {
    if (!this.isBrowser) return;

    // Initialize animated counters
    this.stats.forEach((stat, index) => {
      if (stat.suffix === '+' && !isNaN(Number(stat.value.replace(',', '')))) {
        const targetValue = Number(stat.value.replace(',', ''));
        this.animateCounter(`stat-${index}`, targetValue, 2000);
      }
    });
  }

  private setupIntersectionObserver(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) return;

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

    // Observe elements after view init
    setTimeout(() => {
      const elements = document.querySelectorAll('.observe-me');
      elements.forEach(el => this.observer?.observe(el));
    }, 100);
  }

  private animateCounter(elementId: string, target: number, duration: number): void {
    let start = 0;
    const increment = target / (duration / 16);
    const element = document.getElementById(elementId);
    
    if (!element) return;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString() + '+';
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start).toLocaleString();
      }
    }, 16);
  }

  trackByFeatureId(index: number, feature: Feature): string {
    return feature.id;
  }

  trackByTestimonialId(index: number, testimonial: any): string {
    return testimonial.name;
  }

  trackByStatId(index: number, stat: Stat): string {
    return stat.label;
  }

  getGradientStyle(gradient: string): { [key: string]: string } {
    const gradients: { [key: string]: string } = {
      'from-orange-500 to-red-600': 'linear-gradient(135deg, #FF6900 0%, #E85F00 100%)',
      'from-purple-500 to-pink-600': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
      'from-blue-500 to-cyan-600': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
      'from-green-500 to-emerald-600': 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    };
    return { 'background': gradients[gradient] || gradients['from-orange-500 to-red-600'] };
  }

  // Method to handle smooth scrolling to sections
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}