import { Schema } from "mongoose";

export interface IMerchantAuthDb {
    _id?: string;
    merchantId: string | Schema.Types.ObjectId;
    publicKey: string;
    secretKey: string;
    createdAt?: Date;
    updatedAt?: Date;
}