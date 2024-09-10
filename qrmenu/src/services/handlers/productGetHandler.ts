import { Context, Errors, Service } from 'moleculer';
import { MerchantNotFoundError } from '@service/commons/dist/src/shared';
import { GetProductResponseDTO } from '../../useCases/product/getProduct/getProductResponseDto';
import { GetProductRequestDTO } from '../../useCases/product/getProduct/getProductRequestDto';
import { getProduct } from '../../useCases/product/getProduct';
import { GetProductBadRequestError, GetProductMerchantNotOwnerError, GetProductNotFoundError } from '../../useCases/product/getProduct/getProductErrors';

type ProductThis = Service;
const { MoleculerError } = Errors;

export type ProductGetResponse = {
	success: boolean;
	data: GetProductResponseDTO;
};

async function productGetHandler(
	this: ProductThis,
	ctx: Context<GetProductRequestDTO>
): Promise<ProductGetResponse> {
	const { id, merchantCode } = ctx.params;
	const result = await getProduct.execute({ id, merchantCode: merchantCode.toUpperCase() });
	if(result.isErr()){
		const error = result.error;
		switch(error.constructor){
			case GetProductBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case GetProductMerchantNotOwnerError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case GetProductNotFoundError:
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

export { productGetHandler };
