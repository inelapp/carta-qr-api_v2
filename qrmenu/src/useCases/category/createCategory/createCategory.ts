import { UseCase } from '@service/commons/dist/src/shared/UseCase';
import { CreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryRequestDTO } from './createCategoryRequestDTO';
import { Category } from '@service/commons/dist/src/domains/category/category';
import { err, ok, Result } from 'neverthrow';
import { CreateCategoryBadRequestError } from './createCategoryErrors';
import { ICategoryRepository, IMerchantRepository } from '@service/commons/dist/src/repositories';
import { MerchantNotFoundError, UnexpectedError } from '@service/commons/dist/src/shared';

type Response = Result<CreateCategoryResponseDTO, CreateCategoryBadRequestError | MerchantNotFoundError | UnexpectedError>;

class CreateCategory implements UseCase<CreateCategoryRequestDTO, Response> {
	private readonly categoryRepository: ICategoryRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(categoryRepository: ICategoryRepository, merchantRepository: IMerchantRepository) {
        this.categoryRepository = categoryRepository;
        this.merchantRepository = merchantRepository;
    }

	async execute(params: CreateCategoryRequestDTO, service?: any): Promise<Response> {
		try {
			const { merchantId, ...restParams } = params;
			const { existMerchant, merchantData } = await this.merchantRepository.validateMerchantId(merchantId, {});
			if(!existMerchant) {
				return err(new MerchantNotFoundError(merchantId));
			}

			const categoryOrError = Category.create({ ...restParams, merchantId: merchantData._id.toString() });
			
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
