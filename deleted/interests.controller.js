// require('dotenv').config();
// import { successResponse, errorResponse } from "../helpers/responce"
// import * as interestFuncs from "../funcs/interests.funcs"

// export const getAll = async (req, res) => {
//     try {
//         const result = await interestFuncs.getAll()
//         return successResponse(req, res, { count: result.length, rows: result });
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const getByUserId = async (req, res) => {
//     try {
//         const userId = req.user.id
//         const result = await interestFuncs.getByUserId(userId)
//         return successResponse(req, res, { count: result.length, rows: result });
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const add = async (req, res) => {
//     try {
//         const name = req.body.interestName
//         if (!name) {
//             return failResponse(req, res, "noName")
//         }
//         const existData = await interestFuncs.getByName(name);
//         if (existData && existData.length > 0) {
//             return failResponse(req, res, "nameExists")
//         }
//         const result = await interestFuncs.add(name)
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
//         await interestFuncs.updateInterest({
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
//         await interestFuncs.update(req.body);
//         return successResponse(req, res, "Updated User");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const addToUser = async (req, res) => {
//     try {
//         const interestIds = req.body.interestIds
//         const userId = req.user.id;
//         const result = await interestFuncs.addListToUser(userId, interestIds);
//         return successResponse(req, res, result);
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }