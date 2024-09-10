import { err, ok, Result } from "neverthrow";
import { GetProductResponseDTO } from "./getProductResponseDto";
import { GetProductBadRequestError, GetProductMerchantNotOwnerError, GetProductNotFoundError } from "./getProductErrors";
import { MerchantNotFoundError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { GetProductRequestDTO } from "./getProductRequestDto";
import { IMerchantRepository, IProductRepository } from "@service/commons/dist/src/repositories";

type Response = Result<GetProductResponseDTO, GetProductBadRequestError | GetProductMerchantNotOwnerError | GetProductNotFoundError | UnexpectedError>;

class GetProduct implements UseCase<GetProductRequestDTO, Response> {
    private readonly productRepository: IProductRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(productRepository: IProductRepository, merchantRepository: IMerchantRepository) {
        this.productRepository = productRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: GetProductRequestDTO, service?: any): Promise<Response> {
        try {
            const { id, merchantCode } = params;
            const { existMerchant, isOwner } = await this.merchantRepository.validateMerchantCode(merchantCode, { productId: id });
            if(!existMerchant) {
                return err(new MerchantNotFoundError(merchantCode));
            }
            if(!isOwner) {
                return err(new GetProductMerchantNotOwnerError());
            }
            const product = await this.productRepository.getProductById(id);

            if(!product) {
                return err(new GetProductNotFoundError(id));
            }
            return ok(product);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default GetProduct;