import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // This method will store the token in the local storage
  getToken() {
    return localStorage.getItem('token');
  }
  // This method will remove the token from the local storage
  logout() {
    localStorage.removeItem('token');
  }

  // api/auth/login - POST - Login
  // api/auth/register - POST - Register
  // api/auth/logout - POST - Logout -- no api
  // api/auth/verify-email - POST - Verify email via OTP
  // api/auth/resend-verfication-email - POST - Resend verification email
  // api/user/profile - GET - Retrieve user profile

  

  // api/user/profile - PUT - Update user profile -- phase 2

}
