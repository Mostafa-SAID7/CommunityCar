import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-card">
      <h3>{{ event?.title || 'Event Title' }}</h3>
      <p>{{ event?.description || 'Event description coming soon...' }}</p>
      <div class="event-info">
        <span>Date: {{ event?.date || 'TBD' }}</span>
        <span>Location: {{ event?.location || 'TBD' }}</span>
      </div>
    </div>
  `,
  styles: [`
    .event-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 8px;
      background: white;
    }
    .event-info {
      margin-top: 8px;
      font-size: 0.9em;
      color: #666;
    }
    .event-info span {
      display: block;
    }
  `]
})
export default class EventCardComponent {
  @Input() event: any;
}