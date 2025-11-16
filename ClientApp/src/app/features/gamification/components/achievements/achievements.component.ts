import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="achievements-container">
      <h1>Achievements</h1>
      <p>Achievements component coming soon...</p>
    </div>
  `,
  styles: [`
    .achievements-container {
      padding: 20px;
    }
  `]
})
export class AchievementsComponent {

}