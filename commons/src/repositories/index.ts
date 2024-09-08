import { ICategoryRepository } from "./category.repository";
import { CategoryImplRepository } from "./impl/categoryImpRepository";
import { MerchantImpRepository } from "./impl/merchantImpRepository";
import { IMerchantRepository } from "./merchant.repositoy";

const categoryRepository = new CategoryImplRepository();
const merchantRepository = new MerchantImpRepository();

export {
    categoryRepository,
    ICategoryRepository,
    merchantRepository,
    IMerchantRepository
}
