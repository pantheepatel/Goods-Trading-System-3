import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  otp: string = '';
  email: string = ''; // Get email from user input
  countdown: number = 5 * 60; // 5 minutes in seconds
  resendDisabled: boolean = true;
  interval: any;
  router: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.startCountdown();
  }

 // ✅ Fix: Define the handleInput method
 handleInput(event: any) {
  this.otp = event.target.value.replace(/\D/g, ''); // Allow only numbers
}
  startCountdown() {
    this.resendDisabled = true;
    this.countdown = 5 * 60;

    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.resendOTP();
      }
    }, 1000);
  }

  verifyOTP() {
    if (this.otp.length === 6) {
      this.authService.verifyOTP(this.email, this.otp).subscribe({
        next: () => {
          clearInterval(this.interval);
          alert('OTP Verified Successfully!');
        },
        error: () => {
          alert('Invalid OTP. Try again.');
        }
      });
    }
  }
  resendOTP() {
    this.authService.resendOTP(this.email).subscribe({
      next: () => {
        alert('New OTP Sent!');
        this.router.navigate(['/verifyEmail']); 
        this.startCountdown();
      },
      error: () => {
        alert('Error resending OTP.');
      }
    });
  }

  get formattedCountdown(): string {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}