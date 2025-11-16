import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garage-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="garage-card-container">
      <h4>Garage Card</h4>
      <p>Garage card component coming soon...</p>
    </div>
  `,
  styles: [`
    .garage-card-container {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px 0;
    }
  `]
})
export class GarageCardComponent {

}