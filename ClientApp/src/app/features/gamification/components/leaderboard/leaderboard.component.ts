import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaderboard-container">
      <h1>Gamification Leaderboard</h1>
      <p>Leaderboard component coming soon...</p>
    </div>
  `,
  styles: [`
    .leaderboard-container {
      padding: 20px;
    }
  `]
})
export class LeaderboardComponent {

}