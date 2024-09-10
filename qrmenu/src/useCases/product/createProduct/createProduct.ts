import { UseCase } from '@service/commons/dist/src/shared/UseCase';
import { CreateProductResponseDTO } from './createProductResponseDTO';
import { CreateProductRequestDTO } from './createProductRequestDTO';
import { Product } from '@service/commons/dist/src/domains/product/product';
import { err, ok, Result } from 'neverthrow';
import { CreateProductBadRequestErrors, CreateProductMerchantNotOwnerError } from './createProductErrors';
import { MerchantNotFoundError, UnexpectedError } from '@service/commons/dist/src/shared';
import { IMerchantRepository, IProductRepository } from '@service/commons/dist/src/repositories';

type Response = Result<CreateProductResponseDTO, CreateProductBadRequestErrors | CreateProductMerchantNotOwnerError | MerchantNotFoundError | UnexpectedError>;

class CreateProduct implements UseCase<CreateProductRequestDTO, Response> {
	private readonly productRepository: IProductRepository;
	private readonly merchantRepository: IMerchantRepository;
	constructor(productRepository: IProductRepository, merchantRepository: IMerchantRepository) {
		this.productRepository = productRepository;
		this.merchantRepository = merchantRepository;
	}

	async execute(params: CreateProductRequestDTO, service?: any): Promise<Response> {
		try {
			const { merchantCode, ...restParams } = params; 
			const { existMerchant, merchantData, isOwner } = await this.merchantRepository.validateMerchantCode(merchantCode, { categoryId: restParams.categoryId });

			if(!isOwner) {
				return err(new CreateProductMerchantNotOwnerError());
			}

			if(!existMerchant) {
				return err(new MerchantNotFoundError(params.merchantCode));
			}

			const productOrError = Product.create({
				...restParams,
				merchantId: merchantData._id.toString(),
			});
			if(productOrError.isErr()){
				return err(new CreateProductBadRequestErrors(productOrError.error));
			}
			const result = await this.productRepository.createProduct(productOrError.value);
			return ok(result);
		} catch (error) {
			return err(new UnexpectedError(error));
		}
	}
}

export default CreateProduct;
