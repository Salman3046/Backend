require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupsCategoryFuncs from "../../funcs/groups/grpCategory.funcs";

/*Controller to create Group Categorys*/
export const createGroupCategory = async  (req, res) => {
    try {
        const data = await groupsCategoryFuncs.createGroupCategory(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to get list of Group Categorys*/
export const getAllGroupCategory = async (req, res) => {
    try {
        const data = await groupsCategoryFuncs.getAllGroupCategory();
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to search group Categorys*/
export const searchGroupCategory = async (req, res) => {
    try {
        const data = await groupsCategoryFuncs.searchGroupCategory(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to getGroupCategoryById*/
export const getGroupCategoryById = async (req, res) => {
    try {
        const data = await groupsCategoryFuncs.getGroupCategoryById(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};