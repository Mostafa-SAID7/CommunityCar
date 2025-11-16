import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="event-details">
      <h2>{{ event?.title || 'Event Details' }}</h2>
      <div class="event-meta">
        <div class="date">📅 {{ event?.date || 'Date TBD' }}</div>
        <div class="location">📍 {{ event?.location || 'Location TBD' }}</div>
        <div class="organizer">👤 {{ event?.organizer || 'Organizer TBD' }}</div>
      </div>
      <div class="content">
        <p>{{ event?.content || 'Event details coming soon...' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .event-details {
      padding: 20px;
    }
    .event-meta {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .event-meta > div {
      padding: 8px;
      background: #f5f5f5;
      border-radius: 4px;
    }
    .content {
      margin-top: 16px;
      line-height: 1.6;
    }
  `]
})
export default class EventDetailsComponent {
  @Input() event: any;
}