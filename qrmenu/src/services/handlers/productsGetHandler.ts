import { Context, Errors, Service } from 'moleculer';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';
import { GetProductsResponseDTO } from '../../useCases/product/getProducts/getProductsResponseDto';
import { GetProductsRequestDTO } from '../../useCases/product/getProducts/getProductsRequestDto';
import { getProducts } from '../../useCases/product/getProducts';
import { GetProductsBadRequestError } from '../../useCases/product/getProducts/getProductsErrors';
import { IMerchantMeResponse } from '@service/commons/dist/src/types';

type ProductThis = Service;
const { MoleculerError } = Errors;

export type ProductsGetResponse = {
	success: boolean;
	data: GetProductsResponseDTO;
};

async function productsGetHandler(
	this: ProductThis,
	ctx: Context<GetProductsRequestDTO>
): Promise<ProductsGetResponse> {
	const result = await getProducts.execute({ merchantId: ctx.params.merchantId });
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case GetProductsBadRequestError:
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

export { productsGetHandler };
