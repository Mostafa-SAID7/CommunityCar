import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronUp,
  heroChevronDown,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-answer-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroChevronUp, heroChevronDown })],
  templateUrl: './answer-card.component.html'
})
export default class AnswerCardComponent {
  @Input() answer: any;
}
