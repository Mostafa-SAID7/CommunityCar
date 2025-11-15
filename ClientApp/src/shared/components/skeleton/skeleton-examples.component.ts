import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton.component';
import { PostSkeletonComponent } from './post-skeleton.component';
import { ContentShimmerComponent } from './content-shimmer.component';
import { ShimmerPlaceholderComponent } from './shimmer-placeholder.component';
import { UserProfileSkeletonComponent } from './user-profile-skeleton.component';
import { PageSkeletonLoaderComponent } from './page-skeleton-loader.component';
import { LazyHydrationLoaderComponent } from './lazy-hydration-loader.component';

@Component({
  selector: 'app-skeleton-examples',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonComponent,
    PostSkeletonComponent,
    ContentShimmerComponent,
    ShimmerPlaceholderComponent,
    UserProfileSkeletonComponent,
    PageSkeletonLoaderComponent,
    LazyHydrationLoaderComponent
  ],
  template: `
    <div class="p-8 space-y-8">
      <h1 class="text-3xl font-bold mb-8">Skeleton Loading Components</h1>

      <!-- Basic Skeleton -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Basic Skeleton</h2>
        <app-skeleton [width]="'200px'" [height]="'20px'"></app-skeleton>
      </section>

      <!-- Content Shimmer -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Content Shimmer</h2>
        <app-content-shimmer [width]="'300px'" [height]="'24px'"></app-content-shimmer>
      </section>

      <!-- Shimmer Placeholder -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Shimmer Placeholder</h2>
        <app-shimmer-placeholder>
          <div class="p-4 bg-blue-100 rounded">
            <h3 class="text-lg font-medium">Actual Content</h3>
            <p>This content will have a shimmer overlay when loading.</p>
          </div>
        </app-shimmer-placeholder>
      </section>

      <!-- Post Skeleton -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Post Skeleton</h2>
        <app-post-skeleton></app-post-skeleton>
      </section>

      <!-- User Profile Skeleton -->
      <section>
        <h2 class="text-xl font-semibold mb-4">User Profile Skeleton</h2>
        <app-user-profile-skeleton></app-user-profile-skeleton>
      </section>

      <!-- Page Skeleton Loader -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Page Skeleton Loader - Feed</h2>
        <app-page-skeleton-loader [pageType]="'feed'" [skeletonItems]="[1,2,3]"></app-page-skeleton-loader>
      </section>

      <section>
        <h2 class="text-xl font-semibold mb-4">Page Skeleton Loader - Profile</h2>
        <app-page-skeleton-loader [pageType]="'profile'"></app-page-skeleton-loader>
      </section>

      <!-- Lazy Hydration Loader -->
      <section>
        <h2 class="text-xl font-semibold mb-4">Lazy Hydration Loader</h2>
        <app-lazy-hydration-loader [loadingDelay]="2000">
          <div skeleton>
            <app-content-shimmer [height]="'100px'"></app-content-shimmer>
          </div>
          <div class="p-4 bg-green-100 rounded border">
            <h3 class="text-lg font-medium text-green-800">Loaded Content</h3>
            <p class="text-green-700">This content appears after the skeleton fades out.</p>
          </div>
        </app-lazy-hydration-loader>
      </section>
    </div>
  `,
  styles: []
})
export class SkeletonExamplesComponent {}