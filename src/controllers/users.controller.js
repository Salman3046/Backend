require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as userFuncs from "../funcs/users.funcs";
import * as notificationFuncs from "../funcs/notification.funcs";
import * as loginSignup from "../funcs/loginSignup.funcs";
import * as postFuncs from "../funcs/post.funcs";
import * as notiFuncs from "../helpers/notification";
import * as adminContNotificationFuncs from '../funcs/adminContNotificationFuncs/adminContNotification.funcs'
const moment = require("moment");

export const sendUserProfileNotificationToSelf = async (type, userData) => {
  const inAppData = {
    notificationType: type,
    postId: userData.id
  }
  await adminContNotificationFuncs.sendNotificationsByType(type, {
    ...userData,
    userId: userData.id
  }, inAppData)
};

export const expireAllOtherSessions = async (req, res) => {
  try {
    const { userId } = req.body;
    await userFuncs.logoutAllOtherSessions(userId, req.session.id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};
export const updateSession = async (req, res) => {
  try {
    req.body.id = req.session.id;
    await userFuncs.updateSession(req.body);
    return successResponse(req, res, "Updated User Session");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.user.id);
    req.body.id = req.body.id || req.user.id || req.body.userId;
    const { dob, gender, isPrivate, coverImage, profileImage, profileImageThumb } = req.body;
    console.log(req.body);
    if (dob !== undefined) {
      if (dob === "") {
        return failResponse(req, res, "Please Enter Date of Birth");
      } else {
        if (dob.length !== 10) {
          return failResponse(req, res, "Please Enter Complete Date");
        }
        const Check = moment(dob, "YYYY-MM-DD");
        const isValid = Check.isValid();
        console.log(isValid);
        if (!isValid) {
          return failResponse(req, res, "Invalid Date");
        }
      }
    }
    if (gender !== undefined) {
      if (gender === "") {
        return failResponse(req, res, "Please Enter Gender");
      } else {
        const genderArr = ["male", "female", "other"];
        let a = 0;
        for (let i = 0; i < 3; i++) {
          if (genderArr[i] === gender) {
            a = a + 1;
          } else {
            continue;
          }
        }
        if (a === 0) {
          return failResponse(
            req,
            res,
            "Gender Should Only have male , female or other"
          );
        }
      }
    }

    await userFuncs.updateUser(req.body);
    if (isPrivate || !isPrivate) {
      await sendUserProfileNotificationToSelf("userProfile-updateProfilePrivacy", req.user)
    }
    if (coverImage) {
      await sendUserProfileNotificationToSelf("userProfile-updateCoverPhoto", req.user)
    }
    if ((profileImage) || (profileImageThumb)) {
      await sendUserProfileNotificationToSelf("userProfile-updateProfilePhoto", req.user)
    }
    return successResponse(req, res, "Updated User");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getOne = async (req, res) => {
  try {
    return successResponse(req, res, req.user);
  } catch (error) {
    return errorResponse(req, res, error, "failedGetOneUser");
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.user.id
    const data = await userFuncs.getUserFriends(
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

export const logOut = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const sessionId = req.body.sessionId || req.session.id;
    if (!userId) {
      return failResponse(req, res, "userIdNotAvailable");
    }
    if (!sessionId) {
      return failResponse(req, res, "sessionIdNotAvailable");
    }
    const data = await userFuncs.logOutSessions([sessionId]);
    console.log(data);
    if (data) {
      return successResponse(req, res, "userLoggedOut");
    } else {
      return failResponse(req, res, "incorrectSessionId");
    }
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
      userData[0].education = await userFuncs.getUserEducation(otherUserId);
      userData[0].hobbies = await userFuncs.getHobbies(otherUserId);
      userData[0].interest = await userFuncs.getInterests(otherUserId);
      userData[0].contact = await userFuncs.getContacts(otherUserId, selfUserId);
      // userData[0].music = await userFuncs.getMusic(otherUserId)
      // userData[0].movie = await userFuncs.getMovies(otherUserId)
      userData[0].sport = await userFuncs.getSports(otherUserId);
      userData[0].music = await postFuncs.getBusinessPagesByCategory(
        otherUserId,
        "Music"
      );
      userData[0].movie = await postFuncs.getBusinessPagesByCategory(
        otherUserId,
        "Movies"
      );
      userData[0].book = await postFuncs.getBusinessPagesByCategory(
        otherUserId,
        "Book"
      );
      const groupsData = await userFuncs.getGroupOfUser(otherUserId, {});
      userData[0].groups = groupsData.rows;
      const bpData = await userFuncs.getUserBusinessPages(otherUserId, {});
      userData[0].businessPages = bpData.rows;
      return successResponse(req, res, userData[0]);
    } else {
      return failResponse(req, res, "incorrectUserId");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

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
      if (!isPrivate) {
        const getUserData = await userFuncs.getUserById(followingToId);
        const { totalFollowers } = getUserData;
        // await notiFuncs.addToNotification(
        //   followingToId,
        //   followedById,
        //   "userProfile-Follow",
        //   "user",
        //   `${req.user.fullName} Started Following You with ${totalFollowers - 1
        //   } others`,
        //   {}
        // );

        let and_n_others;
        let mainData = req.user;
        mainData.userId = followingToId;
        if (totalFollowers === 2) {
          and_n_others = "and 1 other "
        }
        if (totalFollowers === 1) {
          and_n_others = ''
        }
        if (totalFollowers > 2) {
          and_n_others = `and ${totalFollowers - 1} others`
        }
        mainData.and_n_others = and_n_others
        const inAppData = {
          postId: followingToId,
          postType: ' ',
          notificationType: "userProfile-followUser"
        }
        await adminContNotificationFuncs.sendNotificationsByType("userProfile-followUser", mainData, inAppData)
      } else {
        let mainDatas = req.user;
        let and_n_others;
        const getUserData = await userFuncs.getUserById(followingToId);
        const { totalRequests } = getUserData;
        if (totalRequests === 2) {
          and_n_others = "and 1 other"
        }
        if (totalRequests === 1) {
          and_n_others = ''
        }
        if (totalRequests > 2) {
          and_n_others = `and ${totalFollowers - 1} others`
        }
        mainDatas.and_n_others = and_n_others;
        mainDatas.userId = followingToId;
        const inAppDatas = {
          postId: followingToId,
          notificationType: "userProfile-receiveFollowRequest"
        }
        await adminContNotificationFuncs.sendNotificationsByType("userProfile-receiveFollowRequest", mainDatas, inAppDatas)
      }
      return successResponse(req, res, "Success");
    } else {
      const dataClearConnection = await userFuncs.clearUserConnection(
        followedById,
        followingToId
      );
      const ifFollower = await userFuncs.checkIfFollower(
        followedById,
        followingToId
      );
      if (ifFollower) {
        const dataClearConnection = await userFuncs.clearUserConnection(
          followingToId,
          followedById
        );
      }
      const dataClearFollowing = await userFuncs.clearFollowingRequest(
        followedById,
        followingToId
      );
      return successResponse(req, res, "success");
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserConnections = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    // var userId = req.user.id || req.body.userId;
    const userId = req.body.userId || req.user.id;
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

export const removeUserFromConnection = async (req, res) => {
  try {
    const userId = req.user.id;
    const followingUserId = req.body.followingUserId;
    if (!followingUserId) {
      return failResponse(req, res, "followingUserIdNotAvailable");
    }
    const connectionId = req.body.connectionId;
    if (!connectionId) {
      return failResponse(req, res, "connectionIdNotAvailable");
    }
    const dataAdd = await userFuncs.removeUserFromConnection(
      userId,
      followingUserId,
      connectionId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const data = await notificationFuncs.getNotifications(
      req.user.id,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const removeNotifications = async (req, res) => {
  try {
    const { notificationIds } = req.body;
    const data = await notificationFuncs.removeNotifications(notificationIds);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFollowingRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.getFollowingRequests(userId);
    return successResponse(req, res, data);
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
    const isFollower = await userFuncs.checkIfFollower(
      followedById,
      followingToId
    );
    if (isFollower) {
      await userFuncs.addUserToConnection(followedById, followingToId, [
        "2a700987-191c-7acd-b18f-467741d17f74",
      ]);
      await userFuncs.addUserToConnection(followingToId, followedById, [
        "2a700987-191c-7acd-b18f-467741d17f74",
      ]);
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
    const getUser = await userFuncs.getUserById(followedById);
    const getPrimaryUser = await userFuncs.getUserById(followingToId);
    const { fullName } = getUser;
    const { totalFollowers } = getPrimaryUser;

    let mainData = req.user;
    mainData.userId = followedById;
    const inAppData = {
      postId: followedById,
      notificationType: "userProfile-approveFollowRequest"
    }
    await adminContNotificationFuncs.sendNotificationsByType("userProfile-approveFollowRequest", mainData, inAppData)

    let and_n_others;
    if (totalFollowers === 2) {
      and_n_others = "and 1 other "
    }
    if (totalFollowers === 1) {
      and_n_others = ''
    }
    if (totalFollowers > 2) {
      and_n_others = `and ${totalFollowers - 1} others`
    }
    let mainDatas = getUser;
    mainDatas.userId = followingToId;
    mainDatas.and_n_others = and_n_others;
    const inAppDatas = {
      postId: followingToId,
      notificationType: "userProfile-approveFollowRequest"
    }
    await adminContNotificationFuncs.sendNotificationsByType("userProfile-approveFollowRequest", mainDatas, inAppDatas)


    // await notiFuncs.addToNotification(
    //   followedById,
    //   followingToId,
    //   "userProfile-Follow",
    //   "user",
    //   `${req.user.fullName} accepted your follow request.`,
    //   {}
    // );

    // await notiFuncs.addToNotification(
    //   followingToId,
    //   followedById,
    //   "userProfile-Follow",
    //   "user",
    //   `${fullName} started Following you with ${totalFollowers - 1} others`,
    //   {}
    // );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const disapproveFollowingRequest = async (req, res) => {
  try {
    const followingRequestId = req.body.followingRequestId;
    const userId = req.user.id;
    if (!followingRequestId) {
      return failResponse(req, res, "followingRequestId NotAvailable");
    }
    const data = await userFuncs.clearFollowingRequestWithId(
      userId,
      followingRequestId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    let { searchKey, pageIndex, pageSize, sortBy, userId } = req.body;
    if (!userId) {
      userId = req.user.id;
    }
    const hitUserId = req.user.id
    // const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await userFuncs.getUserFollowers(
      userId,
      hitUserId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserFollowings = async (req, res) => {
  try {
    // const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    // const userId = req.body.userId || req.user.id;
    let { searchKey, pageIndex, pageSize, sortBy, userId } = req.body;
    if (!userId) {
      userId = req.user.id;
    }
    const hitUserId = req.user.id
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await userFuncs.getUserFollowings(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      hitUserId
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateUserSpeakLanguage = async (req, res) => {
  try {
    const languageId = req.body.languageId;
    if (!languageId) {
      return failResponse(req, res, "Please enter languageId Array");
    }
    const data = await userFuncs.updateUserSpeakLanguage(
      req.user.id,
      languageId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setBlockUser = async (req, res) => {
  try {
    const { blockedUserId, isBlocked } = req.body;
    if (!blockedUserId) {
      return failResponse(req, res, "blockedUserIdNotAvailable");
    }
    if (isBlocked) {
      await userFuncs.blockUser(blockedUserId, req.user.id);
    } else {
      await userFuncs.unblockUser(blockedUserId, req.user.id);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const blockUser = async (req, res) => {
  try {
    const blockedUserId = req.body.blockedUserId;
    if (!blockedUserId) {
      return failResponse(req, res, "blockedUserIdNotAvailable");
    }
    const result = await userFuncs.blockUser(blockedUserId, req.user.id);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const unblockUser = async (req, res) => {
  try {
    const blockedUserId = req.body.blockedUserId;
    if (!blockedUserId) {
      return failResponse(req, res, "blockedUserIdNotAvailable");
    }
    const result = await userFuncs.unblockUser(blockedUserId, req.user.id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBlockedUsers = async (req, res) => {
  try {
    const result = await userFuncs.getAllBlockedUsers(req.user.id);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const userDndUser = async (req, res) => {
  try {
    const { dndToUserId, dndOff } = req.body;
    if (!dndToUserId) {
      return failResponse(req, res, "dndToUserIdNotAvailable");
    }
    if (dndOff) {
      const result = await userFuncs.userUnDndUser(req.user.id, dndToUserId);
    } else {
      const result = await userFuncs.userDndUser(req.user.id, dndToUserId);
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const userUnDndUser = async (req, res) => {
  try {
    const dndToUserId = req.body.dndToUserId;
    if (!dndToUserId) {
      return failResponse(req, res, "dndToUserIdNotAvailable");
    }
    const result = await userFuncs.userUnDndUser(req.user.id, dndToUserId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportUser = async (req, res) => {
  try {
    const { otherUserId, reportOptionId, remarks } = req.body;
    const reportedBy = req.user.id;
    if (!otherUserId) {
      return failResponse(req, res, "otherUserIdNotAvailable");
    }
    if (!reportOptionId) {
      return failResponse(req, res, "reportOptionIdNotAvailable");
    }
    const result = await userFuncs.reportUser(
      reportedBy,
      otherUserId,
      reportOptionId,
      remarks
    );
    return successResponse(req, res, "reported");
  } catch (error) {
    if (error && error.name && error.name == "SequelizeUniqueConstraintError") {
      return failResponse(req, res, "already_reported_options");
    }
    return errorResponse(req, res, error);
  }
};

export const getContacts = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const hitUserId = req.user.id
    const result = await userFuncs.getContacts(userId, hitUserId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEmailAddress = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const result = await userFuncs.getEmailAddress(userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateEmailPrimary = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const newPriEmail = req.body.newPriEmail;
    const result = await userFuncs.updateEmailPrimary(userId, newPriEmail);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const isVerified = true;
    const type = "addContact";
    const { contact, isEmail, otp, countryId } = req.body;

    if (!contact) {
      return failResponse(req, res, "contactNotAvailable");
    }
    if (!otp) {
      return failResponse(req, res, "otpNotAvailable");
    }
    if (isEmail === undefined) {
      return failResponse(req, res, "isEmailNotAvailable");
    }
    let contactExist
    let replacedNum
    if (isEmail) {
      contactExist = await userFuncs.checkContact(contact, isEmail);
    }
    if (!isEmail) {
      if (!countryId) {
        return failResponse(req, res, "enter countryId");
      }
      var re = /(?:^|\W)+(\w+)(?!\w)/g
      let match = re.exec(contact)
      const code = match[0]
      replacedNum = contact.replace(`${code} `, "")
      contactExist = await userFuncs.checkContact(replacedNum, isEmail);
      const checkNumberInUsers = await loginSignup.isMobileAvailable(replacedNum)
      if(!checkNumberInUsers){
        return failResponse(req, res, "Number Already linked with a account")
      }
    }
    if (contactExist) {
      if (isEmail) {
        return failResponse(req, res, "Email Address Already Exist");
      }
      return failResponse(req, res, "Contact Already Exist");
    }
    const otpResult = await loginSignup.verifyOtp(otp, contact, type);
    if (otpResult) {
      await userFuncs.addContact(userId, contact, isEmail, isVerified, countryId, replacedNum);
      return successResponse(req, res, "UserContactAdded");
    }
    return failResponse(req, res, "wrongOtp");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getInterests = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const result = await userFuncs.getInterests(userId);
    return successResponse(req, res, { count: result.length, rows: result });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addInterests = async (req, res) => {
  try {
    const interestIds = req.body.interestIds;
    if (!interestIds) {
      return failResponse(
        req,
        res,
        "Enter interestIds Array, pass empty Array to delete All"
      );
    }
    const userId = req.user.id;
    const result = await userFuncs.addInterests(userId, interestIds);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getHobbies = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id || req.body.userId;
    const result = await userFuncs.getHobbies(userId);
    return successResponse(req, res, { count: result.length, rows: result });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addHobbies = async (req, res) => {
  try {
    const hobbyIds = req.body.hobbyIds;
    if (!hobbyIds) {
      return failResponse(
        req,
        res,
        "Enter hobbyIds array, Pass Empty array to delete"
      );
    }
    const userId = req.user.id;
    const result = await userFuncs.addHobbies(userId, hobbyIds);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllSports = async (req, res) => {
  try {
    const result = await userFuncs.getAllSports(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addToAllSports = async (req, res) => {
  try {
    const { sport, sportImgURL } = req.body;
    if (!sport) {
      return failResponse(req, res, "Enter sport");
    }
    const result = await userFuncs.addToAllSports(sport, sportImgURL);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSports = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id || req.body.id;
    const result = await userFuncs.getSports(userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addSports = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id || req.body.id;
    const { sportsId } = req.body;
    if (!sportsId) {
      return failResponse(req, res, "Please Enter sportsId Array");
    }
    const result = await userFuncs.addSports(userId, req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addToAllBooks = async (req, res) => {
  try {
    const result = await userFuncs.addToAllBooks(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const result = await userFuncs.getAllBooks(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBooks = async (req, res) => {
  try {
    const userId = req.body.userId || req.body.id || req.user.id;
    const result = await userFuncs.getBooks(userId, req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addBooks = async (req, res) => {
  try {
    const userId = req.body.userId || req.body.id || req.user.id;
    const result = await userFuncs.addBooks(userId, req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const getOwnProfile = async (req, res) => {
//     try {
//         const userData=await userFuncs.getUserProfileById(req.user.id)
//         if(userData && userData.length>0){
//             return successResponse(req, res, userData[0])
//         }else{
//             return failResponse(req, res,  "incorrectUserId");
//         }
//     }
//     catch (error) {
//         return errorResponse(req, res, error)
//     }
// };
// export const updateUserDp = async (req, res) => {
//     try {
//         if (!req.files || !req.files.length) {
//             return failResponse(req, res, "fileNotFound")
//         }
//         if (req.files.length) {
//             req.files[0].uniquename = `${utils.uniqueFileName()}${path.extname(req.files[0].originalname)}`;
//             let link = await s3Upload('userProfileImage', req.files[0]);
//             await userFuncs.updateUser({
//                 id: req.user.id,
//                 profileImage: link,
//                 profileImageThumb: link
//             });
//             return successResponse(req, res, "Updated User");
//         }
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };

// export const updateUserCover = async (req, res) => {
//     try {
//         if (!req.files || !req.files.length) {
//             return failResponse(req, res, "fileNotFound")
//         }
//         if (req.files.length) {
//             req.files[0].uniquename = `${utils.uniqueFileName()}${path.extname(req.files[0].originalname)}`;
//             let link = await s3Upload('userCoverImage', req.files[0]);
//             await userFuncs.updateUser({
//                 id: req.user.id,
//                 coverImage: link
//             });
//             return successResponse(req, res, "Updated User");
//         }
//     } catch (error) {
//         return errorResponse(req, res, error);
//     }
// };

// export const getAll = async (req, res) => {
//     try {
//         return successResponse(req, res, "Token Accpeted get All")
//     } catch (error) {
//         return errorResponse(req, res, error, "failedGetAllUser")
//     }
// };
// export const unFollow = async (req, res) => {
//     try {
//         var followedById=req.user.id
//         const followingToId=req.body.followingToId
//         if(!followingToId){
//             return failResponse(req, res, "followingUserIdNotAvailable");
//         }
//         const dataClearConnection=await userFuncs.clearUserConnection(followedById,followingToId)
//         const dataClearFollowing=await userFuncs.clearFollowingRequest(followedById,followingToId)
//         return successResponse(req, res, "success")
//     }
//     catch (error) {
//         return errorResponse(req, res, error)
//     }
// };

// export const getMaritalStatus = async (req,res) => {
//     try{
//         const data=await userFuncs.getMaritalStatus()
//         return successResponse(req,res,data)
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// };

// export const getUserFollowingsByConnectionId = async (req,res)=>{
//     try{
//         const connectionId=req.body.connectionId
//         if(!connectionId){
//             failResponse(req,res,"connectionIdNotAvailable")
//         }
//         const result=await userFuncs.getUserFollowingsByConnectionId(req.user.id,connectionId)
//         return successResponse(req,res,result)
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// };

// export const searchUserFollowers = async(req,res) =>{
//     try{
//         const searchKey=req.body.searchKey
//         if(!searchKey){
//             failResponse(req,res,"searchKeyNotAvailable")
//         }
//         const data=await userFuncs.searchUserFollowers(req.user.id,searchKey)
//         return successResponse(req,res,data)
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// };

// export const searchUserFollowings = async(req,res) =>{
//     try{
//         const searchKey=req.body.searchKey
//         if(!searchKey){
//             failResponse(req,res,"searchKeyNotAvailable")
//         }
//         const data=await userFuncs.searchUserFollowings(req.user.id,searchKey)
//         return successResponse(req,res,data)
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// };

// export const searchUserFollowingsByConnectionId = async (req,res)=>{
//     try{
//         const searchKey=req.body.searchKey
//         if(!searchKey){
//             failResponse(req,res,"searchKeyNotAvailable")
//         }
//         const connectionId=req.body.connectionId
//         if(!connectionId){
//             failResponse(req,res,"connectionIdNotAvailable")
//         }
//         const result=await userFuncs.searchUserFollowingsByConnectionId(req.user.id,connectionId,searchKey)
//         return successResponse(req,res,result)
//     }catch(error){
//         return errorResponse(req,res,error)
//     }
// };
// export const getAllSpeakLanguages =  async (req,res)=>{
//     try{
//         const data =await userFuncs.getAllSpeakLanguages();
//         return successResponse(req,res,data);
//     }catch(error){
//         return errorResponse(req,res,error);
//     }
// };

export const getMoviesByName = async (req, res) => {
  try {
    const movie = req.body.movie;
    const data = await userFuncs.getMoviesByName(movie);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const data = await userFuncs.getAllMovies();
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addMovies = async (req, res) => {
  try {
    const userId = req.body.id || req.user.id || req.body.userId;
    const { moviesId } = req.body;
    if (!moviesId) {
      return failResponse(req, res, "Please Enter moviesId Array");
    }
    const data = await userFuncs.addMovies(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMovies = async (req, res) => {
  try {
    const userId = req.body.id || req.user.id || req.body.userId;
    const data = await userFuncs.getMovies(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllMusic = async (req, res) => {
  try {
    const data = await userFuncs.getAllMusic();
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addMusic = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id || req.body.id;
    const { musicId } = req.body;
    if (!musicId) {
      return failResponse(req, res, "Please Enter musicId Array");
    }
    const data = await userFuncs.addMusic(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMusic = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id || req.body.id;
    const data = await userFuncs.getMusic(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addQualification = async (req, res) => {
  try {
    const qualification = req.body.qualification;
    if (!qualification) {
      return failResponse(req, res, "Enter qualification");
    }
    const data = await userFuncs.addQualification(qualification);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addSchoolCollege = async (req, res) => {
  try {
    const { name, location, educationType, educationUrl } = req.body;
    if (!name) {
      return failResponse(req, res, "Enter School/College Name");
    }
    if (!location) {
      return failResponse(req, res, "Enter School/College location");
    }
    if (!educationType) {
      return failResponse(req, res, "Enter educationType");
    }
    const educationTypeArr = ["school", "college"];
    if (!educationTypeArr.includes(educationType)) {
      return failResponse(req, res, "Enter Only school or college");
    }
    const data = await userFuncs.addSchoolCollege(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getQualification = async (req, res) => {
  try {
    const data = await userFuncs.getQualification(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getSchoolCollege = async (req, res) => {
  try {
    const sortBy = req.body.sortBy;
    if (!sortBy) {
      return failResponse(req, res, "Enter sortBy");
    }
    const sortByArr = ["school", "college"];
    if (!sortByArr.includes(sortBy)) {
      return failResponse(req, res, "Please enter only school/college");
    }
    const data = await userFuncs.getSchoolCollege(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addUserEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { qualificationsId, educationId, fromDate, toDate, isGraduate } =
      req.body;
    // if (!qualificationsId) {
    //   return failResponse(req, res, "Please Enter qualificationsId");
    // }
    if (!educationId) {
      return failResponse(req, res, "Please Enter educationId");
    }
    if (!fromDate) {
      return failResponse(req, res, "Please Enter fromDate");
    }
    if (fromDate.length !== 7 || toDate.length !== 7) {
      return failResponse(req, res, "Enter Date as YYYY-MM");
    }
    const data = await userFuncs.addUserEducation(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.getUserEducation(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteUserSpeakLanguage = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.deleteAllUserSpeakLanguage(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserSpeakLanguage = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return failResponse(req, res, "Please enter userId");
    }
    const result = await userFuncs.getUserSpeakLanguages(userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteUserSpeakLanguageById = async (req, res) => {
  try {
    const languageId = req.body.languageId;
    if (!languageId) {
      return failResponse(req, res, "Please enter languageId Array");
    }
    const data = await userFuncs.deleteUserSpeakLanguageById(
      req.user.id,
      languageId
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getGroupOfUser = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const data = await userFuncs.getGroupOfUser(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserBusinessPages = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const data = await userFuncs.getUserBusinessPages(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteContact = async (req, res) => {
  try {
    const contactId = req.body.contactId;
    if (!contactId) {
      return failResponse(req, res, "Enter contactId");
    }
    const data = await userFuncs.deleteContact(contactId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserAllGroups = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.getUserAllGroups(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserAllBusinessPages = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.getUserAllBusinessPages(userId, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteUserEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const educationId = req.body.educationId;
    if (!educationId) {
      return failResponse(req, res, "Enter educationId Array");
    }
    const data = await userFuncs.deleteUserEducation(userId, educationId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const updateUserEducation = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      return failResponse(req, res, "Enter id");
    }
    const data = await userFuncs.updateUserEducation(id, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getUserAllConnectionCounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.getUserAllConnectionCounts(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const checkUserCompleteDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userFuncs.checkUserCompleteDetails(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addProfileVisit = async (req, res) => {
  try {
    const userId = req.user.id;
    const visitedUserId = req.body.visitedUser;
    const data = await userFuncs.addProfileVisit(userId, visitedUserId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const updatePrimaryContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, mobile } = req.body;
    if (email) {
      const check = await userFuncs.existsInUserContacts(email)
      if(!check){
        return failResponse(req, res,"Email not added")
      }
      await userFuncs.deleteUserContact(email);
      await userFuncs.copyRecordToContacts("email", userId);
      const data = await userFuncs.updatePrimaryContact(userId, {email: email, id: userId});
    }
    if (mobile) {
      var re = /(?:^|\W)+(\w+)(?!\w)/g
      let match = re.exec(mobile)
      const code = match[0]
      const replacedNum = mobile.replace(`${code} `, "")
      const check = await userFuncs.existsInUserContacts(replacedNum)
      if(!check){
        return failResponse(req, res,"Number not added")
      }
      await userFuncs.deleteUserContact(replacedNum);
      await userFuncs.copyRecordToContacts("mobile", userId);
      const data = await userFuncs.updatePrimaryContact(userId, {mobile: replacedNum, id: userId});
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getMutualFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = req.body.userId
    const { followerId, searchKey, pageIndex, pageSize, sortBy } = req.body;
    const result = await userFuncs.getMutualFollowers(
      userId,
      followerId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
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

export const getInAppSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const arr = ["privacy", "notification", "postAndStory", "mediaAndContent"]
    const type = req.body.type
    if (!arr.includes(type)) {
      return failResponse(req, res, "Enter type as -> privacy , notification, mediaAndContent or postAndStory")
    }
    const result = await userFuncs.getInAppSettings(userId, type)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateInAppSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await userFuncs.updateInAppSettings(userId, req.body)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const syncContactList = async (req, res) => {
  try {
   const userId = req.user.id
   const mobile = req.body.mobile
   if(!(Array.isArray(mobile))){
    return failResponse(req, res, "enter mobile in array , if not mobile pass empty array")
   }
   const showUserType = req.body.showUserType
   let showArr = ["all","messagmee"]
   if(!(showArr.includes(showUserType))){
    return failResponse(req, res, "Enter showUserType as all or messagmee")
   }
   const result =  await userFuncs.syncContactList(userId, mobile, showUserType)
   return successResponse(req, res , result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
