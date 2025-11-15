import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from '../shared/components/ui/splash-screen/splash-screen.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SplashScreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Community Car');
  isLoading = signal(true);

  ngOnInit(): void {
    // Simulate app initialization
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2500);
  }
}
