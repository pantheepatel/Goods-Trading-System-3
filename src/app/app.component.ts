import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Goods-Trading-System';
  products: any[] = [];
  showNavbarAndFooter = true;
  private routerSubscription!: Subscription;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    // Fetch products
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });

    // Listen for route changes & hide navbar/footer if needed
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbarAndFooter = !event.url.includes('/auth/login') && !event.url.includes('/auth/register') && !event.url.includes('/auth/verifyEmail');
      });
  }

  ngOnDestroy() {
    // Prevent memory leaks by unsubscribing
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}


// TODO: 
// 5. Save login credentials in localhost
//Flow register - verification - login