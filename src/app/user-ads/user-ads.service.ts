import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAdsService {
  private baseUrl = `${environment.baseUrl}api/User/`; // Base API URL
  private productUrl = `${environment.baseUrl}api/Product/`; // Product API URL

  constructor(private http: HttpClient) {}

  getUserAds(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}myads/${email}`);
  }

  updateAdStatus(productId: string, status: string): Observable<any> {
    return this.http.post<any>(`${this.productUrl}updatestatus`, { productId, status });
  }

}
