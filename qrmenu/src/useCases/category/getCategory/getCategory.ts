import { err, ok, Result } from "neverthrow";
import { GetCategoryResponseDto } from "./getCategoryResponseDto";
import { GetCategoryBadRequestError, GetCategoryMerchantNotOwnerError, GetCategoryNotFoundError } from "./getCategoryErrors";
import { createInstanceOrError, MerchantNotFoundError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { ICategoryRepository, IMerchantRepository } from "@service/commons/dist/src/repositories";
import { categoryFiltersSchema } from "@service/commons/dist/src/domains";
import { CategoryFilter } from "@service/commons/dist/src/mappers";
import { GetCategoryRequestDto } from "./getCategoryRequestDto";


type Response = Result<GetCategoryResponseDto, GetCategoryBadRequestError | GetCategoryNotFoundError | GetCategoryMerchantNotOwnerError | MerchantNotFoundError | UnexpectedError>
class GetCategory implements UseCase<GetCategoryRequestDto, Response> {
    private readonly categoryRepository: ICategoryRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(categoryRepository: ICategoryRepository, merchantRepository: IMerchantRepository) {
        this.categoryRepository = categoryRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<CategoryFilter>(categoryFiltersSchema, params);

            if(instanceOrError.isErr()) {
                return err(new GetCategoryBadRequestError(instanceOrError.error));
            }

            const { id, merchantId } = instanceOrError.value;
            const { existMerchant, isOwner } = await this.merchantRepository.validateMerchantId(merchantId!, { categoryId: id });
            if(!existMerchant) {
                return err(new MerchantNotFoundError());
            }
            if(!isOwner) {
                return err(new GetCategoryMerchantNotOwnerError());
            }
            const result = await this.categoryRepository.getCategory({ id });

            if(!result) {
                return err(new GetCategoryNotFoundError());
            }

            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetCategory;