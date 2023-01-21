require("dotenv").config();
import { sequelize, Sequelize } from "../models";
const { QueryTypes } = require("sequelize");
import { v4 as uuid } from "uuid";
import moment from "moment";
import * as notification from "../helpers/notification";
import * as messengerSocket from "./messenger.socket";
import * as userFuncs from "../funcs/users.funcs";

export const getAll = async (userId) => {
  return true;
};

// export const setUserOnline = async (userId,isOnline) => {
//     await sequelize.query(
//         `update users set isOnline=:isOnline where id=:userId`,
//         {
//             replacements:{userId,isOnline},
//             type: QueryTypes.UPDATE
//         }
//     );
//     return true;
// };

export const isValidMessageData = (messageData) => {
  const types = [
    "text",
    "image",
    "audio",
    "video",
    "contact",
    "document",
    "post",
    "shotz",
    "story",
    "bubble",
    "reply",
  ];
  if (messageData.messageType && types.includes(messageData.messageType)) {
    return;
  }
  return "invalidMessageType";
};

export const getForwardToList = async (
  userId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  console.log("----------------" + userId);
  /**/
  var query = `
    select * from (
        SELECT 
            ch.id AS chatHeadId,
            ch.type AS chatHeadType,
            ch.groupId,
            msgGroups.name AS groupName,
            CONCAT(:BaseURL,msgGroups.thumbURL) AS groupImageThumb,
            ch.broadcastId,
            msgBroadcast.name AS broadcastListName,
            ch.otherUserId as userId,
            users.fullName as userFullName,
            users.userName as userUserName,
            CONCAT(:BaseURL,users.profileImageThumb) AS userImageThumb,
            (SELECT if(COUNT(*),true,false) FROM userSession WHERE userId = users.id AND isOnline=1 AND expired=0 )AS userIsOnline,
            null as friendId,  
            null as friendUserName,  
            null as friendFullName,  
            null as friendImageThumb,  
            null as friendIsOnline
        FROM 
            msgChatHeads AS ch
            LEFT JOIN users ON 
                users.id = ch.otherUserId
            LEFT JOIN msgGroups ON 
                msgGroups.id = ch.groupId
            LEFT JOIN msgGroupMembers as gm on 
                gm.groupId = msgGroups.id and 
                gm.memberId=ch.userId 
            LEFT JOIN msgBroadcast ON 
                msgBroadcast.id = ch.broadcastId
            LEFT JOIN userBlockList AS blockedByMe ON 
                blockedByMe.userId = ch.userId and 
                blockedByMe.blockedUserId = ch.otherUserId
            LEFT JOIN userBlockList AS blockedByOther ON 
                blockedByOther.userId = ch.otherUserId and 
                blockedByOther.blockedUserId = ch.userId
        WHERE 
            ch.isActive=true AND 
            ch.isDeleted=FALSE AND
            ch.userId=:userId AND 
            ch.isMute=0 AND
            (msgGroups.name like :searchKey or
            msgBroadcast.name like :searchKey or
            users.userName like :searchKey )
            GROUP BY userUserName
    UNION 
        SELECT
            null ,
            null ,
            null ,
            null ,
            null ,
            null ,   
            null ,  
            null ,  
            null ,  
            null ,  
            null ,  
            null ,        
            friends.id as friendId,
            friends.userName as friendUserName,
            friends.fullName as friendFullName,
            CONCAT(:BaseURL,friends.profileImageThumb) AS friendImageThumb,
            (SELECT if(COUNT(*),true,false) FROM userSession WHERE userSession.userId = friends.id AND isOnline=1 AND expired=0 )AS friendIsOnline
        FROM 
            userFriends AS friends 
        WHERE
            friends.userId = :userId AND 
            friends.userName like :searchKey
    ) as a
    `;

  // blockedByMe.userId is null and
  // blockedByOther.userId is null and
  // gm.memberId is not null and
  // msgGroups.isDeleted = false and
  // users.isDeleted =false and

  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getFriendsToMention = async (
  userId,
  searchKey,
  pageIndex,
  pageSize,
  sortBy
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  var query = `
        SELECT
            friends.id,
            friends.userName,
            friends.fullName,
            CONCAT(:BaseURL,friends.profileImageThumb) AS profileImageThumb
        FROM 
            userFriends AS friends
        WHERE
            friends.userId = :userId AND 
            friends.userName like :searchKey`;

  let result = {};
  if (sortBy) {
    query = query + `\n ORDER BY :sortBy`;
  }
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          userId,
          BaseURL: process.env.FTP_BASE_URL,
          sortBy,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: {
      userId,
      BaseURL: process.env.FTP_BASE_URL,
      sortBy,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getChatHeadById = async (chatHeadId) => {
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.userId,
        ch.type AS chatHeadType,
        ch.groupId,
        ch.broadcastId,
        ch.otherUserId,
        IFNULL(ch.unReadCount,0) AS unReadCount,
        if(ch.isPinned,TRUE,FALSE) AS isPinned,
        if(ch.isMute,TRUE,FALSE) AS isMute
    FROM 
        msgChatHeads AS ch
    WHERE 
        ch.id = :chatHeadId
    ORDER BY
        ch.isPinned DESC, 
        ch.pinnedAt DESC
    `;
  const result = await sequelize.query(query, {
    replacements: { chatHeadId, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  if (result.length > 0) return result[0];
};
export const getChatHeadByIds = async (chatHeadIds) => {
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.userId,
        ch.type AS chatHeadType,
        ch.groupId,
        msgGroups.name AS groupName,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupImageThumb,
        msgGroups.isDeleted AS groupDeleted,
        IF(ISNULL(gm.memberId),0,1) AS isGroupMember,
        ch.broadcastId,
        msgBroadcast.name AS broadcastListName,
        ch.otherUserId,
        CONCAT(:BaseURL,users.profileImageThumb) AS profileImageThumb,
        users.fullName,
        users.userName,
        users.isDeleted AS userDeleted,
        users.sequenceNo AS sequenceNo,
        IF(ISNULL(blockedByMe.userId),0,1) AS blockedByMe,
        IF(ISNULL(blockedByOther.userId),0,1) AS blockedByOther,
        (SELECT if(COUNT(*),true,false) FROM userSession WHERE userId = users.id AND isOnline=1 AND expired=0 )AS isOnline,
        lastmessage.messageId AS lastMessageId,
        lastmessage.createdAt AS lastMessageDate,
        messages.messageType AS lastMessageType,
        messages.messageText AS  lastMessageText,
        messages.messageJson AS  lastMessageJson,
        ch.lastReadMessageSequence ,
        ch.isPinned,
        ch.isMute,
        ch.sequenceNo as chatHeadSequenceNo,
        IFNULL(unRead.count,0) AS unReadCount,
        broadcastMembersCount.count as broadcastMembersCount,
        groupMembersCount.count as groupMembersCount,
        lastActivity.activityTime as userLastActivity
    FROM 
        (SELECT t1.* FROM msgChatHeadMessages t1 WHERE t1.id = 
            (SELECT t2.id FROM msgChatHeadMessages t2
            WHERE t2.chatHeadId = t1.chatHeadId ORDER BY t2.createdAt DESC
            LIMIT 1)) AS lastmessage,
        msgMessages AS messages,
        msgChatHeads AS ch
        LEFT JOIN users ON users.id = ch.otherUserId
        LEFT JOIN msgGroups ON msgGroups.id = ch.groupId
        LEFT JOIN msgGroupMembers as gm on gm.groupId = msgGroups.id and gm.memberId=ch.userId
        LEFT JOIN msgBroadcast ON msgBroadcast.id = ch.broadcastId        
        LEFT JOIN userBlockList AS blockedByMe ON blockedByMe.userId = ch.userId and blockedByMe.blockedUserId = ch.otherUserId
        LEFT JOIN userBlockList AS blockedByOther ON blockedByOther.userId = ch.otherUserId and blockedByOther.blockedUserId = ch.userId
        LEFT JOIN (
            SELECT 
                chm.chatHeadId AS chatHeadId,
                COUNT(*) AS count
            FROM  
                msgChatHeads AS ch
                LEFT JOIN msgChatHeadMessages AS chm ON chm.chatHeadId = ch.id
                LEFT JOIN msgMessages AS msg ON msg.id = chm.messageId
            WHERE 
                ch.lastReadMessageSequence < msg.sequenceNo AND
                msg.senderUserId != ch.userId
            GROUP BY 
                chm.chatHeadId
        ) AS unRead on unRead.chatHeadId = ch.id
        LEFT JOIN (
            SELECT Count(*) as count, groupId from msgGroupMembers group by groupId
        ) as groupMembersCount on ch.groupId = groupMembersCount.groupId
        LEFT JOIN (
            SELECT Count(*) as count, broadcastId from msgBroadcastMembers group by broadcastId
        ) as broadcastMembersCount on ch.broadcastId = broadcastMembersCount.broadcastId
        LEFT JOIN (
            SELECT MAX(lastActivity) as activityTime, userId FROM userSession GROUP BY userId
        ) as lastActivity on lastActivity.userId = ch.otherUserId
    WHERE 
        ch.isActive=true AND 
        ch.isDeleted=FALSE AND
        ch.id= lastmessage.chatHeadId AND
        messages.id = lastmessage.messageId AND 
        ch.id in (:chatHeadIds)
    ORDER BY
        ch.isPinned DESC, 
        ch.pinnedAt DESC,
        lastMessageDate DESC
    `;
  const result = await sequelize.query(query, {
    replacements: { chatHeadIds, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getChatHeadByMessageIds = async (messageIds) => {
  var query = `
    SELECT 
        chm.chatHeadId,
        chm.messageId,
        ch.userId
    FROM 
        msgChatHeadMessages AS chm
        join msgChatHeads AS ch on ch.id = chm.chatHeadId
    WHERE 
        chm.messageId  in (:messageIds)
    `;
  const result = await sequelize.query(query, {
    replacements: { messageIds, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getChatHeadList = async (
  userId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.type AS chatHeadType,
        ch.groupId,
        msgGroups.name AS groupName,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupImageThumb,
        msgGroups.isDeleted AS groupDeleted,
        IF(ISNULL(gm.memberId),0,1) AS isGroupMember,
        ch.broadcastId,
        msgBroadcast.name AS broadcastListName,
        ch.otherUserId,
        CONCAT(:BaseURL,users.profileImageThumb) AS profileImageThumb,
        users.fullName,
        users.userName,
        users.mobile,
        users.isDeleted AS userDeleted,
        IF(ISNULL(blockedByMe.userId),0,1) AS blockedByMe,
        IF(ISNULL(blockedByOther.userId),0,1) AS blockedByOther,
        (SELECT if(COUNT(*),true,false) FROM userSession WHERE userId = users.id AND isOnline=1 AND expired=0 )AS isOnline,
        lastmessage.messageId AS lastMessageId,
        lastmessage.createdAt AS lastMessageDate,
        lastmessage.userDeleted AS lastmessageDeleted,
        lastmessage.deletedByUserId AS lastmessageDeletedBy,
        messages.messageType AS lastMessageType,
        messages.messageText AS  lastMessageText,
        messages.messageJson AS  lastMessageJson,
        IFNULL(ch.unReadCount,0) AS unRead,
        IFNULL(unRead.count,0) AS unReadCount,
        ch.isPinned,
        ch.isArchived,
        ch.isMute
    FROM 
        (SELECT t1.* FROM msgChatHeadMessages t1 WHERE t1.id = 
            (SELECT t2.id FROM msgChatHeadMessages t2
            WHERE t2.chatHeadId = t1.chatHeadId and t2.isDeleted=false ORDER BY t2.createdAt DESC
            LIMIT 1)) AS lastmessage,
        msgMessages AS messages,
        msgChatHeads AS ch
        LEFT JOIN users ON users.id = ch.otherUserId
        LEFT JOIN msgGroups ON msgGroups.id = ch.groupId
        LEFT JOIN msgGroupMembers as gm on gm.groupId = msgGroups.id and gm.memberId=ch.userId
        LEFT JOIN msgBroadcast ON msgBroadcast.id = ch.broadcastId
        LEFT JOIN userBlockList AS blockedByMe ON blockedByMe.userId = ch.userId and blockedByMe.blockedUserId = ch.otherUserId
        LEFT JOIN userBlockList AS blockedByOther ON blockedByOther.userId = ch.otherUserId and blockedByOther.blockedUserId = ch.userId
        LEFT JOIN (
            SELECT 
                chm.chatHeadId AS chatHeadId,
                COUNT(*) AS count
            FROM  
                msgChatHeads AS ch
                LEFT JOIN msgChatHeadMessages AS chm ON chm.chatHeadId = ch.id
                LEFT JOIN msgMessages AS msg ON msg.id = chm.messageId
            WHERE 
                ch.lastReadMessageSequence < msg.sequenceNo AND
                msg.senderUserId != ch.userId
            GROUP BY 
                chm.chatHeadId
        ) AS unRead on unRead.chatHeadId = ch.id
    WHERE 
        ch.isActive=true AND 
        ch.isDeleted=FALSE AND
        ch.id= lastmessage.chatHeadId AND
        ch.isArchived = 0 AND
        messages.id = lastmessage.messageId AND
        ch.isActive=true AND ch.isDeleted=false and
        ch.userId=:userId AND 
        (msgGroups.name like :searchKey or
        msgBroadcast.name like :searchKey or
        users.userName like :searchKey or users.mobile like :searchKey )
    ORDER BY
        ch.isPinned DESC, 
        ch.pinnedAt DESC,
        ch.isArchived ASC,
        ch.archivedAt ASC,
        lastMessageDate DESC
    `;

  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const getMpChatHeadList = async (
  userId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.type AS chatHeadType,
        ch.groupId,
        msgGroups.name AS groupName,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupImageThumb,
        msgGroups.isDeleted AS groupDeleted,
        IF(ISNULL(gm.memberId),0,1) AS isGroupMember,
        ch.broadcastId,
        msgBroadcast.name AS broadcastListName,
        ch.otherUserId,
        CONCAT(:BaseURL,users.profileImageThumb) AS profileImageThumb,
        users.fullName,
        users.userName,
        users.isDeleted AS userDeleted,
        IF(ISNULL(blockedByMe.userId),0,1) AS blockedByMe,
        IF(ISNULL(blockedByOther.userId),0,1) AS blockedByOther,
        (SELECT if(COUNT(*),true,false) FROM userSession WHERE userId = users.id AND isOnline=1 AND expired=0 )AS isOnline,
        lastmessage.messageId AS lastMessageId,
        lastmessage.createdAt AS lastMessageDate,
        lastmessage.userDeleted AS lastmessageDeleted,
        lastmessage.deletedByUserId AS lastmessageDeletedBy,
        messages.messageType AS lastMessageType,
        messages.messageText AS  lastMessageText,
        messages.messageJson AS  lastMessageJson,
        IFNULL(ch.unReadCount,0) AS unRead,
        IFNULL(unRead.count,0) AS unReadCount,
        ch.isPinned,
        ch.isArchived,
        ch.isMute
    FROM 
        (SELECT t1.* FROM msgChatHeadMessages t1 WHERE t1.id = 
            (SELECT t2.id FROM msgChatHeadMessages t2
            WHERE t2.chatHeadId = t1.chatHeadId and t2.isDeleted=false ORDER BY t2.createdAt DESC
            LIMIT 1)) AS lastmessage,
        msgMessages AS messages,
        msgChatHeads AS ch
        LEFT JOIN users ON users.id = ch.otherUserId
        LEFT JOIN msgGroups ON msgGroups.id = ch.groupId
        LEFT JOIN msgGroupMembers as gm on gm.groupId = msgGroups.id and gm.memberId=ch.userId
        LEFT JOIN msgBroadcast ON msgBroadcast.id = ch.broadcastId
        LEFT JOIN userBlockList AS blockedByMe ON blockedByMe.userId = ch.userId and blockedByMe.blockedUserId = ch.otherUserId
        LEFT JOIN userBlockList AS blockedByOther ON blockedByOther.userId = ch.otherUserId and blockedByOther.blockedUserId = ch.userId
        LEFT JOIN (
            SELECT 
                chm.chatHeadId AS chatHeadId,
                COUNT(*) AS count
            FROM  
                msgChatHeads AS ch
                LEFT JOIN msgChatHeadMessages AS chm ON chm.chatHeadId = ch.id
                LEFT JOIN msgMessages AS msg ON msg.id = chm.messageId
            WHERE 
                ch.lastReadMessageSequence < msg.sequenceNo AND
                msg.senderUserId != ch.userId
            GROUP BY 
                chm.chatHeadId
        ) AS unRead on unRead.chatHeadId = ch.id
    WHERE 
        ch.isActive=true AND 
        ch.isDeleted=FALSE AND
        ch.chatHeadType = 'marketPlace' AND
        ch.id= lastmessage.chatHeadId AND
        ch.isArchived = 0 AND
        messages.id = lastmessage.messageId AND
        ch.isActive=true AND ch.isDeleted=false and
        ch.userId=:userId AND 
        (msgGroups.name like :searchKey or
        msgBroadcast.name like :searchKey or
        users.userName like :searchKey )
    ORDER BY
        ch.isPinned DESC, 
        ch.pinnedAt DESC,
        ch.isArchived ASC,
        ch.archivedAt ASC,
        lastMessageDate DESC
    `;

  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const getBpChatHeadList = async (
  userId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.type AS chatHeadType,
        ch.groupId,
        msgGroups.name AS groupName,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupImageThumb,
        msgGroups.isDeleted AS groupDeleted,
        IF(ISNULL(gm.memberId),0,1) AS isGroupMember,
        ch.broadcastId,
        msgBroadcast.name AS broadcastListName,
        ch.otherUserId,
        CONCAT(:BaseURL,users.profileImageThumb) AS profileImageThumb,
        users.fullName,
        users.userName,
        users.isDeleted AS userDeleted,
        IF(ISNULL(blockedByMe.userId),0,1) AS blockedByMe,
        IF(ISNULL(blockedByOther.userId),0,1) AS blockedByOther,
        (SELECT if(COUNT(*),true,false) FROM userSession WHERE userId = users.id AND isOnline=1 AND expired=0 )AS isOnline,
        lastmessage.messageId AS lastMessageId,
        lastmessage.createdAt AS lastMessageDate,
        lastmessage.userDeleted AS lastmessageDeleted,
        lastmessage.deletedByUserId AS lastmessageDeletedBy,
        messages.messageType AS lastMessageType,
        messages.messageText AS  lastMessageText,
        messages.messageJson AS  lastMessageJson,
        IFNULL(ch.unReadCount,0) AS unRead,
        IFNULL(unRead.count,0) AS unReadCount,
        ch.isPinned,
        ch.isArchived,
        ch.isMute
    FROM 
        (SELECT t1.* FROM msgChatHeadMessages t1 WHERE t1.id = 
            (SELECT t2.id FROM msgChatHeadMessages t2
            WHERE t2.chatHeadId = t1.chatHeadId and t2.isDeleted=false ORDER BY t2.createdAt DESC
            LIMIT 1)) AS lastmessage,
        msgMessages AS messages,
        msgChatHeads AS ch
        LEFT JOIN users ON users.id = ch.otherUserId
        LEFT JOIN msgGroups ON msgGroups.id = ch.groupId
        LEFT JOIN msgGroupMembers as gm on gm.groupId = msgGroups.id and gm.memberId=ch.userId
        LEFT JOIN msgBroadcast ON msgBroadcast.id = ch.broadcastId
        LEFT JOIN userBlockList AS blockedByMe ON blockedByMe.userId = ch.userId and blockedByMe.blockedUserId = ch.otherUserId
        LEFT JOIN userBlockList AS blockedByOther ON blockedByOther.userId = ch.otherUserId and blockedByOther.blockedUserId = ch.userId
        LEFT JOIN (
            SELECT 
                chm.chatHeadId AS chatHeadId,
                COUNT(*) AS count
            FROM  
                msgChatHeads AS ch
                LEFT JOIN msgChatHeadMessages AS chm ON chm.chatHeadId = ch.id
                LEFT JOIN msgMessages AS msg ON msg.id = chm.messageId
            WHERE 
                ch.lastReadMessageSequence < msg.sequenceNo AND
                msg.senderUserId != ch.userId
            GROUP BY 
                chm.chatHeadId
        ) AS unRead on unRead.chatHeadId = ch.id
    WHERE 
        ch.isActive=true AND 
        ch.isDeleted=FALSE AND
        ch.chatHeadType = 'bizPage' AND
        ch.id= lastmessage.chatHeadId AND
        ch.isArchived = 0 AND
        messages.id = lastmessage.messageId AND
        ch.isActive=true AND ch.isDeleted=false and
        ch.userId=:userId AND 
        (msgGroups.name like :searchKey or
        msgBroadcast.name like :searchKey or
        users.userName like :searchKey )
    ORDER BY
        ch.isPinned DESC, 
        ch.pinnedAt DESC,
        ch.isArchived ASC,
        ch.archivedAt ASC,
        lastMessageDate DESC
    `;

  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: { userId, BaseURL: process.env.FTP_BASE_URL, searchKey },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const deleteChatHead = async (chatHeadId) => {
  // await sequelize.query(
  //     `update msgChatHeads set isPinned=false, pinnedAt=null ,isDeleted=true WHERE id=:id`,
  //     {
  //         replacements:{id:chatHeadId},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  const result = await deleteChatHeads([chatHeadId]);
  return result;
};
export const deleteChatHeads = async (chatHeadIds) => {
  await clearChatHeads(chatHeadIds);
  await sequelize.query(
    `update msgChatHeads set isPinned=false, pinnedAt=null ,isDeleted=true WHERE id in (:chatHeadIds)`,
    {
      replacements: { chatHeadIds },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const setChatHeadPin = async (chatHeadId, isPinned) => {
  if (isPinned) {
    let pinnedAt = moment().utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss");
    await sequelize.query(
      `update msgChatHeads set isPinned=true, pinnedAt=:pinnedAt, isArchived=false, archivedAt=null WHERE id=:chatHeadId`,
      {
        replacements: { chatHeadId, pinnedAt },
        type: QueryTypes.UPDATE,
      }
    );
  } else {
    await sequelize.query(
      `update msgChatHeads set isPinned=false, pinnedAt=null WHERE id=:chatHeadId`,
      {
        replacements: { chatHeadId },
        type: QueryTypes.UPDATE,
      }
    );
  }
  // await sequelize.query(
  //     `update msgChatHeads set isPinned=:isPinned, pinnedAt=:pinnedAt WHERE id=:id`,
  //     {
  //         replacements:{id:chatHeadId,isPinned,pinnedAt},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  return true;
};
export const setChatHeadsArchive = async (chatHeadIds, isArchived) => {
  if (isArchived) {
    let archivedAt = moment().utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss");
    await sequelize.query(
      `update msgChatHeads set isArchived=true, archivedAt=:archivedAt, isPinned=false, pinnedAt=null WHERE id in (:chatHeadIds)`,
      {
        replacements: { chatHeadIds, archivedAt },
        type: QueryTypes.UPDATE,
      }
    );
  } else {
    await sequelize.query(
      `update msgChatHeads set isArchived=false, archivedAt=null WHERE id in (:chatHeadIds)`,
      {
        replacements: { chatHeadIds },
        type: QueryTypes.UPDATE,
      }
    );
  }
  // await sequelize.query(
  //     `update msgChatHeads set isArchived=:isArchived, archivedAt=:archivedAt WHERE id in (:chatHeadIds)`,
  //     {
  //         replacements:{chatHeadIds,isArchived,archivedAt},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  return true;
};
export const setChatHeadMute = async (chatHeadId, isMute) => {
  await sequelize.query(`update msgChatHeads set isMute=:isMute WHERE id=:id`, {
    replacements: { id: chatHeadId, isMute },
    type: QueryTypes.UPDATE,
  });
  return true;
};
export const getMessageByIds = async (messageIds) => {
  let queryStr = `
    SELECT 
        msg.sequenceNo,
        msg.id AS messageId, 
        msg.messageType ,
        msg.messageText ,
        msg.messageJson ,
        msg.senderUserId ,
        msg.createdAt,
        sender.userName AS senderUserName,
        CONCAT(:BaseURL,sender.profileImageThumb) AS senderProfileThumb
    FROM 
        msgMessages AS msg 
        LEFT JOIN users AS sender on msg.senderUserId = sender.id
    WHERE 
        msg.id in (:messageIds) `;
  const result = await sequelize.query(queryStr, {
    replacements: { messageIds, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getChatHeadMsg = async (
  chatHeadId,
  messageSequence,
  PageSize,
  newerMsg,
  searchKey
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let queryStr = `
    SELECT 
        chm.chatHeadId AS chatHeadId,
        msg.sequenceNo,
        msg.id AS messageId, 
        msg.messageType ,
        msg.messageText ,
        msg.messageJson ,
        msg.senderUserId ,
        msg.createdAt,
        msg.isForwarded,
        msg.replyMessageId,
        IF(ISNULL(msg.replyMessageId),0,1) as isReply,
        sender.fullName AS senderFullName,
        sender.userName AS senderUserName,
        CONCAT(:BaseURL,sender.profileImageThumb) AS senderProfileThumb,
        chm.userDeleted as isDeletedForAll ,
        chm.deletedByUserId,
        deletedBy.userName AS deletedByUserName,
        CONCAT(:BaseURL,deletedBy.profileImageThumb) AS deletedByProfileThumb,
        IFNULL(rc.readCount,0) AS readCount,
        IFNULL(userRead.isRead,0) AS isRead
    FROM 
        msgChatHeadMessages AS chm
        LEFT JOIN users AS deletedBy on chm.deletedByUserId = deletedBy.id
        LEFT JOIN msgMessages AS msg on chm.messageId = msg.id
        LEFT JOIN users AS sender on msg.senderUserId = sender.id
        LEFT JOIN (SELECT COUNT(*) AS readCount,messageId FROM msgChatHeadMessages WHERE isRead=TRUE  GROUP BY messageId) AS rc ON chm.messageId = rc.messageId
        LEFT JOIN msgChatHeads AS ch on ch.id = chm.chatHeadId
        LEFT JOIN (SELECT  messageId,isRead,userId FROM 
            msgChatHeadMessages chm LEFT JOIN msgChatHeads AS ch ON ch.id = chm.chatHeadId where ch.id = :chatHeadId ) AS userRead 
            ON userRead.messageId = chm.messageId AND userRead.userId = ch.otherUserId
    WHERE 
        msg.isActive=true AND
        msg.isDeleted=false AND
        chm.isActive=true AND
        chm.isDeleted=false AND
        chm.chatHeadId=:chatHeadId and 
        msg.messageText like :searchKey`;

  if (messageSequence != undefined && messageSequence != null) {
    if (newerMsg) {
      queryStr = `${queryStr} AND  msg.sequenceNo > :messageSequence`;
      queryStr = `${queryStr} ORDER BY msg.sequenceNo \n`;
    } else {
      queryStr = `${queryStr} AND  msg.sequenceNo < :messageSequence`;
      queryStr = `${queryStr} ORDER BY msg.sequenceNo DESC\n`;
    }
  }

  if (PageSize) {
    queryStr = `${queryStr} limit ${PageSize} \n`;
  }

  const result = await sequelize.query(queryStr, {
    replacements: {
      chatHeadId,
      messageSequence,
      BaseURL: process.env.FTP_BASE_URL,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  if (!newerMsg) return result.reverse();
  return result;
};

export const getChatHeadMessages = async (
  chatHeadId,
  messageId,
  messageSequence,
  pageSize,
  newerMsg,
  olderMsg
) => {
  if (messageId || messageSequence) {
    if (!newerMsg && !olderMsg) olderMsg = true;
    if (messageId) {
      const seqresult = await sequelize.query(
        `SELECT sequenceNo FROM msgMessages WHERE id=:messageId`,
        {
          replacements: { messageId },
          type: QueryTypes.SELECT,
        }
      );
      if (seqresult.length > 0) {
        messageSequence = seqresult[0].sequenceNo;
      } else {
        throw "invalidMessageId";
      }
    }
  } else {
    olderMsg = true;
    newerMsg = true;
    let lastReadMessageSequence = await sequelize.query(
      `SELECT * FROM msgChatHeads WHERE id=:chatHeadId`,
      { replacements: { chatHeadId }, type: QueryTypes.SELECT }
    );
    if (lastReadMessageSequence.length > 0) {
      messageSequence = lastReadMessageSequence[0].lastReadMessageSequence;
    } else {
      throw "invalidChatHeadId";
    }
  }

  let result;
  if (olderMsg && newerMsg) {
    result = await getChatHeadMsg(chatHeadId, messageSequence, pageSize, false);
    let resultnew = await getChatHeadMsg(
      chatHeadId,
      messageSequence - 1,
      pageSize + 1,
      true
    );
    result.push(...resultnew);
  } else if (olderMsg) {
    result = await getChatHeadMsg(chatHeadId, messageSequence, pageSize, false);
  } else if (newerMsg) {
    result = await getChatHeadMsg(chatHeadId, messageSequence, pageSize, true);
  }
  return result;
};
export const getChatHeadMessagesb = async (
  chatHeadId,
  messageId,
  messageSequence,
  PageSize,
  rev
) => {
  let queryStr = `
    SELECT 
        chm.chatHeadId AS chatHeadId,
        msg.sequenceNo,
        msg.id AS messageId, 
        msg.messageType ,
        msg.messageText ,
        msg.messageJson ,
        msg.senderUserId ,
        msg.createdAt,
        sender.userName AS senderUserName,
        CONCAT(:BaseURL,sender.profileImageThumb) AS senderProfileThumb,
        chm.userDeleted as isDeletedForAll ,
        chm.deletedByUserId,
        deletedBy.userName AS deletedByUserName,
        CONCAT(:BaseURL,deletedBy.profileImageThumb) AS deletedByProfileThumb,
        IFNULL(rc.readCount,0) AS readCount,
        IFNULL(userRead.isRead,0) AS isRead
    FROM 
        msgChatHeadMessages AS chm
        LEFT JOIN users AS deletedBy on chm.deletedByUserId = deletedBy.id
        LEFT JOIN msgMessages AS msg on chm.messageId = msg.id
        LEFT JOIN users AS sender on msg.senderUserId = sender.id
        LEFT JOIN (SELECT COUNT(*) AS readCount,messageId FROM msgChatHeadMessages WHERE isRead=TRUE  GROUP BY messageId) AS rc ON chm.messageId = rc.messageId
        LEFT JOIN msgChatHeads AS ch on ch.id = chm.chatHeadId
        LEFT JOIN (SELECT  messageId,isRead,userId FROM 
            msgChatHeadMessages chm LEFT JOIN msgChatHeads AS ch ON ch.id = chm.chatHeadId) AS userRead 
            ON userRead.messageId = chm.messageId AND userRead.userId = ch.otherUserId
    WHERE 
        msg.isActive=true AND
        msg.isDeleted=false AND
        chm.isActive=true AND
        chm.isDeleted=false AND
        chm.chatHeadId=:chatHeadId`;

  // if(!messageId && !messageSequence){
  //     rev=false;
  // }
  if (rev) {
    queryStr = `${queryStr} AND  msg.sequenceNo > `;
  } else {
    queryStr = `${queryStr} AND  msg.sequenceNo < `;
  }

  let lastReadMessageSequence = await sequelize.query(
    `SELECT * FROM msgChatHeads WHERE id=:chatHeadId`,
    { replacements: { chatHeadId }, type: QueryTypes.SELECT }
  );
  if (lastReadMessageSequence.length > 0) {
    lastReadMessageSequence =
      lastReadMessageSequence[0].lastReadMessageSequence;
  }

  if (messageId) {
    queryStr = `${queryStr} (SELECT sequenceNo FROM msgMessages WHERE id='${messageId}')\n `;
  } else if (messageSequence) {
    queryStr = `${queryStr} ${messageSequence}\n`;
  } else {
    queryStr = `${queryStr} LEAST(${lastReadMessageSequence},(SELECT MAX(sequenceNo) FROM msgMessages )) \n`;
  }

  if (rev) {
    queryStr = `${queryStr} ORDER BY msg.sequenceNo \n`;
  } else {
    queryStr = `${queryStr} ORDER BY msg.sequenceNo DESC\n`;
  }

  if (PageSize) {
    queryStr = `${queryStr} limit ${PageSize} \n`;
  }

  const result = await sequelize.query(queryStr, {
    replacements: { chatHeadId, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result.reverse();
};
export const clearChatHead = async (chatHeadId) => {
  // await sequelize.query(
  //     `update msgChatHeadMessages set isDeleted=true WHERE chatHeadId=:chatHeadId`,
  //     {
  //         replacements:{chatHeadId},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  const result = await clearChatHeads([chatHeadId]);
  return result;
};
export const clearChatHeads = async (chatHeadIds) => {
  await sequelize.query(
    `update msgChatHeadMessages set isDeleted=true WHERE chatHeadId in (:chatHeadIds)`,
    {
      replacements: { chatHeadIds },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const deleteMessageForMe = async (
  chatHeadId,
  messageId,
  deletedByUserId
) => {
  await sequelize.query(
    `update msgChatHeadMessages set isDeleted=true, deletedByUserId=:deletedByUserId WHERE chatHeadId=:chatHeadId AND messageId=:messageId`,
    {
      replacements: { chatHeadId, messageId, deletedByUserId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const deleteMessageForAll = async (messageId, deletedByUserId) => {
  await sequelize.query(
    `update msgChatHeadMessages set userDeleted=true, deletedByUserId=:deletedByUserId  WHERE messageId=:messageId`,
    {
      replacements: { messageId, deletedByUserId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const deleteMessagesForMe = async (
  chatHeadId,
  messageIds,
  deletedByUserId
) => {
  await sequelize.query(
    `update msgChatHeadMessages set isDeleted=true, deletedByUserId=:deletedByUserId WHERE chatHeadId=:chatHeadId AND messageId in (:messageIds)`,
    {
      replacements: { chatHeadId, messageIds, deletedByUserId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const deleteMessagesForAll = async (messageIds, deletedByUserId) => {
  await sequelize.query(
    `update msgChatHeadMessages set userDeleted=true, deletedByUserId=:deletedByUserId  WHERE messageId in (:messageIds)`,
    {
      replacements: { messageIds, deletedByUserId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const removeChatHeadMessage = async (chatHeadId, messageId) => {
  await sequelize.query(
    `update msgChatHeadMessages set isDeleted=true WHERE chatHeadId=:chatHeadId AND messageId=:messageId`,
    {
      replacements: { chatHeadId, messageId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const setChatHeadMessageRead = async (
  chatHeadId,
  lastReadMessageSequence
) => {
  const chatHeadMessages = await sequelize.query(
    `            
            SELECT chm.id as chatHeadMessageId
            FROM msgMessages AS msg
            JOIN msgChatHeadMessages AS chm ON chm.messageId = msg.id
            WHERE chm.chatheadId = :chatHeadId
            AND sequenceNo <= :lastReadMessageSequence
        `,
    {
      replacements: { chatHeadId, lastReadMessageSequence },
      type: QueryTypes.SELECT,
    }
  );
  const chatHeadMessageIds = [];
  chatHeadMessages.forEach((item) => {
    chatHeadMessageIds.push(item.chatHeadMessageId);
  });
  await sequelize.query(
    `update msgChatHeadMessages set isRead=true WHERE id in (:chatHeadMessageIds)`,
    {
      replacements: { chatHeadMessageIds },
      type: QueryTypes.UPDATE,
    }
  );
  // await sequelize.query(
  //     `update msgChatHeadMessages set isRead=true WHERE chatHeadId=:chatHeadId AND messageSequence <= messageSequence`,
  //     {
  //         replacements:{chatHeadId,messageId,messageSequence},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  await sequelize.query(
    `update msgChatHeads set lastReadMessageSequence=GREATEST(:lastReadMessageSequence,lastReadMessageSequence) WHERE id=:chatHeadId `,
    {
      replacements: { lastReadMessageSequence, chatHeadId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};

export const setChatHeadMessageUnRead = async (
  chatHeadId,
  lastReadMessageSequence
) => {
  const chatHeadMessages = await sequelize.query(
    `            
            SELECT chm.id as chatHeadMessageId
            FROM msgMessages AS msg
            JOIN msgChatHeadMessages AS chm ON chm.messageId = msg.id
            WHERE chm.chatheadId = :chatHeadId
            AND sequenceNo <= :lastReadMessageSequence
        `,
    {
      replacements: { chatHeadId, lastReadMessageSequence },
      type: QueryTypes.SELECT,
    }
  );
  const chatHeadMessageIds = [];
  chatHeadMessages.forEach((item) => {
    chatHeadMessageIds.push(item.chatHeadMessageId);
  });
  await sequelize.query(
    `update msgChatHeadMessages set isRead=false WHERE id in (:chatHeadMessageIds)`,
    {
      replacements: { chatHeadMessageIds },
      type: QueryTypes.UPDATE,
    }
  );
  // await sequelize.query(
  //     `update msgChatHeadMessages set isRead=true WHERE chatHeadId=:chatHeadId AND messageSequence <= messageSequence`,
  //     {
  //         replacements:{chatHeadId,messageId,messageSequence},
  //         type: QueryTypes.UPDATE
  //     }
  // );
  await sequelize.query(
    `update msgChatHeads set lastReadMessageSequence=GREATEST(:lastReadMessageSequence,lastReadMessageSequence) WHERE id=:chatHeadId `,
    {
      replacements: { lastReadMessageSequence, chatHeadId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};

export const createMessage = async (
  senderUserId,
  messageType,
  messageText,
  messageJson,
  isForwarded,
  replyMessageId
) => {
  if (messageJson === undefined) messageJson = {};
  if (isForwarded === undefined) isForwarded = false;
  if (replyMessageId === undefined) replyMessageId = null;
  const id = uuid();
  var query = `
        insert into msgMessages 
               ( id, senderUserId, messageType, messageText, messageJson, isForwarded, replyMessageId)
        values (:id,:senderUserId,:messageType,:messageText,:messageJson,:isForwarded,:replyMessageId)
        `;
  await sequelize.query(query, {
    replacements: {
      id,
      senderUserId,
      messageType,
      messageText,
      messageJson: JSON.stringify(messageJson),
      isForwarded,
      replyMessageId,
    },
    type: QueryTypes.INSERT,
  });
  return id;
};
export const addMessagesToChatHeads = async (messageIds, chatHeadIds) => {
  var insertQry = `INSERT INTO msgChatHeadMessages (id,chatHeadId,messageId) VALUES `;
  var values = ``;
  chatHeadIds.forEach((chatHeadId, chindex) => {
    messageIds.forEach((messageId, msindex) => {
      values += ` ( '${uuid()}' , '${chatHeadId}' , '${messageId}' ) ,`;
    });
  });

  values = values.replace(/,+$/, "");
  const result = await sequelize.query(insertQry + values, {
    type: QueryTypes.INSERT,
  });

  var query = `update msgChatHeads set isDeleted=false, unReadCount=unReadCount+${messageIds.length} WHERE id in (:chatHeadIds)`;
  await sequelize.query(query, {
    replacements: { chatHeadIds },
    type: QueryTypes.UPDATE,
  });

  const messages = await getMessageByIds(messageIds);
  const chatHeads = await getChatHeadByIds(chatHeadIds);
  return { messages, chatHeads };
};
export const createChatHead = async (userId, typeId, type, chatHeadType) => {
  let typeKey = "";
  if (type === "user") {
    typeKey = "otherUserId";
    if (!chatHeadType) {
      chatHeadType = null;
    }
  } else if (type === "group") {
    typeKey = "groupId";
    if (!chatHeadType) {
      chatHeadType = null;
    }
  } else if (type === "broadcast") {
    if (!chatHeadType) {
      chatHeadType = null;
    }
    typeKey = "broadcastId";
  } else {
    throw "invalidChatHeadType";
  }

  const existingChatHead = await sequelize.query(
    `SELECT * FROM msgChatHeads WHERE userId=:userId AND ${typeKey}=:typeId AND type=:type`,
    {
      replacements: { userId, typeId, chatHeadType,type },
      type: QueryTypes.SELECT,
    }
  );
  console.log(existingChatHead);
  if (existingChatHead.length > 0) {
    if (existingChatHead[0].isDeleted || existingChatHead[0].isArchived) {
      await sequelize.query(
        `update msgChatHeads set isMute=false, isPinned=false, isDeleted=false, isArchived = false WHERE id=:id`,
        {
          replacements: { id: existingChatHead[0].id },
          type: QueryTypes.UPDATE,
        }
      );
    }
    return existingChatHead[0].id;
  } else {
    const id = uuid();
    var query = `
        insert into msgChatHeads 
               (id,userId,type, chatHeadType,${typeKey})
        values (:id,:userId,:type, :chatHeadType, :typeId)
        `;
    await sequelize.query(query, {
      replacements: { id, userId, type, chatHeadType, typeId },
      type: QueryTypes.INSERT,
    });
    return id;
  }
};

export const getUserChatHead = async (userId, otherUserId) => {
  const chatHeads = await sequelize.query(
    `SELECT 
            ch.id AS chatHeadId,
            ch.userId
        FROM 
            msgChatHeads as ch
        WHERE 
            ch.isDeleted = false and
            ch.isActive = true and
            ch.userId=:userId AND 
            ch.otherUserId=:otherUserId`,
    {
      replacements: { userId, otherUserId },
      type: QueryTypes.SELECT,
    }
  );
  return chatHeads;
};

export const privateListCheck = async (userId, otherUserId) => {
  let query = `
  select * from userPrivates WHERE otherUserId = :userId AND userId = :otherUserId AND isActive = 1 AND isDeleted = 0 
  AND type = 'generalMessages'
  `;

  let result = {};
  result.privates = await sequelize.query(query, {
    replacements: {
      userId,
      otherUserId,
    },
    type: QueryTypes.SELECT,
  });
  return result.privates;
};

export const createUserChatHead = async (userId, otherUserId, chatHeadType) => {
  return createChatHead(userId, otherUserId, "user", chatHeadType);
};
export const createGroupChatHead = async (userId, groupId) => {
  return createChatHead(userId, groupId, "group");
};
export const createBroadcastChatHead = async (userId, broadcastId) => {
  return createChatHead(userId, broadcastId, "broadcast");
};

export const getUserOnlineSessions = async (userId) => {
  const userResult = await sequelize.query(
    `select * from userSession where isOnline=true and expired=false and userId=:userId and isActive=true and isDeleted=false`,
    {
      replacements: { userId },
      type: QueryTypes.SELECT,
    }
  );
  return userResult;
};
export const updateSocketId = async (sessionId, socketId) => {
  await sequelize.query(
    `update userSession set socketId= :socketId, isOnline=true  WHERE id=:sessionId`,
    {
      replacements: { sessionId, socketId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};
export const clearSocketId = async (sessionId) => {
  await sequelize.query(
    `update userSession set socketId= null , isOnline=false  WHERE id=:sessionId`,
    {
      replacements: { sessionId },
      type: QueryTypes.UPDATE,
    }
  );
  return true;
};

export const createGroup = async (name, summry, imageURL, ownerId) => {
  const id = uuid();
  var query = `
    insert into msgGroups 
           ( id, name, summry, imageURL, thumbURL, ownerId)
    values (:id,:name,:summry,:imageURL,:imageURL,:ownerId)
    `;
  await sequelize.query(query, {
    replacements: { id, name, summry, imageURL, ownerId },
    type: QueryTypes.INSERT,
  });
  return id;
};
export const updateGroup = async (groupId, name, summry, imageURL) => {
  let query = `update msgGroups set id=:groupId `;
  if (name !== undefined) {
    query = `${query}, name=:name`;
  }
  if (summry !== undefined) {
    query = `${query}, summry=:summry`;
  }
  if (imageURL !== undefined) {
    query = `${query}, imageURL=:imageURL, thumbURL=:imageURL`;
  }
  query = `${query}  WHERE id=:groupId`;
  await sequelize.query(query, {
    replacements: { groupId, name, summry, imageURL },
    type: QueryTypes.UPDATE,
  });
  return true;
};
export const deleteGroup = async (groupId) => {
  let query = `update msgGroups set isDeleted=true  WHERE id=:groupId`;
  await sequelize.query(query, {
    replacements: { groupId },
    type: QueryTypes.UPDATE,
  });
  return true;
};
export const reportGroup = async (groupId, reportOptionId, userId, remarks) => {
  const id = uuid();
  let query = `insert msgGroupReports(id, groupsId, userId, reportOptionId, remarks) 
  VALUES(:id, :groupId, :userId, :reportOptionId, :remarks) `;
  await sequelize.query(query, {
    replacements: { id, groupId, reportOptionId, userId, remarks },
    type: QueryTypes.INSERT,
  });
  return true;
};
export const setGroupMute = async (groupId, userId, mute) => {
  let query = `update msgChatHeads set isMute=:mute 
      WHERE groupId= :groupId AND userId = :userId`;
  await sequelize.query(query, {
    replacements: { groupId, userId, mute },
    type: QueryTypes.UPDATE,
  });
  return true;
};
export const getGroupById = async (groupId, userId) => {
  let query = `
    SELECT 
        msgGroups.id AS groupId,
        msgGroups.ownerId,
        msgGroups.name AS groupName,
        msgGroups.summry AS groupSummary,
        CONCAT(:BaseURL,msgGroups.imageURL) AS groupImageURL,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupThumbURL,
        (SELECT COUNT(*) FROM msgGroupMembers WHERE groupId=:groupId) AS membersCount,
        IFNULL(ch.isMute,false) AS isMute,
        gm.role
    FROM  
        msgGroups 
        LEFT JOIN msgGroupMembers AS gm on gm.groupId=msgGroups.id AND gm.memberId = :userId
        LEFT JOIN msgChatHeads AS ch on ch.groupId = msgGroups.id AND ch.userId = :userId
    WHERE 
        msgGroups.id=:groupId`;
  const result = await sequelize.query(query, {
    replacements: { groupId, userId, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  if (result.length > 0) return result[0];
};
export const getGroupMembers = async (
  groupId,
  searchKey,
  pageIndex,
  pageSize,
  sortBy
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let query = `
    SELECT
        users.id,
        users.userName,
        users.fullName,
        CONCAT(:BaseURL,users.profileImageThumb) AS profileImageThumb,
        gm.role
    FROM 
        users LEFT JOIN msgGroupMembers AS gm on gm.memberId=users.id
    WHERE
        users.isActive=true AND 
        users.isDeleted=false AND 
        users.userName like :searchKey AND
        gm.groupId = :groupId 
        
    ORDER BY gm.role 
    `;
  let result = {};
  if (sortBy) {
    query = query + `\n ORDER BY :sortBy`;
  }
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          groupId,
          BaseURL: process.env.FTP_BASE_URL,
          sortBy,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: {
      groupId,
      BaseURL: process.env.FTP_BASE_URL,
      sortBy,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getUserGroups = async (userId) => {
  let query = `
    SELECT
        msgGroups.id AS groupId,
        msgGroups.name AS groupName,
        msgGroups.summry AS groupSummary,
        CONCAT(:BaseURL,msgGroups.imageURL) AS groupImageURL,
        CONCAT(:BaseURL,msgGroups.thumbURL) AS groupThumbURL,
        msgGroups.isDeleted
    FROM 
        msgGroupMembers AS gm JOIN msgGroups on gm.groupId=msgGroups.id
    WHERE
        gm.isActive =true AND 
        gm.isDeleted =false AND
        gm.memberId = :userId`;
  const result = await sequelize.query(query, {
    replacements: { userId, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getGroupMembersToAdd = async (
  userId,
  groupId,
  searchKey,
  pageIndex,
  pageSize,
  sortBy
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let query = `
    SELECT
        friends.id,
        friends.userName,
        friends.fullName,
        friends.gender,
        CONCAT(:BaseURL,friends.profileImageThumb) AS profileImageThumb
    FROM 
        userFriends AS friends
    WHERE
        friends.userId = :userId AND
        friends.userName like :searchKey AND
        friends.id not in  
            (SELECT gm.memberId
            FROM   msgGroupMembers AS gm
            WHERE  gm.groupId = :groupId )`;

  let result = {};
  if (sortBy) {
    query = query + `\n ORDER BY :sortBy`;
  }
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          userId,
          groupId,
          BaseURL: process.env.FTP_BASE_URL,
          sortBy,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: {
      userId,
      groupId,
      BaseURL: process.env.FTP_BASE_URL,
      sortBy,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const addUsersInGroup = async (groupId, members) => {
  var insertQry = `INSERT INTO msgGroupMembers (id,groupId,memberId,role) VALUES `;
  var values = ``;

  members.forEach((item, index) => {
    if (item.role != "admin" && item.role != "creator") item.role = "member";
    values += ` ( '${uuid()}', '${groupId}' , '${item.memberId}' , '${
      item.role
    }' ) ,`;
  });
  values = values.replace(/,+$/, "");
  const result = await sequelize.query(insertQry + values, {
    type: QueryTypes.INSERT,
  });
  return result;
};

export const getGroupChatHeads = async (groupId) => {
  var query = `
    SELECT 
        ch.id AS chatHeadId,
        ch.userId
    FROM 
        msgChatHeads AS ch
    WHERE 
        ch.isDeleted = false and
        ch.isActive = true and
        ch.groupId =:groupId `;
  const chatHeads = await sequelize.query(query, {
    replacements: { groupId },
    type: QueryTypes.SELECT,
  });
  return chatHeads;
};
export const getGroupChatHeadIds = async (groupId) => {
  const result = await getGroupChatHeads(groupId);
  const chatHeadIds = [];
  for (let i = 0; i < result.length; i++) {
    chatHeadIds.push(result[i].chatHeadId);
  }
  return chatHeadIds;
};
export const removeUsersFromGroup = async (groupId, userId) => {
  var query = `
    Delete From msgGroupMembers 
    WHERE 
        groupId =:groupId AND
        memberId = :userId
    `;
  const result2 = await sequelize.query(query, {
    replacements: { groupId, userId },
    type: QueryTypes.DELETE,
  });
  var query = `
  UPDATE msgChatHeads SET isActive = 0, isDeleted = 1
  WHERE 
      groupId =:groupId AND
      userId = :userId
  `;
  const result = await sequelize.query(query, {
    replacements: { groupId, userId },
    type: QueryTypes.UPDATE,
  });
  return true;
};
export const changeGroupMembersRole = async (groupId, memberIds, role) => {
  var query = `
     update msgGroupMembers set role=:role 
     WHERE  
        groupId =:groupId AND
        memberId in (:memberIds)
    `;
  const result = await sequelize.query(query, {
    replacements: { groupId, memberIds, role },
    type: QueryTypes.UPDATE,
  });
  return true;
};

export const createBroadcastList = async (name, ownerId) => {
  const id = uuid();
  var query = `
    insert into msgBroadcast 
           ( id, name, ownerId)
    values (:id,:name,:ownerId)
    `;
  await sequelize.query(query, {
    replacements: { id, name, ownerId },
    type: QueryTypes.INSERT,
  });
  return id;
};
export const addUsersInBroadcastList = async (broadcastId, memberIds) => {
  var insertQry = `INSERT INTO msgBroadcastMembers (id,broadcastId,memberId) VALUES `;
  var values = ``;
  memberIds.forEach((memberId, index) => {
    values += ` ( '${uuid()}', '${broadcastId}' , '${memberId}' ) ,`;
  });
  values = values.replace(/,+$/, "");
  const result = await sequelize.query(insertQry + values, {
    type: QueryTypes.INSERT,
  });
  return result;
};
export const getBroadcastMembers = async (
  broadcastId,
  searchKey,
  pageIndex,
  pageSize,
  sortBy
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let query = `
    SELECT 
        friends.id,
        friends.userName,
        friends.fullName,
        CONCAT(:BaseURL,friends.profileImageThumb) AS profileImageThumb
    FROM
        userFriends AS friends
        JOIN msgBroadcastMembers AS bm on friends.id = bm.memberId
        JOIN msgBroadcast AS bc on bm.broadcastId = bc.id AND friends.userId = bc.ownerId
    WHERE 
        friends.userName like :searchKey AND
        bm.broadcastId = :broadcastId  `;
  let result = {};
  if (sortBy) {
    query = query + `\n ORDER BY :sortBy`;
  }
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          broadcastId,
          BaseURL: process.env.FTP_BASE_URL,
          sortBy,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: {
      broadcastId,
      BaseURL: process.env.FTP_BASE_URL,
      sortBy,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getBroadcastChatHeadIds = async (broadcastId) => {
  let query = `
    SELECT 
        a.userId,
        a.otherUserId,
        a.chatHeadId
    FROM
        (SELECT 
            bc.ownerId AS userId,
            bm.memberId AS otherUserId,
            ch.id AS chatHeadId,
            ch.isDeleted AS chatHeadDeleted,
            bc.ownerId AS ownerId,
            bm.memberId AS memberId,
            bm.broadcastId 
        FROM
            msgBroadcastMembers AS bm 
            LEFT JOIN msgBroadcast AS bc ON bc.id = bm.broadcastId
            LEFT JOIN msgChatHeads AS ch 
                ON (ch.userId=bc.ownerId AND ch.otherUserId = bm.memberId) 
    UNION 
        SELECT 
            bm.memberId AS userId,
            bc.ownerId AS otherUserId,
            ch.id AS chatHeadId,
            ch.isDeleted AS chatHeadDeleted,
            bc.ownerId AS ownerId,
            bm.memberId AS memberId,
            bm.broadcastId 
        FROM
            msgBroadcastMembers AS bm 
            LEFT JOIN msgBroadcast AS bc ON bc.id = bm.broadcastId
            LEFT JOIN msgChatHeads AS ch 
                ON (ch.userId= bm.memberId AND ch.otherUserId =bc.ownerId) 
    ) AS a
    
    JOIN 
        userFriends
        AS friends ON a.memberId = friends.id AND a.ownerId = friends.userId 
    WHERE 
        a.broadcastId = :broadcastId 
    `;
  const memberswithoutchatHead = await sequelize.query(
    query + " AND (chatHeadId IS NULL OR chatHeadDeleted=TRUE)",
    {
      replacements: { broadcastId },
      type: QueryTypes.SELECT,
    }
  );

  for (let i = 0; i < memberswithoutchatHead.length; i++) {
    await createUserChatHead(
      memberswithoutchatHead[i].userId,
      memberswithoutchatHead[i].otherUserId
    );
  }

  const result = await sequelize.query(
    query + " AND (chatHeadId IS NOT NULL AND chatHeadDeleted=false)",
    {
      replacements: { broadcastId },
      type: QueryTypes.SELECT,
    }
  );
  const broadcastChatHead = await sequelize.query(
    "SELECT * FROM msgChatHeads WHERE broadcastId = :broadcastId",
    {
      replacements: { broadcastId },
      type: QueryTypes.SELECT,
    }
  );
  if (broadcastChatHead && broadcastChatHead.length < 1) {
    throw "invalidBroadcastId";
  }
  const chatheadIds = [broadcastChatHead[0].id];
  for (let i = 0; i < result.length; i++) {
    chatheadIds.push(result[i].chatHeadId);
  }
  return chatheadIds;
};

export const messageSendNotificationToChatHead = async (user, chatHead) => {
  const lastFiveMsg = await getChatHeadMsg(
    chatHead.chatHeadId,
    chatHead.lastReadMessageSequence + 1,
    5,
    true
  );
  const sendUnreadMsg = [];
  for (let i = 0; i < 5; i++) {
    if (lastFiveMsg[i] && !lastFiveMsg[i].isRead) {
      const unredmsg = {
        messageId: lastFiveMsg[i].messageId,
        messageType: lastFiveMsg[i].messageType,
        messageText: lastFiveMsg[i].messageText,
        createdAt: lastFiveMsg[i].createdAt,
        imageUrl:
          lastFiveMsg[i].messageJson.replyMediaUrl ||
          lastFiveMsg[i].messageJson.mediaUrl, // if messageType is image or video
        senderUserId: lastFiveMsg[i].senderUserId,
        senderFullName: lastFiveMsg[i].senderFullName,
        senderUsername: lastFiveMsg[i].senderUserName,
        isDeletedForAll: lastFiveMsg[i].isDeletedForAll,
        senderProfilePicture: lastFiveMsg[i].senderProfileThumb,
      };
      if (unredmsg.imageUrl)
        unredmsg.imageUrl = process.env.FTP_BASE_URL + unredmsg.imageUrl;
      sendUnreadMsg.push(unredmsg);
    }
  }
  const sendChatHead = {
    chatHeadId: chatHead.chatHeadId,
    chatHeadSequenceNo: chatHead.chatHeadSequenceNo,
    chatName: chatHead.groupName || chatHead.userName,
    chatProfile: chatHead.groupImageThumb || chatHead.profileImageThumb, // (it is image url of user or group based on chatHeadType)
    chatHeadType: chatHead.chatHeadType,
    chatTypeId: chatHead.groupId || chatHead.otherUserId, // (it is otherUserId in case of user chatHeadType and groupId in case of group)
    messageList: sendUnreadMsg,
  };
  const payload = {
    ...sendChatHead,
    title: "New Message",
    body: "You have new message",
    noSave: true,
    silent: false,
    imageUrl: user.profileImageThumb,
  };
  console.log(
    payload,
    "========================================================="
  );
  notification.sendToUserId(chatHead.userId, user, "msgRecieved", payload);
};
export const messageSendNotification = async (user, chatHeads) => {
  chatHeads.forEach((chatHead) => {
    if (chatHead.chatHeadType != "broadcast" && chatHead.userId !== user.id) {
      try {
        messageSendNotificationToChatHead(user, chatHead);
      } catch (error) {
        console.log("Got error:\n ", error);
      }
    }
  });
};

////     ----------------    Calling Function

// >> 1. API for starting call,                          >>  initiateCall > {callRoomId,callMembers,isVideo}
// 1. API for adding someone in call.                    >>  addToCall >  {callRoomId,memberId,isVideo}
// 2. API for Confirm Ringing call.                      >>  updateMemberCallState > {callRoomId,callState="ringing"}
// 3. API for accepting call.                            >>  acceptCall > {callRoomId,callState="inCall"}
// 4. API for declining call.                            >>  declineCall > {callRoomId,callState="ended"}
// 5. Socket for Call members                            >>  getCallRoomMembers > {callRoomId}
// 6. Socket for emitting call updates                   >>  updateMemberCallState > {callRoomId,callState}
// 7. Socket for receiving call updates                  >>  memberCallStateChanged > {memberId,newState}
// 8. API for fetching user all call list history with pagination.
// 9. API for fetching call history of a particular user with pagination.

export const getCallRoomMembers = async (callRoomId, callState) => {
  var query = `
    SELECT 
        memberId,
        users.userName,
        users.fullname,
        CONCAT(:BaseURL,users.profileImageThumb) as profileImageThumb,
        callState,
        startTime,
        users.sequenceNo,
        callDuration
    from 
        msgCallRoomMembers
        join users on users.id = memberId
    where 
        callRoomId = :callRoomId
    `;
  if (callState) {
    query = query + `and callState = :callState`;
  }
  const result = await sequelize.query(query, {
    replacements: { callRoomId, callState, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const getCallInfoByMemberId = async (callRoomId, memberId) => {
  var query = `
    SELECT 
        crm.callRoomId as callRoomId,
        cr.isVideo,
        cr.isGroup,
        crm.memberId,
        crm.startTime,
        crm.callState,
        crm.callDuration,
        crm.startTime as callStartTime,
        
        cr.ownerId as callerUserId,
        users.userName as callerUserName,
        CONCAT(:BaseURL,users.profileImageThumb) as callerImageThumb
    from 
        msgCallRooms as cr
        join msgCallRoomMembers as crm on crm.callRoomId = cr.id
        join users on users.id = cr.ownerId
    where 
        crm.callRoomId = :callRoomId and
        crm.memberId=:memberId
    `;
  const result = await sequelize.query(query, {
    replacements: { callRoomId, memberId, BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT,
  });
  return result;
};
export const CreateCallRoom = async (callRoomId, ownerId, isVideo, isGroup) => {
  const id = callRoomId;
  var query = `
    insert into msgCallRooms 
           ( id, ownerId, isVideo, isGroup)
    values (:id,:ownerId,:isVideo,:isGroup)
    `;
  await sequelize.query(query, {
    replacements: { id, ownerId, isVideo, isGroup },
    type: QueryTypes.INSERT,
  });
  return id;
};
export const sendMissedCallifNotRecieved = async (
  callRoomId,
  memberId,
  caller
) => {
  try {
    let CallRoomInfo = await getCallInfoByMemberId(callRoomId, memberId);
    CallRoomInfo = CallRoomInfo[0];
    console.log("CallRoomInfo.callState ", CallRoomInfo);
    if (
      CallRoomInfo.callState === "ringing" ||
      CallRoomInfo.callState === "calling"
    ) {
      await updateMemberCallState(callRoomId, memberId, "missed");
      messengerSocket.updateMemberCallState(callRoomId, memberId, "missed");
      const payload = {
        CallRoomInfo,
        title: "Missed Call",
        body: "You missed a call",
        noSave: true,
        silent: false,
        imageUrl: caller.profileImageThumb,
      };
      notification.sendToUserId(memberId, caller, "missedCall", payload);
    }
  } catch (err) {
    console.log("error while Sending Miss-call to member: ", memberId);
    console.log("error: ", err);
  }
};
export const addMembersToCallRoom = async (
  callRoomId,
  memberId,
  isOwner,
  caller,
  isVideo,
  membersCount
) => {
  const id = uuid();
  let callState = "calling";
  if (isOwner) callState = "inCall";
  var query = `
    insert into msgCallRoomMembers 
           ( id, memberId, callRoomId, isOwner, callState)
    values (:id,:memberId,:callRoomId,:isOwner,:callState)
    `;
  await sequelize.query(query, {
    replacements: { id, memberId, callRoomId, isOwner, callState },
    type: QueryTypes.INSERT,
  });
  if (isVideo) {
    isVideo = 1;
  } else {
    isVideo = 0;
  }
  const CallInfo = {
    callRoomId,
    caller,
    isVideo,
    membersCount,
  };
  if (!isOwner) {
    const payload = {
      ...CallInfo,
      title: "Incomming Call",
      noSave: true,
      silent: false,
      imageUrl: caller.profileImageThumb,
    };
    notification.sendToUserId(memberId, caller, "incommingCall", payload);
    setTimeout(() => {
      sendMissedCallifNotRecieved(callRoomId, memberId, caller);
    }, 30000);
  }
  return id;
};

export const acceptCall = async (callRoomId, memberId) => {
  // let startTime = moment().utcOffset("+00:00").for
  var query = `
    update msgCallRoomMembers 
    set 
        callState = "inCall" ,
        startTime=NOW()
    where
        callRoomId = :callRoomId and
        memberId = :memberId
    `;
  await sequelize.query(query, {
    replacements: { memberId, callRoomId },
    type: QueryTypes.UPDATE,
  });
};
export const updateMemberCallState = async (
  callRoomId,
  memberId,
  callState
) => {
  const updateTimeEvents = ["disconnected", "ended"];
  let callDuration = 0;
  let endTime = moment().utcOffset("+00:00");

  if (updateTimeEvents.includes(callState)) {
    const callInfo = await getCallInfoByMemberId(callRoomId, memberId);
    console.log("callInfo ", callInfo[0].startTime);
    if (callInfo.length) {
      const startTime = moment(callInfo[0].startTime);
      callDuration = endTime.diff(startTime) / 1000 + callInfo[0].callDuration;
    }
  }

  endTime = endTime.format("YYYY-MM-DD HH:mm:ss");
  var query = `
    update msgCallRoomMembers 
    set 
        callState = :callState `;
  if (callDuration) {
    query = query + `, callDuration=:callDuration `;
    query = query + `, endTime=:endTime `;
  }
  query =
    query +
    `where
    callRoomId = :callRoomId and
    memberId = :memberId
    `;
  await sequelize.query(query, {
    replacements: { memberId, callRoomId, callState, callDuration, endTime },
    type: QueryTypes.UPDATE,
  });
};
export const initiateCall = async (owner, callRoomId, callMembers, isVideo) => {
  let isGroup = false;
  if (callMembers.length > 1) isGroup = true;
  const resultCreateCallRoom = await CreateCallRoom(
    callRoomId,
    owner.id,
    isVideo,
    isGroup
  );
  const caller = {
    userId: owner.id,
    userName: owner.userName,
    fullName: owner.fullName,
    profileImageThumb: owner.profileImageThumb,
  };
  await addMembersToCallRoom(
    callRoomId,
    owner.id,
    true,
    caller,
    isVideo,
    callMembers.length
  );
  for (let i = 0; i < callMembers.length; i++) {
    addMembersToCallRoom(
      callRoomId,
      callMembers[i],
      false,
      caller,
      isVideo,
      callMembers.length
    );
    console.log(callMembers.length);
  }
};

export const getAllCallHistory = async (
  memberId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let query = `
    SELECT
        msgCallRooms.isVideo,
        callRoom.callRoomId,
        callRoom.isOwner,
        callRoom.startTime,
        callRoom.callDuration,
        callRoom.endTime,
        callRoom.callState,
            (SELECT COUNT(*) FROM  
            msgCallRoomMembers members  
            WHERE callRoom.callRoomId = members.callRoomId 
            AND members.memberId !=  :memberId) AS membersCount,
            (SELECT 
            JSON_ARRAYAGG(JSON_OBJECT(
                "name",users.userName,
                "profileThumb",CONCAT(:BaseURL,users.profileImageThumb),
                "id",users.id,
                "isOwner",members.isOwner
            )) 
        FROM  msgCallRoomMembers as members
        JOIN users ON users.id=members.memberId
        WHERE callRoom.callRoomId = members.callRoomId  
            AND members.memberId !=  :memberId AND users.userName LIKE :searchKey ) AS members
    FROM msgCallRoomMembers as callRoom
    join msgCallRooms on msgCallRooms.id = callRoom.callRoomId
   
    WHERE 
        callRoom.memberId = :memberId
        
    ORDER BY
        callRoom.startTime DESC`;
  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          memberId,
          BaseURL: process.env.FTP_BASE_URL,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: { memberId, BaseURL: process.env.FTP_BASE_URL, searchKey },
    type: QueryTypes.SELECT,
  });

  let i = 0;
  console.log(result.rows.length);
  while (i < result.rows.length) {
    const item = result.rows[i];
    if (item.members === null) {
      result.rows.splice(i, 1);
    } else {
      i++;
    }
  }

  return result;
};
export const getUserCallHistory = async (
  memberId,
  otherMemberId,
  searchKey,
  pageIndex,
  pageSize
) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  let query = `
    SELECT
        msgCallRooms.isVideo,
        callRoom.callRoomId,
        callRoom.isOwner,
        callRoom.startTime,
        callRoom.callDuration,
        callRoom.endTime,
        callRoom.callState,
        msgChatHeads.id as chatHeadId,
            (SELECT COUNT(*) FROM  
            msgCallRoomMembers members  
            WHERE callRoom.callRoomId = members.callRoomId 
            AND members.memberId =  :otherMemberId) AS membersCount,
            (SELECT 
            JSON_ARRAYAGG(JSON_OBJECT(
                "name",users.userName,
                "profileThumb",CONCAT(:BaseURL,users.profileImageThumb),
                "id",users.id,
                "isOwner",members.isOwner
            )) 
        FROM  msgCallRoomMembers members
        JOIN users ON users.id=members.memberId
        WHERE callRoom.callRoomId = members.callRoomId
            AND members.memberId !=  :memberId) AS members
    FROM msgCallRoomMembers callRoom
    join msgCallRooms on msgCallRooms.id = callRoom.callRoomId
    left join msgChatHeads ON msgChatHeads.userId = :memberId AND msgChatHeads.otherUserId = :otherMemberId
    WHERE 
        (SELECT COUNT(*) FROM  
        msgCallRoomMembers members  
        WHERE callRoom.callRoomId = members.callRoomId 
        AND members.memberId =  :otherMemberId)>0 and
        callRoom.memberId = :memberId
    ORDER BY
        callRoom.startTime DESC
    `;
  let result = {};
  if (
    pageIndex !== undefined &&
    pageSize !== undefined &&
    pageIndex !== "" &&
    pageSize !== ""
  ) {
    if (pageIndex == 0) {
      const rowsCount = await sequelize.query(query, {
        replacements: {
          memberId,
          otherMemberId,
          BaseURL: process.env.FTP_BASE_URL,
          searchKey,
        },
        type: QueryTypes.SELECT,
      });
      result.count = rowsCount.length;
    }
    const offset = pageSize * pageIndex;
    query = query + `\n limit ${offset}, ${pageSize}`;
  }
  result.rows = await sequelize.query(query, {
    replacements: {
      memberId,
      otherMemberId,
      BaseURL: process.env.FTP_BASE_URL,
      searchKey,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const addNewUserInBroadcastList = async (data) => {
  let { broadcastId, memberId } = data;
  let id = uuid();
  var insertQry = `
    INSERT INTO msgBroadcastMembers
     (
        id,
        broadcastId,
        memberId
     ) 
    VALUES
    (
     :id,
     :broadcastId,
     :memberId
    )`;

  const result = await sequelize.query(insertQry, {
    replacements: { broadcastId, memberId, id },
    type: QueryTypes.INSERT,
  });
  return result;
};

export const removeUserInBroadcastList = async (data) => {
  let { broadcastId, memberId } = data;
  var deleteQry = `
    DELETE FROM msgBroadcastMembers 
    WHERE 
    msgBroadcastMembers.broadcastId=:broadcastId AND
    msgBroadcastMembers.memberId=:memberId ;`;
  const result = await sequelize.query(deleteQry, {
    replacements: { broadcastId, memberId },
    type: QueryTypes.DELETE,
  });
  return result;
};

export const archiveChat = async (chatHeadId) => {
  let d = Date.now();
  var qry = `
  UPDATE msgChatHeads SET isArchived = 1, archivedAt = :d WHERE msgChatHeads.id = :chatHeadId
  ;`;
  const result = await sequelize.query(qry, {
    replacements: { d, chatHeadId },
    type: QueryTypes.UPDATE,
  });
  return result;
};

export const unarchiveChat = async (chatHeadId) => {
  let d = Date.now();
  var qry = `
  UPDATE msgChatHeads SET isArchived = 0 WHERE msgChatHeads.id = :chatHeadId
  ;`;
  const result = await sequelize.query(qry, {
    replacements: { d, chatHeadId },
    type: QueryTypes.UPDATE,
  });
  return result;
};

export const getArchiveChats = async () => {
  let d = Date.now();
  var qry = `
  SELECT * from msgChatHeads WHERE isActive = 1 AND isArchived = 1 ORDER BY createdAt DESC
  ;`;
  const result = await sequelize.query(qry, {
    replacements: {},
    type: QueryTypes.SELECT,
  });
  return result;
};

export const notificationSettings = async (
  allowPushNotifs,
  pauseAllNotifs,
  followingsFollowers,
  messages,
  userId
) => {
  let id = uuid();
  var qry = `
  INSERT INTO msgNotificationSettings(id, userId, allowPushNotifications, pauseAllNotifications, followingsFollowers, messages) 
  VALUES(:id, :userId, :allowPushNotifs, :pauseAllNotifs, :followingsFollowers, :messages )
  ;`;
  const result = await sequelize.query(qry, {
    replacements: {
      id,
      allowPushNotifs,
      pauseAllNotifs,
      followingsFollowers,
      messages,
      userId,
    },
    type: QueryTypes.INSERT,
  });
  return result;
};

export const deleteAccount = async (userId) => {
  //let id = uuid();
  var qry = `
  UPDATE users SET isActive = 0, isDeleted = 1 WHERE users.id = :userId
  ;`;
  const result = await sequelize.query(qry, {
    replacements: {
      userId,
    },
    type: QueryTypes.UPDATE,
  });
  return result;
};

export const messengerSettings = async (
  userId,
  otherUserId,
  generalMessages,
  directMessages,
  mentionGroups,
  lastSeen,
  activeStatus
) => {
  let id = uuid();
  var qry = `
  INSERT INTO msgMsngrSettings
  (id, userId, generalMessages, directMessages, mentionGroups, lastSeen, activeStatus) 
  VALUES(:id, :userId, :generalMessages, :directMessages, :mentionGroups, :lastSeen, :activeStatus)
  ;`;

  const result = await sequelize.query(qry, {
    replacements: {
      id,
      userId,
      generalMessages,
      directMessages,
      mentionGroups,
      lastSeen,
      activeStatus,
    },
    type: QueryTypes.INSERT,
  });

  if (generalMessages === "custom") {
    let type = "generalMessages";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }

  if (directMessages === "custom") {
    let type = "generalMessages";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }

  if (mentionGroups === "custom") {
    let type = "mentionGroups";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }
  if (mentionGroups === "lastSeen") {
    let type = "mentionGroups";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }

  return result;
};

export const privacySettings = async (
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
) => {
  let id = uuid();
  var qry = `
  INSERT INTO msgPrivacySettings
  (
    id, 
    userId, 
    whoCanFollow,
    listProfileOnSearch,
    listProfileOnWebSearch,
    hideGender,
    seeBirthDate,
    seeBirthYear,
    accPrivate,
    alertsOnUnknownLogin,
    followersFollowings
    ) 
  VALUES(
    :id, 
    :userId, 
    :whoCanFollow,
    :listProfileOnSearch,
    :listProfileOnWebSearch,
    :hideGender,
    :seeBirthDate,
    :seeBirthYear,
    :accPrivate,
    :alertsOnUnknownLogin,
    :followersFollowings
    )
  ;`;

  const result = await sequelize.query(qry, {
    replacements: {
      id,
      userId,
      whoCanFollow,
      listProfileOnSearch,
      listProfileOnWebSearch,
      hideGender,
      seeBirthDate,
      seeBirthYear,
      accPrivate,
      alertsOnUnknownLogin,
      followersFollowings,
    },
    type: QueryTypes.INSERT,
  });

  if (seeBirthDate === "custom") {
    let type = "seeBirthDate";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }

  if (seeBirthYear === "custom") {
    let type = "seeBirthYear";
    const id = uuid();
    var qry = `
    INSERT INTO userPrivates
    (id, userId, otherUserId, type) 
    VALUES(:id, :userId, :otherUserId, :type)
    ;`;
    const result = await sequelize.query(qry, {
      replacements: {
        id,
        userId,
        otherUserId,
        type,
      },
      type: QueryTypes.INSERT,
    });
  }

  return result;
};


export const getContactList = async (numbers, searchKey, userId, pageIndex, pageSize, sortBy, sync) => {
  if (!searchKey) searchKey = "";
  searchKey = "%" + searchKey + "%";
  if(sync === 1){
    const followers = await userFuncs.getUserFollowers(userId, userId, searchKey, pageIndex, pageSize, sortBy);
  //const followings = await userFuncs.getUserFollowings(userId, userId, searchKey, pageIndex, pageSize, sortBy);  
  const result = await sequelize.query(
    `
              SELECT id, profileImage, userName, fullName, mobile 
              FROM users
              WHERE 
              mobile IN (:numbers) AND 
              isActive = 1 AND isDeleted = 0 AND 
              (
              fullName like :searchKey 
                or
              mobile like :searchKey 
                or
              userName like :searchKey
              )
              
              `,
    {
      replacements: { numbers, searchKey },
      type: QueryTypes.SELECT,
    }
  );

  const registered = result.map(x=> x.mobile);
  const unRegistered = numbers.filter(x=>registered.indexOf(x)===-1);
  console.log(unRegistered);
  let object = {
    allFriends:{      
      sociomee: followers.rows,
      phoneContacts:result
    }, 
    invite: unRegistered
  }
  return object;
}
if(sync === 0){
  const result = await sequelize.query(
    `
              SELECT id, profileImage, userName, fullName, mobile 
              FROM users
              WHERE 
              mobile IN (:numbers) AND 
              isActive = 1 AND isDeleted = 0 AND 
              (
              fullName like :searchKey 
                or
              mobile like :searchKey 
                or
              userName like :searchKey
              )
              
              `,
    {
      replacements: { numbers, searchKey },
      type: QueryTypes.SELECT,
    }
  );

  const registered = result.map(x=> x.mobile);
  const unRegistered = numbers.filter(x=>registered.indexOf(x)===-1);
  console.log(unRegistered);
  let object = {
    allFriends:{      
      sociomee: null,
      phoneContacts:result
    }, 
    invite: unRegistered
  }
  return object;
}
  
};

