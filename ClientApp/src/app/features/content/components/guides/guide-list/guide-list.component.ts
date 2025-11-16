import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import GuideCardComponent from '../guide-card/guide-card.component';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [CommonModule, GuideCardComponent],
  template: `
    <div class="guide-list">
      <h2>Guides</h2>
      <div class="guides-grid">
        <app-guide-card
          *ngFor="let guide of guides"
          [guide]="guide">
        </app-guide-card>
      </div>
    </div>
  `,
  styles: [`
    .guide-list {
      padding: 20px;
    }
    .guides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export default class GuideListComponent {
  guides: any[] = [
    { title: 'Basic Car Maintenance', description: 'Learn the fundamentals of car care' },
    { title: 'Engine Troubleshooting', description: 'Common engine issues and solutions' },
    { title: 'Tire Care Guide', description: 'Everything about tires and maintenance' }
  ];
}