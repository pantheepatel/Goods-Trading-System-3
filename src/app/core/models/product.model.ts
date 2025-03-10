import { ProductCategory } from '../enums/category.enum';
import { ProductStatus } from '../enums/product-status.enum';
import { User, UserProfileDTO } from './user.model';

export class Category {
    constructor(
        public readonly categoryId: string, // Auto-generated by backend
        public categoryName: string
    ) { }
}

// this class is to be used in get product, update product
export class Product {
    constructor(
        public readonly productId: string,
        public title: string,
        public model: string,
        public description: string,
        public price: number,
        public city: string,
        public readonly postedDate: Date,
        public categoryId: string,
        public category: ProductCategory,
        public purchaseYear: number, // Changed to number (year only)
        public images: string[],
        public status: ProductStatus,
        public readonly sellerId: string,
        public seller: UserProfileDTO
    ) { }
}

export class CreateProduct {
    constructor(
        public title: string,
        public model: string,
        public description: string,
        public price: number,
        public city: string,
        public category: ProductCategory,
        public purchaseYear: number,
        public images: string[],
        public status: ProductStatus
    ) { }
}
export class AddProductDTO {
    constructor(
        public title: string,
        public model: string,
        public description: string,
        public price: number,
        public city: string,
        public categoryId: string,
        public purchaseYear: Date,
        public images: string[]
    ) { }
}
export class UpdateProductDTO {
    constructor(
        public productId: string, // Required to identify the product
        public title?: string,
        public model?: string,
        public description?: string,
        public price?: number,
        public city?: string,
        public categoryId?: string,
        public purchaseYear?: Date,
        public images?: string[],
        public status?: ProductStatus
    ) { }
}
export class ProductListItem {
    constructor(
        public readonly productId: string,
        public title: string,
        public price: number,
        public city: string,
        public postedDate: Date,
        public category: Category,
        public images: string[],
        public status: ProductStatus
    ) { }
}

