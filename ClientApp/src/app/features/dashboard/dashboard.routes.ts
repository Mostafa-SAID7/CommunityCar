import { Routes } from '@angular/router';
import { RoleGuard } from '../../../core/guards/role.guard';
import { UserRole } from '../../../core/utils/enums';

// Constants for route paths to improve maintainability and avoid magic strings
const ROUTE_PATHS = {
  ADMIN: 'admin',
  EXPERT: 'expert',
  GARAGE: 'garage',
  VENDOR: 'vendor',
  WILDCARD: '**'
} as const;

// Helper function to create role-based routes with error handling
const createRoleRoute = (
  path: string,
  roles: UserRole[],
  componentImport: () => Promise<any>,
  title: string
): Routes[0] => ({
  path,
  canActivate: [RoleGuard],
  data: {
    roles,
    title, // Added for better UX and SEO
    breadcrumb: title // Optional breadcrumb data
  },
  loadComponent: () => componentImport().catch(error => {
    console.error(`Failed to load component for path: ${path}`, error);
    // Re-throw to let Angular handle the error (shows error page or fallback)
    throw error;
  })
});

export const DASHBOARD_ROUTES: Routes = [
  // Admin dashboard route - requires ADMIN role
  createRoleRoute(
    ROUTE_PATHS.ADMIN,
    [UserRole.ADMIN],
    () => import('./components/admin/admin.component').then(m => m.AdminComponent),
    'Admin Dashboard'
  ),

  // Expert dashboard route - requires EXPERT role
  createRoleRoute(
    ROUTE_PATHS.EXPERT,
    [UserRole.EXPERT],
    () => import('./components/expert/expert.component').then(m => m.ExpertComponent),
    'Expert Dashboard'
  ),

  // Garage owner dashboard route - requires GARAGE_OWNER role
  createRoleRoute(
    ROUTE_PATHS.GARAGE,
    [UserRole.GARAGE_OWNER],
    () => import('./components/garage/garage.component').then(m => m.GarageComponent),
    'Garage Dashboard'
  ),

  // Vendor dashboard route - requires VENDOR role
  createRoleRoute(
    ROUTE_PATHS.VENDOR,
    [UserRole.VENDOR],
    () => import('./components/vendor/vendor.component').then(m => m.VendorComponent),
    'Vendor Dashboard'
  ),

  // Wildcard route for handling unknown dashboard paths
  // Redirects to a default route or shows an error component
  {
    path: ROUTE_PATHS.WILDCARD,
    redirectTo: ROUTE_PATHS.ADMIN, // Default redirect to admin (can be adjusted based on user role)
    pathMatch: 'full'
  }
];