import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garage-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="garage-details-container">
      <h3>Garage Details</h3>
      <p>Garage details component coming soon...</p>
    </div>
  `,
  styles: [`
    .garage-details-container {
      padding: 20px;
    }
  `]
})
export class GarageDetailsComponent {

}