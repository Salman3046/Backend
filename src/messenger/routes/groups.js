import * as groups from "../controllers/groups/groups.controller";
import * as grpCategory from "../controllers/groups/grpCategory.controller";
import * as groupNotificationSettings from "../controllers/groups/grpNotificationSettings.controller";
import express from "express";
import { validate } from "express-validation";
import * as groupsValidator from "../controllers/groups/groups.validator";
import * as grpMembers from "../controllers/groups/grpMembers.controller";
import * as grpInvitePeople from "../controllers/groups/grpInvitePeople.controller";
import * as grpPosts from "../controllers/groups/grpPosts.controller";
import * as grpPostsLikes from "../controllers/groups/grpLikes.controller";
import * as grpPostsComments from "../controllers/groups/grpPostComments.controller";
import * as grpPinedGroups from "../controllers/groups/grpPin.controller";
import * as grpUsersConections from "../controllers/groups/grpUserConnection.controller";
import * as grpAdministrater from "../controllers/groups/grpAdministrator.controller";
import * as grpBlockedUsers from "../controllers/groups/grpBlockedUsers.controller";
import * as grpManagementHistory from '../controllers/groups/grpManagementHistory.controller';
import * as grpPostView from '../controllers/groups/grpPostsViews.controller';
import * as grpPostShares from '../controllers/groups/grpPostShares.controller';

const router = express.Router();

router.post('/create', validate(groupsValidator.createGroup, { keyByField: true }), groups.createGroup);
router.get('/getUsersGroups', validate(groupsValidator.getAllUsersGroups, { keyByField: true }), groups.geAlltUsersGroup);
router.get('/getAllGroups', groups.geAllGroups);
router.post('/search', groups.searchGroups);
router.put('/update/details', groups.updateGroupsDetails);
router.post('/getById', groups.getGroupById);
router.post('/about', groups.getAboutGroup);
router.post('/delete', groups.deleteGroup);
router.post('/leave', groups.leaveGroup);
router.post('/report', groups.reportGroup);

/*grops general setings*/
router.post("/get/generalSettings", groups.getGroupGeneralSetings);
router.put("/update/generalSettings", groups.updateGroupsGeneralSettings);

/*Groups Notification Settings */
router.post('/notification/settings', validate(groupsValidator.groupNotificationSettings, { keyByField: true }), groupNotificationSettings.createGroupNotificationSettings);
router.post('/notification/settings/getAll', groupNotificationSettings.getGroupNotificationSettings);
router.put('/notification/settings/update', groupNotificationSettings.updateGroupNotificationSettings);
router.post('/notification/settings/set', groupNotificationSettings.setGroupNotificationSettings);

/*Group Categorys*/
router.post(
  "/category/create",
  validate(groupsValidator.createGroupCategory, { keyByField: true }),
  grpCategory.createGroupCategory
);
router.get("/category/getAll", grpCategory.getAllGroupCategory);
router.post("/category/search", grpCategory.searchGroupCategory);
router.post("/category/getById", grpCategory.getGroupCategoryById);

/*Group Members*/
router.post(
  "/member/create",
  validate(groupsValidator.createGroupMember, { keyByField: true }),
  grpMembers.createGroupMember
);

router.post("/member/getAll", grpMembers.getAllGroupMembers);
router.put(
  "/member/acceptrequest",
  validate(groupsValidator.acceptGroupJoinRequest, { keyByField: true }),
  grpMembers.acceptGroupJoinRequest
);
router.post(
  "/member/joinRequets/getAll",
  grpMembers.getAllGroupJoinMembersRequest
);
router.post("/getGroupMemberDetails",grpMembers.getGroupMemberDetails)

/*grpInvitePeople*/
router.post('/invitePeople', validate(groupsValidator.grpInvitePeople, { keyByField: true }), grpInvitePeople.grpInvitePeople);
router.post('/invitedPeople/getAll', validate(groupsValidator.grpInvitePeopleGetAll, { keyByField: true }), grpInvitePeople.getGrpInvitePeople);

/*Groups Posts*/
router.post('/post/create', grpPosts.createGroupPost);
router.post('/post/like/set', grpPostsLikes.setLike);
router.post('/post/like/getAll', grpPostsLikes.getAllGrpPostLikes);
router.post('/post/getAll', grpPosts.getGroupPost);
router.post('/post/report', grpPosts.reportPost);
router.post('/post/pollVote/add', grpPosts.votePollPosts);
router.post('/post/getByPostType', grpPosts.getPostsByPostType);
router.post('/post/getForReview', grpPosts.getReviewPost);
router.post('/post/review', grpPosts.reviewPost);
router.post('/post/delete', grpPosts.deleteGroupPost);
router.post('/post/update', grpPosts.updatePost);
router.post('/post/addBookmark', grpPosts.bookMarkGroupPost);
router.post('/post/getAllTaggedUsers', grpPosts.getAllPostTagedUsers);
router.post('/post/getPostById',grpPosts.getPostById)

/*Groups comments*/
router.post("/post/comments/add", grpPostsComments.addComment);
router.post("/post/comments/update", grpPostsComments.updateGrpPostComment);
router.post("/post/comments/getAll", grpPostsComments.getPostComments);
router.post("/post/allow/comments", grpPostsComments.grpPostAllowComments);
router.post("/post/comment/setLike", grpPostsComments.grpPostAddCommentLike);
router.post("/post/comment/report", grpPostsComments.grpPostreportComment);
router.post("/post/comment/delete", grpPostsComments.deletePostComments);

/*Pinned groups*/
router.post("/add/pinned/group", grpPinedGroups.addPinnedGroup);
router.post("/get/pinned/group", grpPinedGroups.getPinnedGroup);

/*Group user connections*/
router.post(
  "/user/connection/getAll",
  grpUsersConections.getGroupUserConnection
);
router.post(
  "/user/connection/things/commonWithYou",
  grpUsersConections.getGroupUserThingsInCommon
);
router.post("/user/getNearByYou", grpUsersConections.getMembersNearByYou);

/*Group Administrater*/
router.post(
  "/administrater/add",
  validate(groupsValidator.createGroupAdministrater, { keyByField: true }),
  grpAdministrater.createGroupAdministrater
);
router.post(
  "/administrater/get",
  validate(groupsValidator.getGroupAdministrater, { keyByField: true }),
  grpAdministrater.getGroupAdministrater
);
router.post(
  "/administrater/remove",
  validate(groupsValidator.removeGroupAdministrater, { keyByField: true }),
  grpAdministrater.removeGroupAdministrater
);
router.post("/members/getMutualFollowers", grpUsersConections.getMutualFollowers);

/*Block group member*/
router.post(
  "/member/block",
  validate(groupsValidator.blockGroupMember, { keyByField: true }),
  grpBlockedUsers.blockGroupMember
);
router.post("/member/block/getAll", grpBlockedUsers.getBlockGroupMember);
router.post("/member/unblock", grpBlockedUsers.unblockBlockGroupMember);
router.post("/member/remove", grpMembers.removeGroupMember);

router.post("/post/view/getAll", grpPostView.getGrpPostVivers);
router.post("/post/view/add", grpPostView.addGrpPostView);

router.post("/management/history/getAll", grpManagementHistory.getGroupManagementHistory);
router.post('/post/share/add', grpPostShares.addShare);
router.post('/post/share/getAll', grpPostShares.getAllShare);



module.exports = router;
