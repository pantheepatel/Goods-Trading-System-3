import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-view',
  standalone: true, // ✅ Ensure it's a standalone component
  imports: [CommonModule], // ✅ Enable *ngIf and *ngFor directives
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  product!: any;
  userId: string = "";
  currentSlide = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.fetchProductDetails(productId);
    }
  }

  goToChat(): void {
    if (this.userId) {
      this.router.navigate(['/chat', this.userId]);
    } else {
      console.error('User ID is missing!');
    }
  }

  fetchProductDetails(productId: string): void {
    this.productService.getProductDetails(productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log(product)
        this.userId = product.sellerDetails.userId;
        console.log(this.userId)
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.product.commonDetails.images.length;
    console.log("nn");
    
  }

  // Move to the previous slide
  prevSlide() {
    console.log("pp");

    this.currentSlide = (this.currentSlide - 1 + this.product.commonDetails.images.length) % this.product.commonDetails.images.length;
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/product/view', productId]).then(() => {
      window.location.reload();
    });
  }
}
