import { err, ok, Result } from "neverthrow";
import { ValidateSignResponseDto } from "./validateSignResponseDto";
import { ValidationMerchantCredentialsDoesntMatchError, ValidationMerchantInvalidTimestampError, ValidationMerchantPublicKeyNotFoundError } from "./validateSignErrors";
import { singClientRequest, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { ValidateSignRequestDto } from "./validateSignRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";

type Response = Result<ValidateSignResponseDto, ValidationMerchantCredentialsDoesntMatchError | ValidationMerchantInvalidTimestampError | ValidationMerchantPublicKeyNotFoundError | UnexpectedError>

class ValidateSign implements UseCase<ValidateSignRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: ValidateSignRequestDto, service?: any): Promise<Response> {
        try {
            const { publicKey, timestamp, body, signature } = params;
            const existMerchantFromPublicKey = await this.merchantRepository.getMerchantByPublickKey(publicKey);

            if(!existMerchantFromPublicKey) {
                return err(new ValidationMerchantPublicKeyNotFoundError());
            }

            if(!this.validateTimestamp(timestamp)) {
                return err(new ValidationMerchantInvalidTimestampError());
            }

            const { secretKey, merchant } = existMerchantFromPublicKey;
            const expectedSignature = singClientRequest(secretKey, body, timestamp);
            if(expectedSignature !== signature) {
                return err(new ValidationMerchantCredentialsDoesntMatchError());
            }

            return ok({ ...merchant, publicKey } as ValidateSignResponseDto);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }


    private validateTimestamp(timestamp: number): boolean {
        const maxTimeDiff = 300 // 5 minutes in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return (currentTimestamp - timestamp) <= maxTimeDiff;
    }
}

export default ValidateSign;