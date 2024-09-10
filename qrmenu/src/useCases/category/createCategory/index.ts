import { categoryRepository, merchantRepository } from '@service/commons/dist/src/repositories';
import CreateCategory from './createCategory';

const createCategory = new CreateCategory(categoryRepository, merchantRepository);

export { createCategory };
