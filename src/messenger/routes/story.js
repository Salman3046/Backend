import * as story from "../controllers/story.controller";
import express from "express";
const router = express.Router();

router.post("/listStories", story.listStories);
router.post("/likeStory", story.likeStory);
router.post("/storyViews", story.storyViews);
router.post("/createStory", story.createStory);
router.post("/createMediaStory", story.createMediaStory);
router.post("/storyshow", story.UserStories);
router.post("/changeSettings", story.changeSettings);
router.post("/deleteStory", story.deleteStory);
router.post("/reportStory", story.reportStory);
router.post("/storyViewed", story.storyViewed);
router.post("/likeUserList", story.likeUserList);
router.post("/commentOnStory", story.addComment);
router.post("/shareStoryOfUser", story.sharingStoryOfUser);
router.post("/sharePostToStory", story.sharingPostToStory);
router.post("/shareStoryToUser", story.sharingStoryToUser);
router.post("/singleStoryView", story.singleStoryView);
router.post("/getfriendstotag", story.getFriendsToTag);
router.post("/getStickers", story.getStickerImages);
router.post("/deleteStrShare", story.deleteStrShare);
router.post("/getVisibilityCategory", story.getVisibilityCategory);

//router.post("/addComment", story.)

router.post("/");

module.exports = router;
