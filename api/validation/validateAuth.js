import Joi from 'joi';
const minEmail = 3;
const maxEmail = 320;
const maxPass = 16;
const minPass = 8;

export const authSchema = {
    schemaLogin : Joi.object({
        email: Joi.string().min(minEmail).max(maxEmail).required().empty().email().messages({
            'string.base': `email should be a type of 'text'`,
            'string.empty': `email cannot be an empty field`,
            'string.email': `email format not valid`,
            'any.required': `email is a required field`}
        ),
        password: Joi.string().min(minPass).max(maxPass).required().empty().messages({
            'string.base': `password should be a type of 'text'`,
            'string.empty': `password cannot be an empty field`,
            'string.min': `password should be of minimum 8 characters`,
            'string.max': `password should be of maximum 16 characters`,
            'any.required': `password is a required field`}
        )}
    )};
