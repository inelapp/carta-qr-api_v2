import { IMerchantProps, Merchant } from "../../domains";
import { IMerchantRepository } from "../merchant.repositoy";
import { Model } from "mongoose";
import { IMerchantDb, merchantModel } from "../../db";
import { IGetMerchantResponse, MerchantFilter, MerchantMap } from "../../mappers";

export class MerchantImpRepository implements IMerchantRepository {
    private readonly merchantEntity: Model<IMerchantDb>

    constructor() {
        this.merchantEntity = merchantModel;
    }

    async updateMerchant(merchant: Partial<IMerchantProps>): Promise<Merchant> {
        try {
            const { id, ...rest } = merchant;
            const updatedMerchant = await this.merchantEntity
                .findByIdAndUpdate(id, rest, { new: false });
            const result = MerchantMap.toDomain(updatedMerchant as IMerchantDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async getMerchantById(id: string): Promise<IGetMerchantResponse | null> {
        try {
            const merchant = await this.merchantEntity.findById(id);
            if(!merchant) {
                return null;
            }
            const result = MerchantMap.toDto(merchant as IMerchantDb);
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async getMerchants(filters: MerchantFilter): Promise<IGetMerchantResponse[]> {
        try {
            const merchants = await this.merchantEntity.find(filters);
            const result = merchants.map(merchant => MerchantMap.toDto(merchant));
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
    
    async createMerchant(merchant: IMerchantProps): Promise<Merchant> {
        try {
            const newMerchant = new this.merchantEntity({
                name: merchant.name,
                address: merchant.address,
                phone: merchant.phone,
                email: merchant.email,
                password: merchant.password,
                active: merchant.active,
                merchantCode: merchant.merchantCode
            })
            const result = MerchantMap.toDomain(await newMerchant.save());
            return result;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    

}