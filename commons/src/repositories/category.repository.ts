import { Category, CategoryProps } from "../domains";

export interface ICategoryRepository {
    getCategories(): Promise<Category[]>;
    createCategory(category: CategoryProps): Promise<Category>;
}