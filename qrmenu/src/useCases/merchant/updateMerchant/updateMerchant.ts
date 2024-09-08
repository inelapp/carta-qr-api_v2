import { err, ok, Result } from "neverthrow";
import { UpdateMerchantResponseDto } from "./updateMerchantResponseDto";
import { UpdateMerchantBadRequestError, UpdateMerchantNotFoundError } from "./updateMerchantErrors";
import { createInstanceOrError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { UpdateMerchantRequestDto } from "./updateMerchantRequestDto";
import { IMerchantRepository } from "@service/commons/dist/src/repositories";
import { IMerchantProps, merchantUpdateSchema } from "@service/commons/dist/src/domains";

type Response = Result<UpdateMerchantResponseDto, UpdateMerchantBadRequestError | UpdateMerchantNotFoundError | UnexpectedError>

class UpdateMerchant implements UseCase<UpdateMerchantRequestDto, Response> {
    private readonly merchantRepository: IMerchantRepository;

    constructor(merchantRepository: IMerchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    async execute(params: UpdateMerchantRequestDto, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<Partial<IMerchantProps>>(merchantUpdateSchema, params);
            if(instanceOrError.isErr()) {
                return err(new UpdateMerchantBadRequestError(instanceOrError.error));
            }

            const existMerchant = await this.merchantRepository.getMerchantById(instanceOrError.value.id!);
            if(!existMerchant) {
                return err(new UpdateMerchantNotFoundError());
            }
            await this.merchantRepository.updateMerchant(instanceOrError.value);
            return ok({ message: 'Merchant updated successfully' });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default UpdateMerchant;