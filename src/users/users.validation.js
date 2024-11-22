import Joi from 'joi'
import { ResponseError } from '../middleware/response-error.js';

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    email: Joi.string().max(100).required()
})
const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
})

const tokenValidation = Joi.required()
const getUserByIdValidation = Joi.number().required()
    
const logoutValidation = Joi.object({
    username: Joi.string().max(100).required()
})

export {
    registerUserValidation,
    loginUserValidation,
    validate,
    tokenValidation,
    getUserByIdValidation
}