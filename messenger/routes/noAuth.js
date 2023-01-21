import * as signup from "../controllers/loginSignup.controller";
import * as admin from "../controllers/admin.controller";
import express from "express";
// import * as comonValidator from "../helpers/comon.validator";
// import { validate } from "express-validation";
const router = express.Router();

router.post("/sendOtp", signup.sendOtp);
router.post("/verifyOtp", signup.verifyOtp);
router.post("/userNameAvailable", signup.isUserNameAvailable);
router.post("/userEmailAvailable", signup.isEmailAvailable);
router.post("/userMobileAvailable", signup.isMobileAvailable);
router.post("/registerUser", signup.registerUser);
// validate(comonValidator.registerValidation),
router.post("/resetPassword", signup.resetPassword);
router.post("/login", signup.login);
router.post("/connectwithGoogle", signup.connectWithGoogle);
router.post("/expireSessionsById", signup.expireSessionsById);
router.post("/expireOlderSessions", signup.expireOlderSessions);
router.post("/expireAllSessions", signup.expireAllSessions);

router.post("/getAllAppLanguages", admin.getAllAppLanguages);
router.post("/getAllCountry", admin.getAllCountry);
router.post("/add/gender", admin.addGender);
router.post("/get/gender", admin.getGenders);

router.post("/get/getAllCountry/withSeach", admin.getAllCountryWithSearch);

router.post("/getGlobalSettingByCountryId", admin.getGlobalSettingByCountryId);
router.post("/confirmPassword", signup.confirmPassword);

router.post("/loginWithMessagmee", signup.loginWithMessagmee)
module.exports = router;
