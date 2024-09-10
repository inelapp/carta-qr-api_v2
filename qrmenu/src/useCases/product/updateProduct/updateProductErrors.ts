import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class UpdateProductBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message, );
    }
}

class UpdateProductNotFoundError extends UseCaseError {
    constructor() {
        super('Product not found.');
    }
}

class UpdateProductMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the product', );
    }
}

class UpdateProductMerchantCategoryNotOwner extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the category', );
    }
}

export { UpdateProductBadRequestError, UpdateProductNotFoundError, UpdateProductMerchantNotOwnerError, UpdateProductMerchantCategoryNotOwner };