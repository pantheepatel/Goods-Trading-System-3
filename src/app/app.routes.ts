import { Routes } from '@angular/router';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAdsComponent } from './user-ads/user-ads.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: UserProfileComponent },
  {path : 'notifications',component : NotificationsComponent},
  {path : 'my-ads',component:UserAdsComponent},
  {path : 'favourites',component:FavouritesComponent},
  { path: 'sell/:category', component: ProductAddComponent },
  { path: 'user/chat', component: UserChatComponent },
  { path: 'product/view/:productId', component: ProductViewComponent },
  { path: 'chat/:userId', component: UserChatComponent },
  // { path: 'auth/**', redirectTo: 'auth/login' }, // Redirect unknown route of auth to login
  { path: '**', redirectTo: 'dashboard' } // Redirect unknown routes, or can show 404 page
];

// Provide routing in main.ts
export const appRouting = [
  provideRouter(routes, withComponentInputBinding()),
];
