import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { CommunityDashboardData, Post, Answer, Notification } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class CommunityDashboardService {

  constructor(private apiService: ApiService) { }

  getCommunityDashboardData(): Observable<CommunityDashboardData> {
    return this.apiService.get<CommunityDashboardData>('/community/dashboard');
  }

  getUserPosts(): Observable<Post[]> {
    return this.apiService.get<Post[]>('/community/posts/my');
  }

  getUserAnswers(): Observable<Answer[]> {
    return this.apiService.get<Answer[]>('/community/answers/my');
  }

  createPost(postData: Partial<Post>): Observable<Post> {
    return this.apiService.post<Post>('/community/posts', postData);
  }

  updatePost(postId: string, postData: Partial<Post>): Observable<Post> {
    return this.apiService.put<Post>(`/community/posts/${postId}`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.apiService.delete(`/community/posts/${postId}`);
  }

  addAnswer(postId: string, answerData: Partial<Answer>): Observable<Answer> {
    return this.apiService.post<Answer>(`/community/posts/${postId}/answers`, answerData);
  }

  updateAnswer(answerId: string, answerData: Partial<Answer>): Observable<Answer> {
    return this.apiService.put<Answer>(`/community/answers/${answerId}`, answerData);
  }

  deleteAnswer(answerId: string): Observable<any> {
    return this.apiService.delete(`/community/answers/${answerId}`);
  }

  getNotifications(): Observable<Notification[]> {
    return this.apiService.get<Notification[]>('/community/notifications');
  }

  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.apiService.put(`/community/notifications/${notificationId}/read`, {});
  }

  getAchievements(): Observable<any[]> {
    return this.apiService.get('/community/achievements');
  }

  votePost(postId: string, voteType: 'up' | 'down'): Observable<any> {
    return this.apiService.post(`/community/posts/${postId}/vote`, { voteType });
  }

  voteAnswer(answerId: string, voteType: 'up' | 'down'): Observable<any> {
    return this.apiService.post(`/community/answers/${answerId}/vote`, { voteType });
  }

  acceptAnswer(answerId: string): Observable<any> {
    return this.apiService.put(`/community/answers/${answerId}/accept`, {});
  }
}