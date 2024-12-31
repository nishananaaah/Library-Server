import joi from "joi";

const userAuthjoi = joi.object({
    username:joi.string().min(3).max(30).required()
    .messages({
        'string.empty':'username is required',
        'string.min':'username should have atleast 3 characters',
        'any required':'username is a required field'
    }),
    email:joi.string().email({
        minDomainSegments:2,
        tlds:{allow:["com","net","org"]}
    }).lowercase().required().trim()
    .messages({
        'string.email':'Please provide a valid email',
        'any required':'Email is a required field'
    }),
    password:joi.string().min(8).required()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .messages({
        'string.pattern.base':'Password must contain only alphnumeric characters',
        'string.min':'Password should have atleast 8 characters',
        'any required':'Password is a required field'
    })
});
export default userAuthjoi;