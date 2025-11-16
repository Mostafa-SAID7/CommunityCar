import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-card">
        <img [src]="user.avatarUrl || defaultAvatar" alt="Avatar" class="avatar" />
        <h2 class="name">{{ user.name }}</h2>
        <p class="email">{{ user.email }}</p>
        <p class="bio" *ngIf="user.bio">{{ user.bio }}</p>
        <button class="edit-btn" (click)="editMode = !editMode">{{ editMode ? 'Cancel' : 'Edit Profile' }}</button>
        <form *ngIf="editMode" class="edit-form" (ngSubmit)="save()">
          <input type="text" [(ngModel)]="user.name" name="name" placeholder="Name" required />
          <input type="email" [(ngModel)]="user.email" name="email" placeholder="Email" required />
          <input type="text" [(ngModel)]="user.avatarUrl" name="avatarUrl" placeholder="Avatar URL" />
          <textarea [(ngModel)]="user.bio" name="bio" placeholder="Bio"></textarea>
          <button type="submit" class="save-btn">Save</button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./user-profile.component.scss']
})
export default class UserProfileComponent {
  user: UserProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    avatarUrl: '',
    bio: 'Car enthusiast. Community contributor. Love sharing knowledge.'
  };
  defaultAvatar = 'https://ui-avatars.com/api/?name=Jane+Doe&background=8D0707&color=fff&size=128';
  editMode = false;

  save() {
    this.editMode = false;
    // Here you would add save logic (API call, etc.)
    alert('Profile saved!');
  }
}