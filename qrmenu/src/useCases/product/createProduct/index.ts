import { merchantRepository, productRepository } from '@service/commons/dist/src/repositories';
import CreateProduct from './createProduct';

const createProduct = new CreateProduct(productRepository, merchantRepository);

export { createProduct };
