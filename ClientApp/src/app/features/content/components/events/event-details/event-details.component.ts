import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCalendar, heroMapPin, heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroCalendar, heroMapPin, heroUser })],
  template: `
    <div class="event-details">
      <h2>{{ event?.title || 'Event Details' }}</h2>
      <div class="event-meta">
        <div class="date"><ng-icon name="heroCalendar" class="mr-1"></ng-icon> {{ event?.date || 'Date TBD' }}</div>
        <div class="location"><ng-icon name="heroMapPin" class="mr-1"></ng-icon> {{ event?.location || 'Location TBD' }}</div>
        <div class="organizer"><ng-icon name="heroUser" class="mr-1"></ng-icon> {{ event?.organizer || 'Organizer TBD' }}</div>
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