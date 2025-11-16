import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="article-details">
      <h2>{{ article?.title || 'Article Details' }}</h2>
      <div class="meta">
        <span>By {{ article?.author || 'Author' }}</span>
        <span>{{ article?.date || 'Date' }}</span>
      </div>
      <div class="content">
        <p>{{ article?.content || 'Article content coming soon...' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .article-details {
      padding: 20px;
    }
    .meta {
      margin: 16px 0;
      color: #666;
    }
    .meta span {
      margin-right: 16px;
    }
    .content {
      margin-top: 16px;
      line-height: 1.6;
    }
  `]
})
export default class ArticleDetailsComponent {
  @Input() article: any;
}