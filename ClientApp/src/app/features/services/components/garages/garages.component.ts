import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-garages',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="garages-container">
      <h1>Garages</h1>
      <p>Garages component coming soon...</p>
    </div>
  `,
  styles: [`
    .garages-container {
      padding: 20px;
    }
  `]
})
export class GaragesComponent {

}