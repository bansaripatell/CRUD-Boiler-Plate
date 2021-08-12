import {config} from './config.js';

class GeneralResponse {
    constructor(message,result,statusCode = '') {
        this.message = message;
        if(statusCode === ''){
            statusCode = config.HTTP_SUCCESS;
        }
        this.statusCode = statusCode;
        this.result = result;
    }
}

export {GeneralResponse};
