import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetMerchantBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class GetMerchantNotFoundError extends UseCaseError {
    constructor() {
        super('Merchant not found.');
    }
}

export { GetMerchantBadRequestError, GetMerchantNotFoundError };