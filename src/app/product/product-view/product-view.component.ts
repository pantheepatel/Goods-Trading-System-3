import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { ProductService } from '../../services/product/product.service';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-product-view',
  standalone: true, // ✅ Ensure it's a standalone component
  imports: [CommonModule], // ✅ Enable *ngIf and *ngFor directives
  providers: [DatePipe], // Add DatePipe to providers
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  product!: any;
  userId: string = "";
  currentSlide = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private datePipe: DatePipe // Inject DatePipe
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
        console.log(product);
        this.userId = product.sellerDetails.userId;
        console.log(this.userId);
      },
      error: (err) => console.error('Error fetching product:', err),
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.product.commonDetails.images.length;
    console.log("nn");
  }

  prevSlide() {
    console.log("pp");
    this.currentSlide = (this.currentSlide - 1 + this.product.commonDetails.images.length) % this.product.commonDetails.images.length;
  }

  viewProduct(productId: string): void {
    this.router.navigate(['/product/view', productId]).then(() => {
      window.location.reload();
    });
  }

  // Function to format the Purchase Year date
  getFormattedPurchaseYear(date: string): string {
    return this.datePipe.transform(date, 'MMMM d, yyyy') || '';
  }

  // Function to format the Posted On date
  getFormattedPostedOn(date: string): string {
    return this.datePipe.transform(date, 'MMMM d, yyyy') || '';
  }
}
