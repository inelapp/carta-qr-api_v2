import { IGetProductResponse, ProductFilter } from "../mappers/productMap";
import { Product, ProductProps } from "../domains";

export interface IProductRepository {
    createProduct(product: ProductProps): Promise<Product>;
    getProducts(filters: ProductFilter): Promise<IGetProductResponse[]>;
    getProductById(id: string): Promise<IGetProductResponse | null>;
    updateProduct(product: Partial<ProductProps>): Promise<Product>;
}