import { merchantRepository } from "@service/commons/dist/src/repositories";
import ValidateSign from "./validateSign";

const validateMerchantSign = new ValidateSign(merchantRepository);

export { validateMerchantSign };