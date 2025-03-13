import { ProductCategory } from "../enums/category.enum";
import { ProductStatus } from "../enums/product-status.enum";
import { Category, Product,AddProductDTO} from "./product.model";
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
export class AddBikeDTO extends AddProductDTO {
    constructor(
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        email:string,
        purchaseYear: Date,
        images: string[],
        public brand: string,
        public fuelType: string,
        public kilometersDriven: number,
        public bikeType: string
    ) {
        super(title, model, description, price, city,email, purchaseYear, images);
    }
}
export class AddMobileDTO extends AddProductDTO {
    constructor(
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        email:string,
        purchaseYear: Date,
        images: string[],
        public brand : string,
        public operatingSystem : string,
        public storageCapacity : number,
        public ram : number
    ) {
        super(title, model, description, price, city,email, purchaseYear, images);
    }
}
export class AddCarDTO extends AddProductDTO {
    constructor(
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        email:string,
        purchaseYear: Date,
        images: string[],
        public brand: string,
        public fuelType: string,
        public transmissionType:string,
        public kilometersDriven: number,
        public ownerCount:number
       
    ) {
        super(title, model, description, price, city,email, purchaseYear, images);
    }
}
export class AddElectronicsDTO extends AddProductDTO {
    constructor(
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        email:string,
        purchaseYear: Date,
        images: string[],
        public brand: string,
        public warentyPeriod: number,
        public electronicsType:string
       
    ) {
        super(title, model, description, price, city,email, purchaseYear, images);
    }
}
export class AddFurnitureDTO extends AddProductDTO {
    constructor(
        title: string,
        model: string,
        description: string,
        price: number,
        city: string,
        email:string,
        purchaseYear: Date,
        images: string[],
        public furnitureType:string
       
    ) {
        super(title, model, description, price, city,email, purchaseYear, images);
    }
}
