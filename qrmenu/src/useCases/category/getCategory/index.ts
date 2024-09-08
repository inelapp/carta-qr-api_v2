import { categoryRepository } from "@service/commons/dist/src/repositories";
import GetCategory from "./getCategory";

const getCategory = new GetCategory(categoryRepository);

export { getCategory };