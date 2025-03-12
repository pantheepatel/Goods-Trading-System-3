import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GujaratCity } from '../../core/enums/cities.enum';
import { AddBikeDTO } from '../../core/models/category.model';
import { ProductService } from '../../services/product/product.service';
@Component({
  selector: 'app-product-add',
  standalone: true,
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductAddComponent implements OnInit {
  category: string = '';
  selectedFiles: File[] = [];
  uploadedImageUrls: string[] = []; // Store Cloudinary URLs
  maxFilesAllowed = 3;
  maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
  errorMessage: string = '';
  minDate: string = '1990-01-01';
  maxDate: string = '';

  // Form Fields
  model: string = '';
  title: string = '';
  city: string = '';
  price: number = 0;
  purchaseYear: Date = new Date();
  details: string = '';
  fuelType: string = '';
  transmissionType: string = '';
  ownerCount: number | null = null;
  kilometersDriven: number = 0;
  mobileType: string = '';
  bikeType: string = '';
  furnitureType: string = '';
  electronicType: string = '';
  brand: string = '';
  operatingSystem: string = '';
  storageCapacity: number | null = null;
  warentyPeriod: number | null = null;
  ram: number | null = null;

  cities = Object.values(GujaratCity);

  // Cloudinary Config
  cloudName = 'dwoj1o26l';  // Replace with your Cloudinary cloud name
  uploadPreset = 'Goods_Trading_System'; // Replace with your Cloudinary upload preset

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    const currentDate = new Date();
    this.maxDate = currentDate.toISOString().split('T')[0]; // Today's date
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      console.log('Category:', this.category);
    });
  }

  onFileSelect(event: any) {
    this.errorMessage = '';
    const files = event.target.files;

    if (files.length === 0) {
      this.errorMessage = 'You must upload at least 1 image.';
      return;
    }

    if (this.selectedFiles.length >= this.maxFilesAllowed) {
      this.errorMessage = `You can only upload up to ${this.maxFilesAllowed} images.`;
      return;
    }

    const file = files[0]; // Take only one file at a time

    if (file.size > this.maxFileSize) {
      this.errorMessage = `File "${file.name}" exceeds the 2MB size limit.`;
      return;
    }

    this.selectedFiles.push(file);
    console.log('Current Selected Files:', this.selectedFiles);
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    console.log('Updated Selected Files:', this.selectedFiles);
  }

  async uploadImagesToCloudinary(): Promise<boolean> {
    if (this.selectedFiles.length === 0) {
      this.errorMessage = 'Please upload at least one image before submitting.';
      return false;
    }

    this.uploadedImageUrls = []; // Clear previous uploads

    for (const file of this.selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(`Failed to upload ${file.name}.`, data);
          this.errorMessage = `Failed to upload ${file.name}. Error: ${data.error?.message || 'Unknown error'}`;
          return false;
        }

        this.uploadedImageUrls.push(data.secure_url); // Store image URL
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        this.errorMessage = `Error uploading ${file.name}. Please try again.`;
        return false;
      }
    }

    return true;
  }


  async onSubmit() {
    this.errorMessage = '';

    let missingFields: string[] = [];
    // Retrieve credentials from localStorage
    const credentials = localStorage.getItem('credentials');

    // Parse the JSON and extract the email
    const storedEmail = credentials ? JSON.parse(credentials).email : '';;
    if (!storedEmail) {
      this.errorMessage = 'User email not found. Please log in again.';
      return;
    }

    if (!this.category) missingFields.push('Category');
    if (!this.model) missingFields.push('Model');
    if (!this.price) missingFields.push('Price');
    if (!this.purchaseYear) missingFields.push('Purchase Year');
    if (!this.title) missingFields.push('Title');
    if (!this.city) missingFields.push('City');
    if (!this.details) missingFields.push('Details');

    if ((this.category === 'car' || this.category === 'bike') && !this.fuelType) {
      missingFields.push('Fuel Type');
    }
    if (this.category === 'car') {
      if (!this.transmissionType) missingFields.push('Transmission Type');
      if (!this.ownerCount) missingFields.push('Owner Count');
      if (!this.kilometersDriven) missingFields.push('Kilometers Driven');
    }
    if (this.category === 'mobile') {
      if (!this.mobileType) missingFields.push('Mobile Type');
      if (!this.operatingSystem) missingFields.push('Operating System');
      if (!this.storageCapacity) missingFields.push('Storage Capacity');
      if (!this.ram) missingFields.push('RAM');
    }
    if (this.category === 'bike' && !this.bikeType) {
      missingFields.push('Bike Type');
    }
    if (this.category === 'furniture' && !this.furnitureType) {
      missingFields.push('Furniture Type');
    }
    if (this.category === 'electronics') {
      if (!this.electronicType) missingFields.push('Electronics Type');
      if (!this.warentyPeriod) missingFields.push('Warranty Period');
    }
    if (this.selectedFiles.length === 0) {
      missingFields.push('At least one image');
    }

    // Show error message if any required field is missing
    if (missingFields.length > 0) {
      this.errorMessage = `Please fill in the following required fields:\n- ${missingFields.join('\n- ')}`;
      console.log(this.errorMessage);
      return;
    }

    console.log('Uploading images to Cloudinary...');
    const uploadSuccess = await this.uploadImagesToCloudinary();
    if (!uploadSuccess) {
      console.log('Image upload failed.');
      return;
    }

    //Adding Bike Data
    const bikeData: AddBikeDTO = new AddBikeDTO(
      this.title,
      this.model,
      this.details,
      this.price,
      this.city,
      storedEmail,
      this.purchaseYear,
      this.uploadedImageUrls,
      this.brand,
      this.fuelType,
      this.kilometersDriven,
      this.bikeType

    )

    this.productService.addBikeProduct('bike', bikeData).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.errorMessage = 'Failed to create product. Please try again.';
      }
    });

    console.log('Form submitted successfully!', {
      category: this.category,
      model: this.model,
      title: this.title,
      city: this.city,
      price: this.price,
      purchaseYear: this.purchaseYear,
      details: this.details,
      fuelType: this.fuelType,
      transmissionType: this.transmissionType,
      ownerCount: this.ownerCount,
      kilometersDriven: this.kilometersDriven,
      mobileType: this.mobileType,
      operatingSystem: this.operatingSystem,
      storageCapacity: this.storageCapacity,
      ram: this.ram,
      bikeType: this.bikeType,
      furnitureType: this.furnitureType,
      electronicType: this.electronicType,
      warentyPeriod: this.warentyPeriod,
      images: this.uploadedImageUrls,
    });
  }

}
