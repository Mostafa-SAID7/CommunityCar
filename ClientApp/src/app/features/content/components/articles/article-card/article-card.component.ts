import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="article-card">
      <h3>{{ article?.title || 'Article Title' }}</h3>
      <p>{{ article?.description || 'Article description coming soon...' }}</p>
      <small>{{ article?.author || 'Author' }} • {{ article?.date || 'Date' }}</small>
    </div>
  `,
  styles: [`
    .article-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
    }
    small {
      color: #666;
      display: block;
      margin-top: 8px;
    }
  `]
})
export default class ArticleCardComponent {
  @Input() article: any;
}