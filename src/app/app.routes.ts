import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { UserChatComponent } from './user-chat/user-chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user/chat', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sell/:category', component: ProductAddComponent },
  { path: 'user/chat', component: UserChatComponent },
  // { path: 'auth/**', redirectTo: 'auth/login' }, // Redirect unknown route of auth to login
  { path: '**', redirectTo: 'user/chat' } // Redirect unknown routes, or can show 404 page
];

// Provide routing in main.ts
export const appRouting = [
  provideRouter(routes, withComponentInputBinding()),
];
