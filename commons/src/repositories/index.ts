import { ICategoryRepository } from "./category.repository";
import { CategoryImplRepository } from "./impl/categoryImpRepository";
import { MerchantImpRepository } from "./impl/merchantImpRepository";
import { ProductImpRepository } from "./impl/productImpRepository";
import { IMerchantRepository } from "./merchant.repositoy";
import { IProductRepository } from "./product.repository";

const categoryRepository = new CategoryImplRepository();
const merchantRepository = new MerchantImpRepository();
const productRepository = new ProductImpRepository();

export {
    categoryRepository,
    ICategoryRepository,
    merchantRepository,
    IMerchantRepository,
    productRepository,
    IProductRepository
}
