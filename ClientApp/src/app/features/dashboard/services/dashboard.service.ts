import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import {
  AdminDashboardData,
  DashboardStats,
  UserStats,
  PostStats,
  RevenueStats
} from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  // Admin Dashboard Methods
  getAdminDashboardData(): Observable<AdminDashboardData> {
    return this.apiService.get<AdminDashboardData>('/admin/dashboard');
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.apiService.get<DashboardStats>('/admin/dashboard/stats');
  }

  getUserStats(): Observable<UserStats> {
    return this.apiService.get<UserStats>('/admin/dashboard/user-stats');
  }

  getPostStats(): Observable<PostStats> {
    return this.apiService.get<PostStats>('/admin/dashboard/post-stats');
  }

  getRevenueStats(): Observable<RevenueStats> {
    return this.apiService.get<RevenueStats>('/admin/dashboard/revenue-stats');
  }

  // User Management
  getUsers(params?: any): Observable<any> {
    return this.apiService.get('/admin/users', params);
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    return this.apiService.put(`/admin/users/${userId}/role`, { role });
  }

  activateUser(userId: string): Observable<any> {
    return this.apiService.put(`/admin/users/${userId}/activate`, {});
  }

  deactivateUser(userId: string): Observable<any> {
    return this.apiService.put(`/admin/users/${userId}/deactivate`, {});
  }

  // Content Moderation
  getReportedContent(): Observable<any> {
    return this.apiService.get('/admin/reports');
  }

  moderatePost(postId: string, action: 'approve' | 'reject' | 'delete'): Observable<any> {
    return this.apiService.put(`/admin/posts/${postId}/moderate`, { action });
  }

  resolveReport(reportId: string, action: string): Observable<any> {
    return this.apiService.put(`/admin/reports/${reportId}/resolve`, { action });
  }
}