import { err, ok, Result } from "neverthrow";
import { UpdateCategoryResponseDto } from "./updateCategoryResponseDto";
import { UpdateCategoryBadRequestError, UpdateCategoryNotFoundError } from "./updateCategoryErrors";
import { createInstanceOrError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { UpdateCategoryRequestDto } from "./updateCategoryRequestDto";
import { ICategoryRepository } from "@service/commons/dist/src/repositories";
import { CategoryProps, categoryUpdateSchema } from "@service/commons/dist/src/domains";

type Response = Result<UpdateCategoryResponseDto, UpdateCategoryBadRequestError | UpdateCategoryNotFoundError | UnexpectedError>

class UpdateCategory implements UseCase<UpdateCategoryRequestDto, Response> {
    private readonly categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(params: UpdateCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<Partial<CategoryProps>>(categoryUpdateSchema, params);

            if(instanceOrError.isErr()) {
                return err(new UpdateCategoryBadRequestError(instanceOrError.error));
            }

            const existingCategory = await this.categoryRepository.getCategory({ id: instanceOrError.value.id! });
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