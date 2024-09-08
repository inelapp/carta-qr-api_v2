import { ICategoryDb, IMerchantDb } from "../db/interface";
import { Category } from "../domains";

export interface IGetCategoryResponse {
    id: string;
    name: string;
    description: string;
    merchant: {
        id: string;
        name: string;
        merchantCode: string;
    };
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CategoryFilter {
    id: string;
    merchantId?: string;
    name?: string;
    active?: boolean;
}

export type CategoryDb = ICategoryDb & { merchantId: IMerchantDb }

export class CategoryMap {
    static toDomain(category: ICategoryDb): Category  {
        return {
            id: category._id!,
            name: category.name,
            description: category.description,
            active: category.active!,
            merchantId: category.merchantId,
        } as Category;
    }
    static toDto(category: CategoryDb): IGetCategoryResponse {
        return {
            id: category._id!,
            name: category.name,
            description: category.description,
            merchant: {
                id: category.merchantId._id!,
                name: category.merchantId.name,
                merchantCode: category.merchantId.merchantCode
            },
            active: category.active!,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }
}