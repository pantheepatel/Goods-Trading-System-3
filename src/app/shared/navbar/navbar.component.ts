import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCategory } from '../../core/enums/category.enum';
import { SellModalComponent } from '../../product/sell-modal/sell-modal.component';
import { Product } from '../../core/models/product.model';
import { GujaratCity } from '../../core/enums/cities.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, SellModalComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isProfileMenuOpen = false;
  categories = Object.values(ProductCategory);
  cities = Object.values(GujaratCity);
  isEmailVerified: boolean = false;
  credentials = localStorage.getItem('credentials');
  email = "User"
  constructor(private router: Router) {} 
  ngOnInit() {
    this.isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
    if (this.credentials) {
      const parsedCredentials = JSON.parse(this.credentials); // Convert string to object
      this.email = parsedCredentials.email; // Extract email
    } else {
      this.email = ''; // Handle case when credentials are not found
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  OpenChat(){
    this.router.navigate(['/product/view']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration'); // Ensure correct key name
    localStorage.removeItem('credentials');
  
    console.log('User logged out. Redirecting to login page...');
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
