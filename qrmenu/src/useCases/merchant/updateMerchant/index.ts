import { merchantRepository } from "@service/commons/dist/src/repositories";
import UpdateMerchant from "./updateMerchant";

const updateMerchant = new UpdateMerchant(merchantRepository);

export { updateMerchant }