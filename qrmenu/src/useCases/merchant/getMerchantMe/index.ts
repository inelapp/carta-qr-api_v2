import { merchantRepository } from "@service/commons/dist/src/repositories";
import GetMerchantMe from "./getMerchantMe";

const getMerchantMe = new GetMerchantMe(merchantRepository);

export { getMerchantMe }