import { ICategoryRepository } from "./category.repository";
import { CategoryImplRepository } from "./impl/categoryImpRepository";

const categoryRepository = new CategoryImplRepository();

export {
    categoryRepository,
    ICategoryRepository
}
