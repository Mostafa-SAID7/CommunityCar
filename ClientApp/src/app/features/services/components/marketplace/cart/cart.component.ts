import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <p>Cart component coming soon...</p>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
    }
  `]
})
export class CartComponent {

}