import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetMerchantsBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

export { GetMerchantsBadRequestError };