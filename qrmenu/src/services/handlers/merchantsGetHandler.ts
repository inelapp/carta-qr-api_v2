import { Context, Errors, Service } from 'moleculer';
import { GetMerchantsResponseDto } from '../../useCases/merchant/getMerchants/getMerchantsResponseDto';
import { GetMerchantsRequestDto } from '../../useCases/merchant/getMerchants/getMerchantsRequestDto';
import { getMerchants } from '../../useCases/merchant/getMerchants';
import { GetMerchantsBadRequestError } from '../../useCases/merchant/getMerchants/getMerchantsErrors';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantGetResponse = {
	success: boolean;
	data: GetMerchantsResponseDto[];
};

async function merchantsGetHandler(
	this: MerchantThis,
	ctx: Context<GetMerchantsRequestDto>
): Promise<MerchantGetResponse> {
	const result = await getMerchants.execute(ctx.params);
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
			case GetMerchantsBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			default:
				throw new MoleculerError(error.message, 500, error.constructor.name);
		} 
	}

	return {
		success: true,
		data: result.value
	};
}

export { merchantsGetHandler };
