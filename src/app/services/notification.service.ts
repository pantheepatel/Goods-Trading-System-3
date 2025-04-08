import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.baseUrl}api/Product`;

  constructor(private http: HttpClient) {}

  notifySeller(productId: string, buyerEmail: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/notify-seller`, { productId, buyerEmail });
  }
  generateConfirmationRequest(sellerEmail: string, buyerEmail: string, productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-confirmation-request`, {
      sellerEmail,
      buyerEmail,
      productId
    });
  }
  getNotifications(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-requests?email=${encodeURIComponent(email)}`);
  }

  sendBuyerResponse(payload: {
    productId: string;
    sellerEmail: string;
    buyerEmail: string;
    status: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/buyer-response`, payload);
  }
  completeTransaction(productId: string, sellerEmail: string, buyerEmail: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/complete`, {
      productId,
      sellerEmail,
      buyerEmail
    });
  }
}
