import * as bpManagerController from "../controllers/bpManager/bp.controller";
import * as bpMasterController from "../controllers/bpManager/bpMaster.controller";
import * as bpValidator from "../controllers/bpManager/bp.validator";
import * as comonValidator from "./../helpers/comon.validator";
import * as userController from "../controllers/users.controller";
import express from "express";
import { validate } from "express-validation";
const router = express.Router();

router.post(
  "/create/category",
  validate(bpValidator.createCategory, {
    keyByField: true,
  }),
  bpMasterController.createBusinessCategory
);

router.post("/active/category", bpMasterController.getBusinessCategory);
router.post("/all/category", bpMasterController.getAllBusinessCategory);

//Rahul
router.post("/getAllCategory", bpMasterController.getAllCategory);
router.post("/getAllSubCategory", bpMasterController.getAllSubCategory);


router.post(
  "/delete/category/:id",
  validate(comonValidator.getbyId, {
    keyByField: true,
  }),
  bpMasterController.deleteBusinessCategory
);

router.post(
  "/update/category/:id",
  validate(bpValidator.updateCategory, {
    keyByField: true,
  }),
  bpMasterController.updateBusinessCategory
);

router.post(
  "/create/subCategory",
  validate(bpValidator.createSubCategory, {
    keyByField: true,
  }),
  bpMasterController.createBusinessSubCategory
);

router.post("/active/subCategory", bpMasterController.getBusinessSubCategory);
router.post(
  "/active/subCategory/by",
  bpMasterController.getBusinessSubCategoryBy
);

router.post("/all/subCategory", bpMasterController.getAllBusinessSubCategory);

router.post(
  "/delete/subCategory/:id",
  validate(comonValidator.getbyId, {
    keyByField: true,
  }),
  bpMasterController.deleteBusinessSubCategory
);

router.post(
  "/update/subCategory/:id",
  validate(bpValidator.updateSubCategory, {
    keyByField: true,
  }),
  bpMasterController.updateBusinessSubCategory
);

router.post("/create/mediaPosts", bpManagerController.createPost);
router.post("/create/business", bpManagerController.addBuisness);
router.post("/create/coverPhoto", bpManagerController.addCoverPhoto);
router.post("/create/address", bpManagerController.addAddress);
router.post("/delete/address", bpManagerController.deleteAddress);
router.post("/delete/coverphoto", bpManagerController.deleteCoverSlider);
router.post("/update/address", bpManagerController.updateAddress);
router.post("/update/coverphoto", bpManagerController.updateCoverPhoto);
router.post("/get/buisness/by", bpManagerController.getBuisnessBy);
router.post("/create/businessPage", bpManagerController.createBusinessPage);

//dev by linkitsoft

router.post("/getpagedetails", bpManagerController.getBusinessDetails);
router.post("/createReview", bpManagerController.addReview);
router.post("/review", bpManagerController.showReviews);
router.post("/editReview", bpManagerController.editReviews);
router.post("/showOverView", bpManagerController.showOverView);
router.post("/showPosts", bpManagerController.showPosts);
router.post("/showCatalogue", bpManagerController.showCatlogue);
router.post("/showCatalogueById", bpManagerController.showCatlogueById);
router.post("/showCatalogueMedia", bpManagerController.showCatlogueMedia);
router.post("/aboutUs", bpManagerController.aboutUs);
router.post("/addComment", bpManagerController.addComment);
router.post("/showComments", bpManagerController.showComments);
router.post("/editComment", bpManagerController.editComment);
router.post("/editPhoto", bpManagerController.editPhotos);
router.post("/addLike", bpManagerController.addLike);
router.post("/showlikes", bpManagerController.showLikes);
router.post("/removeLike", bpManagerController.removeLike);
router.post("/getRatingCount", bpManagerController.getRatingCount);
router.post("/followerList", bpManagerController.getTotalFollowers);
router.post("/getCategory", bpManagerController.getAllCategories);
router.post("/getvisitors", bpManagerController.getVisitors);
router.post("/updateSummary", bpManagerController.bpUpdateSummary);
router.post("/editPageInfo", bpManagerController.editPageInfo);
router.post("/updateEmail", bpManagerController.bpUpdateEmail);
router.post("/createCatalogue", bpManagerController.createCatalogue);
router.post("/addCatalogueMedia", bpManagerController.addCatalogueMedia);
router.post("/deleteCatalogue", bpManagerController.deleteCatalogue);
router.post("/deleteCatalogueMedia", bpManagerController.deleteCatalogueMedia);
router.post(
  "/deleteMediaFromCatalogue",
  bpManagerController.deleteMediaFromCatalogue
);
router.post("/getallwebsiteURL", bpManagerController.getAllWebURL);
router.post("/getallemails", bpManagerController.getAllEmails);
router.post("/getallcontactnumbers", bpManagerController.getAllContactNumbers);
router.post("/addEditwebsiteurl", bpManagerController.addWebURL);
router.post("/addEmail", bpManagerController.addEmail);
router.post("/deleteWebUrl", bpManagerController.deleteWebUrl);
router.post("/deleteEmail", bpManagerController.deleteEmail);
router.post("/deleteMobile", bpManagerController.deleteMobile);
router.post("/addNumber", bpManagerController.addNumber);
router.post("/updateNumber", bpManagerController.updateNumber);
router.post("/addEditBpHours", bpManagerController.addEditBpHours);
router.post("/addAdditionalInfo", bpManagerController.addAdditionalInfo);
router.post("/editAdditionalInfo", bpManagerController.editAdditionalInfo);
router.post("/getAdditionalInfo", bpManagerController.getAdditionalInfo);
router.post("/getFAQ", bpManagerController.getFAQ);
router.post("/getViewerFAQ", bpManagerController.getViewerFAQ);
router.post("/ansFAQ", bpManagerController.ansFAQ);
router.post("/addquesAns", bpManagerController.addQuesAns);
router.post("/updatebpLogo", bpManagerController.updateBpLogo);
router.post("/addCoverSlider", bpManagerController.addCoverSlider);
router.post("/generalSettings", bpManagerController.generalSettings);
router.post("/messageSettings", bpManagerController.messageSettings);
router.post("/addMessageSettings", bpManagerController.addMessageSettings);
router.post(
  "/updateMessageSettings",
  bpManagerController.UpdateMessageSettings
);
router.post("/getAllPageAdmin", bpManagerController.getAllBpAdmin);
router.post("/getallblockedUsers", bpManagerController.getAllBlockedPeople);
router.post("/getPageHistory", bpManagerController.getAllPageHistory);
router.post("/blockUnblockPeople", bpManagerController.blockUnblockPeople);
router.post("/unblockAll", bpManagerController.unblockAll);
router.post("/assignRole", bpManagerController.assignRole);
router.post("/notificationSettings", bpManagerController.notificationSettings);
router.post("/setupButtons", bpManagerController.setupButtons);
router.post("/removeUser", bpManagerController.removeUserFromBusinessPage);
router.post("/sendOtp", bpManagerController.sendOtp);
router.post("/verifyOtp", bpManagerController.verifyOtp);
router.post("/getBusinessTime", bpManagerController.getBusinessTime);
router.post("/deletebp", bpManagerController.deleteBusinessPage);
router.post("/bpReportOptions", bpManagerController.getBpReportOptions);
router.post("/reportBp", bpManagerController.reportBusinessPage);
router.post("/followBp", bpManagerController.followBusinessPage);
router.post("/addEditBpAddress", bpManagerController.addEditBpAddress);
router.post("/askQuestion", bpManagerController.askQuestion);
router.post("/invitePeople", bpManagerController.invitePeople);
router.post("/setBusinessStatus", bpManagerController.setBusinessStatus);
router.post("/getUserFriends", userController.getUserFriends);
router.post("/getAllComments", bpManagerController.getAllCommentsOfPost);
router.post("/getAllSubComments", bpManagerController.getAllSubCommentsOfPost);
router.post("/updatePost", bpManagerController.updatePost);
router.post("/reviewReply", bpManagerController.reviewReply);
router.post("/addRemoveBookmark", bpManagerController.addRemoveBookmark);
router.post("/commentReport", bpManagerController.addCommentReport);
router.post("/likeDislikeComment", bpManagerController.likeDislikeComment);
router.post("/reviewHelpfull", bpManagerController.reviewHelpFull);
//router.post("/reportReview", bpManagerController.reportReview);
router.post("/getReportReviewOptions", bpManagerController.reportOptions);
router.post("/reportReview", bpManagerController.reportReview);
router.post("/undoRemoveUser", bpManagerController.undoRemoveUser);
router.post("/notificationUser", bpManagerController.notificationForUser);
router.post("/getEvents", bpManagerController.getEvents);
router.post("/deleteBpPost", bpManagerController.deleteBpPost);
router.post("/allowComment", bpManagerController.allowComment);
router.post("/allowPostNotif", bpManagerController.allowPostNotif);
router.post("/reportPost", bpManagerController.reportPost);
router.post("/getLikesOfPost", bpManagerController.getLikesOfPost);
router.post("/deleteComment", bpManagerController.deleteCommentFromPost);
router.post("/editReviewReply", bpManagerController.editReviewReply);
router.post("/getReviewRepliesById", bpManagerController.getReviewReply);
router.post("/deleteReviewReply", bpManagerController.deleteReviewReply);
router.post("/markReviewReplyHelpful", bpManagerController.reviewReplyHelpFull);
router.post("/addViewToCatalogue", bpManagerController.addViewToCatalogue);
router.post("/getSinglePost", bpManagerController.getSinglePost);
router.post("/addToShareCount",bpManagerController.addToShareCount)

module.exports = router;
