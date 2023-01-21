import * as admin from "../controllers/admin.controller";
import * as stripe from "../controllers/stripeConfig.controller";
import express from "express";
const router = express.Router()

router.post("/uploadFile", admin.uploadFile);
router.post("/getReportOptions", admin.getReportOptions);
router.post("/getAllProfessions", admin.getAllProfessions);
router.post("/getAllInterests", admin.getAllInterests);
router.post("/getAllHobbies", admin.getAllHobbies);
router.post('/getAllMaritalStatus', admin.getAllMaritalStatus)
router.post('/getAllSpeakLanguages', admin.getAllSpeakLanguages)
router.post('/getFeelingCategories', admin.getFeelingCategories)
router.post('/getFeelings', admin.getFeelings)
router.post('/getAllReactions', admin.getAllReactions)
router.post("/getColors", admin.getColors);
router.post("/getTextColors", admin.getTextColors);
router.post("/getBackgroundColors", admin.getBackgroundColors);
router.post("/addTextColors", admin.addTextColors);
router.post("/addBackgroundColors", admin.addBackgroundColors);
router.post("/getEventCategory", admin.getEventCategory);
router.post("/getStripeKeys", stripe.stripeKeys);
router.post("/addShotzAudioCategory",admin.addShotzAudioCategory)
router.post("/addProfessions", admin.addProfessions);


module.exports = router
