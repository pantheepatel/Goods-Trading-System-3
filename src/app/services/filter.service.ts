import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private categoryFilter = new BehaviorSubject<string | null>(null);
  private cityFilter = new BehaviorSubject<string | null>(null);

  categoryFilter$ = this.categoryFilter.asObservable();
  cityFilter$ = this.cityFilter.asObservable();

  setCategory(category: string | null) {
    this.categoryFilter.next(category);
  }

  setCity(city: string | null) {
    this.cityFilter.next(city);
  }
}
