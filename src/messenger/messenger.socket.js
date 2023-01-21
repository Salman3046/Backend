import * as messengerFuncs from "./messenger.funcs";
import jwt from "jsonwebtoken";
import * as userFuncs from "../funcs/users.funcs";
import * as goLiveFuncs from "../funcs/goLive.funcs";
import * as pcLiveFuncs from '../funcs/PodCast/pcLives.funcs';
require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
import axios from 'axios'

server.listen(process.env.SOCKET_PORT, () =>
  console.log("Socket is listening on port: " + process.env.SOCKET_PORT)
);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  },
  pingInterval: 10000,
  pingTimeout: 60000,
});

let countId = 1;
const errorResponse = (next, errorCode, error) => {
  const err = new Error(errorCode);
  err.data = error; // additional details
  next(err);
};
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;
    console.log("@\n@\n@\n@\n@\n@\n@\nauthtoken @\n@\n", socket.handshake);
    if (token === "maulik") {
      next();
      return;
    }
    if (!token) {
      return errorResponse(next, "noAuthToken", {
        yourReqPack: socket.handshake,
      });
    }
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, async (err, Authdata) => {
      if (err) {
        return errorResponse(next, "TokenVefificationFailed", err);
      } else {
        // const user = await userFuncs.getUserById(Authdata.user.id)
        // if(!user){
        //     return errorResponse(next, "userNotExist", "authFailed")
        // }
        // if(user.isDeleted){
        //     return errorResponse(next, "userDeleted", "authFailed")
        // }
        // if(user.blockedByAdmin){
        //     return errorResponse(next, "userBlockedByAdmin", "authFailed")
        // }
        await userFuncs.refreshSessions(Authdata.user.id);
        // const session = await userFuncs.getSessionById(Authdata.session.id)
        // if(session.expired){
        //     return errorResponse(next, "sessionExpired", "authFailed")
        // }
        // if(session.blockedByAdmin){
        //     return errorResponse(next, "sessionBlockedByAdmin", "authFailed")
        // }
        // userFuncs.renewSessions(Authdata.session.id)
        socket.user = Authdata.user;
        socket.session = Authdata.session;
        next();
      }
    });
  } catch (e) {
    next(new Error("unknown user"));
  }
});
io.engine.generateId = (req) => {
  countId = countId + 1;
  return "testingId" + countId;
};

io.on("connection", async (socket) => {
  console.log("Connected To : ", socket.user.userName);
  socket.join(socket.user.id);

  socket.on("connect", async (payload) => {
    console.log("Socket Connected To : ", payload);
  });
  socket.on("connect_error", async (payload) => {
    console.log("connect_error : ", payload);
  });
  socket.on("disconnecting", async (payload) => {
    console.log("disconnecting : ", socket.id);
  });
  socket.on("disconnect", async (payload) => {
    console.log("disconnect : ", socket.id);
    socket.leave(socket.user.id);
  });

  socket.on("online", (payload) => {
    console.log("online : ");
    userOnline(socket);
  });
  socket.on("offline", (payload) => {
    console.log("offline : ", payload);
    userOffline(socket);
  });
  socket.on("userTyping", async (payload) => {
    console.log("userTyping : ", socket.user.id);
    let chatHeadIds = [];
    if (payload.otherUserId) {
      chatHeadIds = await messengerFuncs.getUserChatHead(
        payload.otherUserId,
        socket.user.id
      );
    }
    if (payload.groupId) {
      chatHeadIds = await messengerFuncs.getGroupChatHeads(payload.groupId);
    }
    userTyping(chatHeadIds, socket.user);
  });
  socket.on("messageRead", async (payload) => {
    console.log("messageRead : ", socket.user.id);

    const { chatHeadId, messageId, messageSequence } = payload;
    if (chatHeadId && messageId && messageSequence) {
      const data = await messengerFuncs.setChatHeadMessageRead(
        chatHeadId,
        messageSequence
      );
      const chatHeads = await messengerFuncs.getChatHeadByMessageIds([
        messageId,
      ]);
      messageRead(chatHeads, messageId, messageSequence, {
        userId: socket.user.id,
        userName: socket.user.userName,
      });
    }
  });

  //*****************              Calling Sockets    ************************/

  socket.on("updateMemberCallState", async (payload) => {
    console.log("updateMemberCallState : ", payload);
    let { callRoomId, callState } = payload;
    const userId = socket.user.id;
    if (!callRoomId) {
      return;
    }
    if (!callState) {
      return;
    }
    await messengerFuncs.updateMemberCallState(callRoomId, userId, callState);

    updateMemberCallState(callRoomId, userId, callState);
  });
  socket.on("getCallRoomMembers", async function (payload, callback) {
    console.log("getCallRoomMembers : ", payload);
    const { callRoomId } = payload;
    const result = await messengerFuncs.getCallRoomMembers(callRoomId, "");
    callback(result);
  });

  //*****************              Go-Live Sockets    ************************/

  //*****************              Testing Sockets    ************************/
  socket.on("roomsList", function () {
    socket.emit("roomsList", { roomlist: socket.rooms });
  });
  socket.on("serverTime", (payload) => {
    console.log("Sending serverTime ");
    socket.emit("serverTime", payload + "" + new Date());
  });
  socket.on("whoAmI", function (payload, callback) {
    console.log("sending Who are you:", payload);
    callback(socket.user);
  });
});

export const userOnline = async (socket) => {
  await messengerFuncs.updateSocketId(socket.session.id, socket.id);
  const userSessions = await messengerFuncs.getUserOnlineSessions(
    socket.user.id
  );
  //if(userSessions.length===1){
  delete socket.user.loginMode;
  emitEventToAllFriends(socket.user.id, "userOnline", socket.user);
  //}
  return true;
};

export const userOffline = async (socket) => {
  await messengerFuncs.clearSocketId(socket.session.id);
  const userSessions = await messengerFuncs.getUserOnlineSessions(
    socket.user.id
  );
  // if(userSessions.length===0){
  delete socket.user.loginMode;
  emitEventToAllFriends(socket.user.id, "userOffline", socket.user);
  // }
  return true;
};

export const messageRead = async (
  chatHeads,
  messageId,
  messageSequence,
  readBy
) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("messageRead", {
      chatHead,
      messageId,
      messageSequence,
      readBy,
    });
  });
  return true;
};

export const messageUnRead = async (
  chatHeads,
  messageId,
  messageSequence,
  readBy
) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("messageUnReadMarked", {
      chatHead,
      messageId,
      messageSequence,
      readBy,
    });
  });
  return true;
};

export const messagesDeleted = async (chatHeads, messageIds, deletedBy) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("messageDeleted", {
      chatHead,
      messageIds,
      deletedBy,
    });
  });
  return true;
};

export const userTyping = async (chatHeads, user) => {
  chatHeads.forEach((chatHead) => {
    if (chatHead.userId !== user.id) {
      io.in(chatHead.userId).emit("userTyping", {
        chatHead,
        typingUser: user,
      });
    }
  });
  return true;
};

export const messageSent = async (chatHeads, messages) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("message", {
      chatHead,
      messages,
    });
  });
  return true;
};

const emitEventToAllFriends = async (userId, event, data) => {
  const friends = await userFuncs.getUserFriends(userId);
  friends.rows.forEach((friend) => {
    io.in(friend.id).emit(event, data);
  });
};

export const userBlocked = async (blockedUserId, blockedByUserId) => {
  io.in(blockedUserId).emit("userBlocked", blockedByUserId);
  return true;
};

export const userUnblocked = async (unblockedUserId, unblockedByUserId) => {
  io.in(unblockedUserId).emit("userUnblocked", unblockedByUserId);
  return true;
};

export const userUpdated = async (unblockedUserId, unblockedByUserId) => {
  // user dp updated or user deleted or blocked by admin
  return true;
};

export const groupUpdated = async (chatHeads, groupUpdatedData) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("groupUpdated", {
      chatHead,
      groupUpdatedData,
    });
  });
  return true;
};

export const groupDeleted = async (chatHeads, groupId) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("groupDeleted", {
      chatHead,
      groupId,
    });
  });
  return true;
};
export const groupBlockedByAdmin = async (chatHeads, groupId) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("groupBlockedByAdmin", {
      chatHead,
      groupId,
    });
  });
  return true;
};
export const userRemovedFromGroup = async (chatHeads, groupId, userId) => {
  chatHeads.forEach((chatHead) => {
    io.in(chatHead.userId).emit("userRemovedFromGroup", {
      chatHead,
      groupId,
      userId,
    });
  });
  return true;
};

//*****************              Calling Sockets    ************************/

export const sendToCallMembers = async (
  callRoomId,
  payload,
  ignoreUserId,
  callState
) => {
  const roomMembers = await messengerFuncs.getCallRoomMembers(
    callRoomId,
    callState
  );
  roomMembers.forEach((roomMember) => {
    if (roomMember.memberId !== ignoreUserId) {
      io.in(roomMember.memberId).emit(payload.event, payload.data);
    }
  });
  return true;
};
export const updateMemberCallState = async (
  callRoomId,
  memberId,
  callState
) => {
  const payload = {
    event: "memberCallStateChanged",
    data: {
      callRoomId,
      memberId,
      newState: callState,
    },
  };
  sendToCallMembers(callRoomId, payload);
  return true;
};

//*****************              Go-Live Sockets    ************************/

const eventToGolIveViewers = async (goLiveId, ownerId, event, data) => {
  try {
    const goLiveViewers = await goLiveFuncs.getViewers(goLiveId);
    console.log("VIEWERS-GOLIVE---" + goLiveViewers.rows)
    io.in(ownerId).emit(event, data);
    console.log(event, ownerId);
    goLiveViewers.rows.forEach((viewer) => {
      console.log("INSIDE FOR EACH--" + viewer)
      io.in(viewer.id).emit(event, data);
      console.log(event, viewer.id);
    });
  } catch (err) {
    console.log("ERROR--GOLIVE" + err)
  }
};

const eventToGoLiveSingleUser = async (goLiveId, ownerId, event, data, userIdToRemove) => {
  try {
    io.in(ownerId).emit(event, data);
    io.in(userIdToRemove).emit(event, data);
  } catch (err) {
    console.log("ERROR--GOLIVE" + err)
  }
};

export const userJoinedGoLive = async (goLiveId, user) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      profileThumb: "",
    },
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "userJoinedGoLive", data);
};
export const userLeftGoLive = async (goLiveId, user) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileThumb: user.profileImageThumb
    },
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "userLeftGoLive", data);
};
export const removeUserFromGoLive = async (goLiveId, user) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  // const data = {
  //   user: {
  //     userId: user.id,
  //   },
  //   goLive: goLiveInfo,
  // };
  const data = {
    goLive: goLiveInfo,
  };
  // eventToGolIveViewers(goLiveId, goLiveInfo.userId, "removeUserFromGoLive", data);
  eventToGoLiveSingleUser(goLiveId, goLiveInfo.userId, "removeUserFromGoLive", data, user.id);
};
export const commentOnGoLive = async (goLiveId, user, comment) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  console.log(goLiveInfo)
  const { commentId } = user
  const { followerStatus, followingStatus, isBlocked } = goLiveInfo
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileThumb: user.profileThumb,
      profileImage: user.profileImage,
      isPrivate: user.isPrivate,
      followerStatus, followingStatus, isBlocked
    },
    comment,
    commentId,
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "commentGoLive", data);
};
export const likeOnGoLive = async (goLiveId, user) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      profileThumb: "",
    },
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "likeGoLive", data);
};
export const endedGoLive = async (goLiveId, userId) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, userId);
  const data = {
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "endedGoLive", data);
};
export const updateGoLive = async (goLiveId, userId) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, userId);
  const data = {
    goLive: goLiveInfo,
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "goLiveUpdated", data);
};
export const pinCommentGoLive = async (goLiveId, user, commentId) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, user.id);
  const data = {
    goLive: goLiveInfo,
    user,
    commentId
  };
  eventToGolIveViewers(goLiveId, goLiveInfo.userId, "commentPinned", data);
};
export const reminderTimeLimitGoLive = async (goLiveId,userId,timeLeft) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, userId)
  const data = {
    goLive : goLiveInfo,
    userId,
    timeLeft
  }
  try {
    io.in(userId).emit("reminderTimeLimitGoLive", data);
  } catch (err) {
    console.log("ERROR--GOLIVE" + err)
  }
};
export const timeLimitCompleteGoLive = async (goLiveId,userId,goLiveRecordInfo) => {
  const goLiveInfo = await goLiveFuncs.getGoLiveById(goLiveId, userId)
  const data = {
    goLive : goLiveInfo,
    userId
  }
  try {
    io.in(userId).emit("timeLimitCompleteGoLive", data);
    const goLiveViewers = await goLiveFuncs.getViewers(goLiveId);
    goLiveViewers.rows.forEach((viewer) => {
      io.in(viewer.id).emit("endedGoLive", data);
    });
  } catch (err) {
    console.log("ERROR--GOLIVE" + err)
  }
};
// Socket Events for MessageMee

// 1. event for when someone goes online/offline.
// 2. event for chathead update.
// 4. event fot when someone blocks you.
// 5. event for when someone removed you from group.
// 3. event for messages for a particular chathead.
// when some one removes you from friendlist ie unfollow you
// 6. event for messages read.

// 7. event for a callRoom status update.
// 8. event for leaving a call.
// 9. event for joining a call.
// 10. event for call disconnected.
// 12. event for call reconnected.

// const conn_req_IOS ={
//     headers:{
//         connection: 'upgrade',
//         'x-forwarded-for': '103.240.79.28',
//         host: 'socket.msgmee.com',
//         accept: '*/*',
//         'accept-language': 'en-us',
//         'accept-encoding': 'gzip, deflate, br',
//         'user-agent': 'MessageMee/1 CFNetwork/1220.1 Darwin/20.1.0'
//     },
//     time:'Mon May 10 2021 13:43:26 GMT+0000 (Coordinated Universal Time)',
//     address: '::ffff:127.0.0.1',
//     xdomain: false,
//     secure: false,
//     issued: 1620654206341,
//     url: '/socket.io/?transport=polling&b64=1&auth.=%5B%22token%22%3A%20%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmZlZmU5NjAtODNhZi00MTUzLWFmZDQtM2Y4OGYyZjY5OThjIiwiZW1haWwiOiJtNkBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IjI1MjUzIiwibG9naW5Nb2RlIjoicGFzc3dvcmQifSwic2Vzc2lvbiI6eyJpZCI6IjA2NDY5MDFmLTZkNjgtNGQ3OC1iNDA1LTM0ZjM5YWQ1ZTUwZiIsImRldmljZUlkIjoiZmRzZmQgZGZkc2ZkZiJ9LCJpYXQiOjE2MjAwNjc2NzR9.62b8cRVhR6m9SRBlscstIcbrNH8EroHprGUvf3Rb4_4%22%5D&EIO=4',
//     query: {
//         transport: 'polling',
//         b64: '1',
//         'auth.': '["token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmZlZmU5NjAtODNhZi00MTUzLWFmZDQtM2Y4OGYyZjY5OThjIiwiZW1haWwiOiJtNkBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IjI1MjUzIiwibG9naW5Nb2RlIjoicGFzc3dvcmQifSwic2Vzc2lvbiI6eyJpZCI6IjA2NDY5MDFmLTZkNjgtNGQ3OC1iNDA1LTM0ZjM5YWQ1ZTUwZiIsImRldmljZUlkIjoiZmRzZmQgZGZkc2ZkZiJ9LCJpYXQiOjE2MjAwNjc2NzR9.62b8cRVhR6m9SRBlscstIcbrNH8EroHprGUvf3Rb4_4"]',
//         EIO: '4'
//     },
//     auth: {}
// }
// const conn_req_Android ={
//     headers:{
//         connection: 'upgrade',
//         'x-forwarded-for': '103.237.117.204',
//         host: 'socket.msgmee.com',
//         accept: '*/*',
//         'accept-encoding': 'gzip',
//         'user-agent': 'okhttp/4.9.0'
//     },
//     time: 'Mon May 10 2021 14:05:18 GMT+0000 (Coordinated Universal Time)',
//     address: '::ffff:127.0.0.1',
//     xdomain: false,
//     secure: false,
//     issued: 1620655518633,
//     url: '/socket.io/?EIO=4&transport=polling',
//     query: { EIO: '4', transport: 'polling' },
//     auth:{
//         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzE3M2RmNjgtNmIyOS00M2I2LWExZTYtMGZjYTg1YTAyYjQzIiwiZW1haWwiOiIiLCJ1c2VyTmFtZSI6ImhhcnNoYmFybndhbCIsImxvZ2luTW9kZSI6InBhc3N3b3JkIn0sInNlc3Npb24iOnsiaWQiOiI5NjFhZDViMy05MTJjLTQxYzEtYTE1Mi1iYzg1ODU1ZTk2MmQiLCJkZXZpY2VJZCI6IiJ9LCJpYXQiOjE2MjA2NTU1MTh9.cPifiB1HMUEcEREHTiswO0ooOBnJrpEmFr2jJLpI7rI'
//     }
// }

// SocketManager(
//     socketURL: URL(string: SocketUrl)!,
//     config: [
//         .connectParams([
//             "auth":[
//                 "token": authToken
//             ]
//         ])
//     ]
// )

// io.on("connection", (socket) => {

//     // basic emit
//     socket.emit(/* ... */);

//     // to all clients in the current namespace except the sender
//     socket.broadcast.emit(/* ... */);

//     // to all clients in room1 except the sender
//     socket.to("room1").emit(/* ... */);

//     // to all clients in room1 and/or room2 except the sender
//     socket.to("room1").to("room2").emit(/* ... */);

//     // to all clients in room1
//     io.in("room1").emit(/* ... */);

//     // to all clients in namespace "myNamespace"
//     io.of("myNamespace").emit(/* ... */);

//     // to all clients in room1 in namespace "myNamespace"
//     io.of("myNamespace").to("room1").emit(/* ... */);

//     // to individual socketid (private message)
//     io.to(socketId).emit(/* ... */);

//     // to all clients on this node (when using multiple nodes)
//     io.local.emit(/* ... */);

//     // to all connected clients
//     io.emit(/* ... */);

//     // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
//     // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

//     // with acknowledgement
//     socket.emit("question", (answer) => {
//       // ...
//     });

//     // without compression
//     socket.compress(false).emit(/* ... */);

//     // a message that might be dropped if the low-level transport is not writable
//     socket.volatile.emit(/* ... */);

//   });

// server.listen(process.env.SOCKET_PORT , () => console.log('Socket is running on port :',process.env.SOCKET_PORT));

/*****************************PODCAST-LIVE*****************************************/

const eventToPclIveViewers = async (goLiveId, ownerId, event, data) => {
  console.log("----------INSIDE SOCKET---------")
  const podcastViewers = await pcLiveFuncs.getpcLiveListeners(goLiveId);
  console.log(podcastViewers)
  io.in(ownerId).emit(event, data);
  console.log(event, ownerId);
  podcastViewers.rows.forEach((viewer) => {
    console.log("-----SOCKET EMIT---")
    io.in(viewer.id).emit(event, data);
    console.log(event, viewer.id);
  });
};

export const userJoinedPcLive = async (pcLiveId, user) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId);
  console.log(podcastInfo)
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      profileThumb: user.profileImageThumb
    },
    pcLive: podcastInfo,
  };
  console.log(data)
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "userJoinedPcLive", data);
};

export const userLeavePcLive = async (pcLiveId, user) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId);
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      profileThumb: user.profileImageThumb
    },
    pcLive: podcastInfo,
  };
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "userLeavePcLive", data);
};

export const commentOnPcLive = async (pcLiveId, user, comment) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId);
  const userInfo = await goLiveFuncs.getUserDetails(podcastInfo.userId, user.id)
  const { commentId } = user
  const { followerStatus, followingStatus, isBlocked } = userInfo
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileThumb: user.profileThumb,
      profileImage: user.profileImage,
      isPrivate: user.isPrivate,
      followerStatus, followingStatus, isBlocked
    },
    comment,
    commentId,
    pcLive: podcastInfo,
  };
  console.log(data)
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "commentPcLive", data);
};

export const likeOnPcLive = async (pcLiveId, user) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId);
  const data = {
    user: {
      userId: user.id,
      userName: user.userName,
      profileThumb: user.profileImageThumb,
    },
    pcLive: podcastInfo,
  };
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "likePcLive", data);
};

export const endPcLive = async (pcLiveId) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId);
  const data = {
    pcLive: podcastInfo,
  };
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "endPcLive", data);
};

export const updatePcLive = async (podcastLiveId) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(podcastLiveId);
  const data = {
    pcLive: podcastInfo,
  };
  eventToPclIveViewers(podcastLiveId, podcastInfo.userId, "pcLiveUpdated", data);
};

export const pinCommentPcLive = async (podcastLiveId, user, commentId) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(podcastLiveId, user.id);
  const data = {
    pcLive: podcastInfo,
    user,
    commentId
  };
  eventToPclIveViewers(podcastLiveId, podcastInfo.userId, "pcLivecommentPinned", data);
};

export const removeUserFromPCLive = async (pcLiveId, user) => {
  const podcastInfo = await pcLiveFuncs.getPodCastById(pcLiveId, user.id);
  const data = {
    pcLive: podcastInfo,
  };
  eventToPclIveViewers(pcLiveId, podcastInfo.userId, "removeUserFromPcLive", data);
};