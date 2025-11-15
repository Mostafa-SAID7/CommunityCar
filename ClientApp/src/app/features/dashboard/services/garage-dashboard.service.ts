import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { GarageDashboardData, Booking, Mechanic, GarageService, Review, Garage } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class GarageDashboardService {

  constructor(private apiService: ApiService) { }

  getGarageDashboardData(): Observable<GarageDashboardData> {
    return this.apiService.get<GarageDashboardData>('/garage/dashboard');
  }

  getBookings(): Observable<Booking[]> {
    return this.apiService.get<Booking[]>('/garage/bookings');
  }

  updateBookingStatus(bookingId: string, status: string): Observable<any> {
    return this.apiService.put(`/garage/bookings/${bookingId}/status`, { status });
  }

  getMechanics(): Observable<Mechanic[]> {
    return this.apiService.get<Mechanic[]>('/garage/mechanics');
  }

  addMechanic(mechanicData: Partial<Mechanic>): Observable<any> {
    return this.apiService.post('/garage/mechanics', mechanicData);
  }

  updateMechanic(mechanicId: string, mechanicData: Partial<Mechanic>): Observable<any> {
    return this.apiService.put(`/garage/mechanics/${mechanicId}`, mechanicData);
  }

  removeMechanic(mechanicId: string): Observable<any> {
    return this.apiService.delete(`/garage/mechanics/${mechanicId}`);
  }

  getServices(): Observable<GarageService[]> {
    return this.apiService.get<GarageService[]>('/garage/services');
  }

  addService(serviceData: Partial<GarageService>): Observable<GarageService> {
    return this.apiService.post<GarageService>('/garage/services', serviceData);
  }

  updateService(serviceId: string, serviceData: Partial<GarageService>): Observable<GarageService> {
    return this.apiService.put<GarageService>(`/garage/services/${serviceId}`, serviceData);
  }

  getReviews(): Observable<Review[]> {
    return this.apiService.get<Review[]>('/garage/reviews');
  }

  getGarageProfile(): Observable<Garage> {
    return this.apiService.get<Garage>('/garage/profile');
  }

  updateGarageProfile(profileData: Partial<Garage>): Observable<Garage> {
    return this.apiService.put<Garage>('/garage/profile', profileData);
  }
}