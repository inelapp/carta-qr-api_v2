import { err, ok, Result } from "neverthrow";
import { CreateMerchantResponseDto } from "./createMerchantResponseDto";
import CreateMerchantBadRequestError from "./createMerchantErrors";
import { UseCase, UnexpectedError, generateSimplePassword } from "@service/commons/dist/src/shared";
import { CreateMerchantRequestDto } from "./createMerchantRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";
import { Merchant, Secret } from "@service/commons/dist/src/domains";

type Response = Result<CreateMerchantResponseDto, CreateMerchantBadRequestError | UnexpectedError>;

class CreateMerchant implements UseCase<CreateMerchantRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: CreateMerchantRequestDto, service?: any): Promise<Response> {
        try {
            const password = generateSimplePassword(10);
            const passwordHash = Secret.create({ value: password }).value;

            const merchantOrError = Merchant.create({ ...params, password: await passwordHash.getHashedValue() });
            if(merchantOrError.isErr()) {
                return err(new CreateMerchantBadRequestError(merchantOrError.error));
            }
            const merchantInstance = merchantOrError.value;

            const merchantEmailAlReadyExist = await this.merchantRepository.merchantEmailExist(merchantInstance.email)
            if(merchantEmailAlReadyExist) {
                return err(new CreateMerchantBadRequestError('Email already exist'));
            }

            const merchantCodeAlReadyExist = await this.merchantRepository.merchantCodeExist(merchantInstance.merchantCode)
            if(merchantCodeAlReadyExist) {
                return err(new CreateMerchantBadRequestError('Merchant code already exist'));
            }

            const result = await this.merchantRepository.createMerchant(merchantInstance) as CreateMerchantResponseDto;
            return ok({
                ...result,
                password: password
            });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default CreateMerchant;