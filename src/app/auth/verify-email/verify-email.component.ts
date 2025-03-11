import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  otp: string[] = ['', '', '', '', '', ''];
  resendDisabled = true;
  countdown = 30;

  constructor() {
    this.startCountdown();
  }

  startCountdown() {
    this.resendDisabled = true;
    this.countdown = 30;
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  handleInput(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < this.otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    } else if (input.value.length === 0 && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  verifyOTP() {
    const enteredOTP = this.otp.join('');
    if (enteredOTP.length === 6 && !this.otp.includes('')) {
      alert('OTP Verified Successfully!');
    } else {
      alert('Please enter all 6 digits.');
    }
  }

  resendOTP() {
    if (!this.resendDisabled) {
      this.otp = ['', '', '', '', '', ''];
      this.startCountdown();
      alert('OTP Resent!');
    }
  }

  // ✅ Fix: Use a getter function instead of inline logic in the template
  get isOtpInvalid(): boolean {
    return this.otp.includes('') || this.otp.join('').length !== 6;
  }
}
