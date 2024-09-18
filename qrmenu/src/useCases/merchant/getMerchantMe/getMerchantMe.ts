import { Ok, ok, Result } from "neverthrow";
import { GetMerchantMeResponseDto } from "./getMerchantResponseDto";
import { UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";

type Response = Ok<GetMerchantMeResponseDto, UnexpectedError>

class GetMerchantMe implements UseCase<{ publicKey: string }, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: { publicKey: string; }, service?: any): Promise<Response> {
        const { publicKey } = params;
        const result = await this.merchantRepository.getMerchantByPublickKey(publicKey);
        return ok(result?.merchant as GetMerchantMeResponseDto);
    }
}

export default GetMerchantMe;