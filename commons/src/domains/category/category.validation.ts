import Joi, { ValidationResult } from "joi";
import { CategoryProps } from "./category";

const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    merchantId: Joi.string().required(),
    active: Joi.boolean().optional().default(true)
})

function validateCategorySchema(props: CategoryProps): ValidationResult<CategoryProps> {
    return categorySchema.validate(props, { abortEarly: true, convert: false });
} 

export { validateCategorySchema }