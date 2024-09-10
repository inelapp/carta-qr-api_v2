import { Context, Errors, Service } from 'moleculer';
import { CreateCategoryRequestDTO } from '../../useCases/category/createCategory/createCategoryRequestDTO';
import { GetCategoriesResponseDTO } from '../../useCases/category/getCategories/getCategoriesResponseDTO';
import { getCategories } from '../../useCases/category/getCategories';
import { GetCategoriesRequestDTO } from 'src/useCases/category/getCategories/getCategoriesRequestDTO';

type CategoryThis = Service;
const { MoleculerError } = Errors;

export type CategoryGetResponse = {
	success: boolean;
	data: GetCategoriesResponseDTO[];
};

async function categoriesGetHandler(
	this: CategoryThis,
	ctx: Context<GetCategoriesRequestDTO>
): Promise<CategoryGetResponse> {
	const result = await getCategories.execute({ merchantCode: ctx.params.merchantCode.toUpperCase() });
	
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
