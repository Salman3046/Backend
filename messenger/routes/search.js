import * as search from "../controllers/search.controller";
import express from "express";
const router = express.Router();

//search filters
router.post("/users", search.searchUsers);
router.post("/pages", search.searchPages);
router.post("/groups", search.searchGroups);
router.post("/videos", search.searchVideos);
router.post("/images", search.searchImages);
router.post("/articles", search.searchArticle);
router.post("/hashtags", search.searchHashTags);
router.post("/market", search.searchMarket);
router.post("/bpevents", search.searchbpEvents);
router.post("/grpevents", search.searchgrpEvents);
router.post("/all", search.searchAll);
router.post("/music", search.searchMusic);
router.post("/shotz", search.searchShotz);
router.post("/addsearchHistory", search.addSearchHistory);
router.post("/deletesearchHistory", search.deleteSearchHistory);
router.post("/searchHashtagPosts", search.searchHastagPosts);
router.post("/feedEvents",search.feedEvents)
router.post("/media",search.searchMedia)
router.post("/podcast",search.searchPodcast)

//get apis for search filters
router.post("/getlocations", search.getLocations);
router.post("/getinterests", search.getInterest);
router.post("/getpagecategory", search.getCategory);
router.post("/getpagesubcategory", search.getSubCategory);
router.post("/getgroupcategory", search.getGroupCategory);
router.post("/getusersuggestions", search.getUserSuggestions);
router.post("/getrecentsearch", search.getRecentSearch);
router.post("/geteventcategory", search.getEventCategory);
router.post("/getpodcastcategory", search.getPodcastCategory);

module.exports = router;
