import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class CreateCategoryBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

export { CreateCategoryBadRequestError }