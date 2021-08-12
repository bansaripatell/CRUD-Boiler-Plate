import express from 'express';
const router = express.Router();
import  {validate} from '../../helper/validator.helper.js';
import {category, updatecategory} from '../../validation/validateCategory.js';
import {auth} from '../../helper/auth.helper.js';

import {getAllCategory, getCategory, createCategory, updateCategory, deleteCategory} from '../../controller/categories.controller.js';

router.get('/', getAllCategory);
router.get('/:id', getCategory);
router.post('/' , [auth, validate.body(category.schemaCategory)], createCategory);
router.put('/:id', [auth,validate.body(updatecategory.schemaUpdateCategory)], updateCategory);
router.delete('/:id', auth, deleteCategory);

export {router};
