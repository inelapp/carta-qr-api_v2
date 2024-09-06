import { createCategory } from '.';
import { CreateCategoryResponseDTO } from './createCategoryResponseDTO';

describe('Create Category', () => {
	it('should create a new category', async () => {
		const category = {
			name: 'Category 1',
			description: 'Description of category 1',
			active: true
		};

		const createdCategory: CreateCategoryResponseDTO | Error = await createCategory.execute(category);

		if (createdCategory instanceof Error) {
			expect(createdCategory).toBeInstanceOf(Error);
		} else {
			expect(createdCategory).toHaveProperty('id');
			expect(createdCategory.name).toBe(category.name);
			expect(createdCategory.description).toBe(category.description);
			expect(createdCategory.active).toBe(category.active);
		}
	});
});
