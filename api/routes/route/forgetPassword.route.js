import express from 'express';
const router = express.Router();
import { validate } from '../../helper/validator.helper.js';
import { forgetPasswordSchema} from '../../validation/validateForgetPassword.js';
import { sendOTPUsingMail , userForgetPassword ,sendOTPUsingSMS} from '../../controller/forgetPassword.controller.js';

router.put('/mail', validate.body(forgetPasswordSchema.schemaSendingOTPMail),sendOTPUsingMail);
router.put('/sms', validate.body(forgetPasswordSchema.schemaSendingOTPSMS),sendOTPUsingSMS);
router.put('/OTP',validate.body(forgetPasswordSchema.schemaForgetPassword), userForgetPassword);

export {router};
