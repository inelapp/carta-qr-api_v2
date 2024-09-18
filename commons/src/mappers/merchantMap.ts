import { IMerchantDb } from "src/db";
import { IMerchantAuthDb } from "src/db/interface/merchant.auth";
import { Merchant } from "src/domains";

export interface MerchantFilter {
    id?: string;
    merchantCode?: string;
}

export interface IMerchantValidateOptions {
    productId?: string;
    categoryId?: string;
}

export interface IMerchantValidateResponse {
    existMerchant: boolean;
    isOwner: boolean;
    merchantData: IMerchantDb;
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

export interface IGetMerchantAuthResponse {
    id: string;
    publicKey: string;
    secretKey: string;
    merchant: Partial<IGetMerchantResponse>;
}

export type MerchantInsertResponse = Merchant & { publicKey: string, secretKey: string }
export type MerchantAuthGetRequest = IMerchantAuthDb & { merchantId: IMerchantDb }

export class MerchantMap {
    static toDomain(merchant: IMerchantDb & Partial<{ publicKey: string, secretKey: string }>): MerchantInsertResponse {
        return {
            id: merchant._id!,
            name: merchant.name,
            publicKey: merchant.publicKey,
            secretKey: merchant.secretKey,
            email: merchant.email,
            password: merchant.password,
            address: merchant.address,
            phone: merchant.phone,
            merchantCode: merchant.merchantCode,
        } as MerchantInsertResponse
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
    static toAuthDto(merchant: MerchantAuthGetRequest): IGetMerchantAuthResponse {
        return {
            id: merchant._id!,
            publicKey: merchant.publicKey!,
            secretKey: merchant.secretKey!,
            merchant: {
                id: merchant.merchantId._id,
                name: merchant.merchantId.name,
                email: merchant.merchantId.email,
                merchantCode: merchant.merchantId.merchantCode,
                address: merchant.merchantId.address,
                phone: merchant.merchantId.phone,
                active: merchant.merchantId.active!
            }
        }
    }
}