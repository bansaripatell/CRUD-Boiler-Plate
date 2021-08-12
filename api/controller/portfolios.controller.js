import {create, get, getAll, deleteData, update} from '../models/portfolios.model.js';
import { GeneralResponse } from '../utils/response.js';
import error from '../utils/error.js';
import { config } from '../utils/config.js';
const errNo = 1452;

const getAllImage = response => {
    let i=0;
    while(i<response.length) {
        if(response[i].image){
            response[i].image = response[i].image.split(',');
            let j=0;
            while(j<response[i].image.length) {
                response[i].image[j] = `localhost:3000/upload/${response[i].image[j]}`;
                j++;
            }
        }
        i++;
    }
    return response;

};

export const createPortfolio = async (req, res, next) => {

    const imageArray = req.files.map(a => a.filename).toString();
    try {
        create(req.body,imageArray, (err, response) => {
            if(err) {
                if(err.errno === errNo) {
                    next(new error.NotFound('Category was not found.Please enter valid categoryId.'));
                }else {
                    next(new error.GeneralError('Error while inserting project detail'));
                }
            }else{
                if(response.affectedRows>0){
                    next(new GeneralResponse('Project successfully inserted',undefined,config.HTTP_CREATED));
                }
            }
        });
    }catch(err) {
        next(new error.GeneralError('Error while inserting project detail'));
    }
};

export const getAllPortfolios = async (req, res, next) => {
    try {
        getAll((err, response) => {
            if(!err && response.length === 0){
                next(new error.NotFound('No project Found.'));
            }else{
                const finalRes = getAllImage(response);
                next(new GeneralResponse('Project detail found',finalRes));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while getting project detail'));
    }
};

export const getPortfolio = async (req, res, next) => {
    const id = req.params.id;
    try {
        get(id,(err, response) => {
            if(!err && response.length === 0){
                next(new error.NotFound('No project Found.'));
            }else{
                const result = getAllImage(response);
                next(new GeneralResponse('Project detail found',result));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while getting project detail'));
    }
};

export const updatePortfolio = async (req, res, next) => {
    const id = req.params.id;

    try {
        update(id,req.body,(err, response) => {
            if(typeof response != 'undefined' && response.affectedRows === 0){
                next(new error.NotFound('project not found.Invalid projectId'));
            } else if(err) {
                if(err.errno === errNo) {
                    next(new error.NotFound('Category was not found.Please enter valid categoryId.'));
                }
                next(new error.GeneralError('Error while updating project detail'));
            } else {
                next(new GeneralResponse('Project successfully updated',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while updating project detail'));
    }
};

export const deletePortfolio = async (req, res, next) => {
    const id = req.params.id;

    try {
        deleteData(id,(err, response) => {
            if(typeof response != 'undefined' && response.affectedRows === 0){
                next(new error.NotFound('project not found.Invalid projectId'));
            } else if(err) {
                next(new error.GeneralError('Error while deleting project'));
            } else {
                next(new GeneralResponse('Project successfully deleted',undefined,config.HTTP_CREATED));
            }
        });
    } catch (err) {
        next(new error.GeneralError('Error while deleting project'));
    }
};
