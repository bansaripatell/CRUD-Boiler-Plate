import {pool} from '../models/db.model.js';
import winston from 'winston';

export const create = (category,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('INSERT INTO categories set ? ', category , (createError, response) => {
            connection.release();
            if (createError) {
                callback(createError);
            }else {
                callback(null, response);
            }
          });
    });
};

export const getAll = callback => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('SELECT * from categories' , (getAllError, response) => {
            connection.release();
            if (getAllError) {
                callback(getAllError);
            } else {
                callback(null, response);
            }
          });
    });
};

export const get = (id,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('SELECT * from categories WHERE id = ? ', id, (getError, response) => {
            connection.release();
            if (getError) {
                callback(getError);
            } else {
                callback(null, response);
            }
          });
    });
};

export const update = (id,category,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('UPDATE categories set name = ? WHERE id = ? ', [category.name,id] , (updateError, response) => {
            connection.release();
            if (updateError) {
                callback(updateError);
            } else {
                callback(null, response);
            }
          });
    });
};

export const deleteData = (id,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        connection.query('DELETE from categories WHERE id = ? ', [id] , (deleteError, response) => {
            connection.release();
            if (deleteError) {
                callback(deleteError);
            } else {
                callback(null, response);
            }
          });
    });
};
