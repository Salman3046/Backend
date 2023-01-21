require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcCoverImagesFunc from "../../funcs/PodCast/pcCoverImages.func";

export const addPcCoverImages = async (req, res) => {
    try {
        var userId = req.user.id || req.body.userId;
        const { coverImageUrl } = req.body;

        if (!coverImageUrl) return failResponse(req, res, "noCoverImageUrl");
        if (!userId) return failResponse(req, res, "noUserId");

        const data = await pcCoverImagesFunc.addPcCoverImages(req.body, userId);
        return successResponse(req, res, "success");
    } catch (error) {
        return errorResponse(req, res, error);
    }
};

export const getPcCoverImages = async (req, res) => {
    try {
        const data = await pcCoverImagesFunc.getPcCoverImages(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    }
};