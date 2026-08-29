import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule,NgIf,FormsModule],
  templateUrl: './forgot-password.component.html'
})
export default class ForgotPasswordComponent {
  email: string = '';
  submitted = false;
  error: string | null = null;

  submit() {
    this.submitted = true;
    this.error = null;
    // Simulate async request
    if (!this.email || !this.email.includes('@')) {
      this.error = 'Please enter a valid email address.';
      this.submitted = false;
      return;
    }
    // Success simulation
    setTimeout(() => {
      this.submitted = false;
      this.error = null;
      alert('Password reset link sent to ' + this.email);
      this.email = '';
    }, 1200);
  }
}
