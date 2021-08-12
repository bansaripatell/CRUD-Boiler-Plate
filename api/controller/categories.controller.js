import { create , getAll , get , update , deleteData} from '../models/categories.model.js';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';
import {config} from '../utils/config.js';
const getError = 'Error while getting category';
const notFoundError = 'Category not found. Invalid categoryId';

export const createCategory = async (req, res, next) => {
    try {
        create(req.body, (err, response) => {
            if(err) {
                next(new error.GeneralError('Error while inserting category detail'));
            }
            if(response !== null){
                next(new GeneralResponse('Category successfully inserted',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while inserting category detail'));
    }
};

export const getAllCategory = async (req, res, next) => {
    try {
        getAll((err, response) => {
            if(typeof response != 'undefined' && response.length === 0){
                next(new error.NotFound('No Category found'));
            }else if(err) {
                next(new error.GeneralError(getError));
            }else{
                next(new GeneralResponse('Category detail found',response));
            }
        });
    } catch (err) {
        next(new error.GeneralError(getError));
    }
};

export const getCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        get(id,(err, response) => {
            if(typeof response != 'undefined' && response.length === 0){
                next(new error.NotFound('notFoundError.'));
            } else if(err) {
                next(new error.GeneralError('Error while getting category'));
            } else {
                next(new GeneralResponse('Category detail found',response));
            }
        });
    } catch (err) {
        next(new error.GeneralError(getError));
    }
};

export const updateCategory = async (req, res, next) => {
    const id = req.params.id;

    try {
        update(id,req.body,(err, response) => {
            if(typeof response != 'undefined' && response.affectedRows === 0){
                next(new error.NotFound(notFoundError));
            }else if(err) {
                next(new error.GeneralError('Error while updating category'));
            }else {
                next(new GeneralResponse('Category successfully updated',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while updating category'));
    }
};

export const deleteCategory = async (req, res, next) => {
    const id = req.params.id;

    try {
        deleteData(id,(err, response) => {
            if(typeof response != 'undefined' && response.affectedRows === 0){
                next(new error.NotFound(notFoundError));
            } else if(err) {
                next(new error.GeneralError('Error while deleting category'));
            } else {
                next(new GeneralResponse('Category successfully deleted',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while deleting category'));
    }
};
