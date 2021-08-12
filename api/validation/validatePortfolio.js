import Joi from 'joi';
const minProject = 3;
const maxProject = 50;
const minDescription = 5;
const maxDescription = 300;

export const portfolio = {
    schemaProject: Joi.object({
        projectName: Joi.string().min(minProject).max(maxProject).required().empty().messages({
            'string.base': `projectName should be a type of 'text'`,
            'string.empty': `projectName cannot be an empty field`,
            'string.min': `projectName should be of minimum 5 characters`,
            'string.max': `projectName should be of maximum 255 characters`,
            'any.required': `projectName is a required field`}
        ),
        projectDescription: Joi.string().min(minDescription).max(maxDescription).required().empty().messages({
            'string.base': `projectDescription should be a type of 'text'`,
            'string.empty': `projectDescription cannot be an empty field`,
            'any.required': `projectDescription is a required field`}
        ),
        categoryId: Joi.number().required().empty().messages({
            'number.base': `categoryId should be a type of 'number'`,
            'number.empty': `categoryId cannot be an empty field`,
            'any.required': `categoryId is a required field`}
        ),
        image: Joi.string().optional().empty().messages({
            'string.base': `projectName should be a type of 'text'`,
            'string.empty': `projectName cannot be an empty field`}
        )}
    )};

export const updateportfolio = {
    schemaUpdateProject : Joi.object({
        projectName: Joi.string().min(minProject).max(maxProject).empty().messages({
            'string.base': `projectName should be a type of 'text'`,
            'string.empty': `projectName cannot be an empty field`,
            'string.min': `projectName should be of minimum 5 characters`,
            'string.max': `projectName should be of maximum 255 characters`,
            'any.required': `projectName is a required field`}
        ),
        projectDescription: Joi.string().min(minDescription).max(maxDescription).empty().messages({
            'string.base': `projectDescription should be a type of 'text'`,
            'string.empty': `projectDescription cannot be an empty field`,
            'any.required': `projectDescription is a required field`}
        ),
        categoryId: Joi.number().empty().messages({
            'number.base': `categoryId should be a type of 'number'`,
            'number.empty': `categoryId cannot be an empty field`,
            'any.required': `categoryId is a required field`}
        ),
        image: Joi.string().empty().messages({
            'string.base': `projectName should be a type of 'text'`,
            'string.empty': `projectName cannot be an empty field`}
        )}
    )};
