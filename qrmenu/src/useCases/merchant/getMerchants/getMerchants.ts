import { err, ok, Result } from "neverthrow";
import { GetMerchantsResponseDto } from "./getMerchantsResponseDto";
import { GetMerchantsBadRequestError } from "./getMerchantsErrors";
import { createInstanceOrError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { GetMerchantsRequestDto } from "./getMerchantsRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";
import { merchantGetSchema } from "@service/commons/dist/src/domains";
import { MerchantFilter } from "@service/commons/dist/src/mappers";

type Response = Result<GetMerchantsResponseDto[], GetMerchantsBadRequestError | UnexpectedError>

class GetMerchants implements UseCase<GetMerchantsRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;   

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetMerchantsRequestDto, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<MerchantFilter>(merchantGetSchema, params);

            if(instanceOrError.isErr()) {
                return err(new GetMerchantsBadRequestError(instanceOrError.error));
            }

            const result = await this.merchantRepository.getMerchants(instanceOrError.value);
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetMerchants;