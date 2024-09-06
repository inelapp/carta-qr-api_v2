import { Context, Errors, Service } from 'moleculer';
import { CreateProductResponseDTO } from '../../useCases/product/createProduct/createProductResponseDTO';
import { CreateProductRequestDTO } from '../../useCases/product/createProduct/createProductRequestDTO';
import { createProduct } from '../../useCases/product/createProduct';

type ProductThis = Service;
const { MoleculerError } = Errors;

export type ProductCreateResponse = {
	success: boolean;
	data: CreateProductResponseDTO;
};

async function productCreateHandler(
	this: ProductThis,
	ctx: Context<CreateProductRequestDTO>
): Promise<ProductCreateResponse> {
	const { name, description, price, category, quantity } = ctx.params;

	try {
		const product = createProduct.execute({ name, description, price, category, quantity });
		return {
			success: true,
			data: product as unknown as CreateProductResponseDTO
		};
	} catch (error) {
		throw new MoleculerError((error as Error).message, 500, 'PRODUCT_CREATE_ERROR');
	}
}

export { productCreateHandler };
