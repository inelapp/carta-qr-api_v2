import { ProductProps, Product } from "src/domains";
import { IProductRepository } from "../product.repository";
import { Model } from "mongoose";
import { IProductDb, productModel } from "../../db";
import { IGetProductResponse, ProductDb, ProductFilter, ProductMap } from "../../mappers/productMap";

export class ProductImpRepository implements IProductRepository {
    private readonly productModel: Model<IProductDb>;

    constructor() {
        this.productModel = productModel;
    }

    async getProducts(filters: ProductFilter): Promise<IGetProductResponse[]> {
        try {
            const productsDb = await this.productModel
                .find({
                    $or: [
                        { _id: filters?.id },
                        { categoryId: filters?.categoryId },
                        { merchantId: filters?.merchantId },
                        { name: filters?.name },
                    ],
                })
                .populate('categoryId')
                .populate('merchantId');
            const result = productsDb.map(product => ProductMap.toDto(product as unknown as ProductDb));
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
    async getProductById(id: string): Promise<IGetProductResponse | null> {
        try {
            const productDb = await this.productModel
                .findById(id)
                .populate('categoryId')
                .populate('merchantId') as unknown;
            if (!productDb) return null;
            const result = ProductMap.toDto(productDb as ProductDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
    async updateProduct(product: Partial<ProductProps>): Promise<Product> {
        try {
            const updatedProduct = await this.productModel.findByIdAndUpdate(
                { _id: product.id },
                {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    merchantId: product.merchantId,
                    categoryId: product.categoryId,
                    image: product.image,
                    price_2: product.price_2,
                },
                { new: false }
            )
            const result = ProductMap.toDomain(updatedProduct as IProductDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async createProduct(product: ProductProps): Promise<Product> {
        try {
            const newProduct = new this.productModel({
                name: product.name,
                categoryId: product.categoryId,
                description: product.description,
                price: product.price,
                image: product.image,
                merchantId: product.merchantId,
                price_2: product.price_2,
                quantity: product.quantity,
            });
            const result = ProductMap.toDomain(await newProduct.save())
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
}