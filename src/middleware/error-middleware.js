import { ResponseError } from "./response-error.js";
import Joi from 'joi';

const { ValidationError } = Joi;
const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        return next(); 
    }

    if (err instanceof ResponseError) {
        return res.status(err.status).json({
            errors: err.message 
        }).end();
    }

    if (err instanceof ValidationError) {
        return res.status(400).json({
            errors: err.message
        }).end();
    }

    return res.status(500).json({
        errors: err.message
    }).end();
};

export { errorMiddleware };