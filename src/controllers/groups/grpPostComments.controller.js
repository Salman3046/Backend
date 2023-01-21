require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupPostComments from "../../funcs/groups/grpPostComments.funcs";
import * as groupPost from "../../funcs/groups/group.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'
import * as groupPostLikes from "../../funcs/groups/grpLikes.funcs";


/*Controller to getGrpPostCommentCounts*/
export const getGrpPostCommentCounts = async (req, res) => {
    try {
        const commentCounts = await groupPostComments.getGrpPostComments(req.body);
        const data = await groupPostComments.addComment(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to updateGrpPostCommentCounts*/
export const updateGrpPostCommentCounts = async (req, res) => {
    try {
        const data = await groupPostComments.addComment(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to addGrpPostComment*/
export const addGrpPostComment = async (req, res) => {
    try {
        const commentCounts = await groupPostComments.getGrpPostComments(req.body);
        const updateCount = await groupPostComments.updateGrpPostCommentsCounts(req.body, parseInt(commentCounts.commentsCount + 1));
        const data = await groupPostComments.addComment(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const addComment = async (req, res) => {
    try {
        const { postId, comment, commentId, hashTags, mentionIds } = req.body;
        const userId = req.user.id
        if (!postId) {
            return failResponse(req, res, "postIdNotAvailable");
        };
        if (!comment) {
            return failResponse(req, res, "commentNotAvailable");
        };
        // if (commentId === "") {
        if (!commentId) {
            // const commentCounts = await groupPostComments.getGrpPostComments(req.body);
            var commentCounts = await groupPostComments.getGrpPostComments(req.body);
            console.log('commentCounts', commentCounts)
            const updateCount = await groupPostComments.updateGrpPostCommentsCounts(req.body, parseInt(commentCounts));
        };
        const result = await groupPostComments.addComment(req.body,userId);
        const grpData = await groupPostLikes.getGroupDetail(postId);
        const name = grpData[0].groupName;
        const postUserId = grpData[0].postUserId;
        const groupId = grpData[0].groupId;
        const postType = grpData[0].postType;
        if (postUserId !== userId) {
            let totalComment = commentCounts;
            let and_n_others
            let mainData = {
              ...req.user,
              name,
              postType,
              userId : postUserId
            }
            if (totalComment === 2) {
              and_n_others = "and 1 other "
            }
            if (totalComment === 1) {
              and_n_others = ''
            }
            if (totalComment > 2) {
              and_n_others = `and ${totalComment - 1} others`
            }
            mainData.and_n_others = and_n_others
            const inAppData = {
              postId: groupId,
              notificationType: "group-postComment"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-postComment", mainData, inAppData)
          }
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to updateGrpPostComment*/
export const updateGrpPostComment = async (req, res) => {
    try {
        const data = await groupPostComments.editComment(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to getPostComments*/
export const getPostComments = async (req, res) => {
    try {
        const data = await groupPostComments.getPostComments(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to getPostComments*/
export const grpPostAllowComments = async (req, res) => {
    try {
        const data = await groupPostComments.grpPostAllowComments(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to grpPostAddCommentLike*/
export const grpPostAddCommentLike = async (req, res) => {
    try {
        if (req.body.reactionId) {
            const data = await groupPostComments.addCommentLike(req.body);
            const cmtOwner = await groupPostComments.getCmtOwnerAndGroupDetail(req.body.commentId);
            const name = cmtOwner[0].name;
            const cmtOwnerId = cmtOwner[0].cmtOwnerId;
            const postType = cmtOwner[0].postType;
            const groupId = cmtOwner[0].groupId;
            const userId = req.body.userId
            req.user.id = userId;
            if (cmtOwnerId !== userId) {
                let totalLikes = cmtOwner[0].cmtLiked;
                let and_n_others
                let mainData = {
                    ...req.user,
                    name,
                    postType,
                    userId : cmtOwnerId
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
                postId: groupId,
                notificationType: "group-postCommentLike"
                }
                await adminContNotificationFuncs.sendNotificationsByType("group-postCommentLike", mainData, inAppData)
            }
            return successResponse(req, res, 'Like');
        };
        if (!req.body.reactionId) {
            const data = await groupPostComments.removeCommentLike(req.body);
            return successResponse(req, res, 'DisLike');
        };
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to grpPostAddCommentLikeRemove*/
export const grpPostAddCommentLikeRemove = async (req, res) => {
    try {
        const data = await groupPostComments.removeCommentLike(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to grpPostAddCommentLikeRemove*/
export const grpPostreportComment = async (req, res) => {
    try {
        const data = await groupPostComments.reportComment(req.body);
        return successResponse(req, res, "Success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const deletePostComments = async (req, res) => {
    try {
        const data = await groupPostComments.deleteComment(req.body);
        return successResponse(req, res, "Success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};