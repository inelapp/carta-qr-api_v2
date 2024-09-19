import { Context, Errors, Service } from 'moleculer';
import { SignResponseDto } from '../../useCases/merchant/sign/signResponseDto';
import { SignRequestDto } from '../../useCases/merchant/sign/signRequestDto';
import { sign } from '../../useCases/merchant/sign';
import { SignBadErrorRequest } from '../../useCases/merchant/sign/signErrors';

type MerchantThis = Service;
const { MoleculerError } = Errors;

export type MerchantSignResponse = {
	success: boolean;
	data: SignResponseDto;
};

async function merchantSignMeHandler(
	this: MerchantThis,
	ctx: Context<SignRequestDto>
): Promise<MerchantSignResponse> {
	const { secretKey, body, query } = ctx.params;
	const result = await sign.execute({ secretKey, body, query });
	
	if(result.isErr()){
        const error = result.error;
		switch(error.constructor){
            case SignBadErrorRequest:
                throw new MoleculerError(error.message, 400, error.constructor.name);
			default:
				throw new MoleculerError(error.message, 500, error.constructor.name);
		} 
	}

	return {
		success: true,
		data: result.value!
	};
}

export { merchantSignMeHandler };
