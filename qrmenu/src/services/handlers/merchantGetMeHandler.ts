import { Context, Errors, Service } from 'moleculer';
import { getMerchantMe } from '../../useCases/merchant/getMerchantMe';
import { GetMerchantMeResponseDto } from '../../useCases/merchant/getMerchantMe/getMerchantResponseDto';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantGetMeResponse = {
	success: boolean;
	data: GetMerchantMeResponseDto;
};

async function merchantGetMeHandler(
	this: MerchantThis,
	ctx: Context<any>
): Promise<MerchantGetMeResponse> {
	const { publicKey } = ctx.params;
	const result = await getMerchantMe.execute({ publicKey });
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
			default:
				throw new MoleculerError(error.message, 500, error.constructor.name);
		} 
	}

	return {
		success: true,
		data: result.value!
	};
}

export { merchantGetMeHandler };
