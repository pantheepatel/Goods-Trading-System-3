import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileService } from './user-profile.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]

})
export class UserProfileComponent implements OnInit {
  userProfile: any = null;
  showAllSelling = false;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const credentials = localStorage.getItem('credentials');

    // Parse the JSON and extract the email
    const email = credentials ? JSON.parse(credentials).email : '';
    console.log(email);
    if (!email) {
      console.log("Email Not Found");;
      return;
    }
    this.userProfileService.getUserProfile(email).subscribe({
      next: (data) => {
        if (data) {
          this.userProfile = data;
          console.log('User Profile:', this.userProfile);
        }
      },
      error: (err) => console.error('Error fetching profile:', err)
    });
  }


  sellingProductsToShow() {
    return this.userProfile?.sellingProducts 
      ? this.showAllSelling 
        ? this.userProfile.sellingProducts 
        : this.userProfile.sellingProducts.slice(0, 5)
      : [];
  }

  toggleSellingView() {
    this.showAllSelling = !this.showAllSelling;
  }


}
