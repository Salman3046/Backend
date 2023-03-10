import * as marketPlace from "../controllers/marketPlace.controller";
import express from "express";
import Marketplace from "twilio/lib/rest/preview/Marketplace";
import { MarketplaceCatalog } from "aws-sdk";
const router = express.Router();

router.post("/getmpcategory", marketPlace.mpCategory);
router.post("/getmpsubcategory", marketPlace.mpSubCategory);
router.post("/getmpsubchildcategory", marketPlace.getAllMpSubChildCategory);
router.post("/getallproducts", marketPlace.mpProductsAll);
router.post("/getallLocations", marketPlace.mpLocations);
router.post("/addmpcomment", marketPlace.addMpComment);
router.post("/createcategory", marketPlace.createCategory);
router.post("/createattribute", marketPlace.createAttribute);
router.post("/addattributevalue", marketPlace.addAttributeValues);
router.post("/mppost", marketPlace.getMpPostValues);
router.post("/insertmppost", marketPlace.insertIntoMpPost);
router.post("/getattribute", marketPlace.getConstructionStatus);
router.post("/updatemppost", marketPlace.editPost);
router.post("/singlempPost", marketPlace.getSingleMarketPost);
router.post("/sharepost", marketPlace.shareMpPost);
router.post("/reportmpPost", marketPlace.reportMpPost);
router.post("/getButtonMark", marketPlace.getButtonMark);
router.post("/getallCurrency", marketPlace.getAllCurrency);
router.post("/changeButtonState", marketPlace.changeButtonState);
router.post("/getmpComments", marketPlace.getCommentById);
router.post("/getmpLikes", marketPlace.getLikesById);
router.post("/addLike", marketPlace.addLike);
router.post("/deleteMp", marketPlace.deletePost);
router.post("/bookmarkunbook", marketPlace.doBookMarkUnbookMark);
router.post("/markasSold", marketPlace.markSoldUnSold);
router.post("/deletecomment", marketPlace.deleteComment);
router.post("/getmpreportOptions", marketPlace.getMpReportOptions);
router.post("/getproductswithlat", marketPlace.getAllProductsWithLatLong);
router.post("/getmpfiltercategory", marketPlace.getMpFilterCategory);
router.post("/searchbycat", marketPlace.searchByCatgSub);
router.post("/searchbyatt", marketPlace.searchByAtt);
router.post("/getsubComment", marketPlace.getAllSubComment);
router.post("/addlikebycomment", marketPlace.addLikeByComment);
//router.post("/addlikeBySubComment", marketPlace.addLikeBySubComment);
router.post("/reportComment", marketPlace.reportComment);
router.post("/allowNotif", marketPlace.allowNotif);
router.post("/getMpPostUserList", marketPlace.getMpPostUserList);
router.post("/getMpPostByType", marketPlace.getMpPostByType);
router.post("/addPostView", marketPlace.addMpPostView);
router.post("/getMpPostValuesAdmin", marketPlace.getMpPostValuesAdmin);

module.exports = router;
