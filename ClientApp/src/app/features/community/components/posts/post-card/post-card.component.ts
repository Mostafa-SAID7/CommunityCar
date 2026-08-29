import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronUp, heroChatBubbleOvalLeft, heroCalendarDays } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIcon],
  providers: [provideIcons({ heroChevronUp, heroChatBubbleOvalLeft, heroCalendarDays })],
  templateUrl: './post-card.component.html'
})
export default class PostCardComponent {
  @Input() post: any;
}
