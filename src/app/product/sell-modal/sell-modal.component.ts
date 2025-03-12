import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from '../../core/enums/category.enum';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sell-modal',
  standalone: true,
  templateUrl: './sell-modal.component.html',
  imports: [CommonModule],
  styleUrls: ['./sell-modal.component.css']
})
export class SellModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  categories = Object.values(ProductCategory); // ["Car", "Bike", "Furniture", "Mobile", "Electronics"]

  constructor(private router: Router) {}

  navigateToCategory(category: string) {
    this.closeModal.emit(); // Close modal before navigating
    this.router.navigate([`/sell/${category.toLowerCase()}`]); // Go to product add page
  }
  
}
