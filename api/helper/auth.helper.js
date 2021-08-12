import jwt from 'jsonwebtoken';
import error from '../utils/error.js';

const auth = (req, res, next) => {

    const token = req.header('x-auth-token');
    if(!token) {
        next(new error.UnAuthorized('Access denided. No token provided'));
    }

    try{
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        if(!decoded.isAdmin) {
            next(new error.UnAuthorized('Access denided.'));
        }
        next();

    }catch(ex){
        next(new error.BadRequest('Invalid token.'));
    }
};

export {auth};
