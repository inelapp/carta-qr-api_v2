import { categoryRepository } from "@service/commons/dist/src/repositories";
import GetCategories from "./getCategories";

const getCategories = new GetCategories(categoryRepository);

export { getCategories };