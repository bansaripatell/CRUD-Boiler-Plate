import express from 'express';
const router = express.Router();

import { router as categories } from './route/categories.route.js';
import { router as portfolios } from './route/portfolios.route.js';
import { router as users } from './route/users.route.js';
import { router as auth } from './route/auth.route.js';
import { router as resetPassword } from './route/resetPassword.route.js';
import { router as forgetPassword } from './route/forgetPassword.route.js';

router.use('/auth', auth);
router.use('/categories', categories);
router.use('/portfolios', portfolios);
router.use('/users',users);
router.use('/changePassword',resetPassword);
router.use('/forgetPassword',forgetPassword);

export {router};
