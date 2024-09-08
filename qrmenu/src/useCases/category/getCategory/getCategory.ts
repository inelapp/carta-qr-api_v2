import { err, ok, Result } from "neverthrow";
import { GetCategoryResponseDto } from "./getCategoryResponseDto";
import { GetCategoryBadRequestError, GetCategoryNotFoundError } from "./getCategoryErrors";
import { createInstanceOrError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { GetCategoriesRequestDTO } from "../getCategories/getCategoriesRequestDTO";
import { ICategoryRepository } from "@service/commons/dist/src/repositories";
import { categoryFiltersSchema } from "@service/commons/dist/src/domains";
import { CategoryFilter } from "@service/commons/dist/src/mappers";

type Response = Result<GetCategoryResponseDto, GetCategoryBadRequestError | GetCategoryNotFoundError | UnexpectedError>

class GetCategory implements UseCase<GetCategoriesRequestDTO, Response> {
    private readonly categoryRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async execute(params: GetCategoriesRequestDTO, service?: any): Promise<Response> {
        try {
            const instanceOrError = createInstanceOrError<CategoryFilter>(categoryFiltersSchema, params);

            if(instanceOrError.isErr()) {
                return err(new GetCategoryBadRequestError(instanceOrError.error));
            }

            const { id, active, merchantId, name } = instanceOrError.value;
            const result = await this.categoryRepository.getCategory({ id, active, merchantId, name });

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