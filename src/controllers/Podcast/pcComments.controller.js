require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcCommentsFuncs from "../../funcs/PodCast/pcComments.func";

export const comment = async (req, res) => {
    try {
        const { comment, seriesId, episodeId } = req.body;
        var userId = req.user.id 
        if (!episodeId) return failResponse(req, res, "noEpisodeId");
        if (!userId) return failResponse(req, res, "noUserId");
        if (!comment) return failResponse(req, res, "noComment");

        const data = await pcCommentsFuncs.addComment(req.body, userId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const deleteComment = async (req, res) => {
    try {
        const { commentId} = req.body;
        var userId = req.user.id 
        const data = await pcCommentsFuncs.deleteComment(commentId, userId);
        return successResponse(req, res, "success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getComments = async (req, res) => {
    try {
        const { podcastId} = req.body;
        if(!podcastId){
            return failResponse(req, res, "Enter podcastId")
        }
        var userId = req.user.id 
        const data = await pcCommentsFuncs.getComments(podcastId, userId, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const editComment = async (req, res) => {
    try {
        const { id} = req.body;
        if(!id){
            return failResponse(req, res, "Enter comment id")
        }
        var userId = req.user.id 
        const data = await pcCommentsFuncs.editComment(id, req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getAllSubComments = async (req, res) => {
    try {
        const { commentId} = req.body;
        if(!commentId){
            return failResponse(req, res, "Enter commentId")
        }
        var userId = req.user.id 
        const data = await pcCommentsFuncs.getAllSubComments(commentId, req.body, req.user.id);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const reportUnReportComment = async (req, res) => {
    try {
        const { commentId, reportId} = req.body;
        if(!commentId){
            return failResponse(req, res, "Enter commentId")
        }
        var userId = req.user.id 
        const data = await pcCommentsFuncs.reportUnReportComment(userId, commentId, reportId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const setCommentLike = async (req, res) => {
    try {
        const { commentId, like} = req.body;
        if(!commentId){
            return failResponse(req, res, "Enter commentId")
        }
        var userId = req.user.id 
        const data = await pcCommentsFuncs.setCommentLike(userId, commentId, like);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};