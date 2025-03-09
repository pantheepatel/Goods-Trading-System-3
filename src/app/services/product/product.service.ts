import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiGetProductsUrl = `${environment.baseUrl}api/product`; // Ensure this matches your .NET API URL

  constructor(private http: HttpClient) {}

  // api/product - GET - Retrieve all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiGetProductsUrl);
  }

  // api/product/{id} - GET - Retrieve a specific product - view product details - product-view component

  // api/product - POST - Create a new product - product-add component

  // FIX: check whether the uid is needed to retrive products or not - product-card component on loop in dashboard
  // api/product/my-products - GET - Retrieve all products created by the logged in user
  // api/product/my-products/{uid} - GET - Retrieve all products created by the logged in user



  // api/product/{id} - PUT - Update a product -- phase 2
  // api/product/{id} - DELETE - Delete a product -- phase 2

}
