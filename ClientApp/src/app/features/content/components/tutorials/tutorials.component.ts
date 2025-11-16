import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutorials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tutorials-container">
      <h1>Tutorials</h1>
      <p>Tutorials component coming soon...</p>
    </div>
  `,
  styles: [`
    .tutorials-container {
      padding: 20px;
    }
  `]
})
export class TutorialsComponent {

}