import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { AdminDashboardData, User, Post, Report } from '../../models/dashboard.models';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUsers, heroDocumentText, heroCalendar, heroCurrencyDollar } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  providers: [provideIcons({ heroUsers, heroDocumentText, heroCalendar, heroCurrencyDollar })],
  template: `
    <div class="admin-dashboard">
      <div class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p class="subtitle">Manage users, content, and monitor platform activity</p>
      </div>

      <!-- Key Metrics -->
      <div class="metrics-grid" *ngIf="dashboardData">
        <div class="metric-card">
          <div class="metric-icon"><ng-icon name="heroUsers"></ng-icon></div>
          <div class="metric-content">
            <h3>{{ dashboardData.stats.totalUsers }}</h3>
            <p>Total Users</p>
            <span class="growth positive">+{{ dashboardData.stats.growthRate }}%</span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon"><ng-icon name="heroDocumentText"></ng-icon></div>
          <div class="metric-content">
            <h3>{{ dashboardData.stats.totalPosts }}</h3>
            <p>Total Posts</p>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon"><ng-icon name="heroCalendar"></ng-icon></div>
          <div class="metric-content">
            <h3>{{ dashboardData.stats.totalBookings }}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon"><ng-icon name="heroCurrencyDollar"></ng-icon></div>
          <div class="metric-content">
            <h3>{{ dashboardData.stats.totalRevenue | currency }}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <!-- Main Dashboard Content -->
      <div class="dashboard-content">
        <!-- Navigation Tabs -->
        <div class="tabs">
          <button
            class="tab-button"
            [class.active]="activeTab === 'overview'"
            (click)="setActiveTab('overview')">
            Overview
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'users'"
            (click)="setActiveTab('users')">
            User Management
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'content'"
            (click)="setActiveTab('content')">
            Content Moderation
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'analytics'"
            (click)="setActiveTab('analytics')">
            Analytics
          </button>
        </div>

        <!-- Overview Tab -->
        <div *ngIf="activeTab === 'overview'" class="tab-content">
          <div class="overview-grid">
            <!-- Recent Users -->
            <div class="overview-card">
              <div class="card-header">
                <h3>Recent Users</h3>
                <button class="btn-link" (click)="setActiveTab('users')">View All</button>
              </div>
              <div class="user-list">
                <div class="user-item" *ngFor="let user of dashboardData?.recentUsers">
                  <div class="user-avatar">
                    <img [src]="user.avatar || '/assets/images/default-avatar.png'" [alt]="user.firstName">
                  </div>
                  <div class="user-info">
                    <h4>{{ user.firstName }} {{ user.lastName }}</h4>
                    <p>{{ user.email }}</p>
                    <span class="user-role" [class]="'role-' + user.role">{{ user.role | titlecase }}</span>
                  </div>
                  <div class="user-actions">
                    <button class="btn-sm" (click)="viewUserDetails(user)">View</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Posts -->
            <div class="overview-card">
              <div class="card-header">
                <h3>Recent Posts</h3>
                <button class="btn-link" (click)="setActiveTab('content')">Moderate</button>
              </div>
              <div class="post-list">
                <div class="post-item" *ngFor="let post of dashboardData?.recentPosts">
                  <div class="post-content">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.content | slice:0:100 }}...</p>
                    <div class="post-meta">
                      <span>By {{ post.author }}</span>
                      <span>{{ post.category | titlecase }}</span>
                      <span>{{ post.createdAt | date:'short' }}</span>
                    </div>
                  </div>
                  <div class="post-actions">
                    <button class="btn-sm" (click)="viewPostDetails(post)">View</button>
                    <button class="btn-sm danger" (click)="moderatePost(post, 'delete')">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pending Reports -->
            <div class="overview-card">
              <div class="card-header">
                <h3>Pending Reports</h3>
                <span class="badge">{{ dashboardData?.pendingReports?.length || 0 }}</span>
              </div>
              <div class="reports-list">
                <div class="report-item" *ngFor="let report of dashboardData?.pendingReports">
                  <div class="report-content">
                    <h4>{{ report.reason }}</h4>
                    <p>{{ report.description }}</p>
                    <div class="report-meta">
                      <span>Reported by: {{ report.reporterId }}</span>
                      <span>{{ report.createdAt | date:'short' }}</span>
                    </div>
                  </div>
                  <div class="report-actions">
                    <button class="btn-sm" (click)="resolveReport(report, 'resolved')">Resolve</button>
                    <button class="btn-sm danger" (click)="resolveReport(report, 'dismissed')">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Management Tab -->
        <div *ngIf="activeTab === 'users'" class="tab-content">
          <div class="users-section">
            <div class="section-header">
              <h2>User Management</h2>
              <div class="filters">
                <select [(ngModel)]="userFilter" (change)="filterUsers()">
                  <option value="all">All Users</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <input type="text" placeholder="Search users..." [(ngModel)]="userSearch" (input)="searchUsers()">
              </div>
            </div>

            <div class="users-table">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let user of filteredUsers">
                    <td>
                      <div class="user-cell">
                        <img [src]="user.avatar || '/assets/images/default-avatar.png'" [alt]="user.firstName" class="user-avatar-sm">
                        <div>
                          <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                          <div class="user-email">{{ user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select [value]="user.role" (change)="updateUserRole(user, $event)">
                        <option value="user">User</option>
                        <option value="expert">Expert</option>
                        <option value="garage_owner">Garage Owner</option>
                        <option value="vendor">Vendor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <span class="status-badge" [class]="'status-' + (user.isActive ? 'active' : 'inactive')">
                        {{ user.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td>{{ user.createdAt | date:'short' }}</td>
                    <td>
                      <button class="btn-sm" [class.danger]="user.isActive" [class.success]="!user.isActive"
                              (click)="toggleUserStatus(user)">
                        {{ user.isActive ? 'Deactivate' : 'Activate' }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Content Moderation Tab -->
        <div *ngIf="activeTab === 'content'" class="tab-content">
          <div class="moderation-section">
            <div class="section-header">
              <h2>Content Moderation</h2>
              <div class="moderation-stats">
                <span>Pending: {{ pendingPostsCount }}</span>
                <span>Reported: {{ reportedPostsCount }}</span>
              </div>
            </div>

            <div class="moderation-queue">
              <div class="moderation-item" *ngFor="let post of postsToModerate">
                <div class="post-content">
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.content }}</p>
                  <div class="post-meta">
                    <span>Author: {{ post.author }}</span>
                    <span>Category: {{ post.category }}</span>
                    <span>Created: {{ post.createdAt | date:'short' }}</span>
                  </div>
                </div>
                <div class="moderation-actions">
                  <button class="btn-sm success" (click)="moderatePost(post, 'approve')">Approve</button>
                  <button class="btn-sm warning" (click)="moderatePost(post, 'reject')">Reject</button>
                  <button class="btn-sm danger" (click)="moderatePost(post, 'delete')">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div *ngIf="activeTab === 'analytics'" class="tab-content">
          <div class="analytics-section">
            <h2>Platform Analytics</h2>

            <div class="analytics-grid">
              <div class="analytics-card">
                <h3>User Growth</h3>
                <div class="chart-placeholder">
                  <p>User registration trends chart would go here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Content Activity</h3>
                <div class="chart-placeholder">
                  <p>Posts and engagement metrics chart would go here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Revenue Trends</h3>
                <div class="chart-placeholder">
                  <p>Revenue and booking trends chart would go here</p>
                </div>
              </div>

              <div class="analytics-card">
                <h3>Popular Categories</h3>
                <div class="chart-placeholder">
                  <p>Post categories popularity chart would go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 2rem;
      max-width: 1400px;
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

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .metric-icon {
      font-size: 2.5rem;
    }

    .metric-content h3 {
      margin: 0;
      font-size: 2rem;
      color: #2c3e50;
    }

    .metric-content p {
      margin: 0.5rem 0 0 0;
      color: #7f8c8d;
    }

    .growth {
      font-size: 0.9rem;
      font-weight: 500;
    }

    .growth.positive {
      color: #27ae60;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #ecf0f1;
      margin-bottom: 2rem;
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

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .overview-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .card-header h3 {
      margin: 0;
      color: #2c3e50;
    }

    .badge {
      background: #e74c3c;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .user-list, .post-list, .reports-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .user-item, .post-item, .report-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #ecf0f1;
      border-radius: 6px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 1rem;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info h4 {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
    }

    .user-info p {
      margin: 0;
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .user-role {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .role-admin { background: #e74c3c; color: white; }
    .role-expert { background: #3498db; color: white; }
    .role-garage_owner { background: #27ae60; color: white; }
    .role-vendor { background: #f39c12; color: white; }
    .role-user { background: #95a5a6; color: white; }

    .post-content h4 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .post-content p {
      margin: 0 0 0.5rem 0;
      color: #555;
    }

    .post-meta, .report-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.8rem;
      color: #7f8c8d;
    }

    .btn-link {
      background: none;
      border: none;
      color: #3498db;
      cursor: pointer;
      text-decoration: underline;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .btn-sm.success { background: #27ae60; color: white; }
    .btn-sm.warning { background: #f39c12; color: white; }
    .btn-sm.danger { background: #e74c3c; color: white; }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .filters {
      display: flex;
      gap: 1rem;
    }

    .filters select, .filters input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .users-table table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .users-table th, .users-table td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ecf0f1;
    }

    .users-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar-sm {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .user-email {
      color: #7f8c8d;
      font-size: 0.8rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .status-active { background: #d4edda; color: #155724; }
    .status-inactive { background: #f8d7da; color: #721c24; }

    .moderation-queue {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .moderation-item {
      background: white;
      border: 1px solid #ecf0f1;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .moderation-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .analytics-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .analytics-card h3 {
      margin: 0 0 1rem 0;
      color: #2c3e50;
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
    }

    @media (max-width: 768px) {
      .admin-dashboard {
        padding: 1rem;
      }

      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .tabs {
        flex-direction: column;
      }

      .overview-grid {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .filters {
        flex-direction: column;
        width: 100%;
      }

      .users-table {
        overflow-x: auto;
      }

      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export default class AdminComponent implements OnInit {
  dashboardData: AdminDashboardData | null = null;
  activeTab: string = 'overview';
  userFilter: string = 'all';
  userSearch: string = '';
  filteredUsers: User[] = [];
  postsToModerate: Post[] = [];
  pendingPostsCount: number = 0;
  reportedPostsCount: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.dashboardService.getAdminDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.filteredUsers = data.recentUsers;
        this.postsToModerate = data.recentPosts.filter(post => !post.isAccepted);
        this.pendingPostsCount = this.postsToModerate.length;
        this.reportedPostsCount = data.pendingReports.length;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  filterUsers() {
    // TODO: Implement user filtering
    console.log('Filtering users:', this.userFilter);
  }

  searchUsers() {
    // TODO: Implement user search
    console.log('Searching users:', this.userSearch);
  }

  viewUserDetails(user: User) {
    // TODO: Open user details modal/page
    console.log('View user details:', user);
  }

  updateUserRole(user: User, event: any) {
    const newRole = event.target.value;
    this.dashboardService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        user.role = newRole;
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error updating user role:', error);
        // TODO: Show error message
      }
    });
  }

  toggleUserStatus(user: User) {
    const action = user.isActive ? this.dashboardService.deactivateUser : this.dashboardService.activateUser;
    action.call(this.dashboardService, user.id).subscribe({
      next: () => {
        user.isActive = !user.isActive;
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error updating user status:', error);
        // TODO: Show error message
      }
    });
  }

  viewPostDetails(post: Post) {
    // TODO: Open post details modal/page
    console.log('View post details:', post);
  }

  moderatePost(post: Post, action: 'approve' | 'reject' | 'delete') {
    this.dashboardService.moderatePost(post.id, action).subscribe({
      next: () => {
        // Remove from moderation queue
        this.postsToModerate = this.postsToModerate.filter(p => p.id !== post.id);
        this.pendingPostsCount--;
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error moderating post:', error);
        // TODO: Show error message
      }
    });
  }

  resolveReport(report: Report, action: string) {
    this.dashboardService.resolveReport(report.id, action).subscribe({
      next: () => {
        // Remove from pending reports
        if (this.dashboardData) {
          this.dashboardData.pendingReports = this.dashboardData.pendingReports.filter(r => r.id !== report.id);
        }
        // TODO: Show success message
      },
      error: (error) => {
        console.error('Error resolving report:', error);
        // TODO: Show error message
      }
    });
  }
}