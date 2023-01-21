import * as test from "../controllers/test";
import express from "express";
import {authenticatetoken} from "../middleware/authentication"
const router = express.Router();

router.get("/hello/:name", test.hello);
router.post("/sendsms", test.sendSMS);
router.post("/sendEmail", test.sendEmail);
// router.post("/uploadToS3", test.uploadToS3);
router.post("/insertTestData", test.insertTestData);
router.post("/sendNotificationToFCM",authenticatetoken, test.sendNotificationToFCM);
router.post("/sendNotificationToUserId",authenticatetoken, test.sendNotificationToUserId);

module.exports = router;