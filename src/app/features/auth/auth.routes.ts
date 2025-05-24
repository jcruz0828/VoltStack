import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authRedirectGuard } from '../../core/guards/auth-redirect.guard';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authRedirectGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authRedirectGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]; 