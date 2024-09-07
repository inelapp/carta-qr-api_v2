import { ICategoryDb } from "src/db/interface/category.interface";
import { Category } from "../domains";

export class CategoryMap {
    static toDomain(category: ICategoryDb)  {
        return {
            id: category._id!,
            name: category.name,
            description: category.description,
            active: category.active!,
            merchantId: category.merchantId,
        } as Category
    }
}