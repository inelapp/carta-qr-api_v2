import { Context, Errors, Service } from 'moleculer';
import { CreateMerchantResponseDto } from '../../useCases/merchant/createMerchant/createMerchantResponseDto';
import { CreateMerchantRequestDto } from '../../useCases/merchant/createMerchant/createMerchantRequestDto';
import { createMerchant } from '../../useCases/merchant/createMerchant';
import CreateMerchantBadRequestError from '../../useCases/merchant/createMerchant/createMerchantErrors';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantCreateResponse = {
	success: boolean;
	data: CreateMerchantResponseDto;
};

async function merchantCreateHandler(
	this: MerchantThis,
	ctx: Context<CreateMerchantRequestDto>
): Promise<MerchantCreateResponse> {
	const result = await createMerchant.execute(ctx.params);
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
			case CreateMerchantBadRequestError:
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

export { merchantCreateHandler };
