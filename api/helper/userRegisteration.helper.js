import twilio from 'twilio';
import nodemailer from 'nodemailer';
import winston from 'winston';
import jwt from 'jsonwebtoken';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken, { lazyLoading: true });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.user,
        pass: process.env.password}}
);

const sendConfirmationMail = user => {
    const mailOptions = {
        from: process.env.user,
        to: user.email,
        subject: 'Sending Email using Node.js',
        html: `<h1>Welcome</h1><p>hello ${user.name}, you have successfully registered. </p>`};

    transporter.sendMail(mailOptions, (mailerr, info) => {
        if (mailerr) {
            winston.info('Error : '+mailerr);
        } else {
            winston.info('Email sent: ' + info.response);
        }
    });
};

const sendOtpMail = (user,OTP) => {
    const mailOptions = {
        from: process.env.user,
        to: user.email,
        subject: 'Sending Email using Node.js',
        html: `<h1>Welcome</h1><p>hello ${user.name}, <br>Your One-time password is <b> ${OTP} </b> </p>`};

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            winston.info(err);
        } else {
            winston.info('Email sent: ' + info.response);
        }
    });
};

const sendOtpSMS = (phoneNumber,OTP) => {
    client.messages.create({
        to: phoneNumber,
        from: process.env.MY_PHONE_NUMBER,
        body: `Your One-time password is ${OTP}.Please don't share your OTP to any one.`}
    ).then( message => winston.info('message-sid'+ message.sid)).done();
    return 1;
};


const generateAuthToken = user => {
    return jwt.sign({ id : user.id,email: user.email, isAdmin: Boolean(user.isAdmin)},process.env.jwtPrivateKey,{expiresIn: process.env.TOKEN_EXPIRY}
    );
};

export {sendOtpSMS, sendOtpMail, sendConfirmationMail, generateAuthToken };

