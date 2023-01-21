// require('dotenv').config();
// import { sequelize, Sequelize } from "../models"
// const { QueryTypes } = require('sequelize');
// import { v4 as uuid } from 'uuid';

// export const getById = async (id) => {
//     const hobbyResult = await sequelize.query(
//         `select * from hobbies where id = :id and isActive = true and isDeleted = false`,
//         { replacements: { id }, type: QueryTypes.SELECT }
//     );
//     return hobbyResult
// }
// export const getByName = async (name) => {
//     const hobbyResult = await sequelize.query(
//         `select * from hobbies where name = :name and isActive = true and isDeleted = false`,
//         { replacements: { "name": name }, type: QueryTypes.SELECT }
//     );
//     return hobbyResult
// }
// export const getAll = async () => {
//     const hobbyResult = await sequelize.query(
//         `select * from hobbies where isActive = true and isDeleted = false`,
//         { type: QueryTypes.SELECT }
//     );
//     return hobbyResult
// }
// export const update = async (data) => {
//     var updateQry = `update hobbies set `
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
//         `insert into hobbies (id, name) values(:id, :name)`,
//         {
//             replacements: { id, name },
//             type: QueryTypes.INSERT
//         }
//     );
//     return id;
// }
// export const getByUserId = async (userId) => {
//     const hobbyResult = await sequelize.query(
//         `select * 
//          from userHobbies as uh
//          inner join hobbies as h on uh.hobbyId=h.id
//          where uh.userId = :userId
//             and uh.isActive = true 
//             and uh.isDeleted = false
//             and h.isActive = true 
//             and h.isDeleted = false`,
//         { replacements: { "userId": userId }, type: QueryTypes.SELECT }
//     );
//     return hobbyResult
// }
// export const addListToUser = async (userId, hobbyIds) => {
//     await removeAllHobbiesOfUser(userId)
//     if (Array.isArray(hobbyIds)) {
//         const result = []
//         // for (var i = 0; i < hobbyIds.length; i++) {
//         //     const resultt = await addToUser(userId, hobbyIds[i])
//         //     result.push(resultt);
//         // }
//         // return result;
//         var query = `INSERT INTO userHobbies (id, userId, hobbyId) VALUES `
//         for(const i in hobbyIds){
//             const id = uuid()
//             result.push(id)
//             query += ` ( '${id}' , '${userId}' , '${hobbyIds[i]}' ) ,`
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
//             `insert into userHobbies (id, userId, hobbyId) values (:id, :userId, :hobbyIds)`,
//             {
//                 replacements: { id, userId, hobbyIds },
//                 type: QueryTypes.INSERT
//             }
//         );
//         return id;
//     }
// }

// export const removeAllHobbiesOfUser = async (userId)=>{
//     const data=await sequelize.query(`
//     DELETE FROM userHobbies
//     WHERE userId=:userId`,
//     {
//         replacements:{userId},
//         type:QueryTypes.DELETE
//     })
//     return data
// }

// // export const addToUser = async (userId, hobbyId) => {
// //     const existingRec = await sequelize.query(
// //         `select * from userHobbies where userId=:userId and hobbyId=:hobbyId`,
// //         {
// //             replacements: { userId, hobbyId },
// //             type: QueryTypes.SELECT
// //         }
// //     );
// //     if (existingRec && existingRec.length > 0) {
// //         const UpdateRec = await sequelize.query(
// //             `update userHobbies set isDeleted=false, isActive=true where userId=:userId and hobbyId=:hobbyId`,
// //             {
// //                 replacements: { userId, hobbyId },
// //                 type: QueryTypes.UPDATE
// //             }
// //         );
// //         return existingRec.id;
// //     }
// //     else {
// //         const id = uuid()
// //         const CreateData = await sequelize.query(
// //             `insert into userHobbies (id, userId, hobbyId) values(:id, :userId, :hobbyId)`,
// //             {
// //                 replacements: { id, userId, hobbyId },
// //                 type: QueryTypes.INSERT
// //             }
// //         );
// //         return id;
// //     }
// // }