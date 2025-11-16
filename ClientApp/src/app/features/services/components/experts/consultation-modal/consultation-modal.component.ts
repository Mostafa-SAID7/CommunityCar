import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consultation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="consultation-modal-container">
      <h3>Consultation Modal</h3>
      <p>Consultation modal component coming soon...</p>
    </div>
  `,
  styles: [`
    .consultation-modal-container {
      padding: 20px;
    }
  `]
})
export class ConsultationModalComponent {

}