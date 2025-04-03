import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product/product.service';
import { GetProductDTO } from '../core/models/product.model';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service';
import { FavouriteService } from '../favourites/favourite.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: (GetProductDTO & { relativeDate: string, isFavorite: boolean })[] = [];
  filteredProducts: (GetProductDTO & { relativeDate: string, isFavorite: boolean })[] = [];
  selectedCategory: string | null = null;
  selectedCity: string | null = null;
  selectedPriceSort: 'asc' | 'desc' | null = null;
  isDashboardPage: boolean = true;
  searchQuery: string = '';
  email: string = '';
  constructor(
    private productService: ProductService,
    private router: Router,
    private filterService: FilterService,
    private favouriteService: FavouriteService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchProducts();

    this.filterService.categoryFilter$.subscribe(category => {
      this.selectedCategory = category;
      this.applyFilters();
    });

    this.filterService.cityFilter$.subscribe(city => {
      this.selectedCity = city;
      this.applyFilters();
    });

    this.filterService.priceSort$.subscribe(order => {
      this.selectedPriceSort = order;
      this.applyFilters();
    });
    this.filterService.searchQuery$.subscribe(query => {
      this.searchQuery = query ?? '';
      this.fetchSearchResults(query);
    });
  }

  fetchSearchResults(query: string | null) {
    const credentials = localStorage.getItem('credentials');
    const email = credentials ? JSON.parse(credentials).email : '';
  
    if (!email) {
      console.log("Email Not Found");
      return;
    }
  
    const searchQuery = query ?? ''; // 🔹 Ensure 'query' is always a string
  
    if (!searchQuery.trim()) { // If query is empty, load all products
      this.fetchProducts();
      return;
    }
  
    this.productService.searchProducts(email, searchQuery).subscribe({
      next: (results) => {
        console.log('Search Results:', results);
        this.filteredProducts = results.map(product => ({
          ...product,
          relativeDate: this.getRelativeTime(new Date(product.postedDate)),
          isFavorite: product.isFavorite ?? false 
        }));
      },
      error: (error) => {
        console.error("Error fetching search results:", error);
        this.filteredProducts = [];
      }
    });
  }
  

  onSearch() {
    this.filterService.setSearchQuery(this.searchQuery);
  }

  fetchProducts(): void {
    const credentials = localStorage.getItem('credentials');
    const storedEmail = credentials ? JSON.parse(credentials).email : '';

    if (!storedEmail) {
      console.log("Email Not Found");
      return;
    }

    this.productService.getProducts(storedEmail).subscribe({
      next: (response) => {
        this.products = response.map(product => ({
          ...product,
          relativeDate: this.getRelativeTime(new Date(product.postedDate)),
          isFavorite: product.isFavorite ?? false
        })) || [];

        this.filteredProducts = [...this.products]; // Keep the original order
        this.applyFilters();
      },
      error: (error) => {
        console.error("Error fetching products:", error);
        this.products = [];
      }
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      return (!this.selectedCategory || product.categoryName === this.selectedCategory) &&
        (!this.selectedCity || product.city === this.selectedCity);
    });

    if (this.selectedPriceSort) {
      this.filteredProducts.sort((a, b) => {
        return this.selectedPriceSort === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
  }

  setPriceSort(order: 'asc' | 'desc') {
    this.filterService.setPriceSort(order);
  }

  getRelativeTime(postedDate: Date): string {
    const currentDate = new Date();
    const diffInDays = Math.floor((currentDate.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));

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

  toggleFavourite(product: GetProductDTO & { isFavorite: boolean }): void {
    const credentials = localStorage.getItem('credentials');
    const email = credentials ? JSON.parse(credentials).email : '';

    if (!email) {
      console.log("Email Not Found");
      return;
    }
    window.location.reload();
    if (product.isFavorite) {
      this.favouriteService.removeFavourite(email, product.productId).subscribe({
        next: () => {
          product.isFavorite = false;
          console.log(`Removed ${product.title} from favourites`);
        },
        error: (error) => {
          console.error("Error removing favourite:", error);
        }
      });
    } else {
      this.favouriteService.addToFavourites(email, product.productId).subscribe({
        next: () => {
          product.isFavorite = true;
          console.log(`Added ${product.title} to favourites`);
        },
        error: (error) => {
          console.error("Error adding favourite:", error);
        }
      });
    }
  }
}
