import mysql from 'mysql';

export const pool  = () => {
    return mysql.createPool({
        connectionLimit: 1,
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'CRUDBoilerPlate'}

    );
};
