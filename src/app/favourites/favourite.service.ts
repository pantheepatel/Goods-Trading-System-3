import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private baseUrl = `${environment.baseUrl}api/Favourite/`; 

  constructor(private http: HttpClient) {}

  getFavouriteAds(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}get?email=${email}`);
  }
  addToFavourites(email: string, productId: string): Observable<any> {
    const body = { email, productId };
    return this.http.post(`${this.baseUrl}add?email=${email}&productId=${productId}`, {});
  }
  removeFavourite(email: string, productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}remove?email=${email}&productId=${productId}`, {});
  }
  
}
