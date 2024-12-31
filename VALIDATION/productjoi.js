import Joi from "joi";

const productjoi = Joi.object({
    name:Joi.string(),
    description :Joi.string(),
    price:Joi.number(),
    category:Joi.string(),
    image:Joi.string(),
})
export default productjoi