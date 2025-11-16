import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="experts-container">
      <h1>Experts</h1>
      <p>Experts component coming soon...</p>
    </div>
  `,
  styles: [`
    .experts-container {
      padding: 20px;
    }
  `]
})
export class ExpertsComponent {

}