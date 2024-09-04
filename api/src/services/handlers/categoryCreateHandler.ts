import { Context, Errors, Service } from 'moleculer';
import { CreateCategoryResponseDTO } from '../../useCases/category/createCategory/createCategoryResponseDTO';
import { CreateCategoryRequestDTO } from '../../useCases/category/createCategory/createCategoryRequestDTO';
import { createCategory } from '../../useCases/category/createCategory';

type CategoryThis = Service;
const { MoleculerError } = Errors;

export type CategoryCreateResponse = {
	success: boolean;
	data: CreateCategoryResponseDTO;
};

async function categoryCreateHandler(
	this: CategoryThis,
	ctx: Context<CreateCategoryRequestDTO>
): Promise<CategoryCreateResponse> {
	const { name, description, active } = ctx.params;

	try {
		const product = createCategory.execute({ name, description, active });
		return {
			success: true,
			data: product as unknown as CreateCategoryResponseDTO
		};
	} catch (error) {
		throw new MoleculerError((error as Error).message, 500, 'PRODUCT_CREATE_ERROR');
	}
}

export { categoryCreateHandler };
