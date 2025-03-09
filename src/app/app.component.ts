import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Goods-Trading-System-3';
  products: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
