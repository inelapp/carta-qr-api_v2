import { err, ok, Result } from "neverthrow";
import { GetMerchantResponseDto } from "./getMerchantResponseDto";
import { GetMerchantBadRequestError, GetMerchantNotFoundError } from "./getMerchantErrors";
import { createInstanceOrError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { GetMerchantRequestDto } from "./getMerchantRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";
import { MerchantFilter } from "@service/commons/dist/src/mappers";
import { merchantGetSchema } from "@service/commons/dist/src/domains";

type Response = Result<GetMerchantResponseDto, GetMerchantBadRequestError | GetMerchantNotFoundError | UnexpectedError>;

class GetMerchant implements UseCase<GetMerchantRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetMerchantRequestDto, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<MerchantFilter>(merchantGetSchema, params);
            if(instanceOrError.isErr()) {
                return err(new GetMerchantBadRequestError(instanceOrError.error));
            }

            const result = await this.merchantRepository.getMerchantById(params.id);
            if(!result) {
                return err(new GetMerchantNotFoundError());
            }

            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetMerchant;