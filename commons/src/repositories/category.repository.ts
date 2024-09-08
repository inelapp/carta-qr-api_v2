import { CategoryFilter, IGetCategoryResponse } from "../mappers";
import { Category, CategoryProps } from "../domains";

export interface ICategoryRepository {
    getCategory(filters: CategoryFilter): Promise<IGetCategoryResponse | null>;
    getCategories(filters?: CategoryFilter): Promise<IGetCategoryResponse[]>;
    createCategory(category: CategoryProps): Promise<Category>;
    updateCategory(category: Partial<CategoryProps>): Promise<Category>;
}