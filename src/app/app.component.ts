import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Goods-Trading-System';
  products: any[] = [];
  showNavbarAndFooter = true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    // Fetch products
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    // Hide navbar & footer on login and register pages
    this.router.events.subscribe(() => {
      this.showNavbarAndFooter = ['auth/login', 'auth/register'].includes(this.router.url);
      // console.log(this.showNavbarAndFooter);
    });
  }
}


// TODO: 
// 3. otp page
// 4. after registration redirect to otp page
// 5. Save login credentials in localhost
//Flow register - verification - login