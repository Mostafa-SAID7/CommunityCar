import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="part-card-container">
      <h3>Part Card</h3>
      <p>Part card component coming soon...</p>
    </div>
  `,
  styles: [`
    .part-card-container {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px 0;
    }
  `]
})
export class PartCardComponent {

}