import { model, Schema } from "mongoose";
import { ICategoryDb } from "./interface/category.interface";

const categorySchema = new Schema<ICategoryDb>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    merchantId: { type: String, required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

const categoryModel = model<ICategoryDb>("Category", categorySchema, "category");

export { categoryModel }