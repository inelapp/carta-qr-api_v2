import { Context, Errors, GenericObject } from "moleculer";

const { MoleculerError } = Errors;

interface ValidateMerchantCodeRequest {
    publicKey: string;
    signature: string;
    body: GenericObject;
    timestamp: number;
}

interface AuthValidationResponse {
    data: {
      id: string;
      publicKey: string;
      name: string;
      email: string;
      address: string;
    };
}

export async function authMerchant(ctx: Context<any>): Promise<void>{
    try {
        const headers = (ctx.meta as any).$requestHeaders;
        const request = ctx.params;

        const requestDto: ValidateMerchantCodeRequest =  {
            publicKey: headers['x-public-key'],
            signature: headers['x-signature'],
            body: request,
            timestamp: headers['x-timestamp']
        }
        const result: AuthValidationResponse = await ctx.call('auth.validation', requestDto);
        ctx.params.merchantId = result.data.id.toString();
    } catch (error: any) {
        throw new MoleculerError(error.message, error.code || 500, error.type || 'VALIDATION_ERROR');
    }
}

export const authenticateAndAuthorizeAll = async (ctx: Context) =>{
    await authMerchant(ctx);
}