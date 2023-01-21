// require('dotenv').config();
// import { successResponse, errorResponse, failResponse } from "../helpers/responce"
// import * as hobbyFuncs from "../funcs/hobbies.funcs"

// export const getAll = async (req, res) => {
//     try {
//         const result = await hobbyFuncs.getAll()
//         return successResponse(req, res, { count: result.length, rows: result });
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const getByUserId = async (req, res) => {
//     try {
//         const userId = req.user.id
//         const result = await hobbyFuncs.getByUserId(userId)
//         return successResponse(req, res, { count: result.length, rows: result });
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const add = async (req, res) => {
//     try {
//         const name = req.body.hobbyName
//         if (!name) {
//             return failResponse(req, res, "noName")
//         }
//         const existData = await hobbyFuncs.getByName(name);
//         if (existData && existData.length > 0) {
//             return failResponse(req, res, "nameExists")
//         }
//         const result = await hobbyFuncs.add(name)
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
//         await hobbyFuncs.update({
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
//         await hobbyFuncs.update(req.body);
//         return successResponse(req, res, "updatedHobby");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const addToUser = async (req, res) => {
//     try {
//         const hobbyIds = req.body.hobbyIds
//         const userId = req.user.id;
//         const result = await hobbyFuncs.addListToUser(userId, hobbyIds);
//         return successResponse(req, res, result);
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }