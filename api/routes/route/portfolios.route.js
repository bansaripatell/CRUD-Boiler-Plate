import express from 'express';
const router = express.Router();
import {upload} from '../../helper/upload.helper.js';
import { validate } from '../../helper/validator.helper.js';
import {portfolio, updateportfolio} from '../../validation/validatePortfolio.js';
import {auth} from '../../helper/auth.helper.js';
const num = 3;

import { getAllPortfolios, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } from '../../controller/portfolios.controller.js';

router.get('/', getAllPortfolios);
router.get('/:id', getPortfolio);
router.post('/', [auth,upload.array('image',num),validate.body(portfolio.schemaProject)],createPortfolio);
router.put('/:id', [auth,validate.body(updateportfolio.schemaUpdateProject)] ,updatePortfolio);
router.delete('/:id',auth,deletePortfolio);

export{ router };
