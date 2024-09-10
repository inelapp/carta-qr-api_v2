import { categoryRepository, merchantRepository } from "@service/commons/dist/src/repositories";
import GetCategories from "./getCategories";

const getCategories = new GetCategories(categoryRepository, merchantRepository);

export { getCategories };