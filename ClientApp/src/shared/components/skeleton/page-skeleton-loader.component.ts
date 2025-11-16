import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostSkeletonComponent } from './post-skeleton.component';
import { UserProfileSkeletonComponent } from './user-profile-skeleton.component';
import { ContentShimmerComponent } from './content-shimmer.component';

@Component({
  selector: 'app-page-skeleton-loader',
  standalone: true,
  imports: [CommonModule, PostSkeletonComponent, UserProfileSkeletonComponent, ContentShimmerComponent],
  template: `
    @switch (pageType) {
      @case ('feed') {
        <div class="space-y-6">
          <!-- Create Post Skeleton -->
          <div class="bg-card p-6 rounded-3xl md:rounded-[2rem] border border-border shadow-lg transition-all duration-300">
            <div class="flex space-x-4">
              <app-content-shimmer [width]="'3rem'" [height]="'3rem'" [borderRadius]="'50%'"></app-content-shimmer>
              <div class="flex-1 space-y-3">
                <app-content-shimmer [width]="'100%'" [height]="'3rem'" [borderRadius]="'0.5rem'"></app-content-shimmer>
                <div class="flex justify-end">
                  <app-content-shimmer [width]="'6rem'" [height]="'2.5rem'" [borderRadius]="'0.5rem'"></app-content-shimmer>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts -->
          <div class="space-y-4">
            @for (item of skeletonItems; track $index) {
              <app-post-skeleton></app-post-skeleton>
            }
          </div>
        </div>
      }

      @case ('profile') {
        <app-user-profile-skeleton></app-user-profile-skeleton>
      }

      @case ('list') {
        <div class="space-y-4">
          @for (item of skeletonItems; track $index) {
            <div class="bg-card p-4 rounded-3xl md:rounded-[2rem] border border-border shadow-lg transition-all duration-300">
              <div class="flex items-center space-x-4">
                <app-content-shimmer [width]="'3rem'" [height]="'3rem'" [borderRadius]="'50%'"></app-content-shimmer>
                <div class="flex-1 space-y-2">
                  <app-content-shimmer [width]="'60%'" [height]="'1.25rem'"></app-content-shimmer>
                  <app-content-shimmer [width]="'40%'" [height]="'1rem'"></app-content-shimmer>
                </div>
              </div>
            </div>
          }
        </div>
      }

      @default {
        <div class="space-y-4">
          @for (item of skeletonItems; track $index) {
            <app-content-shimmer [height]="'4rem'" [borderRadius]="'0.5rem'"></app-content-shimmer>
          }
        </div>
      }
    }
  `,
  styles: []
})
export class PageSkeletonLoaderComponent {
  @Input() pageType: 'feed' | 'profile' | 'list' | 'default' = 'default';
  @Input() skeletonItems: number[] = [1, 2, 3];
}