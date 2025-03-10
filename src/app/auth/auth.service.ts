import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUserDTO, RegisterUserDTO } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // This method will store the token in the local storage
  getToken() {
    return localStorage.getItem('token');
  }
  // This method will remove the token from the local storage
  logout() {
    localStorage.removeItem('token');
  }

  private baseUrl = `${environment.baseUrl}api/auth/`; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: LoginUserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, credentials);
  }

  register(userData: RegisterUserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register`, userData);
  }

}

  // api/auth/login - POST - Login
  // api/auth/register - POST - Register
  // api/auth/logout - POST - Logout -- no api
  // api/auth/verify-email - POST - Verify email via OTP
  // api/auth/resend-verfication-email - POST - Resend verification email
  // api/user/profile - GET - Retrieve user profile

  

  // api/user/profile - PUT - Update user profile -- phase 2
