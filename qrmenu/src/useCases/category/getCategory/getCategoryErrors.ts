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

export { GetCategoryBadRequestError, GetCategoryNotFoundError }