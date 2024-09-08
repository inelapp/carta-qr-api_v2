import { Context, Errors, Service } from 'moleculer';
import { CreateCategoryResponseDTO } from '../../useCases/category/createCategory/createCategoryResponseDTO';
import { CreateCategoryRequestDTO } from '../../useCases/category/createCategory/createCategoryRequestDTO';
import { createCategory } from '../../useCases/category/createCategory';
import { CreateCategoryBadRequestError } from '../../useCases/category/createCategory/createCategoryErrors';

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
	const { name, description, active, merchantId } = ctx.params;

	const result = await createCategory.execute({ name, description, active, merchantId });
	
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case CreateCategoryBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			default:
				throw new MoleculerError(error.message, 500, result.constructor.name);
		} 
	}

	return {
		success: true,
		data: result.value
	};
}

export { categoryCreateHandler };
