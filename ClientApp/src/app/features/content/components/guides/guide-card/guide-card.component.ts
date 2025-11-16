import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="guide-card">
      <h3>{{ guide?.title || 'Guide Title' }}</h3>
      <p>{{ guide?.description || 'Guide description coming soon...' }}</p>
    </div>
  `,
  styles: [`
    .guide-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
    }
  `]
})
export default class GuideCardComponent {
  @Input() guide: any;
}