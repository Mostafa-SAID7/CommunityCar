import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-message">The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/home" class="btn-primary">Go Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--background-color);
      padding: 2rem;
    }

    .not-found-content {
      text-align: center;
      max-width: 500px;
    }

    .error-code {
      font-size: 8rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 1rem;
      line-height: 1;
    }

    .error-title {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 1rem;
    }

    .error-message {
      font-size: 1.125rem;
      color: var(--text-color);
      opacity: 0.7;
      margin-bottom: 2rem;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      padding: 0.875rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      transition: all 0.3s ease;

      &:hover {
        background: color-mix(in srgb, var(--primary-color), black 10%);
        transform: translateY(-2px);
      }
    }
  `]
})
export class NotFoundComponent {}