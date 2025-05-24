import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/landing/landing.routes').then(m => m.LANDING_ROUTES)
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard'
  },
  /*
  {
    path: 'applications',
    loadChildren: () => import('./features/applications/applications.routes').then(m => m.APPLICATIONS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: 'companies',
    loadChildren: () => import('./features/companies/companies.routes').then(m => m.COMPANIES_ROUTES),
    canActivate: [authGuard]
  }
  */
  {
    path: 'forbidden',
    loadComponent: () => import('./features/forbidden.component').then(m => m.ForbiddenComponent)
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/unauthorized.component').then(m => m.UnauthorizedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found.component').then(m => m.NotFoundComponent)
  }
];
