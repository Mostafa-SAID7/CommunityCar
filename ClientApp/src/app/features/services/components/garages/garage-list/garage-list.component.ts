import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garage-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="garage-list-container">
      <h3>Garage List</h3>
      <p>Garage list component coming soon...</p>
    </div>
  `,
  styles: [`
    .garage-list-container {
      padding: 20px;
    }
  `]
})
export class GarageListComponent {

}