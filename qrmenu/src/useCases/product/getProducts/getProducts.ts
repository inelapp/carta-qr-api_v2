import { MerchantNotFoundError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { GetProductsResponseDTO } from "./getProductsResponseDto";
import { GetProductsBadRequestError, GetProductsMerchantNotOwnerError } from "./getProductsErrors";
import { err, ok, Result } from "neverthrow";
import { GetProductsRequestDTO } from "./getProductsRequestDto";
import { IMerchantRepository, IProductRepository } from "@service/commons/dist/src/repositories";

type Response = Result<GetProductsResponseDTO, GetProductsBadRequestError | GetProductsMerchantNotOwnerError | MerchantNotFoundError | UnexpectedError>;

class GetProducts implements UseCase<GetProductsRequestDTO, Response> {
    private readonly productRepository: IProductRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(productRepository: IProductRepository, merchantRepository: IMerchantRepository) {
        this.productRepository = productRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetProductsRequestDTO, service?: any): Promise<Response> {
        try {
            const { merchantCode } = params;
            const { existMerchant, merchantData } = await this.merchantRepository.validateMerchantCode(merchantCode, {});
            if(!existMerchant) {
                return err(new MerchantNotFoundError(merchantCode));
            }
            const products = await this.productRepository.getProducts({ merchantId: merchantData.id! });
            return ok(products);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetProducts;