import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronUp,
  heroChevronDown,
  heroUserGroup,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-group-card',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroChevronUp, heroChevronDown, heroUserGroup })],
  templateUrl: './group-card.component.html'
})
export default class GroupCardComponent {
  @Input() group: any;
}
