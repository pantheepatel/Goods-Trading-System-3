import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = `${environment.baseUrl}api/User/`; // Update API URL

  constructor(private http: HttpClient) {}

  // Fetch user profile by email
  getUserProfile(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}viewprofile/${email}`);
  }

  // Check API connectivity
  checkAPI(): void {
    this.http.get(`${this.baseUrl}health-check`).subscribe({
      next: () => console.log('API is working'),
      error: (err) => console.error(' API is not reachable:', err)
    });
  }
}
