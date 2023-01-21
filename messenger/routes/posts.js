import * as posts from "../controllers/post.controller";
import express from "express";
const router = express.Router();

router.post("/getFeedPosts", posts.getFeedPosts);
router.post("/getFeedData", posts.getFeedData);

router.post("/createPost", posts.createPost);
router.post("/getPostById", posts.getPostById);
router.post("/getAllPosts", posts.getAllPosts);
router.post("/deletePost", posts.deletePost);
router.post("/undoPostDelete", posts.undoPostDelete);
router.post("/setAllowComments", posts.setAllowComments);

router.post("/setPostSaved", posts.setPostSaved);
router.post("/getAllSavedPost", posts.getAllSavedPost);

router.post("/setPostNotification", posts.setPostNotification);
router.post("/getAllDndPost", posts.getAllDndPost);

router.post("/setPostHide", posts.setPostHide);
router.post("/getAllHiddenPost", posts.getAllHiddenPost);
router.post("/undoPostHide", posts.undoPostHide);
router.post("/getAllEventByUserId", posts.getAllEventByUserId);
router.post("/getEventCategoriesTop", posts.getEventCategoriesTop);

router.post("/setLike", posts.setLike);
router.post("/getAllLike", posts.getAllLike);

router.post("/getComments", posts.getComments);
router.post("/addComment", posts.addComment);
router.post("/editComment", posts.editComment);
router.post("/deleteComment", posts.deleteComment);
router.post("/setCommentLike", posts.setCommentLike);
router.post("/reportComment", posts.reportComment);
router.post("/selectUserPollOption", posts.selectUserPollOption);

router.post("/addView", posts.addView);
router.post("/getAllView", posts.getAllView);

router.post("/addShare", posts.addShare);
router.post("/getAllShare", posts.getAllShare);

router.post("/getFriendsToTag", posts.getFriendsToTag);
router.post("/getTaggedUsers", posts.getTaggedUsers);

router.post("/reportPost", posts.reportPost);
router.post("/reportShotzAudio", posts.reportShotzAudio);
router.post("/undoPostReport", posts.undoPostReport);
router.post("/createShotzAudio", posts.createShotzAudio);
router.post("/addShotzAudioToFavourite", posts.addShotzAudioToFavourite);
router.post("/getShotzAudioTrending", posts.getShotzAudioTrending);
router.post("/getShotzAudioPopuler", posts.getShotzAudioPopuler);
router.post("/getShotzAudioRecent", posts.getShotzAudioRecent);
router.post("/getShotzByAudioId", posts.getShotzByAudioId);
router.post("/getShotzRecordingDurations", posts.getShotzRecordingDurations);
router.post("/getShotzAudioCategory", posts.getShotzAudioCategory);
router.post("/getSuggestedShotzByShotzId", posts.getSuggestedShotzByShotzId)
router.post("/addEventCategory", posts.addEventCategory);
router.post("/getEventCategory", posts.getEventCategory);
router.post("/getAlertDistance", posts.getAlertDistance);
router.post("/getAlertLevels", posts.getAlertLevels);

router.post("/getArticleCategory", posts.getArticleCategory);
router.post("/getAllUserPosts", posts.getUserPosts);
router.post("/editPost", posts.editPost);

router.post("/getShotzVideos", posts.getShotzVideos);
router.post("/getPeopleList", posts.getPeopleList);
router.post("/downloadShotzVideo", posts.downloadShotzVideo);
router.post("/getShotzAudioByLocation", posts.getShotzAudioByLocation);
router.post("/archiveShotz", posts.archiveShotz);
router.post("/deleteShotz", posts.deleteShotz);
router.post("/deleteAllShotz", posts.deleteAllShotz);
router.post("/getUserShotz", posts.getUserShotz);

router.post("/getEventById", posts.getEventById);
router.post("/changeEventStatus", posts.changeEventStatus);
router.post("/upcomingEvents", posts.upcomingEvents);
router.post("/inviteFriendsToEvent", posts.inviteFriendsToEvent);
router.post("/getUserEvents", posts.getUserEvents);
router.post("/getEventUserList", posts.getEventUserList);
router.post(
  "/getUserAndGroupsListForEvent",
  posts.getUserAndGroupsListForEvent
);

router.post("/getPollAnalyticsByType", posts.getPollAnalyticsByType);
router.post("/getPollByPostType", posts.getPollByPostType);
router.post("/getPollById", posts.getPollById);

router.post("/recommendPostById", posts.recommendPostById);
router.post("/removeRecommendById", posts.removeRecommendById);
router.post("/reSharePost", posts.reSharePost);
router.post("/removeShare", posts.removeShare);

router.post("/addArticleCategory", posts.addArticleCategory);
router.post("/getSuggestedUsers", posts.getSuggestedUsers);
router.post("/getBusinessPagesByCategory", posts.getBusinessPagesByCategory);
router.post("/shareModulePost", posts.shareModulePost);
router.post("/getWeatherUpdate",posts.getWeatherUpdate)
router.post("/shareFeedPostToOtherModules",posts.shareFeedPostToOtherModules)

router.post("/getNotifications",posts.getNotifications)
router.post("/getUnReadNotificationCount",posts.getUnReadNotificationCount)

module.exports = router;
