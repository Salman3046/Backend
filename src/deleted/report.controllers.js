// require('dotenv').config();
// import { successResponse, errorResponse, failResponse } from "../helpers/responce"
// import * as reportFuncs from "../funcs/report.funcs"
// import * as utils from "../helpers/utils"
// import s3Upload from "../helpers/media"
// import path from "path";

// export const getAllOptions = async (req,res)=>{
//     try {
//         const type = req.body.type
//         if(!type){
//             return failResponse(req,res,"typeNotAvailable")
//         }
//         const data = await reportFuncs.getAllOptions(type)
//         return successResponse(req, res, data );
//     } catch (error) {
//         return errorResponse(req,res,error)
//     }
// }