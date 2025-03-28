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


// TODO: 

// toastr can be implemented to show success and error messages.
// make UI for every product added by user.
// design card to show on dashboard page as list of added product by different users.
// UI for product detail page.
// add navigation bar to make navigation easier.
// make one logo to replace default angular logo.
// add footer to show contact details.
// add validation for password, rightnow it is accepting any password of any length and any character.
// add validation for email, rightnow it is accepting any email.
// add validation for add product
// OTP not sent error, even if it sent successfully.
// add general option for chat in navbar, path is mentioned in routes file.