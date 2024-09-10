import { ICategoryDb, IMerchantDb, IProductDb } from "../db";
import { Product } from "../domains";

export interface ProductFilter {
    id?: string;
    merchantId?: string;
    merchantCode?: string
    categoryId?: string;
    name?: string;
    active?: boolean;
}

export interface IGetProductResponse {
    id: string;
    name: string;
    price: number;
    price2: number;
    description: string;
    category: {
        id: string;
        name: string;
    };
    merchant: {
        id: string;
        name: string;
    };
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ProductDb = IProductDb & { categoryId: ICategoryDb, merchantId: IMerchantDb }

export class ProductMap {
    static toDomain(product: IProductDb): Product {
        return {
            id: product._id!,
            name: product.name,
            price: product.price,
            description: product.description,
            merchantId: product.merchantId,
            categoryId: product.categoryId,
            image: product.image
        } as Product
    }

    static toDto(product: ProductDb): IGetProductResponse {
        return {
            id: product._id!,
            name: product.name,
            price: product.price,
            price2: product.price_2,
            description: product.description,
            category: {
                id: product?.categoryId?._id!,
                name: product?.categoryId?.name
            },
            merchant: {
                id: product.merchantId._id!,
                name: product.merchantId.name
            },
            image: product.image,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}