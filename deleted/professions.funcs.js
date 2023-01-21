// require('dotenv').config();
// import { sequelize, Sequelize } from "../models"
// const { QueryTypes } = require('sequelize');
// import { v4 as uuid } from 'uuid';

// export const getById = async (id) => {
//     const professionResult = await sequelize.query(
//         `select * from professions where id = :id and isActive = true and isDeleted = false`,
//         { replacements: { id }, type: QueryTypes.SELECT }
//     );
//     return professionResult
// }
// export const getByName = async (name) => {
//     const professionResult = await sequelize.query(
//         `select * from professions where name = :name and isActive = true and isDeleted = false`,
//         { replacements: { "name": name }, type: QueryTypes.SELECT }
//     );
//     return professionResult
// }
// export const getAll = async (searchKey,pageIndex,pageSize) => {
//     searchKey = "%"+searchKey+"%";
//     let query = `select * from professions where name like :searchKey and isActive = true and isDeleted = false `
//     let result = {};
//     if(pageIndex !== undefined && pageSize !== undefined)
//     {
//         if(pageIndex==0){
//             const professionCount = await sequelize.query(
//                 query,
//                 { 
//                     replacements: { "searchKey": searchKey },
//                     type: QueryTypes.SELECT 
//                 }
//             );
//             result.count = professionCount.length
//         }
//         const offset = pageSize*pageIndex
//         query=query + ` limit ${offset}, ${pageSize}`
//     }
//     result.rows = await sequelize.query(
//         query,
//         { 
//             replacements: { "searchKey": searchKey },
//             type: QueryTypes.SELECT 
//         }
//     );
//     return result
// }
// export const update = async (data) => {
//     var updateQry = `update professions set `
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
//         `insert into professions (id, name) values(:id, :name)`,
//         {
//             replacements: { id, name },
//             type: QueryTypes.INSERT
//         }
//     );
//     return id;
// }