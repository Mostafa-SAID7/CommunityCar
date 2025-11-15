import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserRole } from '../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as UserRole[];
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.notificationService.showWarning('Please login to access this page');
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (requiredRoles && !requiredRoles.includes(user.role as UserRole)) {
      this.notificationService.showError('You do not have permission to access this page');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}