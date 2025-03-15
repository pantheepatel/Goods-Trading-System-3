import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUserDTO, RegisterUserDTO,SendOTPDTO } from '../core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.baseUrl}api/auth/`; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Store token in local storage for 2 days
  storeToken(token: string) {
    const expirationTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days
    localStorage.setItem('token', token);
    localStorage.setItem('token_expiry', expirationTime.toString());
  }

  // Get token from local storage (check expiration)
  getToken() {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('token_expiry');
    
    if (token && expiry && new Date().getTime() < +expiry) {
      return token;
    } else {
      this.logout(); // Remove expired token
      return null;
    }
  }

  // Remove token
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
  }

  // Login API
  login(credentials: LoginUserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, credentials);
  }

  // Register API (sends OTP)
  register(userData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, userData);
  }

  // Verify OTP API
  verifyOTP(email: string, enteredOtp: string,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, // Ensure `token` is valid
    });
    const payload = {
      enteredOtp: enteredOtp,
      email: email 
    };  
    console.log(payload);
    return this.http.post<any>(`${this.baseUrl}verifyOTP`, payload, {headers,withCredentials:true});
  }

  resendOTP(email: string, token: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getOTP/${email}`, {
      withCredentials: true,  // Correct placement of options
    });
  }
  
}

  // api/auth/logout - POST - Logout -- no api
  // api/auth/verify-email - POST - Verify email via OTP
  // api/auth/resend-verfication-email - POST - Resend verification email
  // api/user/profile - GET - Retrieve user profile

  

  // api/user/profile - PUT - Update user profile -- phase 2
