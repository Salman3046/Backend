import * as hamburgermenu from "../controllers/hamBurgerMenu/hamburgermenu.controller";
import express from "express";
const router = express.Router();

router.post("/getAllBookmarkPosts", hamburgermenu.getAllBookmarkFeedPost);
router.post("/getUserRequestReceived", hamburgermenu.getUserRequestReceived);
router.post("/getRelationCategory", hamburgermenu.getAllConListAddCategoryRelation);
router.post("/getAllSentRequestList", hamburgermenu.getAllSentRequest);
router.post("/relationCategory", hamburgermenu.addCategory);
router.delete("/relationCategory", hamburgermenu.removeCategory);
router.post("/getAllSentRequest", hamburgermenu.getAllSentRequest);
router.post("/withdrawUserRequest", hamburgermenu.withdrawUserRequest);
router.post("/getAllConnectionList", hamburgermenu.getAllConnectionList);
router.post("/getAllFollowerList", hamburgermenu.getAllFollowerList);
router.post("/getAllColleagueList", hamburgermenu.getAllColleagueList);
router.post(
  "/getAllFamilyConnectionList",
  hamburgermenu.getAllFamilyConnectionList
);
router.post("/getAllRelativeList", hamburgermenu.getAllRelativeList);
router.put("/messangerSetting", hamburgermenu.allMenuSettings);
router.put("/PostAndStoriesSetting", hamburgermenu.allMenuSettings);
router.put("/privacySetting", hamburgermenu.allMenuSettings);
router.put("/NotificationSetting", hamburgermenu.allMenuSettings);
router.put("/allMenuSettings", hamburgermenu.allMenuSettings);
router.post("/userReportWithReason", hamburgermenu.userReportWithReason);
router.put("/Language", hamburgermenu.Language);
router.post("/Language", hamburgermenu.getLanguage);
router.post("/fetchRecentActivityData", hamburgermenu.fetchRecentActivityData);
router.put("/blockUnblockPeople", hamburgermenu.blockUnblockPeople);
router.post("/getAllBlockedPeopleList", hamburgermenu.getAllBlockedPeopleList);
router.put("/mediaAndContentSetting", hamburgermenu.allMenuSettings);
router.delete("/account", hamburgermenu.account);
router.post("/verifyAccountByPassword", hamburgermenu.verifyAccountByPassword);
router.post(
  "/fetchSecurityAndLoginData",
  hamburgermenu.fetchSecurityAndLoginData
);
router.post(
  "/getAllListOwnedPinnedBusinessPage",
  hamburgermenu.getAllListOwnedPinnedBusinessPage
);
router.post(
  "/getAllListFollowingPinnedBusinessPage",
  hamburgermenu.getAllListFollowingPinnedBusinessPage
);
router.post(
  "/getAllListOwnedPinnedGroupPage",
  hamburgermenu.getAllListOwnedPinnedGroupPage
);
router.post(
  "/getAllListJoinedPinnedGroupPage",
  hamburgermenu.getAllListJoinedPinnedGroupPage
);
router.post(
  "/getAllSuggestedBusinessPageList",
  hamburgermenu.getAllSearchedSuggestedBusinessPage
);
router.post(
  "/getAllSuggestedGroupPageList",
  hamburgermenu.getAllSearchedSuggestedGroupPage
);
router.put("/password", hamburgermenu.password);
router.put("/SessionLogout", hamburgermenu.SessionLogout);
router.post("/allSettings", hamburgermenu.allSettings);
router.put("/unblockAll", hamburgermenu.unblockAll);
router.put("/allSessionLogout", hamburgermenu.allSessionLogout);
router.put("/unfollowUser", hamburgermenu.unfollowUser);
router.post("/followUser", hamburgermenu.followUser);
router.put("/blockUser", hamburgermenu.blockUser);
router.put("/removeUserFromList", hamburgermenu.removeUserFromList);
router.post("/acceptRequest", hamburgermenu.acceptRequest);
router.post("/declineRequest", hamburgermenu.declineRequest);
router.post("/getFollowingUserList", hamburgermenu.getFollowingUserList);
router.post("/getFriendUserList", hamburgermenu.getFriendUserList);
router.post("/addUserToList", hamburgermenu.addUserToList);
router.post("/getDeactivateReason", hamburgermenu.getDeactivateReason);

module.exports = router;
