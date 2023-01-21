// require('dotenv').config();
// import s3Upload from "../helpers/media"
// import { successResponse, errorResponse, failResponse } from "../helpers/responce"
// import * as appLanguageFuncs from "../funcs/appLanguages.funcs"
// import * as utils from "../helpers/utils"
// import path from "path";

// export const getAll = async (req, res) => {
//     try {
//         const appLanguageResult = await appLanguageFuncs.getAll();
//         return successResponse(req, res, { count: appLanguageResult.length, rows: appLanguageResult });
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const add = async (req, res) => {
//     try {
//         const { name, code } = req.body
//         const files = req.files
//         if (!name) {
//             return failResponse(req, res, "noName")
//         }
//         if (!code) {
//             return failResponse(req, res, "noCode")
//         }
//         const duplicateResult = await appLanguageFuncs.checkDuplicate(name, code)
//         if (duplicateResult.length > 0) {
//             return failResponse(req, res, "duplicateNameOrCode")
//         }
//         var link;
//         if (files.length) {
//             files.map((x) => {
//                 x.uniquename = `${utils.uniqueFileName()}${path.extname(x.originalname)}`;
//                 return x;
//             });
//             link = await s3Upload('appLanguagesIcons', files[0]);
//         }
//         const appLanguageResult = await appLanguageFuncs.add(name, code, link);
//         return successResponse(req, res, "languageAdded");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }