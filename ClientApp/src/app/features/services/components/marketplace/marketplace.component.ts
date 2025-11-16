import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="marketplace-container">
      <h1>Marketplace</h1>
      <p>Marketplace component coming soon...</p>
    </div>
  `,
  styles: [`
    .marketplace-container {
      padding: 20px;
    }
  `]
})
export class MarketplaceComponent {

}