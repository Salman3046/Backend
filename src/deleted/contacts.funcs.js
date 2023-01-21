// require('dotenv').config();
// import { sequelize, Sequelize } from "../models"
// import { v4 as uuid } from 'uuid';
// const { QueryTypes } = require('sequelize');
// import crypto from "crypto";
// import moment from "moment"

// export const getContactById = async (id) => {
//     const otpResult = await sequelize.query(
//         `select * from userContacts where id = :id and isDeleted=false`,
//         {
//             replacements: {
//                 id,
//             },
//             type: QueryTypes.SELECT
//         }
//     );
//     return otpResult;
// }
// // export const getContactByUserId = async (userId) => {
// //     const otpResult = await sequelize.query(`
// //         SELECT 
// //             userContacts.id,
// //             userContacts.userId,
// //             userContacts.contact,
// //             userContacts.isEmail,
// //             CONCAT(:baseURL,users.profileImage) AS profileImage
// //         FROM userContacts
// //         LEFT OUTER JOIN users 
// //         ON users.id = userContacts.userId
// //         WHERE
// //         userContacts.userId = :userId AND 
// //         userContacts.isDeleted=false`,
// //         {
// //             replacements: {
// //                 userId,baseURL:process.env.FTP_BASE_URL
// //             },
// //             type: QueryTypes.SELECT
// //         }
// //     );
// //     return otpResult;
// // }
// // export const addContact = async (userId, contact, isEmail, isVerified) => {
// //     const id = uuid()
// //     await sequelize.query(
// //         `insert into userContacts 
// //         (id, userId, contact, isEmail, isVerified)
// //         values(:id, :userId, :contact, :isEmail, :isVerified)`,
// //         {
// //             replacements: {
// //                 id, userId, contact, isEmail, isVerified
// //             },
// //             type: QueryTypes.INSERT
// //         }
// //     );
// //     return true;
// // }
// export const updateContact = async (data) => {
//     var updateQry = `update userContacts set `
//     var replacements = {}
//     for (const [key, value] of Object.entries(data)) {
//         updateQry = updateQry + ` ${key} = :${key},`
//         console.log(`${key} ${value}`);
//         replacements[key] = value;
//     }
//     updateQry = updateQry.replace(/,+$/, "");
//     updateQry = updateQry + ` where id = :id`
//     await sequelize.query(
//         updateQry,
//         {
//             replacements,
//             type: QueryTypes.UPDATE
//         }
//     );
//     return true;
// }

