require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcCategoryFuncs from "../../funcs/PodCast/pcCategory.func";

export const createPodCastCategory = async (req, res) => {
    try {
        const data = await pcCategoryFuncs.createPodcastCategory(req.body);
        return successResponse(req, res, "Created");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getAllPodCastCategory = async (req, res) => {
    try {
        const data = await pcCategoryFuncs.getAllPodcastCategory(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};