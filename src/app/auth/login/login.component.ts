import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Required for *ngFor
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Needed if using Angular Standalone Components
  imports: [CommonModule, FormsModule, RouterLink], // Import necessary modules
  providers:[AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router)
  email: string = '';
  password: string = '';
  showPassword: boolean = false;


  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Store token & navigate
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }
}
