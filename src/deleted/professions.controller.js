// require('dotenv').config();
// import { successResponse, errorResponse, failResponse } from "../helpers/responce"
// import * as professionFuncs from "../funcs/professions.funcs"

// export const getAll = async (req, res) => {
//     try {
//         const {searchKey,pageIndex,pageSize}= req.body;
//         const result = await professionFuncs.getAll(searchKey,pageIndex,pageSize)
//         return successResponse(req, res, result );
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const add = async (req, res) => {
//     try {
//         const name = req.body.professionName
//         if (!name) {
//             return failResponse(req, res, "noName")
//         }
//         const existData = await professionFuncs.getByName(name);
//         if (existData && existData.length > 0) {
//             return failResponse(req, res, "nameExists")
//         }
//         const result = await professionFuncs.add(name)
//         return successResponse(req, res, result);
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const remove = async (req, res) => {
//     try {
//         const id = req.body.id;
//         if (!id) {
//             return failResponse(req, res, "noId")
//         }
//         await professionFuncs.update({
//             id, isDeleted: true
//         });
//         return successResponse(req, res, "deleted");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const update = async (req, res) => {
//     try {
//         const id = req.body.id;
//         await professionFuncs.update(req.body);
//         return successResponse(req, res, "updatedprofession");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }