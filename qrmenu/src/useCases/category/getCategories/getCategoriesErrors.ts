import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class GetCategoriesBadRequestError extends UseCaseError {
    constructor(message: string) {
        super(message);
    }
}

export { GetCategoriesBadRequestError }