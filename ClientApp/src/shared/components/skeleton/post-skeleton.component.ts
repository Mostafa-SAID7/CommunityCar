import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';

@Component({
  selector: 'app-post-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="bg-card p-6 rounded-lg border border-border">
      <div class="flex items-start space-x-4">
        <app-skeleton [width]="'2.5rem'" [height]="'2.5rem'" [borderRadius]="'50%'"></app-skeleton>
        <div class="flex-1 space-y-3">
          <div class="flex items-center space-x-2">
            <app-skeleton [width]="'8rem'" [height]="'1rem'"></app-skeleton>
            <app-skeleton [width]="'3rem'" [height]="'1rem'" [borderRadius]="'9999px'"></app-skeleton>
            <app-skeleton [width]="'4rem'" [height]="'1rem'"></app-skeleton>
          </div>
          <app-skeleton [width]="'100%'" [height]="'1.5rem'"></app-skeleton>
          <app-skeleton [width]="'90%'" [height]="'1rem'"></app-skeleton>
          <app-skeleton [width]="'80%'" [height]="'1rem'"></app-skeleton>
          <div class="flex items-center space-x-4">
            <app-skeleton [width]="'3rem'" [height]="'1rem'"></app-skeleton>
            <app-skeleton [width]="'4rem'" [height]="'1rem'"></app-skeleton>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PostSkeletonComponent {}