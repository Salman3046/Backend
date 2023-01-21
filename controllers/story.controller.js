require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as storyFuncs from "../funcs/story.func";
import * as messengerFuncs from "../messenger/messenger.funcs";
import * as usersFuncs from "../funcs/users.funcs";
import * as notification from "../helpers/notification";
import * as messengerSocket from "../messenger/messenger.socket";

/// *** STORY CONTROLLER *** ////

//showing stories

export const UserStories = async (req, res) => {
  try {
    const result = await storyFuncs.UserStories(req.body.userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//creating a post type story

export const createStory = async (req, res) => {
  try {
    if (!req.body.duration) {
      return failResponse(req, res, "durationNotAvailable");
    }
    await storyFuncs.createStory(req.body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createMediaStory = async (req, res) => {
  try {
    if (!req.body.duration) {
      return failResponse(req, res, "durationNotAvailable");
    }
    if(!req.body.visibility){
      return failResponse(req, res, "enter visibility id")
    }
    await storyFuncs.createMediaStory(req.body, req.user.id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//list of all stories

export const listStories = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const result = await storyFuncs.listStories(
      pageIndex,
      pageSize,
      req.user.id
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//liking a story

export const likeStory = async (req, res) => {
  try {
    const { storyId , like} = req.body;
    const userId = req.body.userId || req.user.id;
    if (!storyId) {
      return failResponse(req, res, "postIdNotAvailable");
    }

    const result = await storyFuncs.likeStory(userId, storyId, like);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//change story settings

export const changeSettings = async (req, res) => {
  try {
    const { storyId, visibility } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!storyId) {
      return failResponse(req, res, "storyIdNotAvailable");
    }

    const result = await storyFuncs.changeSettings(userId, storyId, visibility);
    return successResponse(req, res, "success", result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//deleting a story

export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!storyId) {
      return failResponse(req, res, "storyIdNotAvailable");
    }

    const result = await storyFuncs.deleteStory(userId, storyId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//report story

export const reportStory = async (req, res) => {
  try {
    const { storyId, reportOptionId, storyUserId, report, mute } = req.body;
    const userId = req.body.userId || req.user.id;

    if (report === 1) {
      if (!storyId) {
        return failResponse(req, res, "noStoryId");
      }
      if (!reportOptionId) {
        return failResponse(req, res, "noReportOptionId");
      }
    }

    const result = await storyFuncs.reportStory(
      userId,
      storyId,
      reportOptionId,
      storyUserId,
      report,
      mute
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//story views

export const storyViews = async (req, res) => {
  try {
    const { storyId,sortBy} = req.body;
    const userId = req.user.id;
    if (!storyId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    // const result = await storyFuncs.storyViews(userId, storyId);
    const sortBys = ["userName", "fullName","email"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await storyFuncs.storyViews(req.body,userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//storyViewed

export const storyViewed = async (req, res) => {
  try {
    const { storyId } = req.body;
    const userId = req.user.id;
    if (!storyId) {
      return failResponse(req, res, "noStoryId");
    }
    const result = await storyFuncs.storyViewed(userId, storyId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const likeUserList = async (req, res) => {
  try {
    // const { storyId } = req.body;
    //const userId = req.body.userId || req.user.id;
    const { storyId,sortBy} = req.body;
    const userId = req.user.id;
    if (!storyId) {
      return failResponse(req, res, "noStoryId");
    }
    const sortBys = ["userName", "fullName","email"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await storyFuncs.likeUserList(req.body,userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addComment = async (req, res) => {
  try {
    const { storyId, comment, commentId, hashTags, mentionIds } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!storyId) {
      return failResponse(req, res, "postIdNotAvailable");
    }
    if (!comment) {
      return failResponse(req, res, "commentNotAvailable");
    }

    const result = await storyFuncs.addStrComment(
      storyId,
      userId,
      comment,
      commentId,
      hashTags,
      mentionIds
    );

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sharingStoryOfUser = async (req, res) => {
  try {
    const { storyId } = req.body;
    const userId = req.user.id;

    if (!storyId) {
      return failResponse(req, res, "StoryIdNotAvailable");
    }

    const result = await storyFuncs.sharingStoryOfUser(
      storyId,
      userId
    );

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sharingStoryToUser = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    const { messageData } = req.body;
    const {
      messageType,
      messageText,
      messageJson,
      isForwarded,
      replyMessageId,
    } = messageData;
    const userId = req.body.userId || req.user.id;
    const messageInvalid = messengerFuncs.isValidMessageData(messageData);
    if (messageInvalid) {
      return failResponse(req, res, messageInvalid);
    }
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const chatHead = await messengerFuncs.getChatHeadById(chatHeadId);
    let chatHeadIds = [];
    if (!chatHead) {
      return failResponse(req, res, "invalidChatHeadId");
    } else if (chatHead.chatHeadType === "user") {
      if (chatHead.otherUserId === userId) {
        return failResponse(req, res, "noSelfMessage");
      }
      const userChatHeadId = await messengerFuncs.createUserChatHead(
        userId,
        chatHead.otherUserId
      );
      const otherUserChatHeadId = await messengerFuncs.createUserChatHead(
        chatHead.otherUserId,
        userId
      );
      chatHeadIds.push(userChatHeadId);
      chatHeadIds.push(otherUserChatHeadId);
    } else if (chatHead.chatHeadType === "group") {
      chatHeadIds = await messengerFuncs.getGroupChatHeadIds(chatHead.groupId);
    } else if (chatHead.chatHeadType === "broadcast") {
      chatHeadIds = await messengerFuncs.getBroadcastChatHeadIds(
        chatHead.broadcastId
      );
    } else {
      return failResponse(req, res, "chatHeadTypeInvalid");
    }
    if (chatHeadIds.length > 0) {
      const messageId = await messengerFuncs.createMessage(
        userId,
        messageType,
        messageText,
        messageJson,
        isForwarded,
        replyMessageId
      );
      const chatHeadsmessages = await messengerFuncs.addMessagesToChatHeads(
        [messageId],
        chatHeadIds
      );
      const sendResult = messengerSocket.messageSent(
        chatHeadsmessages.chatHeads,
        chatHeadsmessages.messages
      );
      messengerFuncs.messageSendNotification(
        req.user,
        chatHeadsmessages.chatHeads
      );
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sharingPostToStory = async (req, res) => {
  try {
    const {
      postType,
      fileType,
      storyId,
      feedPostId,
      groupPostId,
      businessPostId,
    } = req.body;
    const userId = req.body.userId || req.user.id;

    // if (!storyId) {
    //   return failResponse(req, res, "StoryIdNotAvailable");
    // }

    const result = await storyFuncs.sharingPostToStory(
      postType,
      fileType,
      storyId,
      userId,
      feedPostId,
      groupPostId,
      businessPostId
    );

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sharingS11toryToUser = async (req, res) => {
  try {
    const { userId, senderUserId, type, storyId, messageType, messageJson } =
      req.body;

    // if (!storyId) {
    //   return failResponse(req, res, "StoryIdNotAvailable");
    // }

    const result = await storyFuncs.sharingStoryToUser(
      userId,
      senderUserId,
      type,
      storyId,
      messageType,
      messageJson
    );

    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const singleStoryView = async (req, res) => {
  try {
    const { storyId } = req.body;

    // if (!storyId) {
    //   return failResponse(req, res, "StoryIdNotAvailable");
    // }

    const result = await storyFuncs.singleStoryView(storyId);

    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFriendsToTag = async (req, res) => {
  try {
    const { connectionId, searchKey, pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    // if (!storyId) {
    //   return failResponse(req, res, "StoryIdNotAvailable");
    // }

    const result = await storyFuncs.getFriendsToTag(
      userId,
      connectionId,
      searchKey,
      pageIndex,
      pageSize
    );

    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getStickerImages = async (req, res) => {
  const { searchKey, pageIndex, pageSize } = req.body;
  try {
    const result = await storyFuncs.getStickerImages(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteStrShare = async (req, res) => {
  try {
    const { storyId, strShareId } = req.body;
    const userId = req.user.id;
    if (!storyId) {
      return failResponse(req, res, "storyIdNotAvailable");
    }

    const result = await storyFuncs.deleteStrShare(userId, storyId, strShareId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getVisibilityCategory = async (req, res) => {
  try {
    let {pageSize, pageIndex, searchKey} = req.body
    const result = await storyFuncs.getVisibilityCategory(searchKey, pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

