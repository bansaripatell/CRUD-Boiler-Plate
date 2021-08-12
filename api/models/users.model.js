import {pool} from '../models/db.model.js';
import winston from 'winston';

export const create = (user,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('INSERT INTO users set ? ', user , (error, response) => {
            connection.release();
            if (error) {
                callback(error);
            } else {
                callback(null, response);
            }
        });
    });
};

export const isUserExist = (email,callback) => {
    pool().query('SELECT * FROM users WHERE email = ?', email , (err, response) => {
        if (err) {
            callback(err);
        } else {
            callback(null, response);
        }
    });
};

export const changePassword = (email, password , callback) => {
    pool().query('UPDATE users set password = ? WHERE email = ?', [password, email] , (updateError, response)=>{
        if (updateError) {
            callback(updateError);
        } else {
            callback(null, response);
        }
    });
};
