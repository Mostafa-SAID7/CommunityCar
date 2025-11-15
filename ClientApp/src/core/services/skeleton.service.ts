import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SkeletonType = 'feed' | 'profile' | 'list' | 'card' | 'text' | 'avatar';

@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  private loadingStates = new Map<string, BehaviorSubject<boolean>>();

  /**
   * Start loading for a specific component/key
   */
  startLoading(key: string): void {
    if (!this.loadingStates.has(key)) {
      this.loadingStates.set(key, new BehaviorSubject<boolean>(false));
    }
    this.loadingStates.get(key)!.next(true);
  }

  /**
   * Stop loading for a specific component/key
   */
  stopLoading(key: string): void {
    if (this.loadingStates.has(key)) {
      this.loadingStates.get(key)!.next(false);
    }
  }

  /**
   * Get loading state observable for a specific component/key
   */
  isLoading(key: string): Observable<boolean> {
    if (!this.loadingStates.has(key)) {
      this.loadingStates.set(key, new BehaviorSubject<boolean>(false));
    }
    return this.loadingStates.get(key)!.asObservable();
  }

  /**
   * Get skeleton configuration for different types
   */
  getSkeletonConfig(type: SkeletonType): any {
    const configs = {
      feed: {
        items: 5,
        showAvatar: true,
        showActions: true,
        height: 'auto'
      },
      profile: {
        showAvatar: true,
        showStats: true,
        showBio: true,
        height: 'auto'
      },
      list: {
        items: 8,
        showAvatar: true,
        compact: true,
        height: '3rem'
      },
      card: {
        showImage: true,
        showTitle: true,
        showDescription: true,
        height: 'auto'
      },
      text: {
        lines: 3,
        height: '1rem'
      },
      avatar: {
        size: '2.5rem',
        shape: 'circle'
      }
    };

    return configs[type] || configs.text;
  }

  /**
   * Preload skeleton assets (for shimmer effects)
   */
  preloadSkeletonAssets(): void {
    // Preload any skeleton-related assets if needed
    // This could include CSS animations or images
  }

  /**
   * Clean up loading states
   */
  cleanup(): void {
    this.loadingStates.clear();
  }
}