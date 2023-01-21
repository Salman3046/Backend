import * as hashtag from "../controllers/hashtag.controller";
import express from "express";
const router = express.Router()

router.post('/getTrending', hashtag.getTrending)

module.exports = router