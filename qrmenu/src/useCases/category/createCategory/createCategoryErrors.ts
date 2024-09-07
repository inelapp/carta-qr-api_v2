import { Result } from "neverthrow";

class CreateCategoryBadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CreateCategoryBadRequestError";
    }
}

export { CreateCategoryBadRequestError }