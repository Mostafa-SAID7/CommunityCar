import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bookings-container">
      <h1>Bookings</h1>
      <p>Bookings component coming soon...</p>
    </div>
  `,
  styles: [`
    .bookings-container {
      padding: 20px;
    }
  `]
})
export class BookingsComponent {

}