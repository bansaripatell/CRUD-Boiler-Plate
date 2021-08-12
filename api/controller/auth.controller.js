import {isUserExist} from '../models/users.model.js';
import bcrypt from 'bcrypt';
import { generateAuthToken } from '../helper/userRegisteration.helper.js';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';

export const userLogin = async (req, res, next) => {

    try {
        isUserExist(req.body.email,async (err, response) => {
            const validPassword = await bcrypt.compare(req.body.password, response[0].password);
            if (err || response.length === 0) {
                next(new error.UnAuthorized('Invalid userId or Password'));
            }else if(!validPassword) {
                next(new error.UnAuthorized('Invalid userId or Password'));
            }else{
                next(new GeneralResponse('Authorized user',generateAuthToken(response[0])));
            }

        });
    }catch(err){
        next(new error.GeneralError('User Login failed.'));
    }
};
