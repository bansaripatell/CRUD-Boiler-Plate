import Joi from 'joi';
const maxPass = 16;
const minPass = 8;

export const resetPasswordSchema = {
    schemaResetPassword : Joi.object({
        currentPassword: Joi.string().min(minPass).max(maxPass).required().empty().messages({
            'string.base': `currentPassword should be a type of 'text'`,
            'string.empty': `currentPassword cannot be an empty field`,
            'string.min': `currentPassword should be of minimum 8 characters`,
            'string.max': `currentPassword should be of maximum 16 characters`,
            'any.required': `currentPassword is a required field`}
        ),
        newPassword: Joi.string().min(minPass).max(maxPass).required().empty().messages({
            'string.base': `newPassword should be a type of 'text'`,
            'string.empty': `newPassword cannot be an empty field`,
            'string.min': `newPassword should be of minimum 8 characters`,
            'string.max': `newPassword should be of maximum 16 characters`,
            'any.required': `newPassword is a required field`}
        ),
        confirmPassword: Joi.string().min(minPass).max(maxPass).required().empty().messages({
            'string.base': `confirmPassword should be a type of 'text'`,
            'string.empty': `confirmPassword cannot be an empty field`,
            'string.min': `confirmPassword should be of minimum 8 characters`,
            'string.max': `confirmPassword should be of maximum 16 characters`,
            'any.required': `confirmPassword is a required field`}
        )}
    )};
