import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common'; // Required for *ngFor
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { GujaratCity } from '../../core/enums/cities.enum';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true, // Needed if using Angular Standalone Components
  imports: [CommonModule, FormsModule, RouterLink], // Import necessary modules
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  fullName: string = '';
  city: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  // Convert GujaratCity enum to an array
  cities = Object.values(GujaratCity);

  onSubmit() {
    console.log('User Data:', {
      fullName: this.fullName,
      city: this.city,
      email: this.email,
      password: this.password
    });
    const userData = { fullName: this.fullName, city: this.city, email: this.email, password: this.password };

    this.authService.register(userData).subscribe({
      next: (response) => {
        // console.log('Registration successful:', response);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.errorMessage = err.error || 'Registration failed. Please try again.';
      }
    });
  }
}
