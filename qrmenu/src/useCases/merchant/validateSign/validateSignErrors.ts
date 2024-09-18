import UseCaseError from "@service/commons/dist/src/shared/UseCaseError";

class ValidationMerchantPublicKeyNotFoundError extends UseCaseError{
  constructor() {
    super('There is no public key found for this merchant.');
  }
}

class ValidationMerchantCredentialsDoesntMatchError extends UseCaseError{
  constructor() {
    super('Credentials doesnt match.');
  }
}

class ValidationMerchantInvalidTimestampError extends UseCaseError{
  constructor() {
    super('Request failed due to an expired timestamp.');
  }
}

export {
    ValidationMerchantPublicKeyNotFoundError,
    ValidationMerchantCredentialsDoesntMatchError,
    ValidationMerchantInvalidTimestampError
}