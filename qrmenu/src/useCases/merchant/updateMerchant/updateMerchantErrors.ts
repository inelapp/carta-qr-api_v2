import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class UpdateMerchantBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class UpdateMerchantNotFoundError extends UseCaseError {
    constructor() {
        super('Merchant not found.');
    }
}

export { UpdateMerchantBadRequestError, UpdateMerchantNotFoundError };