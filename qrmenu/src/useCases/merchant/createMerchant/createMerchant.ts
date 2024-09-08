import { err, ok, Result } from "neverthrow";
import { CreateMerchantResponseDto } from "./createMerchantResponseDto";
import CreateMerchantBadRequestError from "./createMerchantErrors";
import { UseCase, UnexpectedError } from "@service/commons/dist/src/shared";
import { CreateMerchantRequestDto } from "./createMerchantRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";
import { Merchant } from "@service/commons/dist/src/domains";

type Response = Result<CreateMerchantResponseDto, CreateMerchantBadRequestError | UnexpectedError>;

class CreateMerchant implements UseCase<CreateMerchantRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: CreateMerchantRequestDto, service?: any): Promise<Response> {
        try {
            const merchantOrError = Merchant.create({ ...params, password: CreateMerchant.generatePassword() });
            if(merchantOrError.isErr()) {
                return err(new CreateMerchantBadRequestError(merchantOrError.error));
            }
            const merchantInstance = merchantOrError.value;
            const result = await this.merchantRepository.createMerchant(merchantInstance);
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError());
        }
    }

    static generatePassword(): string {
        return Math.random().toString(36).slice(-8);
    }
}

export default CreateMerchant;