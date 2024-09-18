import { Context, Errors, Service } from 'moleculer';
import { CreateProductResponseDTO } from '../../useCases/product/createProduct/createProductResponseDTO';
import { CreateProductRequestDTO } from '../../useCases/product/createProduct/createProductRequestDTO';
import { createProduct } from '../../useCases/product/createProduct';
import { CreateProductBadRequestErrors, CreateProductMerchantNotOwnerError } from '../../useCases/product/createProduct/createProductErrors';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';
import { IMerchantMeResponse } from '@service/commons/dist/src/types';

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
	const { name, description, price, categoryId, quantity, merchantId } = ctx.params;
	const result = await createProduct.execute({ name, description, price, categoryId, quantity, merchantId });
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case CreateProductBadRequestErrors:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case CreateProductMerchantNotOwnerError:
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

export { productCreateHandler };
