import Joi from 'joi';
const minEmail = 3;
const maxEmail = 320;
const otp = 6;
const phone = 13;

export const forgetPasswordSchema = {
    schemaForgetPassword : Joi.object({
        OTP: Joi.string().min(otp).max(otp).required().empty().messages({
            'string.base': `OTP should be a type of 'text'`,
            'string.empty': `OTP cannot be an empty field`,
            'string.min': `OTP should be equal to 6 characters`,
            'string.max': `OTP should be equal to 6 characters`,
            'any.required': `OTP is a required field`}
        )}
    ),

    schemaSendingOTPSMS : Joi.object({
        phoneNumber: Joi.string().length(phone).required().empty().messages({
            'string.base': `phomeNumber should be a type of 'text'`,
            'string.empty': `phomeNumber cannot be an empty field`,
            'string.length': `phomeNumber should be equal to 13 characters`,
            'any.required': `phomeNumber is a required field`}
        )}
    ),

    schemaSendingOTPMail : Joi.object({

        email: Joi.string().min(minEmail).max(maxEmail).required().email().empty().messages({
            'string.base': `email should be a type of 'text'`,
            'string.empty': `email cannot be an empty field`,
            'string.email': `email format not valid`,
            'any.required': `email is a required field`}
        )}
    )};
