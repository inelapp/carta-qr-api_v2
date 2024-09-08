export interface IMerchantDb {
    _id?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    merchantCode: string;
    active?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}