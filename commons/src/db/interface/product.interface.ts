import { Schema } from "mongoose";

export interface IProductDb {
    _id: string;
    name: string;
    description: string;
    categoryId: Schema.Types.ObjectId;
    img: string;
    price: number;
    price_2: number;
    merchantId: Schema.Types.ObjectId;
}