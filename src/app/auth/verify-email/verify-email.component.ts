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
  email: string = JSON.parse(localStorage.getItem('credentials') || '{}')?.email || '';  
  token: string = localStorage.getItem('token') || ''; 

  countdown: number = 5 * 60; // 5 minutes
  resendDisabled: boolean = true;
  verifyDisabled: boolean = false; 
  message: string = ''; 
  isError: boolean = false;
  interval: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.startCountdown();
    this.sendInitialOTP();
  }

  sendInitialOTP() {
    this.authService.resendOTP(this.email, this.token).subscribe({
      next: () => {
        this.message = `OTP sent successfully to ${this.email}`;
        this.isError = false;
      },
      error: (err) => {
        if (err.status === 200 || err.status === 0) {
          this.message = `OTP sent successfully to ${this.email}`;
          this.isError = false;
        } else {
          this.message = 'Error sending OTP. Try again later.';
          this.isError = true;
        }
      }
    });
  }

  handleInput(event: any) {
    this.otp = event.target.value.replace(/\D/g, ''); 
  }

  startCountdown() {
    this.resendDisabled = true;
    this.verifyDisabled = false;  
    this.countdown = 5 * 60;

    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval); 
        this.verifyDisabled = true; 
        this.message = 'OTP expired. Please request a new one.';
        this.isError = true;
        this.resendDisabled = false;  
      }
    }, 1000);
  }

  verifyOTP() {
    if (this.otp.length === 6 && !this.verifyDisabled) {
      this.authService.verifyOTP(this.email, this.otp, this.token).subscribe({
        next: () => {
          clearInterval(this.interval);
          localStorage.setItem('isEmailVerified', 'true');
          this.message = 'OTP Verified Successfully!';
          this.isError = false;
          setTimeout(() => this.router.navigateByUrl('/dashboard'), 1000);
        },
        error: () => {
          this.message = 'Invalid OTP. Try again.';
          this.isError = true;
        }
      });
    }
  }

  resendOTP() {
    if (this.resendDisabled) return; 

    this.authService.resendOTP(this.email.trim(), this.token).subscribe({
      next: () => {
        this.message = 'New OTP sent successfully!';
        this.isError = false;
        this.startCountdown(); 
      },
      error: (err) => {
        if (err.status === 200 || err.status === 0) {  
          this.message = 'New OTP sent successfully!';
          this.isError = false;
          this.startCountdown();
        } else {
          this.message = 'Error resending OTP. Please try again.';
          this.isError = true;
        }
      }
    });
  }

  get formattedCountdown(): string {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
