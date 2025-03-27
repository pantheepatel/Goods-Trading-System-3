import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FavouriteService } from './favourite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite-ads',
  templateUrl: './favourites.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: any[] = []; 

  constructor(private favouriteService: FavouriteService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadFavouriteAds();
  }

  loadFavouriteAds() {
    const credentials = localStorage.getItem('credentials');
    const email = credentials ? JSON.parse(credentials).email : '';

    if (!email) {
      console.log("Email Not Found");
      return;
    }

    this.favouriteService.getFavouriteAds(email).subscribe({
      next: (data) => {
        this.favourites = data; 
        console.log('Favourite Ads:', this.favourites);
      },
      error: (err) => console.error('Error fetching favourites:', err)
    });
  }

  unfavouriteProduct(product: any): void {
    const credentials = localStorage.getItem('credentials');
    const email = credentials ? JSON.parse(credentials).email : '';
  
    console.log('Removing product:', product);
    console.log('Extracted Product ID:', product?.productId); // Safe check
  
    if (!email) {
      console.log("Email Not Found");
      return;
    }
  
    if (!product?.productId) {
      console.log("Product ID Not Found");
      return;
    }
  
    this.favouriteService.removeFavourite(email, product.productId).subscribe({
      next: () => {
        console.log(`Product ${product.title} removed from favourites`);
        this.favourites = this.favourites.filter(p => p.productId !== product.productId);
      },
      error: (error) => {
        console.error("Error removing favourite:", error);
      }
    });
  }
  
  getRelativeTime(postedDate: string): string {
    const currentDate = new Date();
    const posted = new Date(postedDate);
    const diffInDays = Math.floor((currentDate.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted yesterday";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `Posted ${Math.floor(diffInDays / 30)} months ago`;
    return `Posted ${Math.floor(diffInDays / 365)} years ago`;
  }
}
