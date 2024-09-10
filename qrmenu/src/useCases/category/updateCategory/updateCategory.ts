import { err, ok, Result } from "neverthrow";
import { UpdateCategoryResponseDto } from "./updateCategoryResponseDto";
import { UpdateCategoryBadRequestError, UpdateCategoryMerchantNotOwnerError, UpdateCategoryNotFoundError } from "./updateCategoryErrors";
import { createInstanceOrError, MerchantNotFoundError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { UpdateCategoryRequestDto } from "./updateCategoryRequestDto";
import { ICategoryRepository, IMerchantRepository } from "@service/commons/dist/src/repositories";
import { CategoryProps, categoryUpdateSchema } from "@service/commons/dist/src/domains";

type Response = Result<UpdateCategoryResponseDto, UpdateCategoryBadRequestError | UpdateCategoryNotFoundError | UpdateCategoryMerchantNotOwnerError | MerchantNotFoundError | UnexpectedError>

class UpdateCategory implements UseCase<UpdateCategoryRequestDto, Response> {
    private readonly categoryRepository: ICategoryRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(categoryRepository: ICategoryRepository, merchantRepository: IMerchantRepository) {
        this.categoryRepository = categoryRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: UpdateCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const { merchantCode, ...restParams } = params;
            const instanceOrError = createInstanceOrError<Partial<CategoryProps>>(categoryUpdateSchema, restParams);

            if(instanceOrError.isErr()) {
                return err(new UpdateCategoryBadRequestError(instanceOrError.error));
            }

            const { id } = instanceOrError.value;
            const { existMerchant, isOwner } = await this.merchantRepository.validateMerchantCode(merchantCode, { categoryId: id });
            if(!existMerchant) {
                return err(new MerchantNotFoundError(merchantCode));
            }
            if(!isOwner) {
                return err(new UpdateCategoryMerchantNotOwnerError());
            }
            const existingCategory = await this.categoryRepository.getCategory({ id: id! });
            if(!existingCategory) {
                return err(new UpdateCategoryNotFoundError());
            }
            await this.categoryRepository.updateCategory(instanceOrError.value);
            return ok({ message: 'Category updated successfully' });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default UpdateCategory;