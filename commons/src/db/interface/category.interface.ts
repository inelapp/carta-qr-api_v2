import { Schema } from "mongoose";

export interface ICategoryDb {
    _id?: string;
    name: string;
    description: string;
    merchantId: Schema.Types.ObjectId | string;
    active?: boolean | null;
    createdAt?: Date;
    updatedAt?: Date;
}