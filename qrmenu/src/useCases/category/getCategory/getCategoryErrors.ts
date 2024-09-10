import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetCategoryBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class GetCategoryNotFoundError extends UseCaseError {
    constructor() {
        super('Category not found');
    }
}

class GetCategoryMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the category');
    }
}

export { GetCategoryBadRequestError, GetCategoryNotFoundError, GetCategoryMerchantNotOwnerError }