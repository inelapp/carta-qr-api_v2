import { createInstanceOrError, MerchantNotFoundError, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { err, ok, Result } from "neverthrow";
import { UpdateProductRequestDTO } from "./updateProductRequestDto";
import { IMerchantRepository, IProductRepository } from "@service/commons/dist/src/repositories";
import { UpdateProductBadRequestError, UpdateProductMerchantCategoryNotOwner, UpdateProductMerchantNotOwnerError, UpdateProductNotFoundError } from "./updateProductErrors";
import { UpdateProductResponseDTO } from "./updateProductResponseDto";
import { ProductProps } from "@service/commons/dist/src/domains";
import { productUpdateValidation } from "@service/commons/dist/src/domains/product/product.validation";

type Response = Result<
UpdateProductResponseDTO, UpdateProductBadRequestError | UpdateProductNotFoundError | MerchantNotFoundError | UpdateProductMerchantCategoryNotOwner | UpdateProductMerchantNotOwnerError | UnexpectedError>

class UpdateProduct implements UseCase<UpdateProductRequestDTO, Response> {
    private readonly productRepository: IProductRepository;
    private readonly merchantRepository: IMerchantRepository;

    constructor(productRepository: IProductRepository, merchantRepository: IMerchantRepository) {
        this.productRepository = productRepository;
        this.merchantRepository = merchantRepository;
    }

    async execute(params: UpdateProductRequestDTO, service?: any): Promise<Response> {
        try {
            const { merchantId, ...restParams } = params;
            const instanceOrError = createInstanceOrError<Partial<ProductProps>>(productUpdateValidation, restParams)
            if(instanceOrError.isErr()) {
                return err(new UpdateProductBadRequestError(instanceOrError.error));
            }
            const { id, ...props } = instanceOrError.value;
            const { existMerchant, isOwner } = await this.merchantRepository.validateMerchantId(merchantId, { productId: id });
            const { isOwner: isCategoryOwner } = await this.merchantRepository.validateMerchantId(merchantId, { categoryId: props.categoryId });
            if(!existMerchant) {
                return err(new MerchantNotFoundError());
            }
            if(!isOwner) {
                return err(new UpdateProductMerchantNotOwnerError());
            }
            if(!isCategoryOwner) {
                return err(new UpdateProductMerchantCategoryNotOwner());
            }
            const existProduct = await this.productRepository.getProductById(id!);
            if(!existProduct) {
                return err(new UpdateProductNotFoundError());
            }
            await this.productRepository.updateProduct({ id, ...props });
            return ok({ message: 'Product updated successfully' });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default UpdateProduct;