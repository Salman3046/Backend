import * as systemConf from "../controllers/systemConf"
import express from "express";
const router = express.Router();

router.post("/basic/getAll", systemConf.basicGetAll)
router.post("/basic/update", systemConf.basicUpdate)

router.post("/loginSignup/getAll", systemConf.loginSignupGetAll)
router.post("/loginSignup/update", systemConf.loginSignupUpdate)

router.post("/userProfile/getAll", systemConf.userProfileGetAll)
router.post("/userProfile/update", systemConf.userProfileUpdate)

router.post("/groupBizPage/getAll", systemConf.groupBizPageGetAll)
router.post("/groupBizPage/update", systemConf.groupBizPageUpdate)

router.post("/getAllByType", systemConf.getAllByType)
router.post("/updateAllByType", systemConf.updateAllByType)

router.post("/resetToDefaultByType", systemConf.resetToDefaultByType)

module.exports = router