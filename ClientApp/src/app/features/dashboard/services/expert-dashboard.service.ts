import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { ExpertDashboardData, ConsultationRequest } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class ExpertDashboardService {

  constructor(private apiService: ApiService) { }

  getExpertDashboardData(): Observable<ExpertDashboardData> {
    return this.apiService.get<ExpertDashboardData>('/expert/dashboard');
  }

  getConsultationRequests(): Observable<ConsultationRequest[]> {
    return this.apiService.get<ConsultationRequest[]>('/expert/consultations');
  }

  acceptConsultationRequest(requestId: string): Observable<any> {
    return this.apiService.put(`/expert/consultations/${requestId}/accept`, {});
  }

  rejectConsultationRequest(requestId: string): Observable<any> {
    return this.apiService.put(`/expert/consultations/${requestId}/reject`, {});
  }

  completeConsultation(requestId: string): Observable<any> {
    return this.apiService.put(`/expert/consultations/${requestId}/complete`, {});
  }

  getExpertProfile(): Observable<any> {
    return this.apiService.get('/expert/profile');
  }

  updateExpertProfile(profileData: any): Observable<any> {
    return this.apiService.put('/expert/profile', profileData);
  }

  getEarnings(): Observable<any> {
    return this.apiService.get('/expert/earnings');
  }

  getRecentAnswers(): Observable<any> {
    return this.apiService.get('/expert/answers/recent');
  }

  updateAvailability(isAvailable: boolean): Observable<any> {
    return this.apiService.put('/expert/availability', { isAvailable });
  }
}