require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";
import * as hamburgermenuFuncs from "../../funcs/hamBurgerMenu/hamburgermenu.funcs";
import * as userFuncs from "../../funcs/users.funcs";
import * as postFuncs from '../../funcs/post.funcs'


// 1-/getAllBookmarkFeedPost
export const getAllBookmarkFeedPost = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const {searchKey,pageIndex,pageSize}= req.body;
        const data = await hamburgermenuFuncs.getFeedPosts(userId,searchKey,pageIndex,pageSize);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 2-/getUserRequestReceived
export const getUserRequestReceived = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const { pageIndex, pageSize } = req.body;
    const data = await hamburgermenuFuncs.getUserRequestReceived(
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 3-/getAllConListAddCategoryRelation
export const getAllConListAddCategoryRelation = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.body.userId || req.user.id;
    const data = await hamburgermenuFuncs.getAllConListAddCategoryRelation(
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 4A-/addRemoveCategory
export const addCategory = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const { name } = req.body;
    const data = await hamburgermenuFuncs.addCategory(userId, name);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 4B-/addRemoveCategory
export const removeCategory = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.removeCategory(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 5-/getAllSentRequest
export const getAllSentRequest = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const data = await hamburgermenuFuncs.getAllSentRequest(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 6-/withdrawUserRequest
export const withdrawUserRequest = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.withdrawUserRequest(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 7-/getAllConnectionList
export const getAllConnectionList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy, filteredBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "createdAt"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllConnectionList(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      filteredBy
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 8-/getAllFollowerList
export const getAllFollowerList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;    
    const userId = req.body.userId || req.user.id;    
    const selfUserId = req.user.id
    const sortBys = ["userName", "fullName", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllFollowerList(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      selfUserId
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 9-/getAllColleagueList
export const getAllColleagueList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "name", "createdAt"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllColleagueList(
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
// 10-/getAllFamilyConnectionList
export const getAllFamilyConnectionList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllFamilyConnectionList(
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
// 11-/getAllRelativeList
export const getAllRelativeList = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllRelativeList(
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
// 12-/allMenuSettings
export const allMenuSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.allMenuSettings(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 16-/userReportWithReason
export const userReportWithReason = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.userReportWithReason(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 17-/Language
export const Language = async (req, res) => {
  try {
    const userId = req.body.userId || req.user.id;
    const { languagesId } = req.body;
    const data = await hamburgermenuFuncs.Language(userId, languagesId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 18-/fetchRecentActivityData
export const fetchRecentActivityData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.fetchRecentActivityData(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 19-/blockUnblockPeople
export const blockUnblockPeople = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.blockUnblockPeople(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 20-/getAllBlockedPeopleList
export const getAllBlockedPeopleList = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.getAllBlockedPeopleList(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 21-/mediaAndContent
export const mediaAndContent = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.mediaAndContent(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 22-/account
export const account = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.account(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 23-/verifyAccountByPassword
export const verifyAccountByPassword = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.verifyAccountByPassword(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 24-/fetchSecurityAndLoginData
export const fetchSecurityAndLoginData = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.fetchSecurityAndLoginData(userId, req.session.deviceId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 25-/getAllListOwnedPinnedBusinessPage
export const getAllListOwnedPinnedBusinessPage = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.getAllListOwnedPinnedBusinessPage(
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 26-/getAllListFollowingPinnedBusinessPage
export const getAllListFollowingPinnedBusinessPage = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.getAllListFollowingPinnedBusinessPage(
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 27-/getAllListOwnedPinnedGroupPage
export const getAllListOwnedPinnedGroupPage = async (req, res) => {
  try {
    const {pageIndex, pageSize} = req.body
    const data = await hamburgermenuFuncs.getAllListOwnedPinnedGroupPage(
      req.user.id,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 28-/getAllListJoinedPinnedGroupPage
export const getAllListJoinedPinnedGroupPage = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.getAllListJoinedPinnedGroupPage(
      req.user.id
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 31-/getAllSearchedSuggestedBusinessPage
export const getAllSearchedSuggestedBusinessPage = async (req, res) => {
  try {
    // const data = await hamburgermenuFuncs.getAllSearchedSuggestedBusinessPage(
    //   req.body,
    //   req.user.id
    // );
    let data ;
    data = await postFuncs.getUserSuggestedBusinessPages(req.user.id,req.body )
    return successResponse(req, res, data[0].suggestedBusiness);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 32-/getAllSearchedSuggestedGroupPage
export const getAllSearchedSuggestedGroupPage = async (req, res) => {
  try {
    // const data = await hamburgermenuFuncs.getAllSearchedSuggestedGroupPage(
    //   req.body,
    //   req.user.id
    // );
    let data = await postFuncs.getUserSuggestedGroups(req.user.id, req.body)
    return successResponse(req, res, data[0].suggestedGroups);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 33-/password
export const password = async (req, res) => {
  try {
    const userId = req.user.id;
    const pass = req.body.password;
    const data = await hamburgermenuFuncs.password(userId, pass);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 34-/SessionLogout
export const SessionLogout = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.SessionLogout(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 35-/allSettings
export const allSettings = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.allSettings(req.body, req.user.id);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 36-/getLanguage
export const getLanguage = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.getLanguage(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 37-/unblockAll
export const unblockAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.unblockAll(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 38-/allSessionLogout
export const allSessionLogout = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.allSessionLogout(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 39-/unfollowUser
export const unfollowUser = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.unfollowUser(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 40-/blockUser
export const blockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.blockUser(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 41-/removeUserFromList
export const removeUserFromList = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.removeUserFromList(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 42-/acceptRequest
export const acceptRequest = async (req, res) => {
  // try {
  //   const followedById = req.body.followedById;
  //   const followingToId = req.user.id;
  //   if (followingToId === followedById) {
  //     return failResponse(req, res, "errorSelfId");
  //   }
  //   if (!followedById) {
  //     return failResponse(req, res, "followedByUserIdNotAvailable");
  //   }
  //   const connectionIds = req.body.connectionIds;
  //   if (connectionIds && connectionIds.length > 0) {
  //     await userFuncs.addUserToConnection(
  //       followingToId,
  //       followedById,
  //       connectionIds
  //     );
  //   }
  //   await userFuncs.approveFollowingRequest(followingToId, followedById);
  //   return successResponse(req, res, "success");
  // } catch (error) {
  //   return errorResponse(req, res, error);
  // }
  try {
    const followedById = req.body.followedById;
    const followingToId = req.user.id;
    // const followingToId = req.body.followingToId
    if (followingToId === followedById) {
      return failResponse(req, res, "errorSelfId");
    }
    if (!followedById) {
      return failResponse(req, res, "followedByUserIdNotAvailable");
    }
    const isFollower = await userFuncs.checkIfFollower(followedById, followingToId)
    if(isFollower){
      await userFuncs.addUserToConnection(followedById,followingToId,["2a700987-191c-7acd-b18f-467741d17f74"])
      await userFuncs.addUserToConnection(followingToId,followedById,["2a700987-191c-7acd-b18f-467741d17f74"])
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
// 42-/declineRequest
export const declineRequest = async (req, res) => {
  try {
    const followingRequestId = req.body.followingRequestId;
    const userId = req.user.id ;
    if (!followingRequestId) {
      return failResponse(req, res, "followingRequestIdNotAvailable");
    }
    await userFuncs.clearFollowingRequestWithId(userId, followingRequestId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 43-/getFollowingUserList
export const getFollowingUserList = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await hamburgermenuFuncs.getAllFollowingList(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 44-/getFriendUserList
export const getFriendUserList = async (req, res) => {
  try {
    const userId = req.user.id;
    let {sortBy} = req.body;
    const sortBys = ["userName", "fullName", "email"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const data = await hamburgermenuFuncs.getAllFriendList(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 45-/addUserToList
export const addUserToList = async (req, res) => {
  try {
    var userId = req.user.id;
    const followingUserIds = req.body.followingUserIds;
    if (!followingUserIds  || followingUserIds.length == 0) {
      return failResponse(req, res, "followingUserIdNotAvailable");
    }
    const connectionIds = req.body.connectionIds;
    if (!connectionIds || connectionIds.length == 0) {
      return failResponse(req, res, "connectionIdsNotAvailable");
    }
    await hamburgermenuFuncs.addUserToConnection(userId, followingUserIds, connectionIds);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// 46-/getDeactivateReason
export const getDeactivateReason = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.getDeactivateReason(req.user.id);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
// -/followUser
export const followUser = async (req, res) => {
  try {
    const data = await hamburgermenuFuncs.followUser(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};