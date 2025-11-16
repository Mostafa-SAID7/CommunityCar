import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expert-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="expert-details-container">
      <h3>Expert Details</h3>
      <p>Expert details component coming soon...</p>
    </div>
  `,
  styles: [`
    .expert-details-container {
      padding: 20px;
    }
  `]
})
export class ExpertDetailsComponent {

}