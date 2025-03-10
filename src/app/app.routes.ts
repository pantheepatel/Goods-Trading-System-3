import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/verifyEmail', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'auth/**', redirectTo: 'auth/login' }, // Redirect unknown route of auth to login
  { path: '**', redirectTo: 'dashboard' } // Redirect unknown routes, or can show 404 page
];

// Provide routing in main.ts
export const appRouting = [
  provideRouter(routes, withComponentInputBinding()),
];
