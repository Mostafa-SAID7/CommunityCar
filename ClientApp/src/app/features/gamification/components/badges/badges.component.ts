import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="badges-container">
      <h1>Badges</h1>
      <p>Badges component coming soon...</p>
    </div>
  `,
  styles: [`
    .badges-container {
      padding: 20px;
    }
  `]
})
export class BadgesComponent {

}