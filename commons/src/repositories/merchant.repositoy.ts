import { IGetMerchantResponse, MerchantFilter } from "src/mappers";
import { IMerchantProps, Merchant } from "../domains";

export interface IMerchantRepository {
    getMerchants(filter?: MerchantFilter): Promise<IGetMerchantResponse[]>;
    getMerchantById(id: string): Promise<IGetMerchantResponse | null>;
    createMerchant(merchant: IMerchantProps): Promise<Merchant>;
    updateMerchant(merchant: Partial<IMerchantProps>): Promise<Merchant>;
}