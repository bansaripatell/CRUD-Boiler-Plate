import { pool } from '../models/db.model.js';
import winston from 'winston';

export const create = (portfolio,imageArray,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }

        const sql = 'INSERT INTO portfolios set projectName = ?,projectDescription = ?, categoryId = ?, image = ? ';
        connection.query(sql,[portfolio.projectName,portfolio.projectDescription,portfolio.categoryId,imageArray] , (createError, response) => {
            connection.release();
            if (createError) {
                callback(createError);
            } else {
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
        const sqlSelect = 'SELECT portfolios.id,portfolios.projectName,portfolios.projectDescription,categories.name';
        const sqlAs =  ' AS category,image FROM portfolios LEFT JOIN categories ON portfolios.categoryId = categories.id';
        connection.query(sqlSelect+sqlAs, (getAllError, response) => {
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
        if(!err){
            winston.info(`Connected to the database`);
        }else{
            winston.info(err);
        }
        const sqlSelect = 'SELECT portfolios.id,portfolios.projectName,portfolios.projectDescription,categories.name';
        const sqlAS = ' AS category,portfolios.image FROM portfolios INNER JOIN categories ON portfolios.categoryId = categories.id WHERE portfolios.id =  ?';
        connection.query(`${sqlSelect} ${sqlAS}`, id, (getError, response) => {
            connection.release();
            if (getError) {
                callback(getError);
            } else {
                callback(null, response);
            }
        });
    });
};

export const update = (id,portfolio,callback) => {
    pool().getConnection((err, connection) => {
        if(!err) {
            winston.info(`Connected to the database`);
        } else {
            winston.info(err);
        }
        connection.query('UPDATE portfolios set categoryId = ? WHERE id = ?', [portfolio.categoryId,id] , (updateError, response) => {
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

        connection.query('DELETE from portfolios WHERE id = ? ', [id] , (deleteError, response) => {
            connection.release();
            if (deleteError) {
                callback(deleteError);
            } else {
                callback(null, response);
            }
        });
    });
};
