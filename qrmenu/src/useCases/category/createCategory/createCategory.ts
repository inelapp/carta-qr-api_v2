import { UseCase } from '@service/commons/dist/src/shared/UseCase';
import { CreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryRequestDTO } from './createCategoryRequestDTO';
import { Category } from '@service/commons/dist/src/domains/category/category';
import { err, ok, Result } from 'neverthrow';
import { CreateCategoryBadRequestError } from './createCategoryErrors';
import { ICategoryRepository } from '@service/commons/dist/src/repositories';
import { UnexpectedError } from '@service/commons/dist/src/shared';

type Response = Result<CreateCategoryResponseDTO, CreateCategoryBadRequestError | UnexpectedError>;

class CreateCategory implements UseCase<CreateCategoryRequestDTO, Response> {
	private categoryRepository: ICategoryRepository;

	constructor(categoryRepository: ICategoryRepository) {
		this.categoryRepository = categoryRepository
	}

	async execute(params: CreateCategoryRequestDTO, service?: any): Promise<Response> {
		try {
			const categoryOrError = Category.create(params);

			if(categoryOrError.isErr()){
				return err(new CreateCategoryBadRequestError(categoryOrError.error));
			}
			const payload = categoryOrError.value;
			const result = await this.categoryRepository.createCategory(payload);
			return ok(result);
		} catch (error) {
			return err(new UnexpectedError(error));
		}
	}
}

export default CreateCategory;
