import express from "express";
const router = express.Router();
import * as podCastCategory from '../controllers/Podcast/pcCategory.controller';
import * as pcSeries from '../controllers/Podcast/pcSeries.controller';
import * as pcLive from '../controllers/Podcast/pcLives.controller';
import * as pcComments from '../controllers/Podcast/pcComments.controller';
import * as pcLikes from '../controllers/Podcast/pcLikes.controller';
import * as pcShare from '../controllers/Podcast/pcShare.controller';
import * as pcCoverImages from '../controllers/Podcast/pcCoverImages.controller';

router.post('/createCategory', podCastCategory.createPodCastCategory);
router.post('/getAllCategory', podCastCategory.getAllPodCastCategory);
router.post('/createSeries', pcSeries.createPodcastSeries);
router.post('/createSeason', pcSeries.createPodcastSeason);
router.post('/createEpisode', pcSeries.createPodcastEpisode);
router.post('/getAllSeason', pcSeries.getAllSeasionsAndEpisodsBySerisId);
router.post('/updateEpisode', pcSeries.UpdatePodcastEpisode);
router.post('/updateSeries', pcSeries.UpdatePodcastSeries);
router.post('/getAllSeriesByUserId', pcSeries.getAllSerisByUserId);
router.post('/browseByCategory', pcSeries.browseByCategory);
router.post('/browseByCategory', pcSeries.browseByCategory);
router.post('/createLive', pcLive.createPodCastLive);
router.post('/joinLive', pcLive.JoinPcLive);
router.post('/addLiveComment', pcLive.comment);
router.post('/deleteLiveComment', pcLive.deleteCommentOnLivePc);
router.post('/setPcLiveComment', pcLive.setAllowComments);
router.post('/getLiveComments', pcLive.getComments);
router.post('/setLiveLike', pcLive.like);
router.post('/setLike', pcLikes.like);
router.post('/getAllLikes', pcLikes.getAllLikes)
router.post('/addComment', pcComments.comment);
router.post('/deleteComment', pcComments.deleteComment);
router.post('/getComments', pcComments.getComments);
router.post('/editComment', pcComments.editComment);
router.post('/getAllSubComments', pcComments.getAllSubComments);
router.post('/reportUnReportComment', pcComments.reportUnReportComment);
router.post('/setCommentLike', pcComments.setCommentLike)
router.post('/addShare', pcShare.addShare);
router.post('/live/leave', pcLive.leavePcLive);
router.post('/live/viewers', pcLive.getViewers);
router.post('/live/end', pcLive.endPcLive);
router.post('/live/details', pcLive.getpcLiveDetails);
router.post('/exploreByCategoryByType', pcSeries.exploreByCategoryByType);
router.post('/deleteEpisode', pcSeries.deletedSingalEpisode);
router.post('/deleteSeries', pcSeries.deleteSeries);
router.post('/getAnalyticsByType', pcSeries.getSingalPodcastAnalyticsByType);
router.post('/getSeriesById', pcSeries.getPcSeriesById);
router.post('/pcLiveAddCommentReport', pcLive.addCommentReport);
router.post('/pcLivePinComment', pcLive.pinComment);
router.post('/removeUserPcLive', pcLive.removeUserFromPcLive);
router.post('/addPcCoverImages', pcCoverImages.addPcCoverImages);
router.post('/getPcCoverImages', pcCoverImages.getPcCoverImages);
router.post('/getPcLivePinComment', pcLive.getPinnedComments);
router.post('/pcLiveShare', pcLive.share);
router.post('/getSingalPcAnalytics', pcSeries.getSingalPodcastAnalyticsDetails);
router.post('/getPodcastSuggestion', pcSeries.getPodcastSuggestions);
router.post('/addPodcastListener', pcSeries.addPodcastListener);
router.post('/getPodcastEpisodeDetails', pcSeries.getPodcastEpisodeDetails);
router.post('/getPodcastSeriesDetails', pcSeries.getPodcastSeriesDetails);
router.post('/getPodcastEpisodeAnalytics', pcSeries.getPodcastEpisodeAnalytics);
router.post('/addPodcastInSeries', pcSeries.addPodcastInSeries);
router.post('/getSuggestedPodcast', pcSeries.getSuggestedPodcast);
router.post('/bookmarkPodcastSeries', pcSeries.bookmarkPodcastSeries)
router.post('/reportPodcast', pcSeries.reportPodcast)

module.exports = router;