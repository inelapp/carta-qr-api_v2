import mongoose, { model, Schema } from "mongoose";
import { ICategoryDb, IMerchantDb, IProductDb } from "./interface";
import { IMerchantAuthDb } from "./interface/merchant.auth";

mongoose.plugin((schema) => {
    schema.set('timestamps', true);
    schema.set('versionKey', false);
})

const merchantSchema = new Schema<IMerchantDb>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    merchantCode: { type: String, required: true },
    active: { type: Boolean, default: true }
});

const categorySchema = new Schema<ICategoryDb>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    merchantId: { type: Schema.Types.ObjectId, ref: "Merchant" , required: true },
    active: { type: Boolean, default: true }
});

const productSchema = new Schema<IProductDb>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: false },
    price: { type: Number, required: true },
    price_2: { type: Number, required: false },
    merchantId: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
    quantity: { type: Number, required: true },
});

const merchanAuthSchema = new Schema<IMerchantAuthDb>({
    merchantId: { type: Schema.Types.ObjectId, ref: "Merchant", required: true },
    publicKey: { type: String, required: true },
    secretKey: { type: String, required: true }
})

const categoryModel = model<ICategoryDb>("Category", categorySchema, "categories");
const merchantModel = model<IMerchantDb>("Merchant", merchantSchema, "merchants");
const productModel = model<IProductDb>("Product", productSchema, "products");
const merchantAuthModel = model<IMerchantAuthDb>("MerchantAuth", merchanAuthSchema, "merchant_auth");

export { categoryModel, merchantModel, productModel, merchantAuthModel }