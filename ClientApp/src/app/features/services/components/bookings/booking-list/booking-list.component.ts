import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="booking-list-container">
      <h3>Booking List</h3>
      <p>Booking list component coming soon...</p>
    </div>
  `,
  styles: [`
    .booking-list-container {
      padding: 20px;
    }
  `]
})
export class BookingListComponent {

}