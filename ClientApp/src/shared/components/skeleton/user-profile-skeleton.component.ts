import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentShimmerComponent } from './content-shimmer.component';

@Component({
  selector: 'app-user-profile-skeleton',
  standalone: true,
  imports: [CommonModule, ContentShimmerComponent],
  template: `
    <div class="bg-card p-6 rounded-lg border border-border">
      <div class="flex items-center space-x-4 mb-6">
        <app-content-shimmer [width]="'4rem'" [height]="'4rem'" [borderRadius]="'50%'"></app-content-shimmer>
        <div class="flex-1 space-y-2">
          <app-content-shimmer [width]="'60%'" [height]="'1.5rem'"></app-content-shimmer>
          <app-content-shimmer [width]="'40%'" [height]="'1rem'"></app-content-shimmer>
        </div>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <app-content-shimmer [width]="'100%'" [height]="'1rem'"></app-content-shimmer>
            <app-content-shimmer [width]="'80%'" [height]="'1rem'"></app-content-shimmer>
          </div>
          <div class="space-y-2">
            <app-content-shimmer [width]="'100%'" [height]="'1rem'"></app-content-shimmer>
            <app-content-shimmer [width]="'70%'" [height]="'1rem'"></app-content-shimmer>
          </div>
        </div>

        <div class="flex space-x-4">
          <app-content-shimmer [width]="'6rem'" [height]="'2.5rem'" [borderRadius]="'0.5rem'"></app-content-shimmer>
          <app-content-shimmer [width]="'6rem'" [height]="'2.5rem'" [borderRadius]="'0.5rem'"></app-content-shimmer>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UserProfileSkeletonComponent {}