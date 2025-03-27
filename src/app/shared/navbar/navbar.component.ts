import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCategory } from '../../core/enums/category.enum';
import { SellModalComponent } from '../../product/sell-modal/sell-modal.component';
import { GujaratCity } from '../../core/enums/cities.enum';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service'; // ✅ Import FilterService

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
  email: string = "User";
  isModalOpen = false;
  selectedCategory: string | null = null;
  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit() {
    this.isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
    const credentials = localStorage.getItem('credentials');
    
    if (credentials) {
      try {
        const parsedCredentials = JSON.parse(credentials);
        this.email = parsedCredentials?.email || '';
      } catch (error) {
        console.error("Error parsing credentials:", error);
        this.email = '';
      }
    }
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  OpenChat() {
    this.router.navigate(['/product/view']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration'); 
    localStorage.removeItem('credentials');
    console.log('User logged out. Redirecting to login page...');
    this.router.navigate(['/auth/login']);
  }

  onCategorySelect(category: string) {
    this.filterService.setCategory(category);
  }

  onCitySelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.filterService.setCity(target.value);
  }
}
