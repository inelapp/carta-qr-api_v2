import { Context, Errors, Service } from 'moleculer';
import { getMerchant } from '../../useCases/merchant/getMerchant';
import { GetMerchantRequestDto } from '../../useCases/merchant/getMerchant/getMerchantRequestDto';
import { GetMerchantResponseDto } from '../../useCases/merchant/getMerchant/getMerchantResponseDto';
import { GetMerchantNotFoundError, GetMerchantBadRequestError } from '../../useCases/merchant/getMerchant/getMerchantErrors';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantGetResponse = {
	success: boolean;
	data: GetMerchantResponseDto;
};

async function merchantGetHandler(
	this: MerchantThis,
	ctx: Context<GetMerchantRequestDto>
): Promise<MerchantGetResponse> {
	const result = await getMerchant.execute(ctx.params);
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
			case GetMerchantBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case GetMerchantNotFoundError:
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

export { merchantGetHandler };
