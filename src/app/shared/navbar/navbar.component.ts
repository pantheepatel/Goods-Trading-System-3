import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCategory } from '../../core/enums/category.enum';
import { SellModalComponent } from '../../product/sell-modal/sell-modal.component';
import { Product } from '../../core/models/product.model';
import { GujaratCity } from '../../core/enums/cities.enum';

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

  ngOnInit() {
    this.isEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
