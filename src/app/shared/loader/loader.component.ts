import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../core/Loader/loader-service.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-overlay" *ngIf="isLoading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading$;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading$; 
  }
}
