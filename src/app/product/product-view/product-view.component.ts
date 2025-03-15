import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-view',
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  product!: any;
  userId: string = "";

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
}
