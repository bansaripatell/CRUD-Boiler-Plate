import winston from 'winston';
winston.add(new winston.transports.Console,{ level: 'info', colorize: true });

import express from 'express';
const app = express();

import {} from 'dotenv/config';

import helmet from 'helmet';
app.use(helmet());

import bodyParser from 'body-parser';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/upload', express.static('public/upload'));

import {router} from './api/routes/route.js';
app.use('/api/route', router);

import { handleResponse as resHelper } from './api/helper/response.helper.js';
app.use(resHelper);

import error from './api/helper/error.helper.js';

app.use(error.handleJoiErrors);
app.use(error.handleErrors);

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;
const server = app.listen(port, () => winston.info(`Listning on port ${port}`));

export {server};
