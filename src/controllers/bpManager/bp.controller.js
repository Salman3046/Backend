require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";
import * as crudManager from "../../funcs/commanFunctions/crud.funcs";
import * as bpManagerFunt from "../../funcs/bpFuncs/bp.funcs";
import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as optFuncs from "../../funcs/loginSignup.funcs";

//import * as model from "./../importModels";
import {
  sequelize,
  Sequelize,
  businessPages,
  bpRatingAndReviews,
  bpPostMediaLists,
  bpTaggedUsers,
  bpLocations,
  bpCoverImages,
  bpAdminstrator,
  users,
  bpPostMentions,
  bpHashTags,
  bpPosts,
  bpEventPosts,
  bpArticlePosts,
  bpCouponPosts,
  bpPostLikes,
} from "../../models";
import { bpContacts } from "../importModels";
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
/**
 * Create a new Ad
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const addBusinessCategory = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const data = await crudManager.create(model.addBusinessCategory, body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addBusinessSubCategory = async (req, res) => {
  try {
    const body = req.body;
    body["adId"] = "SAD-" + otp(11);
    body["userId"] = req.user.id;
    const data = await crudManager.create(adManagers, body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const body = req.body;
    const data = await bpManagerFunt.getAllCategories(body.categoryId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createBusinessPage = async (req, res) => {
  try {
    const {
      bpCategoryId,
      bpSubCategoryId,
      name,
      summary,
      bpaddress,
      role,
      coverUrl,
      logo,
      status,
      country,
      city,
      zipCode,
      locationLAT,
      locationLONG,
      visitorCount,
      operatingStatus,
      isPrivate,
      blockedByAdmin,
      blockCode,
      blockMessage,
      visibility,
      allowCall,
      allowMessage,
      allowSharing,
      allowPageSuggestion,
      allowQuestion,
      allowNotificationOnEmail,
      allowNotificationOnSms,
      allowNotification,
      coverImages,
      address,
    } = req.body;
    const userId = req.user.id;

    const result = await bpManagerFunt.createBusinessPage(
      userId,
      bpCategoryId,
      bpSubCategoryId,
      name,
      summary,
      bpaddress,
      role,
      logo,
      status,
      country,
      city,
      zipCode,
      locationLAT,
      locationLONG,
      visitorCount,
      operatingStatus,
      isPrivate,
      blockedByAdmin,
      blockCode,
      blockMessage,
      visibility,
      allowCall,
      allowMessage,
      allowSharing,
      allowPageSuggestion,
      allowQuestion,
      allowNotificationOnEmail,
      allowNotificationOnSms,
      allowNotification,
      coverImages,
      address
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addBuisness = async (req, res) => {
  try {
    console.log(
      "🚀 ~ file: bp.controller.js ~ line 97 ~ addBuisness ~ error",
      req.body
    );

    const body = req.body;
    body["userId"] = req.user.id;
    var responseData = {};
    const businessPageResponse = await crudManager.create(
      model.businessPages,
      body
    );
    if (businessPageResponse) {
      var businessAdmin = {
        businessPageId: businessPageResponse.id,
        userId: req.user.id,
        role: "admin",
      };
      await crudManager.create(model.bpAdminstrator, businessAdmin);
      const businessPageId = businessPageResponse.id;
      var addressBody = patchId(
        {
          businessPageId,
          bpAdminId: req.user.id,
        },
        body.address
      );
      var coverPhotoBody = patchIdForCoverImages(
        {
          businessPageId,
          bpAdminId: req.user.id,
        },
        body.coverImages
      );
      const coverPhotoResponse = await crudManager.bulkCreate(
        model.bpCoverImages,
        coverPhotoBody
      );
      const addressResponse = await crudManager.bulkCreate(
        model.bpLocations,
        addressBody
      );
      responseData = {
        businessPageResponse,
        coverPhotoResponse,
        addressResponse,
      };
    }
    return successResponse(req, res, responseData);
  } catch (error) {
    console.log(
      "🚀 ~ file: bp.controller.js ~ line 97 ~ addBuisness ~ error",
      error
    );
    return errorResponse(req, res, error);
  }
};

export const getBuisnessBy = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.getBusinessBy(body.id);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCoverPhoto = async (req, res) => {
  try {
    const body = req.body;
    var object = patchUserId(
      {
        bpAdminId: req.user.id,
      },
      body
    );
    const coverPhotoResponse = await crudManager.bulkCreate(
      model.bpCoverImages,
      object
    );
    return successResponse(req, res, coverPhotoResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addAddress = async (req, res) => {
  try {
    const body = req.body;
    var object = patchUserId(
      {
        bpAdminId: req.user.id,
      },
      body
    );
    const addressResponse = await crudManager.bulkCreate(
      model.bpLocations,
      object
    );
    return successResponse(req, res, addressResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressResponse = await crudManager.deleteRow(model.bpLocations, {
      id: req.body.addressId,
    });
    return successResponse(req, res, addressResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCoverPhoto = async (req, res) => {
  try {
    const coverPhotoResponse = await crudManager.deleteRow(bpCoverImages, {
      id: req.body.coverPhotoId,
    });
    return successResponse(req, res, coverPhotoResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCoverSlider = async (req, res) => {
  try {
    const coverPhotoResponse = await bpManagerFunt.deleteCoverSlider(
      req.body.id
    );
    return successResponse(req, res, coverPhotoResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateCoverPhoto = async (req, res) => {
  try {
    const coverPhotoResponse = await crudManager.updateAd(
      model.bpCoverImages,
      req.body,
      {
        id: req.body.coverPhotoId,
      }
    );
    return successResponse(req, res, coverPhotoResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAddress = async (req, res) => {
  try {
    const addressResponse = await crudManager.updateAd(bpLocations, req.body, {
      id: req.body.addressId,
    });
    return successResponse(req, res, addressResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addEditBpAddress = async (req, res) => {
  try {
    const {
      id,
      add,
      edit,
      address,
      country,
      city,
      zipCode,
      locationLAT,
      locationLONG,
      businessPageId,
      bpAdminId,
    } = req.body;
    const addressResponse = await bpManagerFunt.addEditBpAddress(
      id,
      add,
      edit,
      address,
      country,
      city,
      zipCode,
      locationLAT,
      locationLONG,
      businessPageId,
      bpAdminId
    );
    return successResponse(req, res, addressResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

function patchUserId(data, object) {
  object.forEach((ele) => {
    ele["bpAdminId"] = data.bpAdminId;
  });
  return object;
}

function patchId(data, object) {
  object.forEach((ele) => {
    ele["bpAdminId"] = data.bpAdminId;
    ele["userId"] = data.userId;
    ele["businessPageId"] = data.businessPageId;
  });
  return object;
}

function patchIdForCoverImages(data, object) {
  var payload = [];
  object.forEach((ele) => {
    payload.push({
      bpAdminId: data.bpAdminId,
      userId: data.userId,
      businessPageId: data.businessPageId,
      coverUrl: ele,
    });
  });
  return payload;
}

//dev by linkitsoft ////////////////////////////

export const getBusinessDetails = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const userId = req.user.id;
    const businessResponse = await bpManagerFunt.getBusinessDetails(
      body.id,
      userId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addReview = async (req, res) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    const review = await crudManager.create(bpRatingAndReviews, body);
    return successResponse(req, res,"success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addLike = async (req, res) => {
  try {
    const { bpPostId } = req.body
    if (!bpPostId) {
      return failResponse(req, res, "Enter bpPostId")
    }
    const userId = req.user.id
    const likeReactionId = req.body.likeReactionId
    if (likeReactionId) {
      const addLike = await bpManagerFunt.addPostLike(bpPostId, userId, likeReactionId)
      const topLikes = await bpManagerFunt.getTopLike(bpPostId)
      return successResponse(req, res, topLikes);
    }
    if(!likeReactionId){
      const removeLike = await bpManagerFunt.removePostLike(bpPostId,userId)
      const topLikes = await bpManagerFunt.getTopLike(bpPostId)
      return successResponse(req, res, topLikes);
    }
    return failResponse(req,res,"Something went wrong")
    // let findObj = {
    //   bpPostId: req.body.bpPostId,
    //   userId: req.user.id,
    // };
    // let findLike = await crudManager.getOne(bpPostLikes, findObj);

    // console.log(findLike);
    // if (findLike !== null || findLike) {
    //   if (req.body.like === 1) {
    //     let updated = findLike.update({
    //       likeReactionId: req.body.likeReactionId,
    //       isActive: 1,
    //       isDeleted: 0,
    //     });
    //   } else if (req.body.like === 0) {
    //     let updated = findLike.update({
    //       isActive: 1,
    //       isDeleted: 0,
    //     });
    //   }
    //   const topLikes = await bpManagerFunt.getTopLike(req.body.bpPostId)
    //   return successResponse(req, res, topLikes);
    // } else {
    //   const body = req.body;
    //   body.postId = req.body.bpPostId;
    //   body.userId = req.user.id;
    //   const like = await crudManager.create(bpPostLikes, body);
    //   const topLikes = await bpManagerFunt.getTopLike(req.body.bpPostId)
    //   // return successResponse(req, res, like);
    //   return successResponse(req, res, topLikes);
    // }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const showReviews = async (req, res) => {
//   try {
//     const review = await bpManagerFunt.showReviews(
//       req.body.businessPageId,
//       req.body.userId
//     );
//     return successResponse(req, res, review);
//     // const review = await crudManager.getOne(model.bpRatingAndReviews, req.body);
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

export const showReviews = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.showReviews(
      body.businessPageId,
      body.userId,
      body.sortBy,
      body.pageIndex,
      body.pageSize
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showLikes = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.showLikes(body.bpPostId);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeLike = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id
    const businessResponse = await bpManagerFunt.removeLike(body.bpPostId, userId);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editReviews = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const businessResponse = await bpManagerFunt.editReviews(body.id, body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getRatingCount = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const businessResponse = await bpManagerFunt.getRatingCount(
      body.businessPageId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTotalFollowers = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const businessResponse = await bpManagerFunt.getTotalFollowers(body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTotalVisitedPeople = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const businessResponse = await bpManagerFunt.getTotalVisitedPeople(
      body.businessPageId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showOverView = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    let userId = req.user.id;
    const businessResponse = await bpManagerFunt.showOverView(
      body.businessPageId,
      userId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showPosts = async (req, res) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    const businessResponse = await bpManagerFunt.showPosts(body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const body = req.body;
    body.userId = req.user.id;
    const businessResponse = await bpManagerFunt.getSinglePost(body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEvents = async (req, res) => {
  try {
    const businessResponse = await bpManagerFunt.getEvents();
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showCatlogue = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.showCatlogue(
      body.businessPageId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showCatlogueById = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.getCataloguebyId(
      body.businessPageId,
      body.catalogueId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showCatlogueMedia = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.showCatlogueMedia(
      body.businessPageId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCatalogueMedia = async (req, res) => {
  try {
    const body = req.body;
    const catalogueId = body.catalogueId;
    const media = body.media;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.addCatalogueMedia(
      catalogueId,
      media
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const aboutUs = async (req, res) => {
  try {
    const body = req.body;
    //body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.aboutUs(body.businessPageId);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addComment = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.addComment(body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const showComments = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.showComments(body.postId);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getVisitors = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.getVisitors(body);
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editComment = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.editComment(
      body.postId,
      body.comment,
      body.commentId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const bpUpdateSummary = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.bpUpdateSummary(
      body.businessPageId,
      body.summary
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editPageInfo = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.editPageInfo(
      body.businessPageId,
      body.name,
      body.categoryId,
      body.subCategoryId,
      body.defaultAddress
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const bpUpdateEmail = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.bpUpdateEmail(
      body.businessPageId,
      body.email,
      body.contactId
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editPhotos = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const businessResponse = await bpManagerFunt.editPhotos(
      body.postId,
      body.fileURL
    );
    return successResponse(req, res, businessResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createPost = async (req, res) => {
  try {
    const body = req.body;
    body.bpAdminId = req.user.id;
    body.id = uuid();
    const postId = body.id;
    if (!body.rePostId || !body.rePostId === "") {
      body.rePostId = null;
    }
    const post = await crudManager.create(bpPosts, body);
    let bpPostId = post.dataValues.id;
    let eventKey = `Added ${body.postType} post to the group`;
    let data = {
      businessPageId: body.businessPageId,
      bpAdminId: body.bpAdminId,
      eventKey: eventKey,
    };
    bpManagerFunt.createBpManagementHistory(data);
    let mediafiles;
    if (body.media) {
      mediafiles = body.media;
      // mediafiles.forEach((item) => {
      //   console.log(item.fileURL, "--------------------------------");
      //   item.postId = bpPostId;
      // });
    }

    if (body.postType == "media") {
      // const mediaResponse = await crudManager.bulkCreate(
      //   bpPostMediaLists,
      //   mediafiles
      // );
      const bpMedia = await bpManagerFunt.addBpMedia(mediafiles, bpPostId);
    }
    if (body.postType == "event") {
      body.postId = postId;
      body.id = uuid();
      const event = await crudManager.create(bpEventPosts, body);
    }
    if (body.postType == "article") {
      body.postId = postId;
      body.id = uuid();
      //const article = await crudManager.create(bpArticlePosts, body);
      const article = await bpManagerFunt.addArticleItems(body);
    }
    if (body.postType == "offer") {
      body.postId = postId;
      body.id = uuid();
      //const article = await crudManager.create(bpArticlePosts, body);
      const offer = await bpManagerFunt.addOfferPost(body);
    }
    if (body.postType == "coupon") {
      body.postId = postId;
      body.id = uuid();
      const coupon = await bpManagerFunt.addCouponPost(body);
    }
    if (body.hashtags) {
      body.hashtags.forEach((item) => {
        item.postId = post.id;
      });
      const hashtag = await crudManager.bulkCreate(bpHashTags, body.hashtags);
    }
    if (body.mentions) {
      body.mentions.forEach((item) => {
        item.postId = post.id;
      });
      const bpPostMention = await crudManager.bulkCreate(
        bpPostMentions,
        body.mentions
      );
    }
    if (body.taggedUsers) {
      body.taggedUsers.forEach((item) => {
        item.postId = post.id;
      });
      const bpPostMention = await crudManager.bulkCreate(
        bpTaggedUsers,
        body.mentions
      );
    }
    return successResponse(req, res, post);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createCatalogue = async (req, res) => {
  try {
    const { catalogueName, businessPageId, media } = req.body;
    const bpAdminId = req.user.id;
    const catalogueResponse = await bpManagerFunt.createCatalogue(
      catalogueName,
      businessPageId,
      bpAdminId,
      media
    );
    return successResponse(req, res, catalogueResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCatalogue = async (req, res) => {
  try {
    const { businessPageId, catalogueId, undo } = req.body;
    const catalogueResponse = await bpManagerFunt.deleteCatalogue(
      businessPageId,
      catalogueId,
      undo
    );
    return successResponse(req, res, catalogueResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCatalogueMedia = async (req, res) => {
  try {
    const { catalogueId, businessPageId, undo } = req.body;
    const catalogueResponse = await bpManagerFunt.deleteCatalogueMedia(
      catalogueId,
      businessPageId,
      undo
    );
    return successResponse(req, res, catalogueResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteMediaFromCatalogue = async (req, res) => {
  try {
    const { catalogueId, mediaId } = req.body;
    const catalogueResponse = await bpManagerFunt.deleteMediaFromCatalogue(
      catalogueId,
      mediaId
    );
    return successResponse(req, res, catalogueResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllWebURL = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpResponse = await bpManagerFunt.getAllWebURL(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllEmails = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpResponse = await bpManagerFunt.getAllEmails(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllContactNumbers = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpResponse = await bpManagerFunt.getAllContactNumbers(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addWebURL = async (req, res) => {
  try {
    const { businessPageId, update, add, weblink, webId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addWebURL(
      businessPageId,
      userId,
      update,
      add,
      weblink,
      webId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addEmail = async (req, res) => {
  try {
    const { businessPageId, email } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addEmail(
      businessPageId,
      userId,
      email
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addNumber = async (req, res) => {
  try {
    const { businessPageId, number } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addNumber(
      businessPageId,
      userId,
      number
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteWebUrl = async (req, res) => {
  try {
    const { businessPageId, webId } = req.body;
    const bpResponse = await bpManagerFunt.deleteWebUrl(businessPageId, webId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteEmail = async (req, res) => {
  try {
    const { businessPageId, emailId } = req.body;
    const bpResponse = await bpManagerFunt.deleteEmail(businessPageId, emailId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteMobile = async (req, res) => {
  try {
    const { businessPageId, mobileId } = req.body;
    const bpResponse = await bpManagerFunt.deleteMobile(
      businessPageId,
      mobileId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateNumber = async (req, res) => {
  try {
    const { businessPageId, numberId, number } = req.body;
    const bpResponse = await bpManagerFunt.updateNumber(
      businessPageId,
      numberId,
      number
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addEditBpHours = async (req, res) => {
  try {
    const {
      businessPageId,
      bpHourId,
      dayName,
      startingTimeShift1,
      startingTimeShift2,
      startingTimeShift3,
      endingTimeShift1,
      endingTimeShift2,
      endingTimeShift3,
      add,
      update,
    } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addEditBpHours(
      userId,
      businessPageId,
      bpHourId,
      dayName,
      startingTimeShift1,
      startingTimeShift2,
      startingTimeShift3,
      endingTimeShift1,
      endingTimeShift2,
      endingTimeShift3,
      add,
      update
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addAdditionalInfo = async (req, res) => {
  try {
    const { businessPageId, type, heading, data } = req.body;
    const userId = req.user.id;
    console.log(data);
    const bpResponse = await bpManagerFunt.addAdditionalInfo(
      heading,
      data,
      type,
      businessPageId,
      userId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editAdditionalInfo = async (req, res) => {
  try {
    const { businessPageId, addInfoId, type, heading, data } = req.body;
    const userId = req.user.id;
    console.log(data);
    const bpResponse = await bpManagerFunt.editAdditionalInfo(
      heading,
      data,
      type,
      businessPageId,
      userId,
      addInfoId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdditionalInfo = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAdditionalInfo(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFAQ = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getFAQ(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getViewerFAQ = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getViewerFAQ(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const ansFAQ = async (req, res) => {
  try {
    const { businessPageId, questionId, answer, showOnPage } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.ansFAQ(
      businessPageId,
      questionId,
      answer,
      showOnPage
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addQuesAns = async (req, res) => {
  try {
    const { businessPageId, question, answer } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addQuesAns(
      businessPageId,
      userId,
      question,
      answer
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateBpLogo = async (req, res) => {
  try {
    const { businessPageId, logoUrl, logoThumb } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.updateBpLogo(
      businessPageId,
      logoUrl,
      logoThumb
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCoverSlider = async (req, res) => {
  try {
    const { businessPageId, coverURL } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addCoverSlider(
      businessPageId,
      userId,
      coverURL
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const generalSettings = async (req, res) => {
  try {
    const {
      businessPageId,
      allowMessage,
      allowQuestions,
      visibility,
      pageSuggestions,
      pin,
    } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.generalSettings(
      businessPageId,
      allowMessage,
      allowQuestions,
      visibility,
      pageSuggestions,
      pin
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const messageSettings = async (req, res) => {
  try {
    const {
      businessPageId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText,
      pin,
    } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.generalSettings(
      businessPageId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText,
      pin
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addMessageSettings = async (req, res) => {
  try {
    const {
      businessPageId,
      bpAdminId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText,
    } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.messageSettings(
      businessPageId,
      bpAdminId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const UpdateMessageSettings = async (req, res) => {
  try {
    const {
      businessPageId,
      bpAdminId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText,
    } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.UpdateMessageSettings(
      businessPageId,
      bpAdminId,
      instantReply,
      instantReplyText,
      awayMessage,
      awayMessageText
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBpAdmin = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAllBpAdmin(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBlockedPeople = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAllBlockedPeople(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllPageHistory = async (req, res) => {
  try {
    const { businessPageId, pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAllPageHistory(
      businessPageId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const blockUnblockPeople = async (req, res) => {
  try {
    const { businessPageId, userId, block } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.blockUnblockPeople(
      businessPageId,
      bpAdminId,
      userId,
      block
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const unblockAll = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.unblockAll(
      businessPageId,
      bpAdminId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const assignRole = async (req, res) => {
  try {
    const {
      businessPageId,
      userId,
      role,
      roleAdd,
      roleUpdate,
      roleDelete,
      add,
      update,
    } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.assignRole(
      businessPageId,
      userId,
      role,
      roleAdd,
      roleUpdate,
      roleDelete,
      add,
      update
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const notificationSettings = async (req, res) => {
  try {
    const {
      businessPageId,
      allowNotification,
      allowNotificationOnSms,
      allowNotificationOnEmail,
      isAllowed,
      notificationType,
    } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.notificationSettings(
      businessPageId,
      bpAdminId,
      allowNotification,
      allowNotificationOnSms,
      allowNotificationOnEmail,
      isAllowed,
      notificationType
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setupButtons = async (req, res) => {
  try {
    const {
      businessPageId,
      allowCall,
      allowMessage,
      allowSharing,
      defaultContact,
    } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.setupButtons(
      businessPageId,
      allowCall,
      allowMessage,
      allowSharing,
      defaultContact
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeUserFromBusinessPage = async (req, res) => {
  try {
    const { businessPageId, userId } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.removeUserFromBusinessPage(
      businessPageId,
      userId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const undoRemoveUser = async (req, res) => {
  try {
    const { businessPageId, userId } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.undoRemoveUser(
      businessPageId,
      userId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const isEmail = req.body.isEmail;
    const type = req.body.type;
    const types = [
      "updateEmailAddress",
      "updatePhone",
      "addEmail",
      "addContact",
    ];
    if (!types.includes(type)) {
      return failResponse(req, res, "invalidOtpReason");
    }
    if (isEmail) {
      const email = req.body.email;
      const otpResult = await optFuncs.sendEmailOTP(email, type);
    } else {
      const mobile = req.body.mobile;
      const otpResult = await optFuncs.sendMobileOTP(mobile, type);
    }
    return successResponse(req, res, "OtpSent");
  } catch (error) {
    return errorResponse(req, res, error, "otpFail");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const sentTo = req.body.sentTo;
    const type = req.body.type;
    const otpResult = await optFuncs.verifyOtp(otp, sentTo, type);
    if (otpResult) {
      return successResponse(req, res, "OtpVerified");
    }
    return failResponse(req, res, "wrongOtp");
  } catch (error) {
    return errorResponse(req, res, error, "verifyFailed");
  }
};

export const getBusinessTime = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.getBusinessTime(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBusinessPage = async (req, res) => {
  try {
    const { businessPageId } = req.body;
    const bpAdminId = req.user.id;
    const bpResponse = await bpManagerFunt.deleteBusinessPage(businessPageId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBpReportOptions = async (req, res) => {
  try {
    const bpResponse = await bpManagerFunt.getBpReportOptions();
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportBusinessPage = async (req, res) => {
  try {
    const { businessPageId, reportOptionId, remarks } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.reportBusinessPage(
      businessPageId,
      userId,
      reportOptionId,
      remarks
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const followBusinessPage = async (req, res) => {
  try {
    const { businessPageId, follow } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.followBusinessPage(
      businessPageId,
      userId,
      follow
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { businessPageId, bpAdminId, question } = req.body;
    // const userId = req.user.id;
    const bpResponse = await bpManagerFunt.askQuestion(
      businessPageId,
      bpAdminId,
      question
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const invitePeople = async (req, res) => {
  try {
    const { userId, businessPageId, bpAdminId } = req.body;
    // const userId = req.user.id;
    const bpResponse = await bpManagerFunt.invitePeople(
      userId,
      businessPageId,
      bpAdminId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const setBusinessStatus = async (req, res) => {
  try {
    const { businessPageId, status } = req.body;
    // const userId = req.user.id;
    const bpResponse = await bpManagerFunt.setBusinessStatus(
      businessPageId,
      status
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCommentsOfPost = async (req, res) => {
  try {
    const { postId, pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAllCommentsOfPost(
      postId,
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllSubCommentsOfPost = async (req, res) => {
  try {
    const { postId, commentId, pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getAllSubCommentsOfPost(
      postId,
      commentId,
      userId,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const body = req.body;

    // const userId = req.user.id;
    const mainPostUpdate = await bpPosts.findOne({
      where: {
        id: req.body.bpPostId,
      },
    });
    await mainPostUpdate.update(req.body);
    if (!body.updateType || body.updateType === "") {
      return errorResponse(
        req,
        res,
        "please provide which post you want to update? event, article, text, media"
      );
    }
    if (body.updateType === "article") {
      // if (!body.articleCategoryId || body.articleCategoryId === "") {
      //   return errorResponse(
      //     req,
      //     res,
      //     "please provide the old articleCategoryId or the new one"
      //   );
      // }
      const bpResponse = await bpManagerFunt.updateArticlePost(body);
      return successResponse(req, res, bpResponse);
    }
    if (body.updateType === "text") {
      const bpResponse = await bpManagerFunt.updateTextPost(body);
      return successResponse(req, res, bpResponse);
    }
    if (body.updateType === "event") {
      if (!body.eventCategoryId || body.eventCategoryId === "") {
        return errorResponse(
          req,
          res,
          "please provide the old eventCategory or the new one"
        );
      }
      const bpResponse = await bpManagerFunt.updateEventPost(body);
      return successResponse(req, res, bpResponse);
    }
    if (body.updateType === "coupon") {
      const bpResponse = await bpManagerFunt.updateCouponPost(body);
      return successResponse(req, res, bpResponse);
    }
    if (body.updateType === "offer") {
      const bpResponse = await bpManagerFunt.updateOfferPost(body);
      return successResponse(req, res, bpResponse);
    }
    if (body.updateType === "media") {
      if (body.media === "" || !body.media) {
        return errorResponse(
          req,
          res,
          "please provide the media details to update"
        );
      } else {
        const bpResponse = await bpManagerFunt.updateMediaPost(body);
        return successResponse(req, res, bpResponse);
      }
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reviewReply = async (req, res) => {
  try {
    const { reviewId, messageText, bpAdminId } = req.body;
    const userId = req.user.id;
    if (!bpAdminId || bpAdminId === "") {
      return errorResponse(req, res, "please provide the businessPage user id");
    }
    const bpResponse = await bpManagerFunt.reviewReply(
      reviewId,
      messageText,
      userId,
      bpAdminId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addRemoveBookmark = async (req, res) => {
  try {
    const { bookmark, bpPostId } = req.body;
    const userId = req.user.id;

    const bpResponse = await bpManagerFunt.addRemoveBookmark(
      userId,
      bookmark,
      bpPostId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCommentReport = async (req, res) => {
  try {
    const { reportOptionId, commentId, remark } = req.body;
    const userId = req.user.id;

    const bpResponse = await bpManagerFunt.addCommentReport(
      userId,
      reportOptionId,
      commentId,
      remark
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const likeDislikeComment = async (req, res) => {
  try {
    const { postCommentId, likeReactionId, like } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.likeDislikeComment(
      userId,
      postCommentId,
      likeReactionId,
      like
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reviewHelpFull = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const userId = req.user.id;
    console.log(req.user.id);
    const bpResponse = await bpManagerFunt.reviewHelpFull(userId, reviewId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reviewReplyHelpFull = async (req, res) => {
  try {
    const { reviewReplyId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.reviewReplyHelpFull(
      userId,
      reviewReplyId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportOptions = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.reportOptions();
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportReview = async (req, res) => {
  try {
    const { reviewId, remark, reportOptionId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.reportReview(
      userId,
      reportOptionId,
      reviewId,
      remark
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportPost = async (req, res) => {
  try {
    const { reportOptionId, postId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.reportPost(
      userId,
      reportOptionId,
      postId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const notificationForUser = async (req, res) => {
  try {
    const { businessPageId, notification } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.notificationForUser(
      userId,
      businessPageId,
      notification
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBpPost = async (req, res) => {
  try {
    const { businessPageId, postId } = req.body;
    const bpResponse = await bpManagerFunt.deleteBpPost(businessPageId, postId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const allowComment = async (req, res) => {
  try {
    const { bpPostId, allow } = req.body;
    const bpResponse = await bpManagerFunt.allowComment(bpPostId, allow);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const allowPostNotif = async (req, res) => {
  try {
    const { bpPostId, allow } = req.body;
    const bpResponse = await bpManagerFunt.allowPostNotif(bpPostId, allow);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLikesOfPost = async (req, res) => {
  try {
    const { bpPostId, searchKey, pageIndex, pageSize } = req.body;
    const bpResponse = await bpManagerFunt.getLikesOfPost(
      bpPostId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCommentFromPost = async (req, res) => {
  try {
    const { commentId } = req.body;
    const bpResponse = await bpManagerFunt.deleteCommentFromPost(commentId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editReviewReply = async (req, res) => {
  try {
    const { reviewId, messageText } = req.body;
    const bpResponse = await bpManagerFunt.editReviewReply(
      reviewId,
      messageText
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getReviewReply = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.getReviewReply(reviewId, userId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteReviewReply = async (req, res) => {
  try {
    const { replyId } = req.body;
    const bpResponse = await bpManagerFunt.deleteReviewReply(replyId);
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addViewToCatalogue = async (req, res) => {
  try {
    const { catalogueId } = req.body;
    const userId = req.user.id;
    const bpResponse = await bpManagerFunt.addViewToCatalogue(
      catalogueId,
      userId
    );
    return successResponse(req, res, bpResponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addToShareCount = async (req, res) => {
  try {
    const {bpPostId,add} = req.body
    if(!bpPostId){
      return failResponse(req,res,"Enter postId")
    }
    const addToShare = await bpManagerFunt.addToShareCount(bpPostId,add)
    return successResponse(req, res, addToShare);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};