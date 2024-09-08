import { Context, Errors, Service } from 'moleculer';
import { UpdateMerchantResponseDto } from '../../useCases/merchant/updateMerchant/updateMerchantResponseDto';
import { UpdateMerchantRequestDto } from '../../useCases/merchant/updateMerchant/updateMerchantRequestDto';
import { updateMerchant } from '../../useCases/merchant/updateMerchant';
import { UpdateMerchantBadRequestError, UpdateMerchantNotFoundError } from '../../useCases/merchant/updateMerchant/updateMerchantErrors';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantUpdateResponse = {
	success: boolean;
	data: UpdateMerchantResponseDto;
};

async function merchantUpdateHandler(
	this: MerchantThis,
	ctx: Context<UpdateMerchantRequestDto>
): Promise<MerchantUpdateResponse> {
	const result = await updateMerchant.execute(ctx.params);
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
			case UpdateMerchantBadRequestError:
				throw new MoleculerError(error.message, 400, error.constructor.name);
			case UpdateMerchantNotFoundError:
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

export { merchantUpdateHandler };
