import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdsService } from './user-ads.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-user-ads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.css']
})
export class UserAdsComponent implements OnInit {
  userAds: any[] = [];
  showConfirmationModal = false;
  buyerEmailInput: string = '';
  selectedProductId: string = '';

  constructor(private userAdsService: UserAdsService,
    private notificationService : NotificationService
    ) { }

  ngOnInit(): void {
    this.loadUserAds();
  }

  loadUserAds() {
    // Retrieve user credentials from local storage
    const userCredentials = localStorage.getItem('credentials');

    if (userCredentials) {
      const { email } = JSON.parse(userCredentials); // Extract email
      this.userAdsService.getUserAds(email).subscribe({
        next: (ads) => {
          this.userAds = ads;
          console.log('User Ads:', ads);
        },
        error: (err) => console.error('Error fetching ads:', err)
      });
    } else {
      console.error('No user credentials found in local storage.');
    }
  }


  markAsSold(productId: string) {
    this.selectedProductId = productId;
    this.showConfirmationModal = true;
  }

  closeModal() {
    this.showConfirmationModal = false;
    this.buyerEmailInput = '';
    this.selectedProductId = '';
  }
  
  sendConfirmationRequest() {
    const credentials = localStorage.getItem('credentials');
    const sellerEmail = credentials ? JSON.parse(credentials).email : '';
  
    if (!this.buyerEmailInput || !sellerEmail || !this.selectedProductId) {
      alert('Missing required data!');
      return;
    }
  
    this.notificationService.generateConfirmationRequest(
      sellerEmail,
      this.buyerEmailInput,
      this.selectedProductId
    ).subscribe({
      next: () => {
        alert('Confirmation request sent successfully!');
        this.closeModal();
      },
      error: (err) => {
        console.error('Error sending confirmation:', err);
        this.closeModal();
      }
    });
  }
  

  deleteAd(productId: string) {
    this.userAdsService.updateAdStatus(productId, 'Delete').subscribe({
      next: () => {
        console.log('Deleted Ad:', productId);
        this.userAds = this.userAds.filter(ad => ad.productId !== productId);
      },
      error: (err) => console.error('Error deleting ad:', err)
    });
  }
}
