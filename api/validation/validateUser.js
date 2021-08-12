import Joi from 'joi';
const minEmail = 3;
const maxEmail = 320;
const maxPass = 16;
const minPass = 8;

export const user = {
    schemaUser: Joi.object({
        name: Joi.string().required().empty().messages({
            'string.base': `name should be a type of 'text'`,
            'string.empty': `name cannot be an empty field`,
            'any.required': `name is a required field`}
        ),
        email: Joi.string().min(minEmail).max(maxEmail).required().email().empty().messages({
            'string.base': `email should be a type of 'text'`,
            'string.empty': `email cannot be an empty field`,
            'string.email': `email format not valid`,
            'any.required': `email is a required field`}
        ),
        password: Joi.string().min(minPass).max(maxPass).required().empty().messages({
            'string.base': `password should be a type of 'text'`,
            'string.empty': `password cannot be an empty field`,
            'string.min': 'password should be of minimum 8 characters',
            'string.max': 'password should be of maximum 255 characters',
            'any.required': `password is a required field`}
        ),
        isAdmin: Joi.number().optional().default(0).empty().messages({
            'number.base': `isAdmin should be a type of 'number'`,
            'number.empty': `isAdmin cannot be an empty field`,
            'any.required': `isAdmin is a required field`}
        )}
    )};

export const updateUser = {
    schemaUpdateUser : Joi.object({
        name: Joi.string().empty().messages({
            'string.base': `name should be a type of 'text'`,
            'string.empty': `name cannot be an empty field`,
            'any.required': `name is a required field`}
        ),
        email: Joi.string().min(minEmail).max(maxEmail).email().empty().messages({
            'string.base': `email should be a type of 'text'`,
            'string.empty': `email cannot be an empty field`,
            'string.email': `email format not valid`,
            'any.required': `email is a required field`}
        ),
        password: Joi.string().min(minPass).max(maxPass).empty().messages({
            'string.base': `password should be a type of 'text'`,
            'string.empty': `password cannot be an empty field`,
            'string.min': 'password should be of minimum 8 characters',
            'string.max': 'password should be of maximum 255 characters',
            'any.required': `password is a required field`}
        ),
        isAdmin: Joi.number().default(0).empty().messages({
            'number.base': `isAdmin should be a type of 'number'`,
            'number.empty': `isAdmin cannot be an empty field`,
            'any.required': `isAdmin is a required field`}
        )}
    )};
