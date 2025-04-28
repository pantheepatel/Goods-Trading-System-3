import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Goods-Trading-System';
  products: any[] = [];
  showNavbarAndFooter = true;
  isDashboardPage(): boolean {
    return this.router.url === '/dashboard'; 
  }
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
  
    if (token) {

      // this.router.navigate(['/dashboard']);
    } else {

      alert('You need to login first.');
      this.router.navigate(['/auth/login']);
    }
      this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbarAndFooter = !event.url.includes('/auth/login') &&
                                   !event.url.includes('/auth/register') &&
                                   !event.url.includes('/auth/verify-email');
      });
  }

  ngOnDestroy() {
    // Prevent memory leaks by unsubscribing
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
