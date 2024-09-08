import mongoose, { model, Schema } from "mongoose";
import { ICategoryDb, IMerchantDb, IProductDb } from "./interface";

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
    description: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    price_2: { type: Number, required: true },
    merchantId: { type: Schema.Types.ObjectId, ref: "Merchant", required: true }
});

const categoryModel = model<ICategoryDb>("Category", categorySchema, "categories");
const merchantModel = model<IMerchantDb>("Merchant", merchantSchema, "merchants");
const productModel = model<IProductDb>("Product", productSchema, "products");

export { categoryModel, merchantModel, productModel }