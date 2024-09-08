import { Context, Errors, Service } from 'moleculer';
import { GetCategoryResponseDto } from '../../useCases/category/getCategory/getCategoryResponseDto';
import { GetCategoryRequestDto } from '../../useCases/category/getCategory/getCategoryRequestDto';
import { getCategory } from '../../useCases/category/getCategory';
import { GetCategoryBadRequestError, GetCategoryNotFoundError } from '../../useCases/category/getCategory/getCategoryErrors';

type CategoryThis = Service;
const { MoleculerError } = Errors;

export type CategoryGetResponse = {
	success: boolean;
	data: GetCategoryResponseDto;
};

async function categoryGetHandler(
	this: CategoryThis,
	ctx: Context<GetCategoryRequestDto>
): Promise<CategoryGetResponse> {
    const { id } = ctx.params;
	const result = await getCategory.execute({ id });
	
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
            case GetCategoryBadRequestError:
                throw new MoleculerError(error.message, 400, error.constructor.name);
            case GetCategoryNotFoundError:
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

export { categoryGetHandler };
