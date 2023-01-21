import * as goLive from "../controllers/goLive.controller";
import express from "express";
const router = express.Router()

router.post('/getCategories', goLive.getCategories)
router.post('/getGoLiveById', goLive.getGoLiveById)
router.post('/getGoLiveByConnectionId', goLive.getGoLiveByConnectionId)
router.post('/getGoLiveByCategoryId', goLive.getGoLiveByCategoryId)
router.post('/getGoLiveCategoriesTop', goLive.getGoLiveCategoriesTop)
router.post('/isLive', goLive.isLive)
router.post('/start', goLive.start)
router.post('/end', goLive.end)
router.post('/comment', goLive.comment)
router.post('/getComments', goLive.getComments)
router.post('/setAllowComments', goLive.setAllowComments)
router.post("/commentReport", goLive.addCommentReport);
router.post("/deleteComment",goLive.deleteComment)
router.post("/pinComment",goLive.pinComment)
router.post("/getPinnedComments",goLive.getPinnedComments)
router.post('/like', goLive.like)
router.post('/share', goLive.share)
router.post('/getViewers', goLive.getViewers)
router.post('/join', goLive.JoinLive)
router.post('/leave', goLive.leaveLive)
router.post('/removeUserFromGoLive', goLive.removeUserFromGoLive)
router.post('/addThumbnail',goLive.addThumbnail)
router.post('/getGoLiveStatus',goLive.getGoLiveStatus)
router.post('/updateGoLiveSettings',goLive.updateGoLiveSettings)

module.exports = router