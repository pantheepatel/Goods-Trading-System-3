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
    return this.http.get<GetProductDTO[]>(`${this.url}/get/Products/${email}`);
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

  getProductDetails(productId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/GetProductDetails/${productId}`);
  }

  searchProducts(email: string, query: string): Observable<GetProductDTO[]> {
    return this.http.get<GetProductDTO[]>(`${this.url}/search/${email}/${query}`);
  }  

}
