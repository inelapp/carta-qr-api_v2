import { merchantRepository, productRepository } from "@service/commons/dist/src/repositories";
import UpdateProduct from "./updateProduct";

const updateProduct = new UpdateProduct(productRepository, merchantRepository);

export { updateProduct }