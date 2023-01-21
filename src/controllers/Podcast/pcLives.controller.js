require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as pcLiveFuncs from "../../funcs/PodCast/pcLives.funcs";
import * as notification from "../../helpers/notification";
import * as messengerSocket from "../../messenger/messenger.socket";

export const createPodCastLive = async (req, res) => {
  try {
    let userId = req.user.id || req.body.userId;
    let { allowComments = true, pcLiveId, uid, connectionId } = req.body;
    if (!userId) return failResponse(req, res, 'UserIdIsRequired');

    // const resourceId = await pcLiveFuncs.acquireResourceId(pcLiveId, uid);
    // const result = await pcLiveFuncs.startPodcatRecording(pcLiveId, uid, resourceId);
    // console.log('result', result)

    let createPcLive = await pcLiveFuncs.createpcLive(userId, req.body);
    const payload = {
      pcLive: { createPcLive, allowComments },
      user: {
        id: req.user.id,
        email: req.user.email,
        gender: req.user.gender,
        fullName: req.user.fullName,
        userName: req.user.userName,
        sequenceNo: req.user.sequenceNo,
        profileImageThumb: req.user.profileImageThumb,
      },
      title: "started podcast.",
      noSave: true,
      silent: false,
      imageUrl: req.user.profileImageThumb,
    };
    if (connectionId) await notification.sendToConnections(userId, req.user, "pcStaerted", payload, connectionId);
    if (!connectionId) await notification.sendToFriends(userId, req.user, "pcStaerted", payload);
    // return successResponse(req, res, { result: result, podcastId: createPcLive });
    return successResponse(req, res, { podcastId: createPcLive });
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const JoinPcLive = async (req, res) => {
  try {
    const { podcastId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!podcastId) {
      return failResponse(req, res, "noPcLiveId");
    }
    const data = await pcLiveFuncs.joinpcLive(podcastId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    messengerSocket.userJoinedPcLive(podcastId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const comment = async (req, res) => {
  try {
    const { pcLiveId, comment } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!pcLiveId) return failResponse(req, res, "nopcLiveId");
    if (!userId) return failResponse(req, res, "noUserId");
    if (!comment) return failResponse(req, res, "noComment");

    const data = await pcLiveFuncs.addComment(pcLiveId, userId, comment);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      fullName:req.user.fullName,
      profileThumb: req.user.profileImageThumb,
      profileImage : req.user.profileImage,
      commentId : data,
      isPrivate : req.user.isPrivate
    };
    messengerSocket.commentOnPcLive(pcLiveId, user, comment);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const getComments = async (req, res) => {
  try {
    const { pcLiveId, pageIndex, pageSize } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!pcLiveId) return failResponse(req, res, "noPcLiveId");
    if (!userId) return failResponse(req, res, "noUserId");
    const data = await pcLiveFuncs.getComments(pcLiveId, pageIndex, pageSize, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const like = async (req, res) => {
  try {
    const { pcLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!pcLiveId) {
      return failResponse(req, res, "nogoLiveId");
    };

    const getUserLiked = await pcLiveFuncs.getUserLiked({ podcastLiveId: pcLiveId, userId });
    if (!getUserLiked.length) {
      let getpcLiveDetails = await pcLiveFuncs.getpcLiveDetails({ podcastLiveId: pcLiveId, userId });
      let updateLikesCount = await pcLiveFuncs.updatePcLikeCount({
        likesCount: getpcLiveDetails[0].likesCount + 1,
        podcastLiveId: pcLiveId,
      });
    };

    if (getUserLiked.length) {
      let newCount = getUserLiked[0].count + 1;
      await pcLiveFuncs.updateUserLikedCount({ podcastLiveId: pcLiveId, userId, count: newCount });
      return successResponse(req, res, "success");
    };

    const data = await pcLiveFuncs.addLike(pcLiveId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    messengerSocket.likeOnPcLive(pcLiveId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const leavePcLive = async (req, res) => {
  try {
    const { podcastId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!podcastId) {
      return failResponse(req, res, "noPcLiveId");
    }
    const data = await pcLiveFuncs.leaveLive(podcastId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    messengerSocket.userJoinedPcLive(podcastId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getViewers = async (req, res) => {
  try {
    const { podcastLiveId, liveViewers, pageIndex, pageSize } = req.body;
    if (!podcastLiveId) {
      return failResponse(req, res, "podcastLiveId");
    };
    const data = await pcLiveFuncs.getViewers(podcastLiveId, liveViewers, pageIndex, pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const endPcLive = async (req, res) => {
  try {
    const { podcastLiveId, cId, resourceId, uid, sid } = req.body;
    if (!podcastLiveId) {
      return failResponse(req, res, "noPodcastLiveId");
    };
    const data = await pcLiveFuncs.endLive(podcastLiveId);
    messengerSocket.endPcLive(podcastLiveId);
    // const recordingData = await pcLiveFuncs.stopPodcastRecording(cId, uid, resourceId, sid);
    // console.log('recordingData', recordingData)
    // return successResponse(req, res, recordingData);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const getpcLiveDetails = async (req, res) => {
  try {
    let { podcastLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!podcastLiveId) return failResponse(req, res, 'NopodcastLiveId');
    if (!userId) return failResponse(req, res, 'NouserId');
    let data = await pcLiveFuncs.getpcLiveDetails({ podcastLiveId, userId });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const deleteCommentOnLivePc = async (req, res) => {
  try {
    const { pcLiveId, commentId } = req.body;
    if (!pcLiveId) {
      return failResponse(req, res, "noPcLiveId");
    }
    const data = await pcLiveFuncs.deletePcLiveComment(pcLiveId, commentId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setAllowComments = async (req, res) => {
  try {
    const { podcastLiveId, allowComments } = req.body;
    if (!podcastLiveId) {
      return failResponse(req, res, "noPodcastLiveId");
    }
    const data = await pcLiveFuncs.setAllowComments(podcastLiveId, allowComments);
    messengerSocket.updatePcLive(podcastLiveId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCommentReport = async (req, res) => {
  try {
    const { reportOptionId, commentId, remark } = req.body;
    const userId = req.user.id;

    const result = await pcLiveFuncs.addCommentReport(
      userId,
      reportOptionId,
      commentId,
      remark
    );
    return successResponse(req, res, 'Success');
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const pinComment = async (req, res) => {
  try {
    const { commentId, pcLiveId, isPinned } = req.body
    const userId = req.user.id;
    if (!commentId) return failResponse(req, res, "Enter commentId");
    if (!pcLiveId) return failResponse(req, res, "Enter pcLiveId")

    let result
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    if (isPinned) {
      result = await pcLiveFuncs.pinComment(commentId, pcLiveId, userId)
      messengerSocket.pinCommentPcLive(pcLiveId, user, commentId);
    }
    if (!isPinned) {
      result = await pcLiveFuncs.unPinComment(commentId, pcLiveId, userId)
      messengerSocket.pinCommentPcLive(pcLiveId, user, commentId);
    }
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPinnedComments = async (req, res) => {
  try {
    const { pcLiveId } = req.body
    if (!pcLiveId) {
      return failResponse(req, res, "noPcLiveId")
    }
    const result = await pcLiveFuncs.getPinnedComments(pcLiveId)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeUserFromPcLive = async (req, res) => {
  try {
    const { pcLiveId, userId } = req.body;
    const data = await pcLiveFuncs.leaveLive(pcLiveId, userId);
    const user = {
      id: userId
    };
    messengerSocket.removeUserFromPCLive(pcLiveId, user);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  };
};

export const share = async (req, res) => {
  try {
    const { pcLiveId, userId } = req.body;
    if (!pcLiveId) return failResponse(req, res, "nopcLiveId");
    if (!userId) return failResponse(req, res, "nouserId");

    let getpcLiveDetails = await pcLiveFuncs.getpcLiveDetails({ podcastLiveId: pcLiveId, userId });
    let updateShareCount = await pcLiveFuncs.updatePcShareCount({
      shareCount: getpcLiveDetails[0].shareCount + 1,
      podcastLiveId: pcLiveId,
    });
    const data = await pcLiveFuncs.addShare(pcLiveId, userId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};