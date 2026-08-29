import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit(): void {
    // Add any initialization logic here
  }

  /**
   * Navigate back to the previous page
   */
  goBack(): void {
    // Try to go back in history, fallback to home if not possible
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * Handle search functionality
   * @param searchTerm The search term entered by the user
   */
  search(searchTerm: string): void {
    if (searchTerm && searchTerm.trim()) {
      // Navigate to search results or home with search query
      // For now, just navigate to home
      this.router.navigate(['/'], {
        queryParams: { search: searchTerm.trim() }
      });
    }
  }

  /**
   * Handle search input keyup event
   * @param event The keyboard event
   */
  onSearchKeyup(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.search(input.value);
    }
  }
}