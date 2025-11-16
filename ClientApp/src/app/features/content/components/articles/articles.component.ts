import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="articles-container">
      <h1>Articles</h1>
      <p>Articles component coming soon...</p>
    </div>
  `,
  styles: [`
    .articles-container {
      padding: 20px;
    }
  `]
})
export class ArticlesComponent {

}