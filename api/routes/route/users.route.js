import express from 'express';
const router = express.Router();
import {validateEmail} from '../../helper/validateEmail.helper.js';
import {validate} from '../../helper/validator.helper.js';
import {user} from '../../validation/validateUser.js';

import {registerUser, getUserByEmail} from '../../controller/users.controller.js';

router.post('/', validateEmail , validate.body(user.schemaUser) , registerUser);
router.get('/:email', getUserByEmail);

export {router};
