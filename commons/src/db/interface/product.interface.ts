import { Schema } from "mongoose";

export interface IProductDb {
    _id?: string;
    name: string;
    description: string;
    categoryId: Schema.Types.ObjectId | string;
    merchantId: Schema.Types.ObjectId | string;
    image: string;
    price: number;
    price_2: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}