import { merchantRepository, productRepository } from "@service/commons/dist/src/repositories";
import GetProducts from "./getProducts";

const getProducts = new GetProducts(productRepository, merchantRepository);

export { getProducts }