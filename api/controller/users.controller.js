import { create, isUserExist } from '../models/users.model.js';
import bcrypt from 'bcrypt';
import { sendConfirmationMail } from '../helper/userRegisteration.helper.js';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';
import {config} from '../utils/config.js';
const hashRound = 10;


export const registerUser = async (req, res, next) => {

    req.body.password = await bcrypt.hash(req.body.password,hashRound);

    try {
        create(req.body, err => {
            if(err) {
                next(new error.GeneralError('user registeration failed'));
            }else{
                sendConfirmationMail(req.body);
                next(new GeneralResponse('user successfully registered',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('user registeration failed'));
    }
};

export const getUserByEmail = async (req, res, next) => {
    const email = req.params.email;
    try {
        isUserExist(email,(err, response) => {
            if(err || response.length === 0) {
                next(new error.NotFound('no users found'));
            }else{
                next(new GeneralResponse('User detail found',response));
            }
        });
    }catch (err) {
        next(new error.GeneralError('Error while getting user detail'));
    }
};
