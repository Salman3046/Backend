require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupPostLikes from "../../funcs/groups/grpLikes.funcs";
import * as groupPost from "../../funcs/groups/grpLikes.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

export const setLike = async (req, res) => {
    try {
        const { postId, likeReactionId, isLike } = req.body;
        const userId = req.body.userId || req.user.id;
        if (!postId) {
            return failResponse(req, res, "postIdNotAvailable")
        }
        if (isLike) {
            // const likes = await groupPost.getGrpPostLike(req.body);
            var likes = await groupPost.getGrpPostLike(req.body);
            const likeUser = await groupPostLikes.addGrpPostLike(req.body);
            const data = await groupPostLikes.addPostLike(req.body, likes[0].likesCount + 1);
        }
        else {
            const likes = await groupPost.getGrpPostLike(req.body);
            const data = await groupPostLikes.removeGrpPostLike(req.body);
            const count = await groupPostLikes.addPostLike(req.body, likes[0].likesCount - 1);
        };
        const data = await groupPostLikes.getPostLike(req.body);
        const grpData = await groupPostLikes.getGroupDetail(postId);
        req.user.id = req.body.userId;
        const name = grpData[0].groupName;
        const postUserId = grpData[0].postUserId;
        const postType = grpData[0].postType;
        if (postUserId !== userId) {
            let totalLikes = likes[0].likesCount;
            let and_n_others
            let mainData = {
              ...req.user,
              name,
              postType,
              userId : postUserId
            }
            if (totalLikes === 2) {
              and_n_others = "and 1 other "
            }
            if (totalLikes === 1) {
              and_n_others = ''
            }
            if (totalLikes > 2) {
              and_n_others = `and ${totalLikes - 1} others`
            }
            mainData.and_n_others = and_n_others
            const inAppData = {
              postId: req.body.groupId,
              notificationType: "group-postLike"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-postLike", mainData, inAppData)
          }
        return successResponse(req, res, { data: data.rows, message: isLike ? 'Liked' : !isLike ? 'Desliked' : "" });
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to get like group post counts*/
export const getAllGrpPostLikes = async (req, res) => {
    try {
        const data = await groupPostLikes.getAllPostLikes(req.body);
        if (!data.rows.length) return failResponse(req, res, 'NoLikesFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};
