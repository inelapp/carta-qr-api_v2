import { categoryRepository } from '@service/commons/dist/src/repositories';
import CreateCategory from './createCategory';

const createCategory = new CreateCategory(categoryRepository);

export { createCategory };
