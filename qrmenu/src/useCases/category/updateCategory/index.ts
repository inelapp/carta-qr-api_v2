import { categoryRepository } from "@service/commons/dist/src/repositories";
import UpdateCategory from "./updateCategory";

const updateCategory = new UpdateCategory(categoryRepository);

export { updateCategory }