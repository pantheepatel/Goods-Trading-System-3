import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product/product.service';
import { GetProductDTO } from '../core/models/product.model';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service'; // ✅ Import FilterService

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: (GetProductDTO & { relativeDate: string })[] = [];
  filteredProducts: (GetProductDTO & { relativeDate: string })[] = [];

  selectedCategory: string | null = null;
  selectedCity: string | null = null;

  constructor(private productService: ProductService, private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.fetchProducts();

    // ✅ Listen for category changes
    this.filterService.categoryFilter$.subscribe(category => {
      this.selectedCategory = category;
      this.applyFilters();
    });

    // ✅ Listen for city changes
    this.filterService.cityFilter$.subscribe(city => {
      this.selectedCity = city;
      this.applyFilters();
    });
  }

  fetchProducts(): void {
    const credentials = localStorage.getItem('credentials');
    const storedEmail = credentials ? JSON.parse(credentials).email : '';

    if (!storedEmail) {
      console.log("Email Not Found");
      return;
    }

    try {
      this.productService.getProducts(storedEmail).subscribe({
        next: (response) => {
          this.products = response.map(product => ({
            ...product,
            relativeDate: this.getRelativeTime(new Date(product.postedDate))
          })) || [];
          console.log(this.products);
          this.filteredProducts = [...this.products]; // Initialize with all products
          this.applyFilters();
        },
        error: (error) => {
          console.error("Error fetching products:", error);
          this.products = [];
        }
      });

    } catch (error) {
      console.error("Error parsing local storage credentials:", error);
    }
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      return (!this.selectedCategory || product.categoryName === this.selectedCategory) &&
             (!this.selectedCity || product.city === this.selectedCity);
    });
  }

  getRelativeTime(postedDate: Date): string {
    const currentDate = new Date();
    const diffInMilliseconds = currentDate.getTime() - postedDate.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted yesterday";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `Posted ${Math.floor(diffInDays / 30)} months ago`;
    return `Posted ${Math.floor(diffInDays / 365)} years ago`;
  }

  viewProduct(productId: string): void {
    if (localStorage.getItem('isEmailVerified') === 'true') {
      this.router.navigate(['/product/view', productId]);
    } else {
      alert("Please verify email to view products.");
    }
  }
}
