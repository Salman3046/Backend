// require('dotenv').config();
// import { successResponse, errorResponse, failResponse } from "../helpers/responce"
// import * as contactFuncs from "../funcs/contacts.funcs"
// import * as loginSignup from "../funcs/loginSignup.funcs"
// import * as utils from "../helpers/utils"
// import s3Upload from "../helpers/media"
// import path from "path";

// export const getContactById = async (req, res) => {
//     try {
//         const id=req.body.id
//         if(id){
//             return failResponse(req,res,"idNotAvailable")
//         }
//         const result = await contactFuncs.getContactById(id);
//         return successResponse(req, res, result);
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// // export const getContactByUserId = async (req, res) => {
// //     try {
// //         const result = await contactFuncs.getContactByUserId(req.user.id);
// //         return successResponse(req, res, result);
// //     } catch (error) {
// //         return errorResponse(req, res, error);
// //     }
// // }
// // export const addContact = async (req, res) => {
// //     try {
// //         const userId = req.user.id;
// //         const isVerified = true 
// //         const type = "addContact" 
// //         const { contact, isEmail ,otp } = req.body;
        
// //         if (!contact) {
// //             return failResponse(req, res, "contactNotAvailable")
// //         }
// //         if (!otp) {
// //             return failResponse(req, res, "otpNotAvailable")
// //         }
// //         if (isEmail === undefined) {
// //             return failResponse(req, res, "isEmailNotAvailable")
// //         }

// //         const otpResult = await loginSignup.verifyOtp(otp, contact, type)
// //         if (otpResult) {
// //             await contactFuncs.addContact(userId, contact, isEmail, isVerified);
// //             return successResponse(req, res, "UserContactAdded");
// //         }
// //         return failResponse(req, res, "wrongOtp");

// //     } catch (error) {
// //         return errorResponse(req, res, error);
// //     }
// // }
// export const setContactVerify = async (req, res) => {
//     try {
//         await contactFuncs.updateContact({
//             id: req.body.id,
//             isVerified: req.body.isVerified
//         });
//         return successResponse(req, res, "UpdatedUserContact");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }
// export const removeContact = async (req, res) => {
//     try {
//         await contactFuncs.updateContact({
//             id: req.body.id,
//             isDeleted: true
//         });
//         return successResponse(req, res, "UserContactDeleted");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// }