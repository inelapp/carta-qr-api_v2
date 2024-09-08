import { merchantRepository } from "@service/commons/dist/src/repositories";
import GetMerchants from "./getMerchants";

const getMerchants = new GetMerchants(merchantRepository);

export { getMerchants }