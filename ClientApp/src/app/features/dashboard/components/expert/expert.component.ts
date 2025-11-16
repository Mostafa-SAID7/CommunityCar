import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpertDashboardService } from '../../services/expert-dashboard.service';
import { ExpertDashboardData, ConsultationRequest, Answer } from '../../models/dashboard.models';

@Component({
  selector: 'app-expert-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="expert-dashboard">
      <div class="dashboard-header">
        <h1>Expert Dashboard</h1>
        <p class="subtitle">Manage your consultations, content, and earnings</p>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid" *ngIf="dashboardData">
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalConsultations }}</h3>
            <p>Total Consultations</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏳</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.activeRequests }}</h3>
            <p>Active Requests</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.completedSessions }}</h3>
            <p>Completed Sessions</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <h3>{{ dashboardData.stats.totalEarnings | currency }}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <!-- Navigation Tabs -->
        <div class="tabs">
          <button
            class="tab-button"
            [class.active]="activeTab === 'consultations'"
            (click)="setActiveTab('consultations')">
            Consultations
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'content'"
            (click)="setActiveTab('content')">
            My Content
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'earnings'"
            (click)="setActiveTab('earnings')">
            Earnings
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'profile'"
            (click)="setActiveTab('profile')">
            Profile
          </button>
        </div>

        <!-- Consultations Tab -->
        <div *ngIf="activeTab === 'consultations'" class="tab-content">
          <div class="consultations-section">
            <div class="section-header">
              <h2>Consultation Requests</h2>
              <div class="filters">
                <select [(ngModel)]="consultationFilter" (change)="filterConsultations()">
                  <option value="all">All Requests</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div class="consultations-list">
              <div class="consultation-card" *ngFor="let request of filteredRequests">
                <div class="consultation-header">
                  <div class="customer-info">
                    <h3>{{ request.customerName }}</h3>
                    <p>{{ request.customerEmail }}</p>
                  </div>
                  <div class="consultation-meta">
                    <span class="service-type">{{ request.serviceType }}</span>
                    <span class="status-badge" [class]="'status-' + request.status">
                      {{ request.status | titlecase }}
                    </span>
                  </div>
                </div>

                <div class="consultation-content">
                  <p>{{ request.description }}</p>
                  <div class="consultation-details">
                    <span>📅 {{ request.preferredDate | date:'medium' }}</span>
                    <span>⏱️ {{ request.estimatedDuration }} minutes</span>
                    <span>💰 {{ request.price | currency }}</span>
                  </div>
                </div>

                <div class="consultation-actions" *ngIf="request.status === 'pending'">
                  <button class="btn-success" (click)="acceptRequest(request)">Accept</button>
                  <button class="btn-danger" (click)="rejectRequest(request)">Reject</button>
                </div>

                <div class="consultation-actions" *ngIf="request.status === 'accepted'">
                  <button class="btn-primary" (click)="startSession(request)">Start Session</button>
                  <button class="btn-secondary" (click)="rescheduleRequest(request)">Reschedule</button>
                </div>

                <div class="consultation-actions" *ngIf="request.status === 'completed'">
                  <button class="btn-secondary" (click)="viewSessionDetails(request)">View Details</button>
                  <button class="btn-link" (click)="leaveFeedback(request)">Leave Feedback</button>
                </div>
              </div>
            </div>

            <div *ngIf="filteredRequests.length === 0" class="empty-state">
              <p>No consultation requests found</p>
            </div>
          </div>
        </div>

        <!-- Content Tab -->
        <div *ngIf="activeTab === 'content'" class="tab-content">
          <div class="content-section">
            <div class="section-header">
              <h2>My Content & Answers</h2>
              <button class="btn-primary" (click)="createNewPost()">Create New Post</button>
            </div>

            <div class="content-stats">
              <div class="stat-item">
                <h3>{{ recentAnswers.length }}</h3>
                <p>Recent Answers</p>
              </div>
              <div class="stat-item">
                <h3>{{ dashboardData?.stats?.averageRating || 0 }}/5</h3>
                <p>Average Rating</p>
              </div>
              <div class="stat-item">
                <h3>{{ dashboardData?.profile?.reviewsCount || 0 }}</h3>
                <p>Total Reviews</p>
              </div>
            </div>

            <div class="answers-list">
              <div class="answer-card" *ngFor="let answer of recentAnswers">
                <div class="answer-header">
                  <h3>{{ answer.postId }} - Answer</h3>
                  <div class="answer-meta">
                    <span>{{ answer.createdAt | date:'short' }}</span>
                    <span class="votes">👍 {{ answer.upvotes }} 👎 {{ answer.downvotes }}</span>
                  </div>
                </div>
                <div class="answer-content">
                  <p>{{ answer.content | slice:0:200 }}...</p>
                </div>
                <div class="answer-actions">
                  <button class="btn-link" (click)="viewFullAnswer(answer)">Read More</button>
                  <button class="btn-link" (click)="editAnswer(answer)">Edit</button>
                </div>
              </div>
            </div>

            <div *ngIf="recentAnswers.length === 0" class="empty-state">
              <p>You haven't answered any questions yet</p>
              <button class="btn-primary" (click)="browseQuestions()">Browse Questions</button>
            </div>
          </div>
        </div>

        <!-- Earnings Tab -->
        <div *ngIf="activeTab === 'earnings'" class="tab-content">
          <div class="earnings-section">
            <h2>Earnings Overview</h2>

            <div class="earnings-summary">
              <div class="summary-card">
                <h3>This Month</h3>
                <p class="amount">{{ monthlyEarnings | currency }}</p>
              </div>
              <div class="summary-card">
                <h3>Total Earnings</h3>
                <p class="amount">{{ dashboardData?.stats?.totalEarnings | currency }}</p>
              </div>
              <div class="summary-card">
                <h3>Pending Payout</h3>
                <p class="amount">{{ pendingPayout | currency }}</p>
              </div>
            </div>

            <div class="earnings-chart">
              <h3>Earnings Over Time</h3>
              <div class="chart-placeholder">
                <p>Earnings chart would be displayed here</p>
              </div>
            </div>

            <div class="earnings-history">
              <h3>Recent Earnings</h3>
              <div class="earnings-list">
                <div class="earning-item" *ngFor="let earning of dashboardData?.earnings">
                  <div class="earning-info">
                    <span class="service">{{ earning.serviceType }}</span>
                    <span class="customer">{{ earning.customerName }}</span>
                  </div>
                  <div class="earning-amount">
                    <span class="amount">{{ earning.amount | currency }}</span>
                    <span class="date">{{ earning.date | date:'short' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Tab -->
        <div *ngIf="activeTab === 'profile'" class="tab-content">
          <div class="profile-section" *ngIf="dashboardData?.profile">
            <div class="profile-header">
              <div class="profile-avatar">
                <img [src]="dashboardData?.profile?.avatar || '/assets/images/default-avatar.png'"
                     [alt]="dashboardData?.profile?.name">
              </div>
              <div class="profile-info">
                <h2>{{ dashboardData?.profile?.name }}</h2>
                <p class="specialization">{{ dashboardData?.profile?.specialization?.join(', ') }}</p>
                <div class="profile-stats">
                  <span>⭐ {{ dashboardData?.profile?.rating }}/5</span>
                  <span>{{ dashboardData?.profile?.reviewsCount }} reviews</span>
                  <span>{{ dashboardData?.profile?.experience }} years experience</span>
                </div>
              </div>
              <button class="btn-secondary" (click)="editProfile()">Edit Profile</button>
            </div>

            <div class="profile-details">
              <div class="detail-section">
                <h3>About</h3>
                <p>Experienced automotive expert specializing in {{ dashboardData?.profile?.specialization?.join(', ') }}.
                   {{ dashboardData?.profile?.experience }} years of hands-on experience in the automotive industry.</p>
              </div>

              <div class="detail-section">
                <h3>Contact Information</h3>
                <div class="contact-info">
                  <p><strong>Email:</strong> {{ dashboardData?.profile?.contactInfo?.email }}</p>
                  <p><strong>Phone:</strong> {{ dashboardData?.profile?.contactInfo?.phone }}</p>
                  <p *ngIf="dashboardData?.profile?.contactInfo?.website">
                    <strong>Website:</strong> <a [href]="dashboardData?.profile?.contactInfo?.website" target="_blank">
                      {{ dashboardData?.profile?.contactInfo?.website }}
                    </a>
                  </p>
                </div>
              </div>

              <div class="detail-section">
                <h3>Certifications</h3>
                <ul class="certifications-list">
                  <li *ngFor="let cert of dashboardData?.profile?.certifications">{{ cert }}</li>
                </ul>
              </div>

              <div class="detail-section">
                <h3>Hourly Rate</h3>
                <p class="rate">{{ dashboardData?.profile?.hourlyRate | currency }}/hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .expert-dashboard {
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

    .consultations-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .consultation-card {
      background: white;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .consultation-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .customer-info h3 {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
    }

    .customer-info p {
      margin: 0;
      color: #7f8c8d;
    }

    .consultation-meta {
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

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-pending { background: #fff3cd; color: #856404; }
    .status-accepted { background: #d1ecf1; color: #0c5460; }
    .status-completed { background: #d4edda; color: #155724; }
    .status-cancelled { background: #f8d7da; color: #721c24; }

    .consultation-details {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      font-size: 0.9rem;
      color: #7f8c8d;
    }

    .consultation-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .btn-success, .btn-danger, .btn-primary, .btn-secondary, .btn-link {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
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

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
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

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #7f8c8d;
    }

    .empty-state p {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
    }

    .content-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-item {
      text-align: center;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stat-item h3 {
      margin: 0;
      color: #2c3e50;
    }

    .stat-item p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .answers-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .answer-card {
      background: white;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .answer-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .answer-header h3 {
      margin: 0;
      color: #2c3e50;
    }

    .answer-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      font-size: 0.8rem;
      color: #7f8c8d;
    }

    .votes {
      font-weight: 500;
    }

    .answer-actions {
      margin-top: 1rem;
    }

    .earnings-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .summary-card h3 {
      margin: 0 0 0.5rem 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .amount {
      font-size: 1.5rem;
      font-weight: bold;
      color: #27ae60;
      margin: 0;
    }

    .chart-placeholder {
      height: 200px;
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c757d;
      margin: 1rem 0;
    }

    .earnings-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .earning-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .earning-info {
      display: flex;
      flex-direction: column;
    }

    .service {
      font-weight: 500;
      color: #2c3e50;
    }

    .customer {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .earning-amount {
      text-align: right;
    }

    .profile-section {
      max-width: 800px;
    }

    .profile-header {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      align-items: flex-start;
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #ecf0f1;
    }

    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-info h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .specialization {
      color: #3498db;
      font-weight: 500;
      margin: 0.5rem 0;
    }

    .profile-stats {
      display: flex;
      gap: 1rem;
      margin: 0.5rem 0;
      font-size: 0.9rem;
      color: #7f8c8d;
    }

    .profile-details {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .detail-section h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
      border-bottom: 2px solid #ecf0f1;
      padding-bottom: 0.5rem;
    }

    .contact-info p {
      margin: 0.5rem 0;
    }

    .contact-info a {
      color: #3498db;
    }

    .certifications-list {
      list-style: none;
      padding: 0;
    }

    .certifications-list li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f8f9fa;
    }

    .rate {
      font-size: 1.2rem;
      font-weight: bold;
      color: #27ae60;
    }

    @media (max-width: 768px) {
      .expert-dashboard {
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

      .consultation-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .consultation-meta {
        align-items: flex-start;
      }

      .consultation-details {
        flex-direction: column;
        gap: 0.5rem;
      }

      .profile-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .profile-stats {
        justify-content: center;
      }
    }
  `]
})
export default class ExpertComponent implements OnInit {
  dashboardData: ExpertDashboardData | null = null;
  activeTab: string = 'consultations';
  consultationFilter: string = 'all';
  filteredRequests: ConsultationRequest[] = [];
  recentAnswers: Answer[] = [];
  monthlyEarnings: number = 0;
  pendingPayout: number = 0;

  constructor(private expertService: ExpertDashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.expertService.getExpertDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.filteredRequests = data.consultationRequests;
        this.recentAnswers = data.recentAnswers;
        this.calculateEarnings();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  filterConsultations() {
    if (this.consultationFilter === 'all') {
      this.filteredRequests = this.dashboardData?.consultationRequests || [];
    } else {
      this.filteredRequests = this.dashboardData?.consultationRequests.filter(
        request => request.status === this.consultationFilter
      ) || [];
    }
  }

  acceptRequest(request: ConsultationRequest) {
    this.expertService.acceptConsultationRequest(request.id).subscribe({
      next: () => {
        request.status = 'accepted';
        this.filterConsultations();
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error accepting request:', error);
        // TODO: Show error message
      }
    });
  }

  rejectRequest(request: ConsultationRequest) {
    this.expertService.rejectConsultationRequest(request.id).subscribe({
      next: () => {
        request.status = 'cancelled';
        this.filterConsultations();
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error rejecting request:', error);
        // TODO: Show error message
      }
    });
  }

  completeConsultation(request: ConsultationRequest) {
    this.expertService.completeConsultation(request.id).subscribe({
      next: () => {
        request.status = 'completed';
        this.filterConsultations();
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error completing consultation:', error);
        // TODO: Show error message
      }
    });
  }

  startSession(request: ConsultationRequest) {
    // TODO: Open video call or chat session
    console.log('Starting session for request:', request);
  }

  rescheduleRequest(request: ConsultationRequest) {
    // TODO: Open reschedule modal
    console.log('Rescheduling request:', request);
  }

  viewSessionDetails(request: ConsultationRequest) {
    // TODO: Open session details modal/page
    console.log('Viewing session details:', request);
  }

  leaveFeedback(request: ConsultationRequest) {
    // TODO: Open feedback modal
    console.log('Leaving feedback for:', request);
  }

  createNewPost() {
    // TODO: Navigate to create post page
    console.log('Creating new post');
  }

  viewFullAnswer(answer: Answer) {
    // TODO: Open full answer view
    console.log('Viewing full answer:', answer);
  }

  editAnswer(answer: Answer) {
    // TODO: Open edit answer modal
    console.log('Editing answer:', answer);
  }

  browseQuestions() {
    // TODO: Navigate to questions page
    console.log('Browsing questions');
  }

  calculateEarnings() {
    if (this.dashboardData?.earnings) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      this.monthlyEarnings = this.dashboardData.earnings
        .filter(earning => {
          const earningDate = new Date(earning.date);
          return earningDate.getMonth() === currentMonth && earningDate.getFullYear() === currentYear;
        })
        .reduce((total, earning) => total + earning.amount, 0);

      // Assuming 20% is pending payout
      this.pendingPayout = this.monthlyEarnings * 0.2;
    }
  }

  editProfile() {
    // TODO: Open profile edit modal
    console.log('Editing profile');
  }
}