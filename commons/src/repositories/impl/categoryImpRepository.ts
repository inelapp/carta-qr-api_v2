import { CategoryProps, Category } from "src/domains";
import { ICategoryRepository } from "../category.repository";
import { categoryModel } from "../../db/mongo.schema";
import { CategoryMap } from "../../mappers/categoryMap";
import { Model } from "mongoose";
import { ICategoryDb } from "../../db/interface/category.interface";

export class CategoryImplRepository implements ICategoryRepository {
    private categoryEntity: Model<ICategoryDb>

    constructor() {
        this.categoryEntity = categoryModel
    }

    async getCategories(): Promise<Category[]> {
        try {
            return await this.categoryEntity.find();
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async createCategory(category: CategoryProps): Promise<Category> {
        try {
            const newCategory = new this.categoryEntity({
                merchantId: category.merchantId,
                name: category.name,
                description: category.description,
                active: category.active
            });
            const result = CategoryMap.toDomain(await newCategory.save());
            return result
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
}