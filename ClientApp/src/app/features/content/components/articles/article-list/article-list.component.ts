import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import ArticleCardComponent from '../article-card/article-card.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent],
  template: `
    <div class="article-list">
      <h2>Articles</h2>
      <div class="articles-grid">
        <app-article-card
          *ngFor="let article of articles"
          [article]="article">
        </app-article-card>
      </div>
    </div>
  `,
  styles: [`
    .article-list {
      padding: 20px;
    }
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export default class ArticleListComponent {
  articles: any[] = [
    { title: 'Latest Car Technologies', description: 'Exploring modern automotive innovations', author: 'Tech Writer', date: '2024-01-15' },
    { title: 'Maintenance Tips', description: 'Keep your car running smoothly', author: 'Mechanic Pro', date: '2024-01-10' },
    { title: 'Electric Vehicles Guide', description: 'Everything about EVs', author: 'Green Driver', date: '2024-01-05' }
  ];
}