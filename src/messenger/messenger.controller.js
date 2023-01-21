require("dotenv").config();
import * as media from "../helpers/media";
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as messengerFuncs from "./messenger.funcs";
import * as usersFuncs from "../funcs/users.funcs";
import * as notification from "../helpers/notification";
import * as messengerSocket from "./messenger.socket";
import * as userFuncs from "../funcs/users.funcs";

export const getAll = async (req, res) => {
  try {
    await messengerFuncs.getAll(req.body);
    return successResponse(req, res, "getAll");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getFriendsList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await usersFuncs.getUserFriends(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getFriendsByInterest = async (req, res) => {
  try {
    const { interestId, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await usersFuncs.getFriendsByInterest(
      userId,
      interestId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getFriendsToMention = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await messengerFuncs.getFriendsToMention(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getChatHeadList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getChatHeadList(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpChatHeadList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getMpChatHeadList(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBpChatHeadList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getBpChatHeadList(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getForwardToList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getForwardToList(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getChatHeadById = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    const data = await messengerFuncs.getChatHeadByIds([chatHeadId]);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteChatHead = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const data = await messengerFuncs.deleteChatHead(chatHeadId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteChatHeads = async (req, res) => {
  try {
    const { chatHeadIds } = req.body;
    if (!chatHeadIds) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (!Array.isArray(chatHeadIds)) {
      return failResponse(req, res, "ChatHeadIdsNotArray");
    }
    const data = await messengerFuncs.deleteChatHeads(chatHeadIds);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const setChatHeadPin = async (req, res) => {
  try {
    const { chatHeadId, isPinned } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (isPinned === undefined) {
      return failResponse(req, res, "noPinStatus");
    }
    const data = await messengerFuncs.setChatHeadPin(chatHeadId, isPinned);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const setChatHeadArchive = async (req, res) => {
  try {
    let { chatHeadId, chatHeadIds, isArchived } = req.body;
    if (!chatHeadIds) {
      chatHeadIds = [];
    }
    if (chatHeadId) {
      chatHeadIds.push(chatHeadId);
    }
    if (!chatHeadIds || !chatHeadIds.length) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (isArchived === undefined) {
      return failResponse(req, res, "noArchiveStatus");
    }
    const data = await messengerFuncs.setChatHeadsArchive(
      chatHeadIds,
      isArchived
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const setChatHeadMute = async (req, res) => {
  try {
    const { chatHeadId, isMute } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (isMute === undefined) {
      return failResponse(req, res, "noMuteStatus");
    }
    const data = await messengerFuncs.setChatHeadMute(chatHeadId, isMute);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const searchChatHeadMessages = async (req, res) => {
  try {
    const { chatHeadId, searchKey } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const chatHeadMessages = await messengerFuncs.getChatHeadMsg(
      chatHeadId,
      null,
      null,
      null,
      searchKey
    );
    return successResponse(req, res, chatHeadMessages);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getChatHeadMessages = async (req, res) => {
  try {
    const {
      chatHeadId,
      messageId,
      messageSequence,
      pageSize,
      newerMsg,
      olderMsg,
    } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const chatHeadMessages = await messengerFuncs.getChatHeadMessages(
      chatHeadId,
      messageId,
      messageSequence,
      parseInt(pageSize),
      newerMsg,
      olderMsg
    );
    if (chatHeadMessages.length > 0) {
      let lastReadMessageSequence = chatHeadMessages[0].sequenceNo;
      let lastReadMessageId = chatHeadMessages[0].messageId;
      if (
        lastReadMessageSequence <
        chatHeadMessages[chatHeadMessages.length - 1].sequenceNo
      ) {
        lastReadMessageSequence =
          chatHeadMessages[chatHeadMessages.length - 1].sequenceNo;
        lastReadMessageId =
          chatHeadMessages[chatHeadMessages.length - 1].messageId;
      }
      await messengerFuncs.setChatHeadMessageRead(
        chatHeadId,
        lastReadMessageSequence
      );
      const chatHeads = await messengerFuncs.getChatHeadByMessageIds([
        lastReadMessageId,
      ]);
      await messengerSocket.messageRead(
        chatHeads,
        lastReadMessageId,
        lastReadMessageSequence,
        {
          userId: req.user.id,
          userName: req.user.userName,
        }
      );
    }
    return successResponse(req, res, chatHeadMessages);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const markChatHeadMessagesUnread = async (req, res) => {
  try {
    const {
      chatHeadId,
      messageId,
      messageSequence,
      pageSize,
      newerMsg,
      olderMsg,
    } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const chatHeadMessages = await messengerFuncs.getChatHeadMessages(
      chatHeadId,
      messageId,
      messageSequence,
      parseInt(pageSize),
      newerMsg,
      olderMsg
    );
    if (chatHeadMessages.length > 0) {
      let lastReadMessageSequence = chatHeadMessages[0].sequenceNo;
      let lastReadMessageId = chatHeadMessages[0].messageId;
      if (
        lastReadMessageSequence <
        chatHeadMessages[chatHeadMessages.length - 1].sequenceNo
      ) {
        lastReadMessageSequence =
          chatHeadMessages[chatHeadMessages.length - 1].sequenceNo;
        lastReadMessageId =
          chatHeadMessages[chatHeadMessages.length - 1].messageId;
      }
      await messengerFuncs.setChatHeadMessageUnRead(
        chatHeadId,
        lastReadMessageSequence
      );
      const chatHeads = await messengerFuncs.getChatHeadByMessageIds([
        lastReadMessageId,
      ]);
      await messengerSocket.messageUnRead(
        chatHeads,
        lastReadMessageId,
        lastReadMessageSequence,
        {
          userId: req.user.id,
          userName: req.user.userName,
        }
      );
    }
    return successResponse(req, res, chatHeadMessages);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const clearChatHead = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const data = await messengerFuncs.clearChatHead(chatHeadId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteMessageForMe = async (req, res) => {
  try {
    const { chatHeadId, messageId } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (!messageId) {
      return failResponse(req, res, "noMessageId");
    }
    const data = await messengerFuncs.deleteMessageForMe(
      chatHeadId,
      messageId,
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteMessageForAll = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) {
      return failResponse(req, res, "noMessageId");
    }
    const data = await messengerFuncs.deleteMessageForAll(
      messageId,
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteMessagesForMe = async (req, res) => {
  try {
    const { chatHeadId, messageIds } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (!messageIds) {
      return failResponse(req, res, "noMessageIds");
    }
    if (!Array.isArray(messageIds)) {
      return failResponse(req, res, "messagesIdsNotArray");
    }
    const data = await messengerFuncs.deleteMessagesForMe(
      chatHeadId,
      messageIds,
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteMessagesForAll = async (req, res) => {
  try {
    const { messageIds } = req.body;
    if (!messageIds) {
      return failResponse(req, res, "noMessageIds");
    }
    if (!Array.isArray(messageIds)) {
      return failResponse(req, res, "messagesIdsNotArray");
    }
    const data = await messengerFuncs.deleteMessagesForAll(
      messageIds,
      req.user.id
    );
    const chatHeads = await messengerFuncs.getChatHeadByMessageIds(messageIds);
    const result = messengerSocket.messagesDeleted(chatHeads, messageIds, {
      userId: req.user.id,
      userName: req.user.userName,
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeChatHeadMessage = async (req, res) => {
  try {
    const { chatHeadId, messageId } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    if (!messageId) {
      return failResponse(req, res, "noMessageId");
    }
    const data = await messengerFuncs.removeChatHeadMessage(
      chatHeadId,
      messageId
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const sendMessage = async (req, res) => {
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
export const forwardMessages = async (req, res) => {
  try {
    const {
      sendTo,
      messageDataList,
      messageData,
      userIds,
      groupIds,
      broadcastIds,
    } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!messageDataList) {
      return failResponse(req, res, "emptyMessageDataList");
    }

    for (let j = 0; j < messageDataList.length; j++) {
      const messageInvalid = messengerFuncs.isValidMessageData(
        messageDataList[j]
      );
      if (messageInvalid) {
        return failResponse(req, res, messageInvalid);
      }
    }
    if (sendTo) {
      for (let i = 0; i < sendTo.length; i++) {
        if (sendTo[i].type && sendTo[i].id) {
          let chatHeadIds = [];
          if (sendTo[i].type === "user") {
            if (sendTo[i].id === userId) {
              return failResponse(req, res, "noSelfMessage");
            }
            const userChatHeadId = await messengerFuncs.createUserChatHead(
              userId,
              sendTo[i].id
            );
            const otherUserChatHeadId = await messengerFuncs.createUserChatHead(
              sendTo[i].id,
              userId
            );
            chatHeadIds.push(userChatHeadId);
            chatHeadIds.push(otherUserChatHeadId);
          } else if (sendTo[i].type === "group") {
            chatHeadIds = await messengerFuncs.getGroupChatHeadIds(
              sendTo[i].id
            );
          } else if (sendTo[i].type === "broadcast") {
            chatHeadIds = await messengerFuncs.getBroadcastChatHeadIds(
              sendTo[i].id
            );
          }
          const messageIds = [];
          for (let j = 0; j < messageDataList.length; j++) {
            const { messageType, messageText, messageJson } =
              messageDataList[j];
            const messageId = await messengerFuncs.createMessage(
              userId,
              messageType,
              messageText,
              messageJson,
              true
            );
            messageIds.push(messageId);
          }
          if (chatHeadIds.length > 0) {
            const chatHeadsmessages =
              await messengerFuncs.addMessagesToChatHeads(
                messageIds,
                chatHeadIds
              );
            const sendResult = messengerSocket.messageSent(
              chatHeadsmessages.chatHeads,
              chatHeadsmessages.messages
            );
          }
        }
      }
      return successResponse(req, res, "success");
    }

    // if(userIds){
    //     for(let i=0;i<userIds.length;i++){
    //         req.body.otherUserId = userIds[i]
    //         await sendUserMessage(req, res);
    //     }
    // }
    // if(groupIds){
    //     for(let i=0;i<groupIds.length;i++){
    //         req.body.groupId = groupIds[i]
    //         await sendGroupMessage(req, res);
    //     }
    // }
    // if(broadcastIds){
    //     for(let i=0;i<broadcastIds.length;i++){
    //         req.body.broadcastId = broadcastIds[i]
    //         await sendBroadcastMessage(req, res);
    //     }
    // }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const replyMessage = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    if (!chatHeadId) {
      return failResponse(req, res, "noChatHeadId");
    }
    const chatHead = await messengerFuncs.getChatHeadById(chatHeadId);
    if (!chatHead) {
      return failResponse(req, res, "invalidChatHeadId");
    } else if (chatHead.chatHeadType === "user") {
      req.body.otherUserId = chatHead.otherUserId;
      await sendUserMessage(req, res);
    } else if (chatHead.chatHeadType === "group") {
      req.body.groupId = chatHead.groupId;
      await sendGroupMessage(req, res);
    } else if (chatHead.chatHeadType === "broadcast") {
      req.body.broadcastId = chatHead.broadcastId;
      await sendBroadcastMessage(req, res);
    } else {
      return failResponse(req, res, "chatHeadTypeInvalid");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const sendUserMessage = async (req, res) => {
  try {
    const { otherUserId, chatHeadType, messageData } = req.body;
    const {
      messageType,
      messageText,
      messageJson,
      isForwarded,
      replyMessageId,
    } = messageData;
    const userId = req.body.userId || req.user.id;
    if (otherUserId === userId) {
      return failResponse(req, res, "noSelfMessage");
    }
    const messageInvalid = messengerFuncs.isValidMessageData(messageData);
    if (messageInvalid) {
      return failResponse(req, res, messageInvalid);
    }
    if (!otherUserId) {
      return failResponse(req, res, "noOtherUserId");
    }
    const listCheck = await messengerFuncs.privateListCheck(
      userId,
      otherUserId
    );
    console.log(listCheck.length);
    if (listCheck.length > 0) {
      return failResponse(req, res, "user has set its message list to private");
    }
    const userChatHeadId = await messengerFuncs.createUserChatHead(
      userId,
      otherUserId,
      chatHeadType
    );
    const otherUserChatHeadId = await messengerFuncs.createUserChatHead(
      otherUserId,
      userId,
      chatHeadType
    );
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
      [userChatHeadId, otherUserChatHeadId]
    );
    const sendResult = messengerSocket.messageSent(
      chatHeadsmessages.chatHeads,
      chatHeadsmessages.messages
    );
    messengerFuncs.messageSendNotification(
      req.user,
      chatHeadsmessages.chatHeads
    );
    return successResponse(req, res, userChatHeadId);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const createUserChatHead = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!otherUserId) {
      return failResponse(req, res, "noOtherUserId");
    }
    const data = await messengerFuncs.createUserChatHead(userId, otherUserId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const createGroup = async (req, res) => {
  try {
    let { groupName, summary, imageURL, admins, members } = req.body;
    const ownerId = req.user.id;
    const ownerName = req.user.userName;
    const groupMembers = [
      {
        memberId: ownerId,
        memberName: ownerName,
        role: "creator",
      },
    ];
    if (!summary) summary = null;
    if (!imageURL) imageURL = null;
    if (!groupName) {
      return failResponse(req, res, "noGroupName");
    }
    if (!members) {
      return failResponse(req, res, "noMembers");
    }
    if (!Array.isArray(members)) {
      return failResponse(req, res, "membersNotArray");
    }
    if (admins && !Array.isArray(admins)) {
      return failResponse(req, res, "adminsNotArray");
    }
    if (admins) {
      admins.forEach((item, index) => {
        groupMembers.push({
          memberId: item.memberId,
          memberName: item.memberName,
          role: "admin",
        });
      });
    }
    members.forEach((item, index) => {
      groupMembers.push({
        memberId: item.memberId,
        memberName: item.memberName,
        role: "member",
      });
    });
    if (req.files && req.files.length) {
      imageURL = await media.s3Upload("groupDp", req.files[0]);
    }
    const groupId = await messengerFuncs.createGroup(
      groupName,
      summary,
      imageURL,
      ownerId
    );

    await messengerFuncs.addUsersInGroup(groupId, groupMembers);
    const chatHeadIds = [];
    const messageIds = [];
    for (let i = 0; i < groupMembers.length; i++) {
      const chatHeadId = await messengerFuncs.createGroupChatHead(
        groupMembers[i].memberId,
        groupId
      );
      if (groupMembers[i].role === "creator") {
        const messageId = await messengerFuncs.createMessage(
          ownerId,
          "bubble",
          "",
          {
            type: "groupCreated",
            createdByUserId: ownerId,
            createdByUserName: ownerName,
          },
          false
        );
        messageIds.push(messageId);
      } else {
        const messageId = await messengerFuncs.createMessage(
          ownerId,
          "bubble",
          "",
          {
            type: "addedToGroup",
            addedUserId: groupMembers[i].memberId,
            addedUserName: groupMembers[i].memberName,
            addedByUserId: ownerId,
            addedByUserName: ownerName,
          },
          false
        );
        messageIds.push(messageId);
      }
      chatHeadIds.push(chatHeadId);
    }

    const data = await messengerFuncs.addMessagesToChatHeads(
      messageIds,
      chatHeadIds
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const updateGroup = async (req, res) => {
  try {
    let { groupId, groupName, summary, imageURL, isMute } = req.body;

    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const userId = req.body.userId || req.user.id;
    if (req.files && req.files.length) {
      imageURL = await media.s3Upload("groupDp", req.files[0]);
    }
    if (!groupName && !summary && !imageURL && isMute === undefined) {
      return failResponse(req, res, "nothingToUpdte");
    }
    if (isMute !== undefined)
      await messengerFuncs.setGroupMute(groupId, userId, isMute);
    const data = await messengerFuncs.updateGroup(
      groupId,
      groupName,
      summary,
      imageURL
    );
    const chatHeads = await messengerFuncs.getGroupChatHeads(groupId);
    const groupUpdatedData = {};
    if (groupName) groupUpdatedData.groupName = groupName;
    if (summary) groupUpdatedData.summary = summary;
    if (imageURL) groupUpdatedData.imageURL = imageURL;
    const socketResult = await messengerSocket.groupUpdated(
      chatHeads,
      groupUpdatedData
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteGroup = async (req, res) => {
  try {
    let { groupId } = req.body;

    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const data = await messengerFuncs.deleteGroup(groupId);
    const chatHeads = await messengerFuncs.getGroupChatHeads(groupId);
    const socketResult = await messengerSocket.groupDeleted(chatHeads, groupId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const reportGroup = async (req, res) => {
  try {
    let { groupId, reportOptionId, remarks } = req.body;
    const userId = req.user.id;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    if (!reportOptionId) {
      return failResponse(req, res, "noGroupId");
    }
    const data = await messengerFuncs.reportGroup(
      groupId,
      reportOptionId,
      userId,
      remarks
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getGroupById = async (req, res) => {
  try {
    let { groupId } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const data = await messengerFuncs.getGroupById(groupId, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getGroupMembers = async (req, res) => {
  try {
    let { groupId, searchKey, pageIndex, pageSize, sortBy } = req.body;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const sortBys = ["userName", "fullName"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await messengerFuncs.getGroupMembers(
      groupId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getUserGroups(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getGroupMembersToAdd = async (req, res) => {
  try {
    let { groupId, searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const sortBys = ["userName", "fullName"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await messengerFuncs.getGroupMembersToAdd(
      userId,
      groupId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeUsersFromGroup = async (req, res) => {
  try {
    let { groupId, members } = req.body;
    const userId = req.user.id;
    const userName = req.user.userName;
    if (!members) {
      return failResponse(req, res, "noMembers");
    }
    if (!Array.isArray(members)) {
      return failResponse(req, res, "membersNotArray");
    }
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const memberIds = [];
    members.forEach((item, index) => {
      memberIds.push(item.memberId);
    });
    const chatHeadIds = await messengerFuncs.getGroupChatHeadIds(groupId);
    await messengerFuncs.removeUsersFromGroup(groupId, memberIds);
    const messageIds = [];
    for (let i = 0; i < members.length; i++) {
      const messageId = await messengerFuncs.createMessage(
        userId,
        "bubble",
        "",
        {
          type: "memberRemoved",
          removedByUserId: userId,
          removedByUserName: userName,
          removedUserId: members[i].memberId,
          removedUserName: members[i].memberName,
        },
        false
      );
      messageIds.push(messageId);
    }

    const data = await messengerFuncs.addMessagesToChatHeads(
      messageIds,
      chatHeadIds
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const leaveGroup = async (req, res) => {
  try {
    let { groupId } = req.body;
    const userId = req.user.id;
    const userName = req.user.userName;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    const chatHeadIds = await messengerFuncs.getGroupChatHeadIds(groupId);
    await messengerFuncs.removeUsersFromGroup(groupId, userId);
    const messageId = await messengerFuncs.createMessage(
      userId,
      "bubble",
      "",
      {
        type: "leftGroup",
        leftUserId: userId,
        leftUserName: userName,
      },
      false
    );

    if (chatHeadIds.length > 0) {
      const data = await messengerFuncs.addMessagesToChatHeads(
        [messageId],
        chatHeadIds
      );
    }

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addUsersInGroup = async (req, res) => {
  try {
    let { groupId, members } = req.body;
    const userId = req.user.id;
    const userName = req.user.userName;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    if (!members) {
      return failResponse(req, res, "noMembers");
    }
    if (!Array.isArray(members)) {
      return failResponse(req, res, "membersNotArray");
    }

    await messengerFuncs.addUsersInGroup(groupId, members);
    const messageIds = [];
    for (let i = 0; i < members.length; i++) {
      await messengerFuncs.createGroupChatHead(members[i].memberId, groupId);
      const messageId = await messengerFuncs.createMessage(
        userId,
        "bubble",
        "",
        {
          type: "addedToGroup",
          addedUserId: members[i].memberId,
          addedUserName: members[i].memberName,
          addedByUserId: userId,
          addedByUserName: userName,
        },
        false
      );
      messageIds.push(messageId);
    }
    const chatHeadIds = await messengerFuncs.getGroupChatHeadIds(groupId);

    const data = await messengerFuncs.addMessagesToChatHeads(
      messageIds,
      chatHeadIds
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const changeGroupMembersRole = async (req, res) => {
  try {
    let { groupId, memberIds, role } = req.body;
    if (!groupId) {
      return failResponse(req, res, "noGroupId");
    }
    if (!memberIds) {
      return failResponse(req, res, "noMembers");
    }
    if (!Array.isArray(memberIds)) {
      return failResponse(req, res, "membersNotArray");
    }
    if (memberIds.length < 1) {
      return failResponse(req, res, "noMembersInArray");
    }
    if (!role || role !== "admin") {
      role = "member";
    }
    if (memberIds.includes(req.user.id)) {
      return failResponse(req, res, "notSelfRoleChange");
    }
    const groupData = await messengerFuncs.getGroupById(groupId, req.user.id);
    if (memberIds.includes(groupData.ownerId)) {
      return failResponse(req, res, "notCreatorRoleChange");
    }
    if (groupData.role !== "admin" && groupData.role !== "creator") {
      return failResponse(req, res, "youAreNotAdminOrCreator");
    }
    await messengerFuncs.changeGroupMembersRole(groupId, memberIds, role);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const createBroadcastList = async (req, res) => {
  try {
    const { broadcastName, memberIds } = req.body;
    const ownerId = req.user.id;
    if (!broadcastName) {
      return failResponse(req, res, "noBroadcastName");
    }
    if (!Array.isArray(memberIds)) {
      return failResponse(req, res, "membersNotArray");
    }
    if (memberIds.length < 2) {
      return failResponse(req, res, "membersTooLess");
    }

    const broadcastId = await messengerFuncs.createBroadcastList(
      broadcastName,
      ownerId
    );
    await messengerFuncs.addUsersInBroadcastList(broadcastId, memberIds);
    const chatHeadId = await messengerFuncs.createBroadcastChatHead(
      ownerId,
      broadcastId
    );

    const messageId = await messengerFuncs.createMessage(
      ownerId,
      "bubble",
      "",
      {
        type: "createdBroadCastListWith",
        memberCount: memberIds.length,
        ownerId,
      },
      false
    );
    const data = await messengerFuncs.addMessagesToChatHeads(
      [messageId],
      [chatHeadId]
    );

    let bRes = `You created a broadcast list with ${memberIds.length} recipents`;

    return successResponse(req, res, bRes);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getBroadcastMembers = async (req, res) => {
  try {
    let { broadcastId, searchKey, pageIndex, pageSize, sortBy } = req.body;

    if (!broadcastId) {
      return failResponse(req, res, "noBroadcastId");
    }
    const sortBys = ["userName", "fullName"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await messengerFuncs.getBroadcastMembers(
      broadcastId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const setChatHeadMessageRead = async (req, res) => {
//     try {
//         const {chatHeadId,messageId}= req.body;
//         if(!chatHeadId){
//             return failResponse(req, res, "noChatHeadId");
//         }
//         if(!messageId){
//             return failResponse(req, res, "noMessageId");
//         }
//         const data=await messengerFuncs.setChatHeadMessageRead(chatHeadId,messageId)
//         const chatHeads = await messengerFuncs.getChatHeadByMessageIds([messageId]);
//         const result = messengerSocket.messageRead(chatHeads,[messageId])
//         return successResponse(req, res, data);
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };
// export const setChatHeadRead = async (req, res) => {
// try {
//     const {chatHeadId}= req.body;
//     if(!chatHeadId){
//         return failResponse(req, res, "noChatHeadId");
//     }
//     const data=await messengerFuncs.setChatHeadRead(chatHeadId)
//     return successResponse(req, res, data);
// } catch (error) {
//     return errorResponse(req, res, error);
// }
// };
// export const sendMessagex = async (req, res) => {
//     try {
//         const {chatHeadId}= req.body;
//         if(!chatHeadId){
//             return failResponse(req, res, "noChatHeadId");
//         }
//         const chatHead = await messengerFuncs.getChatHeadById(chatHeadId);
//         if(!chatHead){
//             return failResponse(req, res, "invalidChatHeadId");
//         }
//         else if(chatHead.chatHeadType==="user"){
//             req.body.otherUserId = chatHead.otherUserId
//             await sendUserMessage(req, res);
//         }
//         else if(chatHead.chatHeadType==="group"){
//             req.body.groupId = chatHead.groupId
//             await sendGroupMessage(req, res);
//         }
//         else if(chatHead.chatHeadType==="broadcast"){
//             req.body.broadcastId = chatHead.broadcastId
//             await sendBroadcastMessage(req, res);
//         }
//         else{
//             return failResponse(req, res, "chatHeadTypeInvalid");
//         }
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };
// export const sendGroupMessage = async (req, res) => {
//     try {
//         const {groupId,messageData}= req.body;
//         const {messageType,messageText,messageJson,isForwarded} = messageData
//         const userId=req.body.userId || req.user.id
//         const messageInvalid = messengerFuncs.isValidMessageData(messageData)
//         if(messageInvalid){
//             return failResponse(req, res, messageInvalid);
//         }
//         if(!groupId){
//             return failResponse(req, res, "noGroupId");
//         }
//         const chatHeadIds = await messengerFuncs.getGroupChatHeadIds(groupId)
//         const messageId =await messengerFuncs.createMessage(userId,messageType,messageText,messageJson,isForwarded);
//         const chatHeadsmessages=await messengerFuncs.addMessagesToChatHeads([messageId],chatHeadIds)
//         const sendResult = messengerSocket.messageSent(chatHeadsmessages.chatHeads,chatHeadsmessages.messages)
//         return successResponse(req, res, "success");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };

// export const sendBroadcastMessage = async (req, res) => {
//     try {
//         const {broadcastId,messageData}= req.body;
//         const {messageType,messageText,messageJson,isForwarded} = messageData
//         const userId=req.body.userId || req.user.id

//         const messageInvalid = messengerFuncs.isValidMessageData(messageData)
//         if(messageInvalid){
//             return failResponse(req, res, messageInvalid);
//         }
//         if(!broadcastId){
//             return failResponse(req, res, "noBroadcastId");
//         }
//         const chatHeadIds = await messengerFuncs.getBroadcastChatHeadIds(broadcastId)
//         const messageId =await messengerFuncs.createMessage(userId,messageType,messageText,messageJson,isForwarded);
//         const chatHeadsmessages=await messengerFuncs.addMessagesToChatHeads([messageId],chatHeadIds)
//         const sendResult = messengerSocket.messageSent(chatHeadsmessages.chatHeads,chatHeadsmessages.messages)
//         return successResponse(req, res, "success");
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };

/* ----------------    Calling Function   */

export const initiateCall = async (req, res) => {
  try {
    let { callRoomId, callMembers, isVideo } = req.body;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    if (!callMembers || !callMembers.length) {
      return failResponse(req, res, "noCallMember");
    }
    const data = await messengerFuncs.initiateCall(
      req.user,
      callRoomId,
      callMembers,
      isVideo
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const acceptCall = async (req, res) => {
  try {
    let { callRoomId } = req.body;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    let callState = await messengerFuncs.getCallInfoByMemberId(
      callRoomId,
      req.user.id
    );
    callState = callState[0];
    if (
      callState.callState === "ringing" ||
      callState.callState === "calling"
    ) {
      await messengerFuncs.acceptCall(callRoomId, req.user.id, "inCall");
      messengerSocket.updateMemberCallState(callRoomId, req.user.id, "inCall");
      const payload = {
        callRoomId,
        title: "Call Recieved",
        noSave: true,
        silent: true,
      };
      notification.sendToUser(req.user, req.user, "acceptedCall", payload);
      return successResponse(req, res, "success");
    } else {
      return failResponse(req, res, { msg: "couldNotConnect", callState });
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const declineCall = async (req, res) => {
  try {
    let { callRoomId } = req.body;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    await messengerFuncs.updateMemberCallState(
      callRoomId,
      req.user.id,
      "declined"
    );
    messengerSocket.updateMemberCallState(callRoomId, req.user.id, "declined");
    const payload = {
      callRoomId,
      title: "Call Declined",
      noSave: true,
      silent: true,
    };
    notification.sendToUser(req.user, req.user, "declinedCall", payload);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const missedCall = async (req, res) => {
  try {
    let { callRoomId, memberId } = req.body;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    if (!memberId) {
      return failResponse(req, res, "noMemberId");
    }
    messengerFuncs.sendMissedCallifNotRecieved(callRoomId, memberId, req.user);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const updateMemberCallState = async (req, res) => {
  try {
    let { callRoomId, callState } = req.body;
    const memberId = req.body.memberId || req.user.id;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    if (!callState) {
      return failResponse(req, res, "noCallState");
    }
    messengerSocket.updateMemberCallState(callRoomId, memberId, callState);
    await messengerFuncs.updateMemberCallState(callRoomId, memberId, callState);

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const endCall = async (req, res) => {
  try {
    let { callRoomId } = req.body;
    const memberId = req.body.memberId || req.user.id;
    if (!callRoomId) {
      return failResponse(req, res, "noCallRoomId");
    }
    messengerSocket.updateMemberCallState(callRoomId, memberId, "ended");
    await messengerFuncs.updateMemberCallState(callRoomId, memberId, "ended");

    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addToCall = async (req, res) => {
  try {
    let { callRoomId, memberId, member, isVideo } = req.body;
    await messengerFuncs.addMembersToCallRoom(
      callRoomId,
      memberId,
      false,
      req.user,
      isVideo,
      1
    );
    const payload = {
      event: "memberAdded",
      data: {
        callRoomId,
        memberId,
        member,
      },
    };
    messengerSocket.sendToCallMembers(callRoomId, payload);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCallHistory = async (req, res) => {
  try {
    let { searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await messengerFuncs.getAllCallHistory(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserCallHistory = async (req, res) => {
  try {
    let { otherUserId, searchKey, pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;

    if (!otherUserId) {
      return failResponse(req, res, "noOtherUserId");
    }
    const data = await messengerFuncs.getUserCallHistory(
      userId,
      otherUserId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const AddNewUserToBroadcast = async (req, res) => {
  try {
    const { broadcastId, memberId } = req.body;
    const ownerId = req.user.id;
    if (!broadcastId) {
      return failResponse(req, res, "noBroadcastId");
    }
    if (!memberId) {
      return failResponse(req, res, "noMemberId");
    }
    const result = await messengerFuncs.addNewUserInBroadcastList(req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeUserFromBroadcast = async (req, res) => {
  try {
    const { broadcastId, memberId } = req.body;
    const ownerId = req.user.id;
    if (!broadcastId) {
      return failResponse(req, res, "noBroadcastId");
    }
    if (!memberId) {
      return failResponse(req, res, "noMemberId");
    }
    const result = await messengerFuncs.removeUserInBroadcastList(req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const archiveChat = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    const result = await messengerFuncs.archiveChat(chatHeadId);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const unarchiveChat = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    const result = await messengerFuncs.unarchiveChat(chatHeadId);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getArchiveChats = async (req, res) => {
  try {
    const { chatHeadId } = req.body;
    const result = await messengerFuncs.getArchiveChats();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//recent

export const followUnFollow = async (req, res) => {
  try {
    var followedById = req.user.id;
    const { followingToId, isFollowed, isPrivate } = req.body;
    if (followingToId === followedById) {
      return failResponse(req, res, "cannotFollowSelf");
    }
    if (!followingToId) {
      return failResponse(req, res, "followingUserIdNotAvailable");
    }
    if (isFollowed === undefined) {
      return failResponse(req, res, "noIsfolloedKey");
    }
    if (isFollowed) {
      if (isPrivate === undefined) {
        return failResponse(req, res, "isPrivateNotAvailable");
      }
      const data = await userFuncs.follow(
        followedById,
        followingToId,
        isPrivate
      );
    } else {
      const dataClearConnection = await userFuncs.clearUserConnection(
        followedById,
        followingToId
      );
      const dataClearFollowing = await userFuncs.clearFollowingRequest(
        followedById,
        followingToId
      );
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserConnections = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    var userId = req.user.id || req.body.userId;
    if (!userId) {
      return failResponse(req, res, "userIdNotAvailable");
    }
    const data = await userFuncs.getUserConnections(
      userId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addUserConnection = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return failResponse(req, res, "userIdNotAvailable");
    }
    const connectionName = req.body.connectionName;
    if (!connectionName) {
      return failResponse(req, res, "connectionNameNotAvailable");
    }
    const data = await userFuncs.addUserConnection(userId, connectionName);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addUserToConnection = async (req, res) => {
  try {
    var userId = req.user.id;
    const followingUserId = req.body.followingUserId;
    if (!followingUserId) {
      return failResponse(req, res, "followingUserIdNotAvailable");
    }
    const connectionIds = req.body.connectionIds;
    if (!connectionIds || connectionIds.length == 0) {
      return failResponse(req, res, "connectionIdsNotAvailable");
    }
    const dataAdd = await userFuncs.addUserToConnection(
      userId,
      followingUserId,
      connectionIds
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const approveFollowRequest = async (req, res) => {
  try {
    const followedById = req.body.followedById;
    const followingToId = req.user.id;
    if (followingToId === followedById) {
      return failResponse(req, res, "errorSelfId");
    }
    if (!followedById) {
      return failResponse(req, res, "followedByUserIdNotAvailable");
    }
    const connectionIds = req.body.connectionIds;
    if (connectionIds && connectionIds.length > 0) {
      const dataAdd = await userFuncs.addUserToConnection(
        followingToId,
        followedById,
        connectionIds
      );
    }
    const data = await userFuncs.approveFollowingRequest(
      followingToId,
      followedById
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const disapproveFollowingRequest = async (req, res) => {
  try {
    const followingRequestId = req.body.followingRequestId;
    if (!followingRequestId) {
      return failResponse(req, res, "followingRequestIdNotAvailable");
    }
    const data = await userFuncs.clearFollowingRequestWithId(
      followingRequestId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const selfUserId = req.user.id;
    const otherUserId = req.body.userId;
    if (!otherUserId) {
      return failResponse(req, res, "userIdNotAvailable");
    }
    const userData = await userFuncs.getUserProfileById(
      selfUserId,
      otherUserId
    );
    if (userData && userData.length > 0) {
      userData[0].followingStatus = await userFuncs.getFollowingStatus(
        selfUserId,
        otherUserId
      );
      userData[0].mutualFollowers = await userFuncs.getMutualFollowers(
        selfUserId,
        otherUserId,
        "",
        0,
        3
      );
      userData[0].speakLanguage = await userFuncs.getUserSpeakLanguages(
        otherUserId
      );
      return successResponse(req, res, userData[0]);
    } else {
      return failResponse(req, res, "incorrectUserId");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserOwnProfile = async (req, res) => {
  try {
    const selfUserId = req.user.id;
    const profResp = await userFuncs.getUserOwnProfile(selfUserId);
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const notificationSettings = async (req, res) => {
  try {
    const { allowPushNotifs, pauseAllNotifs, followingsFollowers, messages } =
      req.body;
    const userId = req.user.id;
    const profResp = await messengerFuncs.notificationSettings(
      allowPushNotifs,
      pauseAllNotifs,
      followingsFollowers,
      messages,
      userId
    );
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteAccount = async (req, res) => {
  try {
    // const { allowPushNotifs, pauseAllNotifs, followingsFollowers, messages } =
    //   req.body;
    const userId1 = req.user.id;
    const userId = req.body.userId;
    const profResp = await messengerFuncs.deleteAccount(userId);
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const messengerSettings = async (req, res) => {
  try {
    const {
      otherUserId,
      generalMessages,
      directMessages,
      mentionGroups,
      lastSeen,
      activeStatus,
    } = req.body;
    const userId = req.user.id;
    const profResp = await messengerFuncs.messengerSettings(
      userId,
      otherUserId,
      generalMessages,
      directMessages,
      mentionGroups,
      lastSeen,
      activeStatus
    );
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const privacySettings = async (req, res) => {
  try {
    const {
      otherUserId,
      whoCanFollow,
      listProfileOnSearch,
      listProfileOnWebSearch,
      hideGender,
      seeBirthDate,
      seeBirthYear,
      accPrivate,
      alertsOnUnknownLogin,
      followersFollowings,
    } = req.body;
    const userId = req.user.id;
    const profResp = await messengerFuncs.privacySettings(
      userId,
      otherUserId,
      whoCanFollow,
      listProfileOnSearch,
      listProfileOnWebSearch,
      hideGender,
      seeBirthDate,
      seeBirthYear,
      accPrivate,
      alertsOnUnknownLogin,
      followersFollowings
    );
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//jan development

export const getContactList = async (req, res) => {
  try {
    const { numbers, searchKey, pageIndex, pageSize, sortBy, sync } = req.body;
    const userId = req.user.id;
    const profResp = await messengerFuncs.getContactList(numbers, searchKey, userId, pageIndex, pageSize, sortBy, sync);
    return successResponse(req, res, profResp);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateUserInterests = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = req.body.userId
    const { interests } = req.body;
    const result = await userFuncs.updateUserInterests(userId, interests);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
