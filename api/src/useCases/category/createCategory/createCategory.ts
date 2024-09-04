import { UseCase } from '@service/commons/dist/src/shared/UseCase';
import { CreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryRequestDTO } from './createCategoryRequestDTO';
import { Category } from '@service/commons/dist/src/domains/category/category';

type Response = CreateCategoryResponseDTO | Error;

class CreateCategory implements UseCase<CreateCategoryRequestDTO, Response> {
	async execute(params: CreateCategoryRequestDTO, service?: any): Promise<Response> {
		try {
			const category = Category.create(params as any);
			return category as Response;
		} catch (error) {
			throw new Error(error as any);
		}
	}
}

export default CreateCategory;
