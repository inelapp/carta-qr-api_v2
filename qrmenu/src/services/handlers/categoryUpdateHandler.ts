import { Context, Errors, Service } from 'moleculer';
import { UpdateCategoryResponseDto } from '../../useCases/category/updateCategory/updateCategoryResponseDto';
import { UpdateCategoryRequestDto } from '../../useCases/category/updateCategory/updateCategoryRequestDto';
import { updateCategory } from '../../useCases/category/updateCategory';
import { UpdateCategoryBadRequestError, UpdateCategoryMerchantNotOwnerError, UpdateCategoryNotFoundError } from '../../useCases/category/updateCategory/updateCategoryErrors';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';

type CategoryThis = Service;
const { MoleculerError } = Errors;

export type CategoryUpdateResponse = {
	success: boolean;
	data: UpdateCategoryResponseDto;
};

async function categoryUpdateHandler(
	this: CategoryThis,
	ctx: Context<UpdateCategoryRequestDto>
): Promise<CategoryUpdateResponse> {
	const { name, description, active, id, merchantCode } = ctx.params;

	const result = await updateCategory.execute({ name, description, active, id, merchantCode: merchantCode.toUpperCase() });
	
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case UpdateCategoryBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case UpdateCategoryMerchantNotOwnerError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case UpdateCategoryNotFoundError:
				throw new MoleculerError(error.message, 404, error.constructor.name);
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

export { categoryUpdateHandler };
