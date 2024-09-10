import Joi from "joi";
import { Product, ProductProps } from "./product";
import { objectIdPattern } from "../../types";

const productValidation = Joi.object<Product>({
    name: Joi.string().required(),
    price: Joi.number().required(),
    price_2: Joi.number().optional(),
    description: Joi.string().optional(),
    categoryId: Joi.string().required().pattern(objectIdPattern).message('Invalid Category id.'),
    merchantId: Joi.string().required().pattern(objectIdPattern).message('Invalid Merchant id.'),
    quantity: Joi.number().required(),
    image: Joi.string().optional(),
});

const productUpdateValidation = Joi.object<Partial<ProductProps>>({
    id: Joi.string().required().pattern(objectIdPattern).message('Invalid Product id.'),
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    price_2: Joi.number().optional(),
    description: Joi.string().optional(),
    categoryId: Joi.string().optional().pattern(objectIdPattern).message('Invalid Category id.'),
    merchantId: Joi.string().optional().pattern(objectIdPattern).message('Invalid Merchant id.'),
    quantity: Joi.number().optional(),
    image: Joi.string().optional(),
})

function validateProductSchema(props: ProductProps): Joi.ValidationResult<Product> {
    return productValidation.validate(props, { abortEarly: false });
}

export { validateProductSchema, productUpdateValidation }