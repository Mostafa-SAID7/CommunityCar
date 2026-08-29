import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GarageDashboardService } from '../../services/garage-dashboard.service';
import { GarageDashboardData, Booking, Mechanic, GarageService } from '../../models/dashboard.models';
import { ReplacePipe } from '../../../../../shared/pipes/replace.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCalendar, heroWrenchScrewdriver, heroCheckCircle, heroCurrencyDollar, heroStar } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-garage-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReplacePipe, NgIcon],
  providers: [provideIcons({ heroCalendar, heroWrenchScrewdriver, heroCheckCircle, heroCurrencyDollar, heroStar })],
  template: `
    <div class="garage-dashboard">
      <div class="dashboard-header">
        <h1>Garage Dashboard</h1>
        <p class="subtitle">Manage bookings, mechanics, and services</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="dashboardData">
        <div class="stat-card">
          <div class="stat-icon"><ng-icon name="heroCalendar"></ng-icon></div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalBookings }}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><ng-icon name="heroWrenchScrewdriver"></ng-icon></div>
          <div class="stat-content">
            <h3>{{ dashboardData.mechanics.length }}</h3>
            <p>Mechanics</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><ng-icon name="heroCheckCircle"></ng-icon></div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.completedServices }}</h3>
            <p>Completed Services</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon"><ng-icon name="heroCurrencyDollar"></ng-icon></div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalRevenue | currency }}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <!-- Navigation Tabs -->
        <div class="tabs">
          <button
            class="tab-button"
            [class.active]="activeTab === 'bookings'"
            (click)="setActiveTab('bookings')">
            Bookings
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'mechanics'"
            (click)="setActiveTab('mechanics')">
            Mechanics
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'services'"
            (click)="setActiveTab('services')">
            Services
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'reviews'"
            (click)="setActiveTab('reviews')">
            Reviews
          </button>
        </div>

        <!-- Bookings Tab -->
        <div *ngIf="activeTab === 'bookings'" class="tab-content">
          <div class="bookings-section">
            <div class="section-header">
              <h2>Service Bookings</h2>
              <div class="filters">
                <select [(ngModel)]="bookingFilter" (change)="filterBookings()">
                  <option value="all">All Bookings</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div class="bookings-list">
              <div class="booking-card" *ngFor="let booking of filteredBookings">
                <div class="booking-header">
                  <div class="customer-info">
                    <h3>Booking #{{ booking.id.slice(-8) }}</h3>
                    <p>Customer: {{ booking.customerId }}</p>
                  </div>
                  <div class="booking-meta">
                    <span class="service-type">{{ booking.serviceType }}</span>
                    <span class="status-badge" [class]="'status-' + booking.status">
                      {{ booking.status | titlecase | replace:'_':' ' }}
                    </span>
                  </div>
                </div>

                <div class="booking-details">
                  <div class="detail-item">
                    <span class="label">Date:</span>
                    <span>{{ booking.serviceDate | date:'medium' }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Amount:</span>
                    <span>{{ booking.totalAmount | currency }}</span>
                  </div>
                  <div class="detail-item" *ngIf="booking.notes">
                    <span class="label">Notes:</span>
                    <span>{{ booking.notes }}</span>
                  </div>
                </div>

                <div class="booking-actions">
                  <div *ngIf="booking.status === 'pending'">
                    <button class="btn-success" (click)="updateBookingStatus(booking, 'confirmed')">Confirm</button>
                    <button class="btn-danger" (click)="updateBookingStatus(booking, 'cancelled')">Cancel</button>
                  </div>
                  <div *ngIf="booking.status === 'confirmed'">
                    <button class="btn-primary" (click)="updateBookingStatus(booking, 'in_progress')">Start Service</button>
                  </div>
                  <div *ngIf="booking.status === 'in_progress'">
                    <button class="btn-success" (click)="updateBookingStatus(booking, 'completed')">Complete</button>
                  </div>
                  <div *ngIf="['completed', 'cancelled'].includes(booking.status)">
                    <button class="btn-secondary" (click)="viewBookingDetails(booking)">View Details</button>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredBookings.length === 0" class="empty-state">
              <p>No bookings found</p>
            </div>
          </div>
        </div>

        <!-- Mechanics Tab -->
        <div *ngIf="activeTab === 'mechanics'" class="tab-content">
          <div class="mechanics-section">
            <div class="section-header">
              <h2>Garage Mechanics</h2>
              <button class="btn-primary" (click)="addNewMechanic()">Add Mechanic</button>
            </div>

            <div class="mechanics-grid">
              <div class="mechanic-card" *ngFor="let mechanic of dashboardData?.mechanics">
                <div class="mechanic-header">
                  <div class="mechanic-info">
                    <h3>{{ mechanic.name }}</h3>
                    <p class="specialization">{{ mechanic.specialization.join(', ') }}</p>
                  </div>
                  <div class="mechanic-status">
                    <span class="availability-badge" [class]="'availability-' + (mechanic.isAvailable ? 'available' : 'busy')">
                      {{ mechanic.isAvailable ? 'Available' : 'Busy' }}
                    </span>
                  </div>
                </div>

                <div class="mechanic-details">
                  <div class="detail-row">
                    <span>Experience: {{ mechanic.experience }} years</span>
                    <span>Rating: <ng-icon name="heroStar" class="text-yellow-400"></ng-icon> {{ mechanic.rating }}/5</span>
                  </div>
                  <div class="certifications" *ngIf="mechanic.certifications.length > 0">
                    <strong>Certifications:</strong>
                    <div class="cert-list">
                      <span *ngFor="let cert of mechanic.certifications" class="cert-badge">{{ cert }}</span>
                    </div>
                  </div>
                </div>

                <div class="mechanic-actions">
                  <button class="btn-sm" (click)="editMechanic(mechanic)">Edit</button>
                  <button class="btn-sm danger" (click)="removeMechanic(mechanic)">Remove</button>
                  <button class="btn-sm secondary" (click)="toggleAvailability(mechanic)">
                    {{ mechanic.isAvailable ? 'Set Busy' : 'Set Available' }}
                  </button>
                </div>
              </div>
            </div>

            <div *ngIf="(dashboardData?.mechanics?.length ?? 0) === 0" class="empty-state">
              <p>No mechanics added yet</p>
              <button class="btn-primary" (click)="addNewMechanic()">Add Your First Mechanic</button>
            </div>
          </div>
        </div>

        <!-- Services Tab -->
        <div *ngIf="activeTab === 'services'" class="tab-content">
          <div class="services-section">
            <div class="section-header">
              <h2>Garage Services</h2>
              <button class="btn-primary" (click)="addNewService()">Add Service</button>
            </div>

            <div class="services-list">
              <div class="service-card" *ngFor="let service of dashboardData?.services">
                <div class="service-header">
                  <div class="service-info">
                    <h3>{{ service.name }}</h3>
                    <p class="category">{{ service.category }}</p>
                  </div>
                  <div class="service-status">
                    <span class="status-indicator" [class]="'status-' + (service.isActive ? 'active' : 'inactive')">
                      {{ service.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <div class="service-description">
                  <p>{{ service.description }}</p>
                </div>

                <div class="service-details">
                  <div class="detail-item">
                    <span class="label">Price:</span>
                    <span>{{ service.price | currency }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="label">Duration:</span>
                    <span>{{ service.duration }} minutes</span>
                  </div>
                </div>

                <div class="service-actions">
                  <button class="btn-sm" (click)="editService(service)">Edit</button>
                  <button class="btn-sm secondary" (click)="toggleServiceStatus(service)">
                    {{ service.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </div>
            </div>

            <div *ngIf="(dashboardData?.services?.length ?? 0) === 0" class="empty-state">
              <p>No services added yet</p>
              <button class="btn-primary" (click)="addNewService()">Add Your First Service</button>
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div *ngIf="activeTab === 'reviews'" class="tab-content">
          <div class="reviews-section">
            <div class="section-header">
              <h2>Customer Reviews</h2>
              <div class="rating-summary">
                <span class="overall-rating"><ng-icon name="heroStar" class="text-yellow-400"></ng-icon> {{ getAverageRating() }}/5</span>
                <span class="total-reviews">({{ getReviewsCount() }} reviews)</span>
              </div>
            </div>

            <div class="reviews-list">
              <div class="review-card" *ngFor="let review of dashboardData?.reviews">
                <div class="review-header">
                  <div class="reviewer-info">
                    <span class="reviewer-name">{{ review.customerName }}</span>
                    <span class="review-date">{{ review.createdAt | date:'short' }}</span>
                  </div>
                  <div class="review-rating">
                    <span class="stars">
                      <ng-icon name="heroStar" class="text-yellow-400" *ngFor="let _ of getStarsArray(review.rating)"></ng-icon>
                    </span>
                    <span class="rating-number">{{ review.rating }}/5</span>
                  </div>
                </div>

                <div class="review-content">
                  <p>{{ review.comment }}</p>
                  <span class="service-type">{{ review.serviceType }}</span>
                </div>

                <div class="review-actions">
                  <button class="btn-link" (click)="respondToReview(review)">Respond</button>
                </div>
              </div>
            </div>

            <div *ngIf="(dashboardData?.reviews?.length ?? 0) === 0" class="empty-state">
              <p>No reviews yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .garage-dashboard {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 2rem;
    }

    .subtitle {
      color: #7f8c8d;
      margin: 0.5rem 0 0 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      font-size: 2rem;
    }

    .stat-content h3 {
      margin: 0;
      font-size: 1.8rem;
      color: #2c3e50;
    }

    .stat-content p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #ecf0f1;
      margin-bottom: 2rem;
      overflow-x: auto;
    }

    .tab-button {
      padding: 1rem 2rem;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      font-weight: 500;
      color: #7f8c8d;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .tab-button.active {
      color: #3498db;
      border-bottom-color: #3498db;
    }

    .tab-button:hover {
      color: #3498db;
    }

    .tab-content {
      padding: 1rem 0;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .filters select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .btn-primary, .btn-success, .btn-danger, .btn-secondary, .btn-link, .btn-sm {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-success {
      background: #27ae60;
      color: white;
    }

    .btn-success:hover {
      background: #219a52;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
    }

    .btn-secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .btn-secondary:hover {
      background: #d5dbdb;
    }

    .btn-link {
      background: none;
      color: #3498db;
      text-decoration: underline;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.9rem;
    }

    .btn-sm.danger {
      background: #e74c3c;
      color: white;
    }

    .btn-sm.secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }

    .bookings-list, .mechanics-grid, .services-list, .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .booking-card, .mechanic-card, .service-card, .review-card {
      background: white;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .booking-header, .mechanic-header, .service-header, .review-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .customer-info h3, .mechanic-info h3, .service-info h3 {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
    }

    .customer-info p, .specialization, .category {
      margin: 0;
      color: #7f8c8d;
    }

    .booking-meta, .mechanic-status, .service-status {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .service-type {
      background: #ecf0f1;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      color: #2c3e50;
    }

    .status-badge, .availability-badge, .status-indicator {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-pending { background: #fff3cd; color: #856404; }
    .status-confirmed { background: #d1ecf1; color: #0c5460; }
    .status-in_progress { background: #d4edda; color: #155724; }
    .status-completed { background: #d4edda; color: #155724; }
    .status-cancelled { background: #f8d7da; color: #721c24; }

    .availability-available { background: #d4edda; color: #155724; }
    .availability-busy { background: #fff3cd; color: #856404; }

    .status-active { background: #d4edda; color: #155724; }
    .status-inactive { background: #f8d7da; color: #721c24; }

    .booking-details, .mechanic-details, .service-details {
      margin: 1rem 0;
    }

    .detail-item, .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .label {
      font-weight: 500;
      color: #2c3e50;
    }

    .booking-actions, .mechanic-actions, .service-actions, .review-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .mechanic-details .detail-row {
      justify-content: space-between;
      width: 100%;
    }

    .certifications {
      margin-top: 1rem;
    }

    .cert-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .cert-badge {
      background: #ecf0f1;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      color: #2c3e50;
    }

    .service-description p {
      margin: 0;
      color: #555;
    }

    .rating-summary {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .overall-rating {
      font-size: 1.5rem;
      font-weight: bold;
      color: #f39c12;
    }

    .total-reviews {
      color: #7f8c8d;
    }

    .reviewer-info {
      display: flex;
      flex-direction: column;
    }

    .reviewer-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .review-date {
      color: #7f8c8d;
      font-size: 0.8rem;
    }

    .review-rating {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .stars {
      font-size: 1.2rem;
    }

    .rating-number {
      color: #7f8c8d;
      font-size: 0.8rem;
    }

    .review-content {
      margin: 1rem 0;
    }

    .review-content p {
      margin: 0 0 0.5rem 0;
      color: #555;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #7f8c8d;
    }

    .empty-state p {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .garage-dashboard {
        padding: 1rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .tabs {
        padding-bottom: 0.5rem;
      }

      .tab-button {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .booking-header, .mechanic-header, .service-header, .review-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .booking-meta, .mechanic-status, .service-status {
        align-items: flex-start;
      }

      .booking-actions, .mechanic-actions, .service-actions, .review-actions {
        flex-direction: column;
      }

      .detail-item, .detail-row {
        flex-direction: column;
        gap: 0.25rem;
      }
    }
  `]
})
export default class GarageComponent implements OnInit {
  dashboardData: GarageDashboardData | null = null;
  activeTab: string = 'bookings';
  bookingFilter: string = 'all';
  filteredBookings: Booking[] = [];

  constructor(private garageService: GarageDashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.garageService.getGarageDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.filteredBookings = data.bookings;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  filterBookings() {
    if (this.bookingFilter === 'all') {
      this.filteredBookings = this.dashboardData?.bookings || [];
    } else {
      this.filteredBookings = this.dashboardData?.bookings.filter(
        booking => booking.status === this.bookingFilter
      ) || [];
    }
  }

  updateBookingStatus(booking: Booking, status: string) {
    this.garageService.updateBookingStatus(booking.id, status).subscribe({
      next: () => {
        booking.status = status as any;
        this.filterBookings();
     
      },
      error: (error) => {
        console.error('Error updating booking status:', error);
      
      }
    });
  }

  viewBookingDetails(booking: Booking) {
    // TODO: Open booking details modal/page
    console.log('Viewing booking details:', booking);
  }

  addNewMechanic() {
    // TODO: Open add mechanic modal
    console.log('Adding new mechanic');
  }

  editMechanic(mechanic: Mechanic) {
    // TODO: Open edit mechanic modal
    console.log('Editing mechanic:', mechanic);
  }

  removeMechanic(mechanic: Mechanic) {
    if (confirm(`Are you sure you want to remove ${mechanic.name}?`)) {
      this.garageService.removeMechanic(mechanic.id).subscribe({
        next: () => {
          if (this.dashboardData) {
            this.dashboardData.mechanics = this.dashboardData.mechanics.filter(m => m.id !== mechanic.id);
          }
          // TODO: Show success message
        },
        error: (error) => {
          console.error('Error removing mechanic:', error);
          // TODO: Show error message
        }
      });
    }
  }

  toggleAvailability(mechanic: Mechanic) {
    mechanic.isAvailable = !mechanic.isAvailable;
    console.log('Toggling availability for:', mechanic);
  }

  addNewService() {
    console.log('Adding new service');
  }

  editService(service: GarageService) {
    console.log('Editing service:', service);
  }

  toggleServiceStatus(service: GarageService) {
    service.isActive = !service.isActive;
    console.log('Toggling service status:', service);
  }

  respondToReview(review: any) {
    console.log('Responding to review:', review);
  }

  getStarsArray(rating: number): any[] {
    return new Array(rating);
  }

  getAverageRating(): number {
    return this.dashboardData?.stats?.averageRating ?? 0;
  }

  getReviewsCount(): number {
    return this.dashboardData?.reviews?.length ?? 0;
  }
}