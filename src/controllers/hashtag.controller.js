require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../helpers/responce"
import * as hashTagFuncs from "../funcs/hashtag.funcs"

export const getTrending = async (req,res)=>{
    try{
        const {searchKey,pageIndex,pageSize}= req.body;
        const data = await hashTagFuncs.getTrendingHashtags(searchKey,pageIndex,pageSize);
        return successResponse(req,res,data);
    }catch(error){
        return errorResponse(req,res,error);
    }
}