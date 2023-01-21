import * as admanager from "../controllers/adManager/admanager.controller";
import * as adMaster from "../controllers/adManager/adMaster.controller";
import * as adManagerValidator from "../controllers/adManager/adManager.validator";
import * as comonValidator from "../helpers/comon.validator";

import express from "express";
import { validate } from "express-validation";
const router = express.Router();

router.post("/create/adMaster", adMaster.create);
router.post("/adMaster", adMaster.get);

router.post("/create/adMaster/adType", adMaster.createAdType);
router.post("/adMaster/adType", adMaster.getAdType);
router.post(
  "/adMaster/by/:id",
  validate(comonValidator.getbyId, {
    keyByField: true,
  }),
  adMaster.getAdTypeByAdMaterType
);

router.post("/create/adMaster/adType/subTypes", adMaster.createSubAdType);
router.post("/adMaster/adType/subTypes", adMaster.getSubAdType);
router.post("/adMaster/adType/subTypes/by/", adMaster.getSubAdTypeByAdTypes);

router.post(
  "/create/adMaster/adType/subTypes/intrests",
  adMaster.createIntrests
);
router.post("/adMaster/adType/subTypes/intrests", adMaster.getAllInterests);

router.post(
  "/create/adMaster/adType/subTypes/professions",
  adMaster.createProfessions
);
router.post(
  "/adMaster/adType/subTypes/professions",
  adMaster.getAllProfessionList
);

router.post(
  "/create/adMaster/adType/subTypes/preferrences",
  adMaster.createPreferrences
);
router.post(
  "/adMaster/adType/subTypes/preferrences",
  adMaster.getAllPreferences
);

router.post(
  "/create/adMaster/adType/subTypes/CallToActionMaster",
  adMaster.createCallToActionMaster
);
router.post(
  "/adMaster/adType/subTypes/CallToActionMaster",
  adMaster.getAllCallToActionMaster
);

/**
 * Add manager
 */

router.post(
  "/create/adMaster/adType/subTypes/adManager",
  // validate(adManagerValidator.createAd, {
  //   keyByField: true,
  // }),
  admanager.createAd
);
router.post("/adMaster/adType/subTypes/adManager/by", admanager.getAd);
router.post(
  "/update/adMaster/adType/subTypes/adManager/by/:id",
  admanager.updateAd
);

//dev by linkitsoft
router.post("/adMaster/create/adCancelReasons", admanager.UseradCancelReason);
router.post("/adMaster/delete/draftedAds", admanager.deleteDraftedAd);
router.post(
  "/create/adMaster/adType/subTypes/adManager/media",
  admanager.createAdMedia
);
router.post(
  "/adMaster/adType/subTypes/adManager/media/by/:id",
  validate(comonValidator.getbyId, {
    keyByField: true,
  }),
  admanager.getAdMedia
);

router.post("/download", admanager.downloadTransactionInvoice);

router.post("/updateWallet", admanager.adPaymentUserWallet);
/////////////////////////////////
// router.post(
//   "/create/adMaster/adType/subTypes/adManager/adAudience",
//   validate(adManagerValidator.createAdAudience, {
//     keyByField: true,
//   }),
//   admanager.createAdAudience
// );

router.post(
  "/create/adMaster/adType/subTypes/adManager/adAudience",
  admanager.createAdAudience
);

router.post(
  "/adMaster/adType/subTypes/adManager/count",
  admanager.getCountForAd
);

router.post("/adMaster/get/full/ad/by", admanager.getAdById);

router.post(
  "/adMaster/adType/subTypes/adManager/create/budgetandDurations",
  validate(adManagerValidator.createAdBudgetAndDurations, {
    keyByField: true,
  }),
  admanager.createAdBudgetAndDurations
);

router.post("/adMaster/get/genderConfig", admanager.getGenderConfig);

router.post("/adMaster/add/genderConfig", admanager.addGenderConfigs);

router.post("/adMaster/get/paymentGateways", admanager.getPaymentGateway);
router.post("/adMaster/add/paymentGateways", admanager.adPaymentGateway);

router.post("/adMaster/add/admaster", admanager.adAgeMaster);
router.post("/adMaster/get/admaster", admanager.getAdmaster);

router.post("/adMaster/get/total/budget", admanager.getTotatlBudget);
router.post("/adMaster/uploadFile", admanager.uploadFile);

router.post("/adMaster/get/payment/history", admanager.getTotalSpent);

router.post("/adMaster/get/payment/topUpHistory", admanager.getTotalTopUp);

router.post("/adMaster/get/payment/totalAmounts", admanager.totalAmounts);

router.post("/adMaster/get/transactionDetails", admanager.transactionDetails);

router.post(
  "/adMaster/get/payment/createAdUserTransaction",
  admanager.createAdUserTransaction
);

router.post(
  "/adMaster/get/payment/createAdUserTransactionNew",
  admanager.createAdUserTransactionNew
);

router.post(
  "/adMaster/get/payment/transactionHistory",
  admanager.getTransactionHistoryById
);

router.post("/adMaster/getInsight", admanager.getInsight);
router.post("/adMaster/getLocationInsight", admanager.getLocationInsight);
router.post("/adMaster/getGenderInsight", admanager.getGenderInsight);
router.post("/adMaster/getAgeInsight", admanager.getAgeInsight);
router.post("/adMaster/getDayInsight", admanager.getDayInsight);
router.post("/adMaster/addInsight", admanager.addInsight);
router.post("/adMaster/addLike", admanager.addLike);
router.post("/adMaster/addShare", admanager.addShare);
router.post("/adMaster/addComment", admanager.addComment);
router.post("/adMaster/addReachAndImpression", admanager.addView);
router.post("/adMaster/verifyPayment", admanager.verifyPayment);
router.post("/adMaster/restartAd", admanager.restartAd);
router.post("/adMaster/exportPdf", admanager.exportPdf);
router.post("/adMaster/exportExcel", admanager.exportExcel);
router.post("/adMaster/addtopupwallet", admanager.addTopUpWallet);
router.post("/adMaster/getAdCancelReason", admanager.getAdCancelReasons);
router.post("/adMaster/createCancelReason", admanager.createCancelReason);
router.post(
  "/adMaster/createLeadGenerationForm",
  admanager.createLeadGenerationForm
);
router.post("/adMaster/getInputTypes", admanager.getLeadInputTypes);
router.post("/adMaster/getLeadGenerationForm", admanager.getLeadGenerationForm);
router.post("/adMaster/answerLeadGenrationForm", admanager.answerLeadGenForm);
/**
 * Request with pagination
 */
router.post(
  "/adMaster/get/ad/by/adStatus",
  validate(adManagerValidator.getAdStatus, {
    keyByField: true,
  }),
  admanager.getAdByStatus
);

router.post("/adMaster/callToActionButtons", admanager.getCallToActionButtons);
router.post("/adMaster/removeSavedAudience", admanager.removeSavedAudience);

router.post("/adMaster/getWalletStatementsByDate", admanager.getWalletStatementsByDate)
router.post("/adMaster/getTransactionPdfById", admanager.getTransactionPdfById)
router.post("/adMaster/getAdInvoice", admanager.getAdInvoice)

router.post("/adMaster/editAd", admanager.editAd)
router.post("/adMaster/getFreezeAmountTransactionDetails", admanager.getFreezeAmountTransactionDetails)
router.post("/adMaster/getAdInsightPdf", admanager.getAdInsightPdf)
router.post("/adMaster/getAdByUserId", admanager.getAdByUserId)
router.post("/getAdForDisplay", admanager.getAdForDisplay)

router.post("/adMaster/reportAd", admanager.reportAd)
router.post("/adMaster/hideAd", admanager.hideAd)
router.post("/adMaster/dontShowThisTypeOfAd", admanager.dontShowThisTypeOfAd)

module.exports = router;
