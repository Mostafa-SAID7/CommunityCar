import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="booking-modal-container">
      <h3>Booking Modal</h3>
      <p>Booking modal component coming soon...</p>
    </div>
  `,
  styles: [`
    .booking-modal-container {
      padding: 20px;
    }
  `]
})
export class BookingModalComponent {

}