import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class SignBadErrorRequest extends UseCaseError {
    constructor(message: string){
        super(message)
    }
}

export { SignBadErrorRequest }