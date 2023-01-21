// require('dotenv').config();
// import { sequelize, Sequelize } from "../models"
// const { QueryTypes } = require('sequelize');
// import { v4 as uuid } from 'uuid';

// export const checkDuplicate = async (name, code) => {
//     const AllAppLanguages = await sequelize.query(
//         `select * from appLanguages where name=:name and code=:code and isDeleted = false and isActive = true`,
//         {
//             replacements: { name, code },
//             type: QueryTypes.SELECT
//         }
//     );
//     return AllAppLanguages
// }
// export const getAll = async () => {
//     const AllAppLanguages = await sequelize.query(
//         `select * from appLanguages where isDeleted = false and isActive = true`,
//         { type: QueryTypes.SELECT }
//     );
//     AllAppLanguages.push({
//         id: "1",
//         "name": "English",
//         code: "en",
//         iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpgRaBY7hxQiUZruKECn-AAnnvmPSGgBdzJQ&usqp=CAU",
//     })
//     AllAppLanguages.push({
//         id: "2",
//         "name": "Hindi",
//         code: "hi",
//         iconURL: "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-small-url-icon-opened-on-the-computer-image_1132275.jpg",
//     })
//     return AllAppLanguages
// }
// export const add = async (name, code, iconURL) => {
//     const id = uuid()
//     const CreateData = await sequelize.query(
//         `insert into appLanguages(id, name, code, iconURL) values(:id, :name, :code, :iconURL)`,
//         {
//             replacements: { id, name, code, iconURL },
//             type: QueryTypes.INSERT
//         }
//     );
//     return id;
// }