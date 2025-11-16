import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="booking-details-container">
      <h3>Booking Details</h3>
      <p>Booking details component coming soon...</p>
    </div>
  `,
  styles: [`
    .booking-details-container {
      padding: 20px;
    }
  `]
})
export class BookingDetailsComponent {

}