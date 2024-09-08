interface IUseCaseError {
    message: string;
    errors?: any;
    code?: number;
}

abstract class UseCaseError implements IUseCaseError {
    readonly message: string;
    readonly errors?: any;
    readonly code?: number | undefined;

    constructor(message: string, errors?: any, code?: number) {
        this.message = message;
        this.errors = errors;
        this.code = code;
    }
}

export default UseCaseError;