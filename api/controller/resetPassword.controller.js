import jwt from 'jsonwebtoken';
import { isUserExist , changePassword} from '../models/users.model.js';
import bcrypt from 'bcrypt';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';
import {config} from '../utils/config.js';
const hashRound = 1;

export const userResetPassword = async (req, res, next) => {

    const token = req.header('x-auth-token');
    if(!token) {
        next(new error.UnAuthorized('Access denided. No token provided'));
    }
    try {

        const decoded = jwt.verify(token, process.env.jwtPrivateKey);

        isUserExist(decoded.email,async (err, response) => {

            if (err || response.length === 0) {
                next(new error.UnAuthorized('Invalid userId or Password'));
            }
            const valid = await bcrypt.compare(req.body.currentPassword, response[0].password);
            if(!valid) {
                next(new error.UnAuthorized('Invalid Password'));
            } else if(req.body.newPassword === req.body.confirmPassword) {

                changePassword(decoded.email, await bcrypt.hash(req.body.newPassword,hashRound), errorPass => {
                    if(errorPass) {
                        next(new error.GeneralError('Something failed whlie reset password'));
                    }else{
                        next(new GeneralResponse('User password reset',undefined,config.HTTP_CREATED));
                    }

                });
            } else {
                next(new error.GeneralError('newPassword and confirmPassword must be equal.'));
            }
        });

    }catch(err) {
        next(new error.GeneralError('Something failed whlie reset password'));
    }
};
