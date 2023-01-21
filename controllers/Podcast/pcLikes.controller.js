require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcLikeFuncs from "../../funcs/PodCast/pcLikes.func";

export const like = async (req, res) => {
    try {
        var userId = req.user.id 
        let {episodeId} = req.body
        if (!episodeId) return failResponse(req, res, "noEpisodeId");
        const data = await pcLikeFuncs.setLike(req.body, userId);
        return successResponse(req, res, "success");
    } catch (error) {
        return errorResponse(req, res, error);
    }
};

export const getAllLikes = async (req, res) => {
    try {
        var userId = req.user.id 
        let {episodeId} = req.body
        if (!episodeId) return failResponse(req, res, "noEpisodeId");
        const data = await pcLikeFuncs.getAllLikes(req.body, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    }
};