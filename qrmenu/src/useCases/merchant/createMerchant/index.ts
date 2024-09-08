import { merchantRepository } from "@service/commons/dist/src/repositories";
import CreateMerchant from "./createMerchant";

const createMerchant = new CreateMerchant(merchantRepository);

export { createMerchant };