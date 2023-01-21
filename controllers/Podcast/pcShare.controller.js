require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcShareFuncs from "../../funcs/PodCast/pcShares.func";

export const addShare = async (req, res) => {
    try {
        var userId = req.user.id || req.body.userId;
        const { seriesId, episodeId } = req.body;
        var userId = req.user.id || req.body.userId;
        if (!episodeId) return failResponse(req, res, "noEpisodeId");
        if (!seriesId) return failResponse(req, res, 'noSeasonId');
        if (!userId) return failResponse(req, res, "noUserId");
        const data = await pcShareFuncs.addShare(req.body, userId);
        return successResponse(req, res, "success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};