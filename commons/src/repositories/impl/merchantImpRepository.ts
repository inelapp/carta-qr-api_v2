import { IMerchantProps, Merchant } from "../../domains";
import { IMerchantRepository } from "../merchant.repositoy";
import { connection, Model } from "mongoose";
import { categoryModel, ICategoryDb, IMerchantDb, IProductDb, merchantAuthModel, merchantModel, productModel } from "../../db";
import { IGetMerchantAuthResponse, IGetMerchantResponse, IMerchantValidateOptions, IMerchantValidateResponse, MerchantAuthGetRequest, MerchantFilter, MerchantInsertResponse, MerchantMap } from "../../mappers";
import { v4 as uuid } from 'uuid'
import { IMerchantAuthDb } from "src/db/interface/merchant.auth";

export class MerchantImpRepository implements IMerchantRepository {
    private readonly merchantEntity: Model<IMerchantDb>
    private readonly productEntity: Model<IProductDb>
    private readonly categoryEntity: Model<ICategoryDb>;
    private readonly merchantAuthEntity: Model<IMerchantAuthDb>;

    constructor() {
        this.merchantEntity = merchantModel;
        this.productEntity = productModel;
        this.categoryEntity = categoryModel;
        this.merchantAuthEntity = merchantAuthModel;
    }
    async getMerchantByPublickKey(publicKey: string): Promise<IGetMerchantAuthResponse | null> {
        try {
            const merchantAuthResult = await this.merchantAuthEntity.findOne({ publicKey }).populate('merchantId');
            if(!merchantAuthResult) return null;
            return MerchantMap.toAuthDto(merchantAuthResult as unknown as MerchantAuthGetRequest);
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async merchantEmailExist(merchantEmail: string): Promise<boolean> {
        try {
            const result = await this.merchantEntity.exists({ email: merchantEmail });
            if(result) return true;
            return false;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }
    async merchantCodeExist(merchantCode: string): Promise<boolean> {
        try {
            const result = await this.merchantEntity.exists({ merchantCode });
            if(result) return true;
            return false;
        } catch (error: Error | any) {
            throw new Error(error);
        }
    }

    async validateMerchantId(merchantId: string, options: IMerchantValidateOptions): Promise<IMerchantValidateResponse> {
        try {
            let isOwner = false;
            const merchant = await this.merchantEntity.findOne({ _id: merchantId });
            
            let existMerchant = !!merchant;

            if(options.productId) {
                const productByMerchant = await this.productEntity.findOne({ _id: options.productId, merchantId: merchant?._id });
                isOwner = productByMerchant ? true : false;
            } else if(options.categoryId) {
                const categoryByMerchant = await this.categoryEntity.findOne({ _id: options.categoryId, merchantId: merchant?._id });
                isOwner = categoryByMerchant ? true : false;
            }
            return { existMerchant, isOwner, merchantData: merchant as IMerchantDb };
        } catch (error: Error | any) {
            throw new Error(error);
        }
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
    
    async createMerchant(merchant: IMerchantProps): Promise<MerchantInsertResponse> {
        const session = await connection.startSession();
        try {
            return await session.withTransaction(async () => {
                const publicKey = uuid();
                const secretKey = uuid();
                const newMerchant = new this.merchantEntity({
                    name: merchant.name,
                    address: merchant.address,
                    phone: merchant.phone,
                    email: merchant.email,
                    password: merchant.password,
                    active: merchant.active,
                    merchantCode: merchant.merchantCode
                })
                const merchantSaved = await newMerchant.save({ session });
                const merchantAuth = new this.merchantAuthEntity({
                    merchantId: merchantSaved._id,
                    publicKey,
                    secretKey
                })
                await merchantAuth.save({ session });
                const result = MerchantMap.toDomain({ publicKey, secretKey, ...merchantSaved.toObject() });
                return result;
            })
        } catch (error: Error | any) {
            await session.abortTransaction();
            throw new Error(error);
        } finally {
            await session.endSession();
        }
    }
}