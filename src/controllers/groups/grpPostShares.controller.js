
require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as postShare from "../../funcs/groups/grpPostShares.funcs";
import * as groupPostLikes from "../../funcs/groups/grpLikes.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

export const addShare = async (req, res) => {
    try {
        const postId = req.body.postId;
        const userId = req.body.userId
        if (!postId) {
            return failResponse(req, res, "noId")
        }
        const shareCount = await postShare.getGrpPostShareCount(req.body.postId);
        console.log('count', shareCount)
        const result = await postShare.addShare(postId, userId)
        const updateShareCount = postShare.updatePostShareCount(postId, shareCount[0].sharesCount + 1);
        const grpData = await groupPostLikes.getGroupDetail(postId);
        req.user.id = userId;
        const name = grpData[0].groupName;
        const postUserId = grpData[0].postUserId;
        const postType = grpData[0].postType;
        const groupId = grpData[0].groupId;
        if (postUserId !== userId) {
            let totalShare = (shareCount[0].sharesCount)+1;
            let and_n_others
            let mainData = {
              ...req.user,
              name,
              postType,
              userId : postUserId
            }
            if (totalShare === 2) {
              and_n_others = "and 1 other "
            }
            if (totalShare === 1) {
              and_n_others = ''
            }
            if (totalShare > 2) {
              and_n_others = `and ${totalShare - 1} others`
            }
            mainData.and_n_others = and_n_others
            const inAppData = {
              postId: groupId,
              notificationType: "group-postShare"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-postShare", mainData, inAppData)
        }
        return successResponse(req, res, "Shared");
    } catch (error) {
        return errorResponse(req, res, error);
    }
}

export const getAllShare = async (req, res) => {
    try {
        const { postId, pageIndex, pageSize } = req.body;
        if (!postId) {
            return failResponse(req, res, "noPostId");
        }
        const result = await postShare.getAllShare(postId, pageIndex, pageSize);
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, error);
    }
}