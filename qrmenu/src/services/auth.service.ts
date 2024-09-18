import { Context, Errors, ServiceSchema } from "moleculer";
import { validateMerchantSign } from "../useCases/merchant/validateSign";
import { ValidationMerchantCredentialsDoesntMatchError, ValidationMerchantInvalidTimestampError, ValidationMerchantPublicKeyNotFoundError } from "../useCases/merchant/validateSign/validateSignErrors";
import { ValidateSignRequestDto } from "../useCases/merchant/validateSign/validateSignRequestDto";

const { MoleculerError } = Errors;

const AuthService: ServiceSchema = {
    name: "auth",
    actions: {
        async validation(ctx: Context<ValidateSignRequestDto>) {
            const result = await validateMerchantSign.execute(ctx.params);
            if(result.isErr()) {
                const error = result.error;
                switch (error.constructor) {
                    case ValidationMerchantPublicKeyNotFoundError:
                        throw new MoleculerError(error.message, 404, error.constructor.name);
                    case ValidationMerchantInvalidTimestampError:
                        throw new MoleculerError(error.message, 400, error.constructor.name);
                    case ValidationMerchantCredentialsDoesntMatchError:
                        throw new MoleculerError(error.message, 400, error.constructor.name);
                    default:
                        throw new MoleculerError(error.message, 500, error.constructor.name);
                }
            } else {
                return {
                    success: true,
                    data: result.value
                }
            }
        }
    }
}

export default AuthService;