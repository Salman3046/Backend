require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as FeatureFuncs from "../../funcs/admin/feature.funcs";
import * as postFuncs from '../../funcs/post.funcs'

export const addSticker = async (req, res) => {
  try {
    const { name, categoryId, type, stickerurl, iconURL } = req.body;
    const sticker = await FeatureFuncs.addSticker(name, categoryId, type, stickerurl, iconURL);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const updateSticker = async (req, res) => {
  try {
    const {id, name, categoryId, type, stickerurl, iconURL } = req.body;
    const sticker = await FeatureFuncs.updateSticker(id, name, categoryId, type, stickerurl, iconURL);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const addCategory = async (req, res) => {
  try {
    const { category} = req.body;
    const sticker = await FeatureFuncs.addCategory(category);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getSticker = async (req, res) => {
  try {
     const { id } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await FeatureFuncs.getSticker(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getStickerById = async (req, res) => {
  try {
    const { id } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await FeatureFuncs.getStickerById(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const getIconByPackId = async (req, res) => {
  try {
    const { id } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await FeatureFuncs.getIconByPackId(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const deleteSticker = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.deleteSticker(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getTopPosts = async (req, res) => {
  try {    
    const {type, view, share, searchValue} = req.body;
    const getTop = await FeatureFuncs.getTopPosts(type, view, share, searchValue);
    return successResponse(req, res, getTop);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getTrendingPosts = async (req, res) => {
  try {    
    const {type, view, share, searchValue, value1} = req.body;
    const getTop = await FeatureFuncs.getTrendingPosts(type, view, share, searchValue, value1);
    return successResponse(req, res, getTop);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getAds = async (req, res) => {
  try {
     const { searchKey, status, expired, value1 } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await FeatureFuncs.getAds(searchKey, status, expired, value1);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getInvoiceById = async (req, res) => {
  try {
     const { searchKey, status, expired } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await FeatureFuncs.getInvoiceById(searchKey, status, expired);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const deleteAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.deleteAd(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const stopAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.stopAd(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const rejectAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.rejectAd(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const approveAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.approveAd(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const resumeAd = async (req, res) => {
  try {
    const { id } = req.body;
    const sticker = await FeatureFuncs.resumeAd(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const billingHistory = async (req, res) => {
  try {
    const { searchKey, value1 } = req.body;
   //const { name, stickerurl } = req.body;
   const data = await FeatureFuncs.billingHistory(searchKey,  value1);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const gettopAds = async (req, res) => {
  try {
    const { searchKey, value1 } = req.body;
   //const { name, stickerurl } = req.body;
   const data = await FeatureFuncs.gettopAds(searchKey,  value1);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const gettopCreators = async (req, res) => {
  try {
    const { searchKey, value1 } = req.body;
   //const { name, stickerurl } = req.body;
   const data = await FeatureFuncs.gettopCreators(searchKey,  value1);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getPageCounts = async (req, res) => {
  try{
    const result = await FeatureFuncs.getPageCounts(req.body)
    return successResponse(req,res,result)
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
}
export const getPageCountsWithConditions = async (req, res) => {
  try{
    const result = await FeatureFuncs.getPageCountsWithConditions(req.body)
    return successResponse(req,res,result)
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
}
export const getBusinessPageDetails = async (req, res) => {
  try{
    const result = await FeatureFuncs.getBusinessPageDetails(req.body)
    return successResponse(req,res,result)
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
}

export const getGroupDetails = async (req, res) => {
  try {
    const result = await FeatureFuncs.getGroupDetails(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
}

export const getPostDetails = async (req, res) => {
    try {
        const result = await FeatureFuncs.getPostDetails(req.body)
        return successResponse(req, res, result)
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

export const getEventDetails  = async (req, res) => {
    try {
        const result = await FeatureFuncs.getEventDetails(req.body)
        return successResponse(req, res, result)
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

export const getMediaDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getMediaDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deleteMediaDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deleteMediaDetails(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const getEventCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getEventCount()
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getGoLiveDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getGoLiveDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getArticleDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getArticleDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getFeelingsDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getFeelingsDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getMarketPlaceDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getMarketPlaceDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getPollDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getPollDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getShotzDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getShotzDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const getShotzCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getShotzCount()
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getGoLiveCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getGoLiveCount()
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getAlertDetails  = async (req, res) => {
    try {
        const result = await FeatureFuncs.getAlertDetails(req.body)
        return successResponse(req, res, result)
    } catch (error) {
        return errorResponse(req, res, error)
    }
}
export const getMarketPlaceCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getMarketPlaceCount(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getArticleCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getArticleCount(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getPostTableCount  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getPostTableCount(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getThoughtDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getThoughtDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getRecommendationDetails  = async (req, res) => {
  try {
      const result = await FeatureFuncs.getRecommendationDetails(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}
export const getFaqList = async (req,res) => {
  try{
    const result = await FeatureFuncs.getFaqList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const addToFaqList = async (req,res) => {
  try{
    const result = await FeatureFuncs.addToFaqList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const editFaqList = async (req,res) => {
  try{
    const {id} = req.body
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await FeatureFuncs.editFaqList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getPostDetailsById = async (req,res) => {
  try{
    const {id} = req.body
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await FeatureFuncs.getPostDetailsById(id)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getAllLikesByPostId = async (req,res) => {
  try{
    const {id} = req.body
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await FeatureFuncs.getAllLikesByPostId(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getAllCommentsByPostId = async (req,res) => {
  try{
    const {id} = req.body
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await FeatureFuncs.getAllCommentsByPostId(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getAllSharesByPostId = async (req,res) => {
  try{
    const {id} = req.body
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await FeatureFuncs.getAllSharesByPostId(req.body)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeLikes = async (req,res) => {
  try{
    const likesId = req.body.deleteId
    const postId = req.body.postId
    if(!likesId){
      return failResponse(req,res,"enter likesId")
    }
    const result = await FeatureFuncs.removeLikes(likesId, postId)
    await postFuncs.updateLikesCount(postId)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeComments = async (req,res) => {
  try{
    const commentsId = req.body.deleteId
    const postId = req.body.postId
    if(!commentsId){
      return failResponse(req,res,"enter commentsId")
    }
    const result = await FeatureFuncs.removeComments(commentsId,postId)
    await postFuncs.updateCommentsCount(postId)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeShares = async (req,res) => {
  try{
    const sharesId = req.body.deleteId
    const postId = req.body.postId
    if(!sharesId){
      return failResponse(req,res,"enter sharesId")
    }
    const result = await FeatureFuncs.removeShares(sharesId, postId)
    await postFuncs.updateSharesCount(postId)
      return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getEventsAnalytics = async (req,res) => {
  try{
    const postId = req.body.postId
    const type = req.body.type
    const result = await FeatureFuncs.getEventsAnalytics(postId, type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeEventStatus = async (req,res) => {
  try{
    const postId = req.body.postId
    const deleteId = req.body.deleteId
    const result = await FeatureFuncs.removeEventStatus(postId, deleteId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getPollAnalytics = async (req,res) => {
  try{
    const pollOptionId = req.body.pollOptionId
    const result = await FeatureFuncs.getPollAnalytics(pollOptionId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removePollPostOptions = async (req,res) => {
  try{
    const pollOptionId = req.body.pollOptionId
    const result = await FeatureFuncs.removePollPostOptions(pollOptionId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removePollPostVote = async (req,res) => {
  try{
    const deleteId = req.body.deleteId
    const result = await FeatureFuncs.removePollPostVote(deleteId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getMarketPlaceProductById = async (req,res) => {
  try{
    const id = req.body.id
    const result = await FeatureFuncs.getMarketPlaceProductById(id)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getAllAnalyticsOfMarketPlace = async (req,res) => {
  try{
    const id = req.body.id
    const type = req.body.type
    const typeArr = ["liked","commented","shared"]
    if(!typeArr.includes(type)){
      return failResponse(req,res,"Enter Among liked,shared or commented")
    }
    const result = await FeatureFuncs.getAllAnalyticsOfMarketPlace(id, type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeAnalyticsOfMarketPlace = async (req,res) => {
  try{
    const deleteId = req.body.deleteId
    const type = req.body.type
    const typeArr = ["liked","commented","shared"]
    if(!typeArr.includes(type)){
      return failResponse(req,res,"Enter Among liked,shared or commented")
    }
    const result = await FeatureFuncs.removeAnalyticsOfMarketPlace(deleteId, type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getGroupDetailsById = async (req,res) => {
  try{
    const id = req.body.id
    if(!id){
      return failResponse(req,res,"Enter Group id")
    }
    const result = await FeatureFuncs.getGroupDetailsById(id)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const getGroupAnalytics = async (req,res) => {
  try{
    const id = req.body.id
    if(!id){
      return failResponse(req,res,"Enter Group id")
    }
    const type = req.body.type
    const typeArr = ["members", "invites", "admin", "post"]
    if(!typeArr.includes(type)){
      return failResponse(req, res, "Enter Only among members, invites, admin, post")
    }
    const result = await FeatureFuncs.getGroupAnalytics(id, type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
}
}
export const removeFromGroupAnalytics = async (req,res) => {
  try{
    const id = req.body.id
    if(!id){
      return failResponse(req,res,"Enter Group id")
    }
    const type = req.body.type
    const typeArr = ["members", "invites", "admin", "post"]
    if(!typeArr.includes(type)){
      return failResponse(req, res, "Enter Only among members, invites, admin, post")
    }
    const result = await FeatureFuncs.removeFromGroupAnalytics(id, type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

// made by rahul
export const deletePostFeedArticle  = async (req, res) => {
  try {
      const userId = req.user.id||req.body.userId;
      const reason = req.body.reason;
      const id = req.body.id;
      const result = await FeatureFuncs.deletePostFeedArticle(id,userId,reason)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const updatePostFeedArticle  = async (req, res) => {
  try {
      const { id , caption , articleCategoryId } = req.body;
      const result = await FeatureFuncs.updatePostFeedArticle(id,caption,articleCategoryId)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const getPostFeedArticleById  = async (req, res) => {
  try {
      const { id } = req.body;
      const result = await FeatureFuncs.getPostFeedArticleById(id)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedArticleList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedArticleList(req.body.postType,req.body)
      return successResponse(req, res,result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}


export const getPostFeedArticlePostEng  = async (req, res) => {
  try {
      const { id , postEngType } = req.body;
      let table = postEngType;
      const result = await FeatureFuncs.getPostFeedArticlePostEng(id,table)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

  export const deletedPostFeedPostsRestore  = async (req, res) => {
    try {
        const result = await FeatureFuncs.deletedPostFeedPostsRestore(req.body.id)
        return successResponse(req, res, "Success")
    } catch (error) {
        return errorResponse(req, res, error)
    }
  }

export const deletePostFeedBp  = async (req, res) => {
  try {
      const {id,reason} = req.body;
      const userId = req.body.userId||req.user.id;
      const result = await FeatureFuncs.deletePostFeedBp(id,reason,userId)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}


export const getPostFeedBpById  = async (req, res) => {
  try {
      const { id } = req.body;
      const result = await FeatureFuncs.getPostFeedBpById(id)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const updatePostFeedBp  = async (req, res) => {
  try {
      const {id,name,bpCategoryId,bpSubCategoryId} = req.body;
      const result = await FeatureFuncs.updatePostFeedBp(id,name,bpCategoryId,bpSubCategoryId)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}


export const deletedPostFeedBpList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedBpList()
      return successResponse(req, res,result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedBpRestore  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedBpRestore(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const ratingPostFeedBpUserList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.ratingPostFeedBpUserList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const followersPostFeedBpUserList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.followersPostFeedBpUserList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletePostFeedEvent  = async (req, res) => {
  try {
      const userId = req.user.id||req.body.userId;
      const reason = req.body.reason;
      const id = req.body.id;
      const result = await FeatureFuncs.deletePostFeedEvent(id,userId,reason)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const getPostFeedEventById  = async (req, res) => {
  try {
      const { id } = req.body;
      const result = await FeatureFuncs.getPostFeedEventById(id)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const updatePostFeedEvent  = async (req, res) => {
  try {
      const { id , caption , eventCategoryId } = req.body;
      const result = await FeatureFuncs.updatePostFeedEvent(id,caption,eventCategoryId)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const getEventStatusDetails  = async (req, res) => {
  try {
      const { id , eventStatus , searchKey} = req.body;
      const result = await FeatureFuncs.getEventStatusDetails(id, eventStatus,searchKey)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

// export const deletedPostFeedEventList  = async (req, res) => {
//   try {
//       const result = await FeatureFuncs.deletedPostFeedEventList()
//       return successResponse(req, res,result)
//   } catch (error) {
//       return errorResponse(req, res, error)
//   }
// }

export const deletePostFeedGoLive  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletePostFeedGoLive(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedGoLiveList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedGoLiveList()
      return successResponse(req, res,result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

// export const getPostFeedGoLiveById  = async (req, res) => {
//   try {
//       const { id } = req.body;
//       const result = await FeatureFuncs.getPostFeedGoLiveById(id)
//       return successResponse(req, res, result)
//   } catch (error) {
//       return errorResponse(req, res, error)
//   }
// }

export const invitedMemberPostFeedGroupList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.invitedMemberPostFeedGroupList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const totalMemberPostFeedGroupList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.totalMemberPostFeedGroupList(req.body)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const groupDetailById  = async (req, res) => {
  try {
      const result = await FeatureFuncs.groupDetailById(req.body.id)
      return successResponse(req, res, result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const updatePostFeedGroup = async(req,res) => {
  try{
      const result = await FeatureFuncs.updatePostFeedGroup(req.body) 
      return successResponse(req,res,"Success")
  } catch(error){
    return errorResponse(req,res,error)
  }
}


export const deletedPostFeedMarketPlaceList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedMarketPlaceList()
      return successResponse(req, res,result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletePostFeedMarketPlace  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletePostFeedMarketPlace(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedMarketPlaceRestore  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedMarketPlaceRestore(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedGroupList  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedGroupList(req.body)
      return successResponse(req, res,result)
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletePostFeedGroup  = async (req, res) => {
  try {
      const userId = req.user.id || req.body.userId;
      const id = req.body.id;
      const reason = req.body.reason||"";
      const result = await FeatureFuncs.deletePostFeedGroup(id,userId,reason)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}

export const deletedPostFeedGroupRestore  = async (req, res) => {
  try {
      const result = await FeatureFuncs.deletedPostFeedGroupRestore(req.body.id)
      return successResponse(req, res, "Success")
  } catch (error) {
      return errorResponse(req, res, error)
  }
}