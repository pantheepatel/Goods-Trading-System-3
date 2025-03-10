import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; // Required for *ngFor
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { GujaratCity } from '../../core/enums/cities.enum';

@Component({
  selector: 'app-register',
  standalone: true, // Needed if using Angular Standalone Components
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  city: string = '';
  email: string = '';
  password: string = '';

  // Convert GujaratCity enum to an array
  cities = Object.values(GujaratCity);

  onSubmit() {
    console.log('User Data:', {
      fullName: this.fullName,
      city: this.city,
      email: this.email,
      password: this.password
    });
  }
}
