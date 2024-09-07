import { UseCase } from '@service/commons/dist/src/shared/UseCase';
import { CreateProductResponseDTO } from './createProductResponseDTO';
import { CreateProductRequestDTO } from './createProductRequestDTO';
import { Product } from '@service/commons/dist/src/domains/product/product';

type Response = CreateProductResponseDTO | Error;

class CreateProduct implements UseCase<CreateProductRequestDTO, Response> {
	async execute(params: CreateProductRequestDTO, service?: any): Promise<Response> {
		try {
			const product = Product.create(params as any);
			return product as any;
		} catch (error) {
			throw new Error(error as any);
		}
	}
}

export default CreateProduct;
