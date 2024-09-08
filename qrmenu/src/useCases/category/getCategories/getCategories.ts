import { err, ok, Result } from "neverthrow";
import { GetCategoriesResponseDTO } from "./getCategoriesResponseDTO";
import { UseCase } from "@service/commons/dist/src/shared/UseCase";
import { GetCategoriesRequestDTO } from "./getCategoriesRequestDTO";
import { ICategoryRepository } from "@service/commons/dist/src/repositories";
import { UnexpectedError } from "@service/commons/dist/src/shared";

type Response = Result<GetCategoriesResponseDTO, UnexpectedError>;

class GetCategories implements UseCase<GetCategoriesRequestDTO, Response> {
    private readonly categroyRepository: ICategoryRepository;

    constructor(categoryRepository: ICategoryRepository) {
        this.categroyRepository = categoryRepository;
    }

    async execute(params: GetCategoriesRequestDTO, service?: any): Promise<Response> {
        try {
            const result = await this.categroyRepository.getCategories();
            return ok(result as any);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetCategories;