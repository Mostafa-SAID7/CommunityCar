import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,NgIf,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export default class ResetPasswordComponent {
  password: string = '';
  confirm: string = '';
  submitted = false;
  error: string | null = null;

  submit() {
    this.submitted = true;
    this.error = null;
    if (!this.password || this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      this.submitted = false;
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match.';
      this.submitted = false;
      return;
    }
    // Success simulation
    setTimeout(() => {
      this.submitted = false;
      this.error = null;
      alert('Password reset successful!');
      this.password = '';
      this.confirm = '';
    }, 1200);
  }
}
