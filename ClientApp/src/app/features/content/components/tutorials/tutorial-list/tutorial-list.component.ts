import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import TutorialCardComponent from '../tutorial-card/tutorial-card.component';

@Component({
  selector: 'app-tutorial-list',
  standalone: true,
  imports: [CommonModule, TutorialCardComponent],
  template: `
    <div class="tutorial-list">
      <h2>Tutorials</h2>
      <div class="tutorials-grid">
        <app-tutorial-card
          *ngFor="let tutorial of tutorials"
          [tutorial]="tutorial">
        </app-tutorial-card>
      </div>
    </div>
  `,
  styles: [`
    .tutorial-list {
      padding: 20px;
    }
    .tutorials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
  `]
})
export default class TutorialListComponent {
  tutorials: any[] = [
    { title: 'Oil Change Tutorial', description: 'Step-by-step oil change guide', duration: '15 min', level: 'Beginner' },
    { title: 'Brake Inspection', description: 'How to check your brakes', duration: '10 min', level: 'Intermediate' },
    { title: 'Tire Rotation', description: 'Proper tire maintenance', duration: '20 min', level: 'Beginner' }
  ];
}