import multer from 'multer';

const destination = function(req, file, cb){
    cb(null,'public/upload/');
};
const filename = function(req, file, cb){
    cb(null,`${file.fieldname}-${Date.now()}${file.originalname}`);
};
const storage = multer.diskStorage({destination,filename});

export const upload =  multer({ storage });
