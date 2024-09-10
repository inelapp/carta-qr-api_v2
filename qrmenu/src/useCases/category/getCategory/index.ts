import { categoryRepository, merchantRepository } from "@service/commons/dist/src/repositories";
import GetCategory from "./getCategory";

const getCategory = new GetCategory(categoryRepository, merchantRepository);

export { getCategory };