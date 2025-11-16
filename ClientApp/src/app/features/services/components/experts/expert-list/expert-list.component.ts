import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expert-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="expert-list-container">
      <h3>Expert List</h3>
      <p>Expert list component coming soon...</p>
    </div>
  `,
  styles: [`
    .expert-list-container {
      padding: 20px;
    }
  `]
})
export class ExpertListComponent {

}