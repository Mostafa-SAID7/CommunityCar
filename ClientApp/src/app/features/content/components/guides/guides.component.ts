import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="guides-container">
      <h1>Guides</h1>
      <p>Guides component coming soon...</p>
    </div>
  `,
  styles: [`
    .guides-container {
      padding: 20px;
    }
  `]
})
export class GuidesComponent {

}