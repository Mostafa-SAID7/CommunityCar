import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expert-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="expert-card-container">
      <h4>Expert Card</h4>
      <p>Expert card component coming soon...</p>
    </div>
  `,
  styles: [`
    .expert-card-container {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px 0;
    }
  `]
})
export class ExpertCardComponent {

}