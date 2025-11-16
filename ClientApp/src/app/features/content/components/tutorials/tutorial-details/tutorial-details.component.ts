import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tutorial-details">
      <h2>{{ tutorial?.title || 'Tutorial Details' }}</h2>
      <div class="meta">
        <span>Duration: {{ tutorial?.duration || 'N/A' }}</span>
        <span>Level: {{ tutorial?.level || 'Beginner' }}</span>
      </div>
      <div class="content">
        <p>{{ tutorial?.content || 'Tutorial content coming soon...' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .tutorial-details {
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
export default class TutorialDetailsComponent {
  @Input() tutorial: any;
}