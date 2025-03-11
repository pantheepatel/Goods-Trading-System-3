import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  ngOnInit() {
    this.checkTokenExpiration();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const expiration = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days in ms
        localStorage.setItem('token', response.token);
        localStorage.setItem('token_expiration', expiration.toString());

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err?.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  checkTokenExpiration() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');

    if (token && expiration) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expiration, 10)) {
        // Token expired, log out user
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        this.router.navigate(['/auth/login']);
      }
    }
  }
}
