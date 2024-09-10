import { CategoryProps, Category } from "src/domains";
import { ICategoryRepository } from "../category.repository";
import { categoryModel } from "../../db/mongo.schema";
import { CategoryDb, CategoryFilter, CategoryMap, IGetCategoryResponse } from "../../mappers/categoryMap";
import { Model } from "mongoose";
import { ICategoryDb } from "../../db/interface/category.interface";

export class CategoryImplRepository implements ICategoryRepository {
    private categoryEntity: Model<ICategoryDb>

    constructor() {
        this.categoryEntity = categoryModel
    }

    async getCategory(filters: CategoryFilter): Promise<IGetCategoryResponse | null> {
        try {
            const category = await this.categoryEntity
                .findOne({
                    $or: [
                        { _id: filters.id },
                        { merchantId: filters?.merchantId },
                        { name: filters?.name },
                        { active: filters?.active }
                    ]
                })
                .populate('merchantId');
            if (!category) {
                return null;
            }
            const result = CategoryMap.toDto(category as unknown as CategoryDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async getCategories(filters?: CategoryFilter): Promise<IGetCategoryResponse[]> {
        try {
            const categories = await this.categoryEntity
                .find({
                    $or: [
                        { merchantId: filters?.merchantId }
                    ]
                })
                .populate({
                    path: 'merchantId',
                    select: '_id name merchantCode'
                });
            const result = categories.map((category) => CategoryMap.toDto(category as unknown as CategoryDb));
            return result;
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

    async updateCategory(category: Partial<CategoryProps>): Promise<Category> {
        try {
            const updatedCategory = await this.categoryEntity.findOneAndUpdate(
                { _id: category.id },
                {
                    name: category.name,
                    description: category.description,
                    active: category.active
                },
                { new: false }
            );
            const result = CategoryMap.toDomain(updatedCategory as unknown as CategoryDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
}