import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api.service';
import { VendorDashboardData, Product, Order } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class VendorDashboardService {

  constructor(private apiService: ApiService) { }

  getVendorDashboardData(): Observable<VendorDashboardData> {
    return this.apiService.get<VendorDashboardData>('/vendor/dashboard');
  }

  getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>('/vendor/products');
  }

  addProduct(productData: Partial<Product>): Observable<any> {
    return this.apiService.post('/vendor/products', productData);
  }

  updateProduct(productId: string, productData: Partial<Product>): Observable<any> {
    return this.apiService.put(`/vendor/products/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.apiService.delete(`/vendor/products/${productId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.apiService.get<Order[]>('/vendor/orders');
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.apiService.put(`/vendor/orders/${orderId}/status`, { status });
  }

  getInventory(): Observable<any[]> {
    return this.apiService.get('/vendor/inventory');
  }

  updateInventory(productId: string, stock: number): Observable<any> {
    return this.apiService.put(`/vendor/inventory/${productId}`, { stock });
  }

  getSalesAnalytics(): Observable<any[]> {
    return this.apiService.get('/vendor/analytics/sales');
  }

  getVendorProfile(): Observable<any> {
    return this.apiService.get('/vendor/profile');
  }

  updateVendorProfile(profileData: any): Observable<any> {
    return this.apiService.put('/vendor/profile', profileData);
  }

  uploadProductImage(productId: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.apiService.post(`/vendor/products/${productId}/images`, formData);
  }
}