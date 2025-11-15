import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          if (error.status === 401) {
            errorMessage = 'Unauthorized access';
          } else if (error.status === 403) {
            errorMessage = 'Forbidden access';
          } else if (error.status === 404) {
            errorMessage = 'Resource not found';
          } else if (error.status >= 500) {
            errorMessage = 'Server error';
          } else {
            errorMessage = error.error?.message || error.message;
          }
        }

        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}