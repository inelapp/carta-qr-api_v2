import { Context, Errors, Service } from 'moleculer';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';
import { UpdateProductResponseDTO } from '../../useCases/product/updateProduct/updateProductResponseDto';
import { UpdateProductRequestDTO } from '../../useCases/product/updateProduct/updateProductRequestDto';
import { updateProduct } from '../../useCases/product/updateProduct';
import { UpdateProductBadRequestError, UpdateProductMerchantCategoryNotOwner, UpdateProductMerchantNotOwnerError } from '../../useCases/product/updateProduct/updateProductErrors';

type ProductThis = Service;
const { MoleculerError } = Errors;

export type ProductUpdateResponse = {
	success: boolean;
	data: UpdateProductResponseDTO;
};

async function productUpdateHandler(
	this: ProductThis,
	ctx: Context<UpdateProductRequestDTO>
): Promise<ProductUpdateResponse> {
	const { id, name, description, price, categoryId, quantity, merchantCode } = ctx.params;
	const result = await updateProduct.execute({ id, name, description, price, categoryId, quantity, merchantCode: merchantCode.toUpperCase() });
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case UpdateProductBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case UpdateProductMerchantNotOwnerError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case UpdateProductMerchantCategoryNotOwner:
				throw new MoleculerError(error.message, 400, error.constructor.name);
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

export { productUpdateHandler };
