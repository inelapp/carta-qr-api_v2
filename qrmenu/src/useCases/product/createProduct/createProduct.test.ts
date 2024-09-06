import { createProduct } from '.';
import { CreateProductRequestDTO } from './createProductRequestDTO';
import { CreateProductResponseDTO } from './createProductResponseDTO';

describe('Create Product', () => {
	it('should create a new product', async () => {
		const product: CreateProductRequestDTO = {
			name: 'Product 1',
			price: 10.0,
			category: 'Category 1',
			quantity: 10,
			description: 'Description of product 1'
		};

		const createdProduct: CreateProductResponseDTO | Error = await createProduct.execute(product);

		if (createdProduct instanceof Error) {
			expect(createdProduct).toBeInstanceOf(Error);
		} else {
			expect(createdProduct).toHaveProperty('id');
			expect(createdProduct.name).toBe(product.name);
			expect(createdProduct.price).toBe(product.price);
			expect(createdProduct.category).toBe(product.category);
			expect(createdProduct.quantity).toBe(product.quantity);
		}
	});
});
