require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as goLiveFuncs from "../funcs/goLive.funcs";
import * as messengerSocket from "../messenger/messenger.socket";
import * as notification from "../helpers/notification";

export const getCategories = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const data = await goLiveFuncs.getCategories(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGoLiveById = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const userId = req.user.id
    const data = await goLiveFuncs.getGoLiveById(goLiveId,userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGoLiveByConnectionId = async (req, res) => {
  try {
    const { connectionId,pageIndex, pageSize } = req.body;
    var userId = req.user.id || req.body.userId;
    const data = await goLiveFuncs.getGoLiveByConnectionId(userId, connectionId, pageIndex, pageSize );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGoLiveByCategoryId = async (req, res) => {
  try {
    const { categoryId,pageIndex, pageSize,sortBy,searchKey } = req.body;
    var userId = req.user.id || req.body.userId;
    const data = await goLiveFuncs.getGoLiveByCategoryId(categoryId, pageIndex, pageSize,sortBy,userId,searchKey );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGoLiveCategoriesTop = async (req, res) => {
  try {
    const { pageIndex, pageSize,searchKey  } = req.body;
    var userId = req.user.id || req.body.userId;
    // const userId = req.body.userId
    const data = await goLiveFuncs.getGoLiveCategoriesTop(userId, pageIndex, pageSize,searchKey );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const isLive = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.getGoLiveById(goLiveId);
    if (data && data.isLive) return successResponse(req, res, true);
    return successResponse(req, res, false);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const start = async (req, res) => {
  try {
    const { goLiveId, categoryId, allowComments ,uid,connectionId} = req.body;
    var userId = req.user.id || req.body.userId;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    if (!categoryId) {
      return failResponse(req, res, "nocategoryId");
    }
    const resourceId = await goLiveFuncs.acquireResourceId(goLiveId,uid)
    const result = await goLiveFuncs.startRecording(goLiveId,uid,resourceId)
    const data = await goLiveFuncs.createGoLive(
      goLiveId,
      userId,
      categoryId,
      allowComments,
      uid,
      resourceId,
      result.sid
    );
    const payload = {
      goLive: { goLiveId, allowComments },
      user: {
        id: req.user.id,
        email: req.user.email,
        gender: req.user.gender,
        fullName: req.user.fullName,
        userName: req.user.userName,
        sequenceNo: req.user.sequenceNo,
        profileImageThumb: req.user.profileImageThumb,
      },
      title: "started goLive.",
      noSave: true,
      silent: false,
      imageUrl: req.user.profileImageThumb,
    };
    if(connectionId){
      await notification.sendToConnections(req.user.id, req.user, "goLiveStarted", payload,connectionId)
    }else{
      await notification.sendToFriends(req.user.id, req.user, "goLiveStarted", payload);
    }
    // await notification.sendToFriends(req.user.id, req.user.id, "goLive-start","user",`${req.user.fullName} started Live` ,payload);
    // return successResponse(req, res, "success");
    return successResponse(req,res,result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const end = async (req, res) => {
  try {
    const { goLiveId,resourceId,uid,sid } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.endLive(goLiveId);
    messengerSocket.endedGoLive(goLiveId,req.user.id);
    // return successResponse(req, res, "success");
    const recordingData = await goLiveFuncs.stopRecording(goLiveId,uid,resourceId,sid)
    return successResponse(req,res,recordingData)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const comment = async (req, res) => {
  try {
    const { goLiveId, comment } = req.body;
    const userId = req.user.id ;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    if (!comment) {
      return failResponse(req, res, "noComment");
    }
    const data = await goLiveFuncs.addComment(goLiveId, userId, comment);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      fullName:req.user.fullName,
      profileThumb: req.user.profileImageThumb,
      profileImage : req.user.profileImage,
      commentId : data,
      isPrivate : req.user.isPrivate
    };
    messengerSocket.commentOnGoLive(goLiveId, user, comment);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getComments = async (req, res) => {
  try {
    const { goLiveId, pageIndex, pageSize } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const userId = req.user.id
    const data = await goLiveFuncs.getComments(goLiveId, pageIndex, pageSize,userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const addCommentReport = async (req, res) => {
  try {
    const { reportOptionId, commentId, remark } = req.body;
    const userId = req.user.id;

    const bpResponse = await goLiveFuncs.addCommentReport(
      userId,
      reportOptionId,
      commentId,
      remark
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setAllowComments = async (req, res) => {
  try {
    const { goLiveId, allowComments } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.setAllowComments(goLiveId, allowComments);
    messengerSocket.updateGoLive(goLiveId,req.user.id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const like = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.addLike(goLiveId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    messengerSocket.likeOnGoLive(goLiveId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const share = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.addShare(goLiveId, userId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getViewers = async (req, res) => {
  try {
    const { goLiveId,liveViewers, pageIndex, pageSize } = req.body;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.getViewers(goLiveId,liveViewers, pageIndex, pageSize );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const JoinLive = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.JoinLive(goLiveId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    messengerSocket.userJoinedGoLive(goLiveId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const leaveLive = async (req, res) => {
  try {
    const { goLiveId } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!goLiveId) {
      return failResponse(req, res, "nogoLiveId");
    }
    const data = await goLiveFuncs.leaveLive(goLiveId, userId);
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      fullName: req.user.fullName,
      profileThumb: req.user.profileImageThumb
    };
    messengerSocket.userLeftGoLive(goLiveId, user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteComment = async (req, res) => {
  try {
    const {commentId,goLiveId} = req.body
    if(!commentId){
      return failResponse(req,res,"Enter commentId")
    }
    const result = await goLiveFuncs.deleteComment(commentId)
    messengerSocket.updateGoLive(goLiveId,req.user.id)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const pinComment = async (req, res) => {
  try {
    const {commentId,goLiveId,isPinned} = req.body
    const userId = req.user.id
    if(!commentId){
      return failResponse(req,res,"Enter commentId")
    }
    if(!goLiveId){
      return failResponse(req,res,"Enter goLiveId")
    }
    let result
    const user = {
      id: req.user.id,
      userName: req.user.userName,
      profileThumb: req.user.profileImageThumb,
    };
    if(isPinned){
      result = await goLiveFuncs.pinComment(commentId,goLiveId,userId)
      messengerSocket.pinCommentGoLive(goLiveId, user,commentId);
    }
    if(!isPinned){
      result = await goLiveFuncs.unPinComment(commentId,goLiveId,userId)
      messengerSocket.pinCommentGoLive(goLiveId, user,commentId);
    }
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getPinnedComments = async (req, res) => {
  try {
    const {goLiveId} = req.body
    if(!goLiveId){
      return failResponse(req,res,"Enter goLiveId")
    }
    const result = await goLiveFuncs.getPinnedComments(goLiveId)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeUserFromGoLive = async (req, res) => {
  try {
    const {goLiveId,userId} = req.body
    const data = await goLiveFuncs.leaveLive(goLiveId, userId);
    const user = {
      id: userId
    };
    messengerSocket.removeUserFromGoLive(goLiveId, user);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addThumbnail = async (req, res) => {
  try {
    const {thumbnailUrl,goLiveId} = req.body
    if(!thumbnailUrl){
      return failResponse(req,res,"Enter thumbnailUrl")
    }
    if(!goLiveId){
      return failResponse(req,res,"Enter goLiveId")
    }
    const data = await goLiveFuncs.addThumbnail(thumbnailUrl,goLiveId)
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getGoLiveStatus = async (req, res) => {
  try {
   const data = await goLiveFuncs.getGoLiveStatus()
   return successResponse(req,res,data)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const updateGoLiveSettings = async (req, res) => {
  try {
   const data = await goLiveFuncs.updateGoLiveSettings(req.body)
   return successResponse(req,res,data)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};