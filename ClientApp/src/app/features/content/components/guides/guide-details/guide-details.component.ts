import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guide-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="guide-details">
      <h2>{{ guide?.title || 'Guide Details' }}</h2>
      <div class="content">
        <p>{{ guide?.content || 'Guide content coming soon...' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .guide-details {
      padding: 20px;
    }
    .content {
      margin-top: 16px;
    }
  `]
})
export default class GuideDetailsComponent {
  @Input() guide: any;
}