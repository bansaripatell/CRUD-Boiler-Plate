import error from '../utils/error.js';
import { config } from '../utils/config.js';

const handleErrors = (err, req, res,next) => {
  next();
  if (err instanceof error.GeneralError) {
    if(err.statusCode === ''){
      err.statusCode = err.getCode();
    }
    if(err.result === '') {
      err.result = null;
    }
    return res.status(err.statusCode).json({
      status: config.ERROR,
      code: err.statusCode,
      message: err.message,
      result: err.result}
    );

  }
  if(err.statusCode === ''){
    err.statusCode = config.HTTP_SERVER_ERROR;
  }
  return res.status(config.HTTP_SERVER_ERROR).json({
    status: config.ERROR,
    code: err.statusCode,
    message: err.message}
  );
};

const handleJoiErrors = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const customErrorResponse = {};
      if (err.error.details.length !== 0) {
          err.error.details.forEach(item => {
              customErrorResponse[`${item.context.key}`] = {
                  message: item.message,
                  context: item.context.label,
                  type: item.type};
      });
    }
    next(new error.BadRequest('Validation Error', customErrorResponse));
   } else {
    next(err);
  }
};

export default { handleErrors, handleJoiErrors };
