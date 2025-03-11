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

  constructor(private router: Router) {}

  ngOnInit() {
    // add localstorage get method to get saved login credentials if any
    // Listen for route changes & hide navbar/footer if needed
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbarAndFooter = !event.url.includes('/auth/login') && !event.url.includes('/auth/register') && !event.url.includes('/auth/verify-email');
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
// make sure to use defined model in services instead of any.
// after registration user is being redirected on dashboard page
// even after sending email, user is getting alert of error resending OTP.
// add error directly into form instead of alert
// give different error of error in sending OTP to email and resending OTP.
// give proper msg in email verification page like otp sent successfully to this email or otp will be sent to this email.
// after 5 min timer ends and verify otp btn should be disabled.
// after timer ends it is making infinite requests to server.
// what if user send multiple requests to server for otp in specified time.
// redirect user to login page after successful verification of otp.
// toastr can be implemented to show success and error messages.
// add loader on every request to server(interceptor).
// make UI for every product added by user.
// design card to show on dashboard page as list of added product by different users.
// UI for product detail page.
// add navigation bar to make navigation easier.
// make one logo to replace default angular logo.
// add footer to show contact details.
// add validation for password, rightnow it is accepting any password of any length and any character.
// add validation for email, rightnow it is accepting any email.
