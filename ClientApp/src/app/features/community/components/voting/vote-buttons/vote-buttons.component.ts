import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronUp, heroChevronDown } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-vote-buttons',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroChevronUp, heroChevronDown })],
  templateUrl: './vote-buttons.component.html'
})
export default class VoteButtonsComponent {}
