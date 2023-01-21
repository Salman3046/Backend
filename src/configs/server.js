
import { sequelize, Sequelize } from "../models";
import routes from "../routes";
import express from "express";
import {ValidationError} from 'express-validation';

const cors = require('cors');
require('dotenv').config();
var bodyParser = require('body-parser')
var multer = require("multer");
var uploads = multer().any();

const app = express()


app.use(uploads);
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone, x-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
app.use("/", routes);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})


app.listen(process.env.API_PORT, () => {
    console.log(`Listening @ Port ${process.env.API_PORT}`)
})
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
})
module.exports = app;