import { Product } from './product.model';

export class User {
    constructor(
        public readonly userId: string, // Auto-generated by backend
        public fullName: string,
        public city: string,
        public email: string,
        public readonly isVerified: boolean, // Assigned by backend
        public readonly verificationDate?: Date, // Assigned after verification
        public readonly registrationDate?: Date, // Auto-generated
        public userChatToken?: string, // Generated by Stream Chat
        public sellingProducts: Product[] = [], // One-to-Many
        public favouriteProducts: Product[] = [] // Many-to-Many
    ) { }
}
export class RegisterUserDTO {
    constructor(
        public fullName: string,
        public city: string,
        public email: string,
        public password: string // Required only for registration
    ) { }
}
export class LoginUserDTO {
    constructor(
        public email: string,
        public password: string
    ) { }
}
export class UpdateUserDTO {
    constructor(
        public fullName?: string,
        public city?: string,
        public email?: string
    ) { }
}
export class VerifyUserDTO {
    constructor(
        public userId: string,
        public otp: string
    ) { }
}
export class UserProfileDTO {
    constructor(
        public userId: string,
        public fullName: string,
        public city: string,
        public isVerified: boolean,
        public sellingProducts: Product[] = [] // Only necessary fields
    ) { }
}
