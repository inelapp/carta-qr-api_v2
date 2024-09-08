import UseCaseError from "./UseCaseError";

export class UnexpectedError extends UseCaseError {
    constructor(err?: any) {
        console.debug(err);
        super('An unexpected error occurred');
    }

    static create(err: any): UnexpectedError {
        console.error(err);
        return new UnexpectedError(err);
    }
}