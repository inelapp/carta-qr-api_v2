import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class CreateMerchantBadRequestError extends UseCaseError {
  constructor(message: string) {
    super(message);
  }
}

export default CreateMerchantBadRequestError;