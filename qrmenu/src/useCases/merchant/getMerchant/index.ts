import { merchantRepository } from "@service/commons/dist/src/repositories";
import GetMerchant from "./getMerchant";

const getMerchant = new GetMerchant(merchantRepository);

export { getMerchant }