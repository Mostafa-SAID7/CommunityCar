import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-points',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="points-container">
      <h1>Points</h1>
      <p>Points component coming soon...</p>
    </div>
  `,
  styles: [`
    .points-container {
      padding: 20px;
    }
  `]
})
export class PointsComponent {

}