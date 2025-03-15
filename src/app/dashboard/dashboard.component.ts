import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product/product.service';
import { GetProductDTO } from '../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: (GetProductDTO & { relativeDate: string })[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts();
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
            relativeDate: this.getRelativeTime(new Date(product.postedDate)) // ✅ Compute relative date
          })) || [];

          console.log("Products fetched successfully:", this.products);
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
    if(localStorage.getItem('isEmailVerified')==='true'){
      this.router.navigate(['/product/view', productId]);
    }else{
      alert("Please verify email to view products.");
    }
  }
}
