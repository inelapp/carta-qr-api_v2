import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class CreateProductBadRequestErrors extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class CreateProductMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super("Merchant is not the owner of the category");
    }
}

export { CreateProductBadRequestErrors, CreateProductMerchantNotOwnerError }