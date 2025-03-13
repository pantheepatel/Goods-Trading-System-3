import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetProductDTO, Product } from '../../core/models/product.model';
import { AddBikeDTO, AddCarDTO, AddElectronicsDTO, AddFurnitureDTO, AddMobileDTO } from '../../core/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.baseUrl}api/product`; // Ensure this matches your .NET API URL

  constructor(private http: HttpClient) {}

  // api/product - GET - Retrieve all products on the dashboard
  getProducts(email: string): Observable<GetProductDTO[]> {
    const requestBody =  email ;
    console.log("Sending Request:", JSON.stringify(requestBody)); // Debugging
    return this.http.post<GetProductDTO[]>(
      `${this.url}/get/Products`, 
      JSON.stringify(requestBody), 
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  
  addBikeProduct(category: string, bikeData: AddBikeDTO): Observable<any> {
    return this.http.post(`${this.url}/sell/${category}`, bikeData);
  }

  addMobileProduct(category: string, mobileData : AddMobileDTO): Observable<any> {
    return this.http.post(`${this.url}/sell/${category}`, mobileData);
  }
  addCarProduct(category: string, carData : AddCarDTO): Observable<any> {
    return this.http.post(`${this.url}/sell/${category}`, carData);
  }
  addElectronicsProduct(category: string, electronicsData : AddElectronicsDTO): Observable<any> {
    return this.http.post(`${this.url}/sell/${category}`, electronicsData);
  }
  addFurnitureProduct(category: string, furnitureData : AddFurnitureDTO): Observable<any> {
    return this.http.post(`${this.url}/sell/${category}`, furnitureData);
  }

  // api/product/{id} - GET - Retrieve a specific product - view product details - product-view component

  // api/product - POST - Create a new product - product-add component

  // FIX: check whether the uid is needed to retrive products or not - product-card component on loop in dashboard
  // api/product/my-products - GET - Retrieve all products created by the logged in user
  // api/product/my-products/{uid} - GET - Retrieve all products created by the logged in user



  // api/product/{id} - PUT - Update a product -- phase 2
  // api/product/{id} - DELETE - Delete a product -- phase 2

}
