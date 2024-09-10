import { merchantRepository, productRepository } from "@service/commons/dist/src/repositories";
import GetProduct from "./getProduct";

const getProduct = new GetProduct(productRepository, merchantRepository);

export { getProduct }