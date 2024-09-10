import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetProductBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class GetProductNotFoundError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class GetProductMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the product');
    }
}

export { GetProductBadRequestError, GetProductNotFoundError, GetProductMerchantNotOwnerError };