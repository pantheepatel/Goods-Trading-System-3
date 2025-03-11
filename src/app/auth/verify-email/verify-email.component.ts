import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  otp: string = '';
  email: string = JSON.parse(localStorage.getItem('credentials') || '{}')?.email || '';  // Get email from user input
  token: string = JSON.parse(localStorage.getItem('token') || '{}');  // Get email from user input
  countdown: number = 5 * 60; // 5 minutes in seconds
  resendDisabled: boolean = true;
  interval: any;
  router: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.startCountdown();
    this.resendOTP();
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
    console.log(this.otp);
    if (this.otp.length === 6) {
      // let verifyOTPObj = { "enteredOtp": this.otp, "email": this.email };
      // Retrieve token from localStorage (if stored during login)
      // const token = localStorage.getItem('authToken'); // Make sure the token exists

      // const headers = new HttpHeaders({
      //   'Content-Type': 'application/json',
      //   Authorization: `Bearer ${token}`, // Send token if required
      // });
      console.log('token is : ' + this.token);
      this.authService.verifyOTP(this.email, this.otp, this.token).subscribe({
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
    console.log(this.email);
    this.authService.resendOTP(this.email.trim(),this.token).subscribe({
      next: () => {
        alert('New OTP Sent!');
        this.router.navigate(['/verify-email']);
        this.startCountdown();
      },
      error: (e) => {
        console.log(e);
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