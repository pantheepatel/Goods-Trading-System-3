import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Needed if using Angular Standalone Components
  imports: [CommonModule, FormsModule, RouterLink], // Import necessary modules
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed incorrect 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Validation: Check if both email and password are provided
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Store token & navigate
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error || 'Login failed. Please try again.';
      }
    });
  }
}
