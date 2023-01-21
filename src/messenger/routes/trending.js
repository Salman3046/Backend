import * as Trending from "../controllers/Trending.controller";
import express from "express";
const router = express.Router();

// CODE below Developed By linkitsoft

router.post("/Posts", Trending.getAllTPosts);
router.post("/Hashtags", Trending.getAllTHashtag);
router.post("/Stories", Trending.getAllTStory);
router.post("/BusinessPages", Trending.getAllTBusinessPages);
router.post("/Interests", Trending.getAllTInterest);
router.post("/Users", Trending.getAllTusers);
router.post("/CategoryList", Trending.getAllTcategory);
router.post("/SubCategoryList", Trending.getAllTsubcategory);
router.post("/Locations", Trending.getAllTlocation);
router.post("/images", Trending.getAllTImages);
router.post("/videos", Trending.getAllTVideos);
router.post("/all", Trending.getAllTMedia);
router.post("/getusersuggestions", Trending.getAllTUserSuggestions);
// router.post("/podcast", Trending.getAllTPodcast);
router.post("/getsinglehashTag", Trending.getSingleTHashtag);
router.post("/media", Trending.getTrendingMedia)
router.post("/podcast", Trending.getTrendingPodcast)

module.exports = router;
