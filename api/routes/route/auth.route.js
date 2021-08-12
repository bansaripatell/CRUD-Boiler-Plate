import express from 'express';
const router = express.Router();
import { validate } from '../../helper/validator.helper.js';
import { authSchema } from '../../validation/validateAuth.js';
import { userLogin } from '../../controller/auth.controller.js';

router.post('/',validate.body(authSchema.schemaLogin),userLogin);

export {router};
