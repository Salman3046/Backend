require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupPostViews from "../../funcs/groups/grpPostViews.funcs";

/*Controller addGrpPostViewt*/
export const addGrpPostView = async (req, res) => {
    try {
        const views = await groupPostViews.getGrpPostViewCount(req.body);
        const data = await groupPostViews.addGrpPostView(req.body);
        const updateViewCount = await groupPostViews.addPostViewCount(req.body, views[0].viewsCount + 1);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to get getGrpPostVivers*/
export const getGrpPostVivers = async (req, res) => {
    try {
        const data = await groupPostViews.getAllPostViews(req.body);
        if (!data.rows.length) return failResponse(req, res, 'NoPostsViewsi');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

