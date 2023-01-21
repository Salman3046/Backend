import * as admin from "../controllers/admin.controller";
import * as adminPortal from "../controllers/admin/settings.controller";
import * as reportController from "../controllers/admin/reports.controller";
import * as langController from "../controllers/admin/languageManager.controller";
import * as catgController from "../controllers/admin/categoryManager.controller";
import * as userManagerController from "../controllers/admin/userManager.controller";
import * as rolesPermController from "../controllers/admin/rolesPermissions.controller";
import * as adminController from "../controllers/admin/admin.controller";
import * as featureController from "../controllers/admin/feature.controller";
import * as countryManager from "../controllers/admin/countryManager.controller";
import * as adminDashboard from "../controllers/admin/adminDashboard.controller";
import * as announcement from "../controllers/admin/announcement.controller";
import * as notificationSetting from "../controllers/admin/notificationSettingController";

import express from "express";
import { RolePage } from "twilio/lib/rest/conversations/v1/role";
const router = express.Router();

router.post("/addgeneralsettings", adminPortal.addgeneralSettings);
router.post("/addfileSize", adminPortal.addFileSize);
router.post("/chatsettings", adminPortal.addchatSettings);
router.post("/uploadsettings", adminPortal.addUploadSettings);
router.post("/usersettings", adminPortal.addUserSettings);
router.post("/emailsettings", adminPortal.addEmailSettings);
router.post("/smssettings", adminPortal.addSmsSettings);
router.post("/audiovideosettings", adminPortal.addAudioVideoSettings);
router.post("/sitesettings", adminPortal.addSiteSettings);
router.post("/socialloginsettings", adminPortal.addsocialLoginSettings);
router.post("/currencysettings", adminPortal.addcurrencySettings);
router.post("/notificationsettings", adminPortal.addNotificationSettings);
router.post("/postsettings", adminPortal.addPostSettings);
router.post("/currencysettings", adminPortal.addcurrencySettings);
router.post("/censoredwords", adminPortal.addCensoredWords);
router.post("/commonsettings", adminPortal.addCommonSettings);
router.post("/addPaymentMethod", adminPortal.addPaymentMethodSettings);
router.post("/addInputTypes", adminPortal.createAddInputTypes);
//get apis -->
router.post("/getgeneralSettings", adminPortal.getGeneralSettings);
router.post("/getfileSize", adminPortal.getFileSize);
router.post("/getchatSettings", adminPortal.getChatSettings);
router.post("/getuploadSettings", adminPortal.getUploadSettings);
router.post("/getemailSettings", adminPortal.getEmailSettings);
router.post("/getaudiovideoSettings", adminPortal.getAudioVideoSettings);
router.post("/getuserSettings", adminPortal.getUserSettings);
router.post("/getsiteSettings", adminPortal.getSiteSettings);
router.post("/getnotifcationSettings", adminPortal.getNotificationSettings);
router.post("/getpostSettings", adminPortal.getPostSettings);
router.post("/getsocialloginSettings", adminPortal.getSocialLoginSettings);
router.post("/getsmsSettings", adminPortal.getSmsSettings);
router.post("/getcurrencySettings", adminPortal.getCurrencySettings);
router.post("/getcensoredwords", adminPortal.getCensoredWords);
router.post("/getcommonSettings", adminPortal.getCommonSettings);
router.post("/getallCountry", adminPortal.getAllCountry);
router.post("/getPaymentMethodSettings", adminPortal.getPaymentMethodSettings);
router.post("/getAdvertisementSettings", adminPortal.getAdvertisementSettings);
router.post("/getUserWallet", adminPortal.getUserWallet);
router.post("/updateUserWallet", adminPortal.updateUserWallet);

//update apis -->

router.post("/updategeneralsettings", adminPortal.updateGeneralSettings);
router.post("/updatefilesize", adminPortal.updateFileSize);
router.post("/updateAdvSettings", adminPortal.updateAdvSettings);

router.post("/updatechatsettings", adminPortal.updateChatSettings);
router.post("/updateuploadsettings", adminPortal.updateUploadSettings);
router.post("/updateusersettings", adminPortal.updateUserSettings);
router.post("/updateemailsettings", adminPortal.updateEmailSettings);
router.post("/updatesmssettings", adminPortal.updateSmsSettings);
router.post("/updateaudiovideo", adminPortal.updateAudioVideoSettings);
router.post("/updatesitesettings", adminPortal.updateSiteSettings);
router.post(
  "/updatenotificationsettings",
  adminPortal.updateNotificationSettings
);
router.post("/updatepostsettings", adminPortal.updatePostSettings);
router.post(
  "/updatesocialloginsettings",
  adminPortal.updateSocialLoginSettings
);
router.post("/updatecurrencysettings", adminPortal.updateCurrencySettings);
router.post("/updatecensoredwords", adminPortal.updateCensoredWords);
router.post("/updatecommonsettings", adminPortal.updateCommonSettings);
router.post(
  "/updatePaymentMethodSettings",
  adminPortal.updatePaymentMethodSettings
);

router.post("/updateInputType", adminPortal.updateAdInputType);

// delete apis -->
router.post("/deletecurrency", adminPortal.deleteCurrencySettings);
router.post("/deletecensoredword", adminPortal.deleteCensoredWords);
router.post("/deleteInputType", adminPortal.deleteInputType);
//report apis -->

router.post("/getReports", reportController.getUserReports);
router.post("/getUserReportMore", reportController.getUserReportMore);
router.post("/getMarketReports", reportController.getMarketReportDetails);
router.post("/getUserPostReports", reportController.getUserPostReportDetails);
router.post("/getPostReports", reportController.getPostReports);
router.post("/getPostReportMore", reportController.getPostReportMore);
router.post("/getGrpReports", reportController.getGrpReportsDetails);
router.post("/getGrpPostReport", reportController.getGrpPostReportsDetails);
router.post("/getBpReport", reportController.getBpReportDetails);
router.post("/getBpPostReports", reportController.getBpPostReportDetails);
router.post("/getStrReports", reportController.getStoryReportDetails);
router.post("/removeUserReports", reportController.removeUserReport);
router.post("/removeStoryReports", reportController.removeStoryReport);
router.post("/removeMpReports", reportController.removeMpReport);
router.post("/removeUserPostReports", reportController.removeUserPostReport);
router.post("/removeGrpReports", reportController.removeGrpReport);
router.post("/removeGrpPostReports", reportController.removeGrpPostReport);
router.post("/removeBpReports", reportController.removeBpReport);
router.post("/removeBpPostReports", reportController.removeBpPostReport);

//report action apis -->

router.post("/deleteUserOnReport", reportController.deleteUserOnReport);
router.post("/blockUserOnReport", reportController.blockUserOnReport);
router.post("/deleteStoryOnReport", reportController.deleteStoryOnReport);
router.post("/deletePostOnReport", reportController.deletePostOnReport);
router.post("/blockPostOnReport", reportController.blockPostOnReport);
router.post("/deleteBpOnReport", reportController.deleteBpOnReport);
router.post("/deleteBpPostOnReport", reportController.deleteBpPostOnReport);
router.post("/deleteGrpOnReport", reportController.deleteGrpOnReport);
router.post("/deleteGrpPostOnReport", reportController.deleteGrpPostOnReport);

//report post view apis -->

// router.post("/viewPost", reportController.viewPost);
// router.post("/viewStory", reportController.viewStory);
// router.post("/viewBusinessPage", reportController.viewBp);
// router.post("/viewBpPost", reportController.viewBpPost);
// router.post("/viewUser", reportController.viewUser);
// router.post("/viewGrp", reportController.viewGrp);
// router.post("/viewGrpPost", reportController.viewGrpPost);
// router.post("/viewMp", reportController.viewMp);

//language manager apis -->

router.post("/addLanguage", langController.addLang);
router.post("/getLanguage", langController.getLanguage);
router.post("/getLangModules", langController.getLangModules);
router.post("/getLangById", langController.getLangById);
router.post("/getModuleById", langController.getModuleById);
router.post("/updateValue", langController.updateValue);
router.post("/removeLanguage", langController.removeLanguage);
router.post("/updateLanguage", langController.updateLanguageSettings);

// category manager apis -->

router.post("/getArticleCategory", catgController.getArticleCategory);
router.post(
  "/getMpCategoryAndSubCategory",
  catgController.getMarketPlaceCategories
);
router.post(
  "/editUpdateArticleCategory",
  catgController.editDeleteArticleCategory
);
router.post("/getMpSubCategory", catgController.getMpSubCategory);
router.post("/getBpSubCategory", catgController.getBpSubCategory);
router.post("/getBpCategory", catgController.getBusinessPageCategories);
router.post("/getPodcastCategory", catgController.getPodCastCategory);
router.post("/editBpCatSub", catgController.editDeleteBpCategory);
router.post("/editBpSubCat", catgController.editDeleteBpSubCategory);
router.post("/getSubChildCategory", catgController.getSubChildCategory);
router.post(
  "/editDeletePostEventCategory",
  catgController.editDeletePostEventCategory
);
router.post("/editMpCategory", catgController.editDeleteMpCategory);
router.post("/editMpSubCategory", catgController.editDeleteMpSubCategory);
router.post(
  "/editMpSubChildCategory",
  catgController.editDeleteMpSubChildCategory
);
router.post("/editUpdatePcCategory", catgController.editDeletePodcastCategory);
router.post("/getPostEventCategory", catgController.getPostEventCategory);

router.post("/createBpCategory", catgController.createBpCategory);
router.post("/createBpSubCategory", catgController.createBpSubCategory);
router.post("/createArticleCategory", catgController.createArticleCategory);
router.post("/createPodCastCategory", catgController.createPodCastCategory);
router.post("/createPostEventCategory", catgController.createPostEventCategory);
router.post("/createMpCategory", catgController.createMarketPlaceCategory);
router.post(
  "/createMpSubCategory",
  catgController.createMarketPlaceSubCategory
);
router.post(
  "/createMpSubChildCategory",
  catgController.createMarketPlaceSubChildCategory
);
router.post("/createMpAtts", catgController.createMpAtts);

router.post("/countCategory", catgController.countCategory);
router.post("/countForPagination", catgController.countForPagination);
//route for restore the deleted category with a req parameter type
router.post("/restoreCategory", catgController.restoreCategory);
router.post("/getCategory", catgController.getCategory);
router.post("/getRequestedCategory", catgController.getRequestedCategory);
router.post("/getCategorywithimage", catgController.getCategorywithimage);
router.post("/getDeletedCategory", catgController.getDeletedCategory);
router.post("/addCategory", catgController.addCategory);
router.post("/addCategoryWithImage", catgController.addCategoryWithImage);
router.post("/removeCategory", catgController.removeCategory);
router.post("/editCategory", catgController.editCategory);
router.post("/editCategoryWithImage", catgController.editCategoryWithImage);
router.post("/getInterestCategory", catgController.getInterestCategory )
router.post("/addInterestCategory", catgController.addInterestCategory )
router.post("/editInterestCategory", catgController.editInterestCategory )

//route for admin Activity log
router.post("/getAdminActivityLog", catgController.getAdminActivityLog);
router.post("/addAdminActivityLog", catgController.addAdminActivityLog);
router.post("/postFeedGetAdminActivityLog", catgController.postFeedGetAdminActivityLog);

router.post("/getFeelingCategory", catgController.getFeelingCategory);
router.post("/createFeelingCategory", catgController.createFeelingCategory);
router.post(
  "/editUpdateFeelingCategory",
  catgController.editDeleteFeelingCategory
);
router.post(
  "/updateFeelingCatgSequence",
  catgController.updateFeelingCatgSequence
);

router.post("/updateMpCategorySequence", catgController.updateCatgSequence);
router.post("/updateSubCatgSequence", catgController.updateSubCatgSequence);
router.post("/deleteMpAttribute", catgController.deleteMpAtts);
router.post("/updateMpAttribute", catgController.updateMpAttribute);
router.post("/updateBpCatgSequence", catgController.updateBpCatgSequence);
router.post("/updateBpSubCatgSequence", catgController.updateBpSubCatgSequence);

//userMANAGER apis -->

router.post("/getOnlineUsers", userManagerController.getOnlineUsers);
router.post("/getUserCount", userManagerController.getUserCount);
router.post("/getAllUser", userManagerController.getAllUser);
router.post("/getAllStories", userManagerController.getAllStories);
router.post("/removeUser", userManagerController.removeUser);
router.post("/getUser", userManagerController.getUserInfo);
router.post("/addColorCategory", catgController.addColorCategory);
router.post("/getUserAllStories", userManagerController.getUserAllStories);
router.post("/reactiveUser", userManagerController.reActiveUser);
router.post("/getUserSessionDetails", userManagerController.getUserSessionDetails);
router.post("/getUserDetailsLog", userManagerController.getUserDetailsLog);

//roles and permissions

router.post("/addRole", rolesPermController.addRole);
router.post("/getRoles", rolesPermController.getAllRoles);
router.post("/addRolePermissions", rolesPermController.addRolePermissions);
router.post("/getRolePermissions", rolesPermController.getRolesWithPermissions);
router.post("/deleteRole", rolesPermController.deleteRole);
router.post("/assignRole", rolesPermController.assignRole);
router.post("/editRole", rolesPermController.editRole);

//admin manager

router.post("/addAdmin", adminController.addAdmin);
router.post("/getAdmins", adminController.getAdmins);
router.post("/editAdmin", adminController.updateDeleteAdmin);
router.post("/editAdminStatus", adminController.updateAdminStatus);
router.post("/geoLocation", adminController.geoLocation);

//admin dashboard

router.post("/getAllUserDashboard", adminDashboard.getAllUser);
router.post("/getAllUsersDashboard", adminDashboard.getAllUsers);
router.post("/getReportedUsers", adminDashboard.getReportedUsers);
router.post("/getInactiveUsers", adminDashboard.getInactiveUsers);

//feature

router.post("/addSticker", featureController.addSticker);
router.post("/updateSticker", featureController.updateSticker);
router.post("/getSticker", featureController.getSticker);
router.post("/getStickerById", featureController.getStickerById);
router.post("/getIconByPackId", featureController.getIconByPackId);
router.post("/addPackCategory", featureController.addCategory);
router.post("/deleteSticker", featureController.deleteSticker);
router.post("/getTopPosts", featureController.getTopPosts);
router.post("/getTrendingPosts", featureController.getTrendingPosts);

router.post("/getAds", featureController.getAds);
router.post("/getInvoiceById", featureController.getInvoiceById);
router.post("/deleteAd", featureController.deleteAd);
router.post("/stopAd", featureController.stopAd);
router.post("/resumeAd", featureController.resumeAd);
router.post("/rejectAd", featureController.rejectAd);
router.post("/approveAd", featureController.approveAd);
router.post("/billingHistory", featureController.billingHistory);
router.post("/gettopAds", featureController.gettopAds);
router.post("/gettopCreators", featureController.gettopCreators);
router.post("/getPageCounts", featureController.getPageCounts);
router.post(
  "/getPageCountsWithConditions",
  featureController.getPageCountsWithConditions
);
router.post(
  "/getBusinessPageDetails",
  featureController.getBusinessPageDetails
);
router.post("/getGroupDetails", featureController.getGroupDetails);
router.post("/getPostDetails", featureController.getPostDetails);
router.post("/getEventDetails", featureController.getEventDetails);
router.post("/getEventCount", featureController.getEventCount);
router.post("/getGoLiveDetails", featureController.getGoLiveDetails);
router.post("/getArticleDetails", featureController.getArticleDetails);
router.post("/getFeelingsDetails", featureController.getFeelingsDetails);
router.post("/getMarketPlaceDetails", featureController.getMarketPlaceDetails);
router.post("/getPollDetails", featureController.getPollDetails);
router.post("/getShotzDetails", featureController.getShotzDetails);
router.post("/getShotzCount", featureController.getShotzCount);
router.post("/getGoLiveCount", featureController.getGoLiveCount);
router.post("/getAlertDetails", featureController.getAlertDetails);
router.post("/getMarketPlaceCount", featureController.getMarketPlaceCount);
router.post("/getArticleCount", featureController.getArticleCount);
router.post("/getPostTableCount", featureController.getPostTableCount);
router.post("/getThoughtDetails", featureController.getThoughtDetails);
router.post(
  "/getRecommendationDetails",
  featureController.getRecommendationDetails
);
router.post("/getPostDetailsById", featureController.getPostDetailsById);
router.post("/getAllLikesByPostId", featureController.getAllLikesByPostId);
router.post(
  "/getAllCommentsByPostId",
  featureController.getAllCommentsByPostId
);
router.post("/getAllSharesByPostId", featureController.getAllSharesByPostId);
router.post("/removeLikes", featureController.removeLikes);
router.post("/removeComments", featureController.removeComments);
router.post("/removeShares", featureController.removeShares);
router.post("/getEventsAnalytics", featureController.getEventsAnalytics);
router.post("/removeEventStatus", featureController.removeEventStatus);
router.post("/getPollAnalytics", featureController.getPollAnalytics);
router.post("/removePollPostOptions", featureController.removePollPostOptions);
router.post("/removePollPostVote", featureController.removePollPostVote);
router.post(
  "/getMarketPlaceProductById",
  featureController.getMarketPlaceProductById
);
router.post(
  "/getAllAnalyticsOfMarketPlace",
  featureController.getAllAnalyticsOfMarketPlace
);
router.post(
  "/removeAnalyticsOfMarketPlace",
  featureController.removeAnalyticsOfMarketPlace
);
router.post("/getGroupDetailsById", featureController.getGroupDetailsById);
router.post("/getGroupAnalytics", featureController.getGroupAnalytics);
router.post(
  "/removeFromGroupAnalytics",
  featureController.removeFromGroupAnalytics
);

//country manager
router.post("/addCountry", countryManager.addCountry);
router.post("/getAllCountryAdmin", countryManager.getAllCountry);
router.post("/editRemoveCountry", countryManager.editRemoveCountry);

//payment Method

// FAQ
router.post("/getFaqList", featureController.getFaqList);
router.post("/addToFaqList", featureController.addToFaqList);
router.post("/editFaqList", featureController.editFaqList);

//announcement module
router.post("/addAnnouncement", announcement.addAnnouncement);
router.post("/getAnnouncements", announcement.getAnnoucnements);
router.post("/getAnnoucnementRecipent", announcement.getAnnoucnementRecipent);
router.post("/editAnnouncement", announcement.editAnnouncement);
router.post("/deleteAnnouncement", announcement.deleteAnnouncement);

//adult image settings

router.post("/getAdultImageSettings", announcement.getAdultImageSetting);
router.post("/updateAdultImageSettings", announcement.updateAdultImageSetting);

// notificationSetting ( Template )
router.post(
  "/addNotificationSetting",
  notificationSetting.addNotificationSetting
);
router.post(
  "/getNotificationSettings",
  notificationSetting.getNotificationSettings
);
router.post(
  "/updateNotificationStatus",
  notificationSetting.updateNotificationStatus
);
router.post(
  "/getNotificationSettingsById",
  notificationSetting.getNotificationSettingsById
);


//Report Options
router.post("/getReportOptionsByType", reportController.getReportOptionsByType);
router.post("/addReport", reportController.addReport);
router.post("/deleteReport", reportController.deleteReport);
router.post("/getReportById", reportController.getReportById);
router.post("/updateReport", reportController.updateReport);


// Feelings
router.post("/getFeelingsAndActivites", catgController.getFeelingsAndActivites);
router.post("/addFeelingsAndActivites", catgController.addFeelingsAndActivites);
router.post("/updateFeelingsAndActivites", catgController.updateFeelingsAndActivites);
router.post("/deleteFeelingsAndActivites", catgController.deleteFeelingsAndActivites);


// router.post("/getEventDetails", featureController.getEventDetails);
router.post("/getMediaDetails", featureController.getMediaDetails);
router.post("/deleteMediaDetails", featureController.deleteMediaDetails);


// Post Feed -> Articles->Routes
router.post("/deletePostFeedArticle", featureController.deletePostFeedArticle);
router.post("/updatePostFeedArticle", featureController.updatePostFeedArticle);
router.post("/getPostFeedArticleById", featureController.getPostFeedArticleById);
router.post("/deletedPostFeedArticleList", featureController.deletedPostFeedArticleList);
router.post("/getPostFeedArticlePostEng", featureController.getPostFeedArticlePostEng);
router.post("/deletedPostFeedPostsRestore", featureController.deletedPostFeedPostsRestore);
// router.post("/filterPostFeedArticle", featureController.filterPostFeedArticle);

// Post Feed -> BussinessPage -> Routes
router.post("/deletePostFeedBp", featureController.deletePostFeedBp);
router.post("/getPostFeedBpById", featureController.getPostFeedBpById);
router.post("/updatePostFeedBp", featureController.updatePostFeedBp);
router.post("/deletedPostFeedBpList", featureController.deletedPostFeedBpList);
router.post("/deletedPostFeedBpRestore", featureController.deletedPostFeedBpRestore);
router.post("/ratingPostFeedBpUserList", featureController.ratingPostFeedBpUserList);
router.post("/followersPostFeedBpUserList", featureController.followersPostFeedBpUserList);

// Post Feed->Event->Routes
router.post("/deletePostFeedEvent", featureController.deletePostFeedEvent);
router.post("/getPostFeedEventById", featureController.getPostFeedEventById);
router.post("/updatePostFeedEvent", featureController.updatePostFeedEvent);
router.post("/getEventStatusDetails", featureController.getEventStatusDetails);
// router.post("/deletedPostFeedEventList", featureController.deletedPostFeedEventList);

// Post Feed->golive->Routes
router.post("/deletePostFeedGoLive", featureController.deletePostFeedGoLive);
router.post("/deletedPostFeedGoLiveList", featureController.deletedPostFeedGoLiveList);
// router.post("/getPostFeedGoLiveById", featureController.getPostFeedGoLiveById);

// Post Feed->marketPlace->Routes
router.post("/deletedPostFeedMarketPlaceList", featureController.deletedPostFeedMarketPlaceList);
router.post("/deletePostFeedMarketPlace", featureController.deletePostFeedMarketPlace);
router.post("/deletedPostFeedMarketPlaceRestore", featureController.deletedPostFeedMarketPlaceRestore);

// Post Feed->group->Routes
router.post("/deletedPostFeedGroupList", featureController.deletedPostFeedGroupList);
router.post("/deletePostFeedGroup", featureController.deletePostFeedGroup);
router.post("/deletedPostFeedGroupRestore", featureController.deletedPostFeedGroupRestore);
router.post("/invitedMemberPostFeedGroupList", featureController.invitedMemberPostFeedGroupList);
router.post("/totalMemberPostFeedGroupList", featureController.totalMemberPostFeedGroupList);
router.post("/groupDetailById", featureController.groupDetailById);
router.post("/updatePostFeedGroup", featureController.updatePostFeedGroup);



module.exports = router;