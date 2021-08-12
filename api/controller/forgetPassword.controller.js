import {isUserExist} from '../models/users.model.js';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';
import { config } from '../utils/config.js';
import { sendOtpMail, sendOtpSMS } from '../helper/userRegisteration.helper.js';
import otpGenerator from 'otp-generator';
const otpLength = 6;
let email;
let OTP;
let flag = false;

export const sendOTPUsingMail = (req, res, next) => {

    try {

        isUserExist(req.body.email,async (err, response) => {
            if (err || response.length === 0) {
                next(new error.UnAuthorized('Invalid userId'));
            } else {

                OTP = otpGenerator.generate(otpLength, { digits:true ,upperCase: false, alphabets:false , specialChars: false });
                email = response[0].email;
                sendOtpMail(response[0],OTP);
                flag = true;
                next(new GeneralResponse('OTP send',undefined,config.HTTP_CREATED));
            }
        });

    }catch(err) {

        next(new error.GeneralError('Something failed whlie sending otp to user mail'));

    }
};

export const sendOTPUsingSMS = (req, res, next) => {

    try {

        OTP = otpGenerator.generate(otpLength, { digits:true ,upperCase: false, alphabets:false , specialChars: false });
        const done = sendOtpSMS(req.body.phoneNumber,OTP);
        if(done){
            flag = true;
            next(new GeneralResponse('OTP send',undefined,config.HTTP_CREATED));
        }else {
            next(new error.GeneralError('Something failed whlie sending otp to user number'));
        }

    }catch(err) {
        next(new error.GeneralError('Something failed whlie sending otp to user number'));
    }
};

export const userForgetPassword = async (req, res, next) => {

    try {

        if(flag){
            if(req.body.OTP === OTP ) {
                next(new GeneralResponse('OTP verified successfully',undefined,config.HTTP_CREATED));
            } else {
                next(new error.GeneralError('OTP verification failed.Enter valid OTP'));
            }

        }else {
            next(new error.GeneralError('Please First Request For generate OTP'));
        }

    }catch(err) {
        next(new error.GeneralError('OTP verification failed'));
    }
};
