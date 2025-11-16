import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>
      <p>Checkout component coming soon...</p>
    </div>
  `,
  styles: [`
    .checkout-container {
      padding: 20px;
    }
  `]
})
export class CheckoutComponent {

}