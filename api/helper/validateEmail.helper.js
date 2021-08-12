import { isUserExist } from '../models/users.model.js';
import error  from '../utils/error.js';

export const validateEmail = (req, res , next) => {
    const email = req.body.email;
    if(email === undefined){
      next(new error.BadRequest('email required'));
    } else {
      isUserExist(email,(err, response) => {
          if(response.length > 0) {
            next(new error.BadRequest('User already exist.'));
          }
          next();
      });
    }
};
