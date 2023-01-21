// require("dotenv").config();
// import { sequelize, Sequelize } from "../models";
// const { QueryTypes } = require("sequelize");
// import { v4 as uuid } from "uuid";
// import * as hashtagFuncs from "../funcs/hashtag.funcs";

// export const getAllOptions =  async (type)=>{
//     const result = await sequelize.query(
//         `
//         SELECT * FROM reportOptions
//         WHERE type = :type
//         `,
//         {
//             replacements : { type },
//             type : QueryTypes.SELECT
//         }
//     )
//     return result;
// }