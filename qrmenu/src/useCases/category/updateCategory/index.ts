import { categoryRepository, merchantRepository } from "@service/commons/dist/src/repositories";
import UpdateCategory from "./updateCategory";

const updateCategory = new UpdateCategory(categoryRepository, merchantRepository);

export { updateCategory }