import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tutorial-card">
      <h3>{{ tutorial?.title || 'Tutorial Title' }}</h3>
      <p>{{ tutorial?.description || 'Tutorial description coming soon...' }}</p>
      <div class="duration">Duration: {{ tutorial?.duration || 'N/A' }}</div>
    </div>
  `,
  styles: [`
    .tutorial-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
    }
    .duration {
      margin-top: 8px;
      font-size: 0.9em;
      color: #666;
    }
  `]
})
export default class TutorialCardComponent {
  @Input() tutorial: any;
}