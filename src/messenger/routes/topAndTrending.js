import * as topAndTrending from "../controllers/TopAndTrending.controller";
import express from "express";
const router = express.Router();

// CODE below Developed By linkitsoft

router.post("/Posts", topAndTrending.getAllTPosts);
router.post("/Hashtags", topAndTrending.getAllTHashtag);
router.post("/Stories", topAndTrending.getAllTStory);
router.post("/BusinessPages", topAndTrending.getAllTBusinessPages);
router.post("/Interests", topAndTrending.getAllTInterest);
router.post("/Users", topAndTrending.getAllTusers);
router.post("/CategoryList", topAndTrending.getAllTcategory);
router.post("/SubCategoryList", topAndTrending.getAllTsubcategory);
router.post("/Locations", topAndTrending.getAllTlocation);
router.post("/images", topAndTrending.getAllTImages);
router.post("/videos", topAndTrending.getAllTVideos);
router.post("/all", topAndTrending.getAllTMedia);
router.post("/getusersuggestions", topAndTrending.getAllTUserSuggestions);
// router.post("/podcast", topAndTrending.getAllTPodcast);
router.post("/getbplocations", topAndTrending.getAllTBusinessPageLocations);
router.post("/getsinglehashTag", topAndTrending.getSingleTHashtag);
router.post("/getHeaderHashtag", topAndTrending.getHeaderTHashtag);
router.post("/getalluserLocations", topAndTrending.getAllTUserLocations);
router.post("/media", topAndTrending.getAllTopMedia)
router.post("/podcast", topAndTrending.getAllTopPodcast)

module.exports = router;
