import Sequelize from 'sequelize';
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require("../configs/config")[env];
// const sequelize = new Sequelize(
//     config.database,
//     config.userName,
//     config.password,
//     config,
// );
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    },
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });




// require('dotenv').config();
// var mysql = require('mysql');

// var mysqldb = mysql.createConnection({
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
// });
// // mysqldb.connect();
// mysqldb.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('connected as id ' + mysqldb.threadId);
// });
// mysqldb.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });
// module.exports = mysqldb;
