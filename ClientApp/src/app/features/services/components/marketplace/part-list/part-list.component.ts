import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="part-list-container">
      <h3>Parts List</h3>
      <p>Part list component coming soon...</p>
    </div>
  `,
  styles: [`
    .part-list-container {
      padding: 15px;
    }
  `]
})
export class PartListComponent {

}