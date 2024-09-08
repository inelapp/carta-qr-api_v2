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

export { UpdateCategoryBadRequestError, UpdateCategoryNotFoundError };