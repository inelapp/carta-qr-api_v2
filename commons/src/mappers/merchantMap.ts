import { IMerchantDb } from "src/db";
import { Merchant } from "src/domains";

export interface MerchantFilter {
    id: string;
    merchantCode: string;
}

export interface IGetMerchantResponse {
    id: string;
    name: string;
    phone: string;
    address: string;
    merchantCode: string;
    email: string;
    active: boolean;
}

export class MerchantMap {
    static toDomain(merchant: IMerchantDb): Merchant {
        return {
            id: merchant._id!,
            name: merchant.name,
            email: merchant.email,
            password: merchant.password,
            address: merchant.address,
            phone: merchant.phone,
            merchantCode: merchant.merchantCode,
        } as Merchant
    }
    static toDto(merchant: IMerchantDb): IGetMerchantResponse {
        return {
            id: merchant._id!,
            name: merchant.name,
            email: merchant.email,
            merchantCode: merchant.merchantCode,
            address: merchant.address,
            phone: merchant.phone,
            active: merchant.active!
        }
    }
}