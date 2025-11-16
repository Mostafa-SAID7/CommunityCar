import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="events-container">
      <h1>Community Events</h1>
      <p>Events component coming soon...</p>
    </div>
  `,
  styles: [`
    .events-container {
      padding: 20px;
    }
  `]
})
export class EventsComponent {

}