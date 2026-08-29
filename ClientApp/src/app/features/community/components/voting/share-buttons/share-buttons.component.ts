import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroLink, heroShare } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-share-buttons',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: [provideIcons({ heroLink, heroShare })],
  templateUrl: './share-buttons.component.html'
})
export default class ShareButtonsComponent {}
