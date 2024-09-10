import { err, ok, Result } from "neverthrow";
import { GetCategoriesResponseDTO } from "./getCategoriesResponseDTO";
import { UseCase } from "@service/commons/dist/src/shared/UseCase";
import { GetCategoriesRequestDTO } from "./getCategoriesRequestDTO";
import { ICategoryRepository, IMerchantRepository } from "@service/commons/dist/src/repositories";
import { MerchantNotFoundError, UnexpectedError } from "@service/commons/dist/src/shared";
import { GetCategoriesBadRequestError } from "./getCategoriesErrors";

type Response = Result<GetCategoriesResponseDTO[], GetCategoriesBadRequestError | MerchantNotFoundError | UnexpectedError>;

class GetCategories implements UseCase<GetCategoriesRequestDTO, Response> {
    private readonly categoryRepository: ICategoryRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(categoryRepository: ICategoryRepository, merchantRepository: IMerchantRepository) {
        this.categoryRepository = categoryRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetCategoriesRequestDTO, service?: any): Promise<Response> {
        try {
            const { merchantCode } = params;
            const { existMerchant, merchantData } = await this.merchantRepository.validateMerchantCode(merchantCode, {});
            if(!existMerchant) {
                return err(new MerchantNotFoundError(merchantCode));
            }
            const result = await this.categoryRepository.getCategories({ merchantId: merchantData._id });
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetCategories;