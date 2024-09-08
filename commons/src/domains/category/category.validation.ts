import Joi, { ValidationResult } from "joi";
import { Category, CategoryProps } from "./category";
import { CategoryFilter } from "../../mappers";
import { objectIdPattern } from "../../types";

const categorySchema = Joi.object<Category>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    merchantId: Joi.string().required(),
    active: Joi.boolean().optional().default(true)
})

const categoryFiltersSchema = Joi.object<CategoryFilter>({
    name: Joi.string().optional(),
    merchantId: Joi.string().optional().length(24),
    active: Joi.boolean().optional(),
    id: Joi.string().optional().length(24)
})

const categoryUpdateSchema = Joi.object<Partial<CategoryProps>>({
    id: Joi.string().required().regex(objectIdPattern).message('Invalid ObjectId.'),
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    active: Joi.boolean().optional()
})

function validateCategorySchema(props: CategoryProps): ValidationResult<CategoryProps> {
    return categorySchema.validate(props, { abortEarly: false });
} 

export { validateCategorySchema, categoryFiltersSchema, categoryUpdateSchema }