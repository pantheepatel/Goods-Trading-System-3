import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdsService } from './user-ads.service';

@Component({
  selector: 'app-user-ads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.css']
})
export class UserAdsComponent implements OnInit {
  userAds: any[] = [];

  constructor(private userAdsService: UserAdsService) {}

  ngOnInit(): void {
    this.loadUserAds();
  }

  loadUserAds() {
    const email = 'hgandhi1810@gmail.com'; // Replace with dynamic email
    this.userAdsService.getUserAds(email).subscribe({
      next: (ads) => {
        this.userAds = ads;
        console.log('User Ads:', ads);
      },
      error: (err) => console.error('Error fetching ads:', err)
    });
  }

   markAsSold(productId: string) {
    this.userAdsService.updateAdStatus(productId, 'Soldut').subscribe({
      next: () => {
        console.log('Marked as Sold Out:', productId);
        this.userAds = this.userAds.map(ad => 
          ad.productId === productId ? { ...ad, status: 'Soldout' } : ad
        );
      },
      error: (err) => console.error('Error updating status:', err)
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
