import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categoryFilter = new BehaviorSubject<string | null>(null);
  private cityFilter = new BehaviorSubject<string | null>(null);
  private priceSort = new BehaviorSubject<'asc' | 'desc' | null>(null);

  categoryFilter$ = this.categoryFilter.asObservable();
  cityFilter$ = this.cityFilter.asObservable();
  priceSort$ = this.priceSort.asObservable();

  setCategory(category: string | null) {
    this.categoryFilter.next(category);
  }

  setCity(city: string | null) {
    this.cityFilter.next(city);
  }
  setPriceSort(order: 'asc' | 'desc' | null) {
    this.priceSort.next(order);
  }
}
