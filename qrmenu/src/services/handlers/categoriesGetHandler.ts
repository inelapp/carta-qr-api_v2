import { Context, Errors, Service } from 'moleculer';
import { CreateCategoryRequestDTO } from '../../useCases/category/createCategory/createCategoryRequestDTO';
import { GetCategoriesResponseDTO } from '../../useCases/category/getCategories/getCategoriesResponseDTO';
import { getCategories } from '../../useCases/category/getCategories';
import { GetCategoriesRequestDTO } from 'src/useCases/category/getCategories/getCategoriesRequestDTO';
import { IMerchantMeResponse } from '@service/commons/dist/src/types';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';

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
	const result = await getCategories.execute({ merchantId: ctx.params.merchantId });
	
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case MerchantNotFoundError:
				throw new MoleculerError(error.message, 404, error.constructor.name);
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
