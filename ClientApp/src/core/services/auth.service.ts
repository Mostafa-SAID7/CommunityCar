import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService
  ) {
    const token = this.storageService.getItem('authToken');
    if (token) {
      // Load user from token or API
      this.loadCurrentUser();
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.apiService.post('/auth/login', credentials);
  }

  register(userData: any): Observable<any> {
    return this.apiService.post('/auth/register', userData);
  }

  logout(): void {
    this.storageService.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.storageService.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private loadCurrentUser(): void {
    // Implement loading current user
  }

  setToken(token: string): void {
    this.storageService.setItem('authToken', token);
  }
}