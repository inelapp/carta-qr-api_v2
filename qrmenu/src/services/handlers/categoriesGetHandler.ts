import { Context, Errors, Service } from 'moleculer';
import { CreateCategoryRequestDTO } from '../../useCases/category/createCategory/createCategoryRequestDTO';
import { GetCategoriesResponseDTO } from '../../useCases/category/getCategories/getCategoriesResponseDTO';
import { getCategories } from '../../useCases/category/getCategories';

type CategoryThis = Service;
const { MoleculerError } = Errors;

export type CategoryGetResponse = {
	success: boolean;
	data: GetCategoriesResponseDTO;
};

async function categoriesGetHandler(
	this: CategoryThis,
	ctx: Context<CreateCategoryRequestDTO>
): Promise<CategoryGetResponse> {
	const result = await getCategories.execute({});
	
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			default:
				throw new MoleculerError(error.message, 500, error.constructor.name);
		} 
	}

	return {
		success: true,
		data: result.value
	};
}

export { categoriesGetHandler };
