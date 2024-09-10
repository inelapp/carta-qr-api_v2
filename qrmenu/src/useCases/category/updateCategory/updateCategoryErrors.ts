import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class UpdateCategoryBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

class UpdateCategoryNotFoundError extends UseCaseError {
    constructor() {
        super('Category not found');
    }
}

class UpdateCategoryMerchantNotOwnerError extends UseCaseError {
    constructor() {
        super('Merchant is not the owner of the category');
    }
}

export { UpdateCategoryBadRequestError, UpdateCategoryNotFoundError, UpdateCategoryMerchantNotOwnerError };