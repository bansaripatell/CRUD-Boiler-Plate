import express from 'express';
const router = express.Router();
import { validate } from '../../helper/validator.helper.js';
import { resetPasswordSchema } from '../../validation/validateResetPassword.js';
import  { userResetPassword } from '../../controller/resetPassword.controller.js';

router.put('/', validate.body(resetPasswordSchema.schemaResetPassword), userResetPassword);

export {router};
