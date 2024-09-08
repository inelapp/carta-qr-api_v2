import Joi from "joi";
import { IMerchantProps } from "./merchant";
import { MerchantFilter } from "../../mappers";
import { objectIdPattern } from "../../types";


const merchantSchema = Joi.object<IMerchantProps>({
    name: Joi.string().required(),
    phone: Joi.string().required().min(9).max(12),
    address: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    merchantCode: Joi.string().required().length(4).uppercase(),
    active: Joi.boolean().optional().default(true)
})

const merchantGetSchema = Joi.object<MerchantFilter>({
    id: Joi.string().optional().regex(objectIdPattern).message('Invalid ObjectId format'),
    merchantCode: Joi.string().optional().length(4).uppercase(),
})

const merchantUpdateSchema = Joi.object<Partial<IMerchantProps>>({
    id: Joi.string().required().regex(objectIdPattern).message('Invalid ObjectId format'),
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    email: Joi.string().optional().email(),
    phone: Joi.string().optional().min(9).max(12),
    active: Joi.boolean().optional(),
})

function validateMerchant(data: IMerchantProps) {
    return merchantSchema.validate(data, { abortEarly: false });
}

export { validateMerchant, merchantGetSchema, merchantUpdateSchema }