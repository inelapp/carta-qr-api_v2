import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetProductsBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class GetProductsMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the products');
    }
}

export { GetProductsBadRequestError, GetProductsMerchantNotOwnerError };