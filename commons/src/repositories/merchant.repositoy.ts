import { IGetMerchantAuthResponse, IGetMerchantResponse, IMerchantValidateOptions, IMerchantValidateResponse, MerchantFilter } from "../mappers";
import { IMerchantProps, Merchant } from "../domains";

export interface IMerchantRepository {
    getMerchants(filter?: MerchantFilter): Promise<IGetMerchantResponse[]>;
    getMerchantById(id: string): Promise<IGetMerchantResponse | null>;
    createMerchant(merchant: IMerchantProps): Promise<Merchant>;
    updateMerchant(merchant: Partial<IMerchantProps>): Promise<Merchant>;
    validateMerchantId(merchantId: string, options: IMerchantValidateOptions): Promise<IMerchantValidateResponse>
    merchantEmailExist(merchantEmail: string): Promise<boolean>;
    merchantCodeExist(merchantCode: string): Promise<boolean>;
    getMerchantByPublickKey(publicKey: string): Promise<IGetMerchantAuthResponse | null>;
}