import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import EventCardComponent from '../event-card/event-card.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCardComponent],
  template: `
    <div class="event-list">
      <h2>Community Events</h2>
      <div class="events-grid">
        <app-event-card
          *ngFor="let event of events"
          [event]="event">
        </app-event-card>
      </div>
    </div>
  `,
  styles: [`
    .event-list {
      padding: 20px;
    }
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export default class EventListComponent {
  events: any[] = [
    { title: 'Car Show 2024', description: 'Annual car exhibition', date: '2024-03-15', location: 'City Center', organizer: 'Auto Club' },
    { title: 'Maintenance Workshop', description: 'Learn car maintenance', date: '2024-02-20', location: 'Community Center', organizer: 'Tech Team' },
    { title: 'Safety Seminar', description: 'Road safety awareness', date: '2024-04-10', location: 'Town Hall', organizer: 'Safety Council' }
  ];
}