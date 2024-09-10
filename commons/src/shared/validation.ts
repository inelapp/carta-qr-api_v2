import { Context, Errors } from "moleculer";

const { MoleculerError } = Errors;

export async function validateMerchantCode(ctx: Context<any>): Promise<void>{
    try {
        const { merchantCode } = ctx.params;
        if (!merchantCode || merchantCode.trim() === '') { // Valida si es vacío o inexistente
            throw new MoleculerError('Merchant code is required', 400, 'BAD_REQUEST');
        }
        console.log('merchantCode', merchantCode);
    } catch (error: Error | any) {
        throw new MoleculerError(error.message, error.code || 500, error.type || 'VALIDATION_ERROR');
    }
}

export const checkMerchantCodeInRoute = async (ctx: Context) =>{
    await validateMerchantCode(ctx);
}