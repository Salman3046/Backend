// require('dotenv').config();
// import { sequelize, Sequelize } from "../models"
// const { QueryTypes } = require('sequelize');
// import { v4 as uuid } from 'uuid';

// export const getById = async (id) => {
//     const interestResult = await sequelize.query(
//         `select * from interests where id = :id and isActive = true and isDeleted = false`,
//         { replacements: { id }, type: QueryTypes.SELECT }
//     );
//     return interestResult
// }
// export const getByName = async (name) => {
//     const interestResult = await sequelize.query(
//         `select * from interests where name = :name and isActive = true and isDeleted = false`,
//         { replacements: { "name": name }, type: QueryTypes.SELECT }
//     );
//     return interestResult
// }
// export const getAll = async () => {
//     const interestResult = await sequelize.query(
//         `select * from interests where isActive = true and isDeleted = false`,
//         { type: QueryTypes.SELECT }
//     );
//     return interestResult
// }
// export const update = async (data) => {
//     var updateQry = `update interests set `
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
// export const add = async (name) => {
//     const id = uuid()
//     const CreateData = await sequelize.query(
//         `insert into interests (id, name) values(:id, :name)`,
//         {
//             replacements: { id, name },
//             type: QueryTypes.INSERT
//         }
//     );
//     return id;
// }
// export const getByUserId = async (userId) => {
//     const interestResult = await sequelize.query(
//         `select * 
//          from userInterests as ui
//          inner join interests as i on ui.interestId=i.id
//          where ui.userId = :userId
//             and ui.isActive = true 
//             and ui.isDeleted = false
//             and i.isActive = true 
//             and i.isDeleted = false`,
//         { replacements: { "userId": userId }, type: QueryTypes.SELECT }
//     );
//     return interestResult
// }
// export const addListToUser = async (userId, interestIds) => {
//     await removeAllInterestOfUser(userId)
//     if (Array.isArray(interestIds)) {
//         const result = []
//         var query = `INSERT INTO userInterests (id, userId, interestId) VALUES `
//         for(const i in interestIds){
//             const id = uuid()
//             result.push(id)
//             query += ` ( '${id}' , '${userId}' , '${interestIds[i]}' ) ,`
//         }
//         query = query.slice(0, -1)

//         const resultt = await sequelize.query(
//             query,
//             {
//                 type:QueryTypes.INSERT
//             }
//         )
//         return result;
//     }
//     else {
//         const id = uuid()
//         const CreateData = await sequelize.query(
//             `insert into userInterests (id, userId, interestId) values (:id, :userId, :interestIds)`,
//             {
//                 replacements: { id, userId, interestIds },
//                 type: QueryTypes.INSERT
//             }
//         );
//         return id;
//     }
// }
// export const removeAllInterestOfUser = async (userId)=>{
//     const data=await sequelize.query(`
//     DELETE FROM userInterests
//     WHERE userId=:userId`,
//     {
//         replacements:{userId},
//         type:QueryTypes.DELETE
//     })
//     return data
// }
// // export const addToUser = async (userId, interestId) => {
// //     const existingRec = await sequelize.query(
// //         `select * from userInterests where userId=:userId and interestId=:interestId`,
// //         {
// //             replacements: { userId, interestId },
// //             type: QueryTypes.SELECT
// //         }
// //     );
// //     if (existingRec && existingRec.length > 0) {
// //         const UpdateRec = await sequelize.query(
// //             `update userInterests set isDeleted=false, isActive=true where userId=:userId and interestId=:interestId`,
// //             {
// //                 replacements: { userId, interestId },
// //                 type: QueryTypes.UPDATE
// //             }
// //         );
// //         return existingRec.id;
// //     }
// //     else {
// //         const id = uuid()
// //         const CreateData = await sequelize.query(
// //             `insert into userInterests (id, userId, interestId) values(:id, :userId, :interestId)`,
// //             {
// //                 replacements: { id, userId, interestId },
// //                 type: QueryTypes.INSERT
// //             }
// //         );
// //         return id;
// //     }
// // }