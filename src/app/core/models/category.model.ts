import { ProductCategory } from "../enums/category.enum";
import { ProductStatus } from "../enums/product-status.enum";
import { Category, Product } from "./product.model";
import { UserProfileDTO } from "./user.model";

export class BikeDTO extends Product {
    brand: string;
    fuelType: string;
    kilometersDriven: number;
    bikeType: string;

    constructor(
        productId: string,
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        postedDate: Date,
        categoryId: string,
        categoryName: ProductCategory,
        purchaseYear: number,
        images: string[],
        status: ProductStatus,
        sellerId: string,
        seller: UserProfileDTO,
        brand: string,
        fuelType: string,
        kilometersDriven: number,
        bikeType: string
    ) {
        super(
            productId,
            title,
            model,
            description,
            price,
            city,
            postedDate,
            categoryId,
            categoryName,
            purchaseYear,
            images,
            status,
            sellerId,
            seller
        );
        this.brand = brand;
        this.fuelType = fuelType;
        this.kilometersDriven = kilometersDriven;
        this.bikeType = bikeType;
    }
}
