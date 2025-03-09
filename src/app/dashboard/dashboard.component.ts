import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  providers: [ProductService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private productService = inject(ProductService);
  products: any[] = []; // Store fetched products

  constructor() { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(this.products)
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
