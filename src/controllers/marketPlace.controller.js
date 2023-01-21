require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as marketPlaceFuncs from "../funcs/marketPlace.func";
// import mpMediaLists from "../models/mpMediaLists";
// import mpAttributeValues from "../models/mpAttributeValues";
//import * as crudManager from "../../funcs/commanFunctions/crud.funcs";
import * as crudManager from "../funcs/commanFunctions/crud.funcs";
import { marketPlace, mpMediaLists, mpAttributeValues } from "../models";
import { v4 as uuid } from "uuid";
import * as notiFuncs from '../helpers/notification'
import * as adminContNotificationFuncs from '../funcs/adminContNotificationFuncs/adminContNotification.funcs'

export const mpCategory = async (req, res) => {
  try {
    const result = await marketPlaceFuncs.getAllMpCategory();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const mpSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const result = await marketPlaceFuncs.getAllMpSubCategory(categoryId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllMpSubChildCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.body;
    const result = await marketPlaceFuncs.getAllMpSubChildCategory(
      categoryId,
      subCategoryId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const mpProductsAll = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      category,
      subCategory,
      subChildCategory,
      attribute,
      attributeVal,
      currency,
      location,
      minPrice,
      maxPrice,
    } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.getAllProducts(
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      category,
      subCategory,
      subChildCategory,
      attribute,
      attributeVal,
      currency,
      location,
      minPrice,
      maxPrice,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const mpLocations = async (req, res) => {
  try {
    const { searchKey } = req.body;
    const result = await marketPlaceFuncs.getAllLocations(searchKey);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addMpComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { marketPlaceId, comment, commentId, hashTags, mentionIds } =
      req.body;
    if (!marketPlaceId) {
      return failResponse(req, res, "Enter marketPlaceId")
    }
    const result = await marketPlaceFuncs.addMpComment(
      marketPlaceId,
      userId,
      comment,
      commentId,
      hashTags,
      mentionIds
    );
    // if (!commentId) {
    //   console.log("1")
    //   const userData = await marketPlaceFuncs.getMarketPlacePostOwnerDetails(marketPlaceId)
    //   console.log(userData)
    //   console.log("4")
    //   if (userData.userId !== userId) {
    //     console.log("5")
    //     let message = ""
    //     if (userData.commentsCount === 1) {
    //       message = `${req.user.fullName} Commented On Your Post`
    //     }
    //     if (userData.commentsCount === 2) {
    //       message = `${req.user.fullName} and 1 other Commented On Your Post`
    //     }
    //     if (userData.commentsCount > 2) {
    //       message = `${req.user.fullName} and ${userData.totalComments - 1} others Commented on Your Post`
    //     }
    //     console.log("6")
    //     await notiFuncs.addToNotification(userData.userId, userId, "marketPlace-Comment", "user", message, { postId: marketPlaceId })
    //   }
    // }

    let userD = req.user
    console.log(userD)
    const postData = await marketPlaceFuncs.getMarketPlacePostOwnerDetails(marketPlaceId)
    const responseData = await marketPlaceFuncs.getCommentOwnerDetails(marketPlaceId,req.user.id)

    let marketplace_name = postData.title;
    if (postData.userId !== userId) {
      let { commentsCount } = postData
      let totalComment = commentsCount
      let and_n_others
      let mainData = {
        ...userD,
        userId : postData.userId
      }
      if (totalComment === 2) {
        and_n_others = "and 1 other "
      }
      if (totalComment === 1) {
        and_n_others = ''
      }
      if (totalComment > 2) {
        and_n_others = `and ${totalComment - 1} others`
      }
      mainData.and_n_others = and_n_others
      mainData.marketplace_name = marketplace_name
      const inAppData = {
        postId: marketPlaceId,
        notificationType: "marketplace-postComment"
      }
      await adminContNotificationFuncs.sendNotificationsByType("marketplace-postComment", mainData, inAppData)
    }
    return successResponse(req, res,responseData);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const shareMpPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { marketPlaceId } = req.body;
    const result = await marketPlaceFuncs.shareMpPost(marketPlaceId, userId);
    let userD = req.user
    const postData = await marketPlaceFuncs.getMarketPlacePostOwnerDetails(marketPlaceId)
    let marketplace_name = postData.title;
    if (postData.userId !== userId) {
      let { sharesCount } = postData
      let totalShares = sharesCount
      let and_n_others
      let mainData = {
        ...userD,
        userId : postData.userId
      }
      if (totalShares === 2) {
        and_n_others = "and 1 other "
      }
      if (totalShares === 1) {
        and_n_others = ''
      }
      if (totalShares > 2) {
        and_n_others = `and ${totalShares - 1} others`
      }
      mainData.and_n_others = and_n_others
      mainData.marketplace_name = marketplace_name
      const inAppData = {
        postId: marketPlaceId,
        notificationType: "marketplace-postShare"
      }
      await adminContNotificationFuncs.sendNotificationsByType("marketplace-postShare", mainData, inAppData)
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const reportMpPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { marketPlaceId, reportOptionId, remark } = req.body;
    const result = await marketPlaceFuncs.reportMpPost(
      marketPlaceId,
      userId,
      reportOptionId,
      remark
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { userId, categoryId, subCategoryId, name, status } = req.body;
    const result = await marketPlaceFuncs.createCategory(
      userId,
      categoryId,
      subCategoryId,
      name,
      status
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const createAttribute = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      subChildCategoryId,
      label,
      type,
      placeHolder,
      info,
    } = req.body;
    const result = await marketPlaceFuncs.createAttribute(
      categoryId,
      subCategoryId,
      subChildCategoryId,
      label,
      type,
      placeHolder,
      info
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addAttributeValues = async (req, res) => {
  try {
    const { attributeId, marketPlaceId, attributes, value } = req.body;
    const result = await marketPlaceFuncs.addAttributeValues(
      attributeId,
      marketPlaceId,
      attributes,
      value
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getMpPostValues = async (req, res) => {
  try {
    const { subCategoryId, categoryId, subChildCategoryId } = req.body;
    const result = await marketPlaceFuncs.getMpPostValues(
      subCategoryId,
      categoryId,
      subChildCategoryId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpPostValuesAdmin = async (req, res) => {
  try {
    const { subCategoryId, categoryId, subChildCategoryId } = req.body;
    const result = await marketPlaceFuncs.getMpPostValuesAdmin(
      subCategoryId,
      categoryId,
      subChildCategoryId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const insertIntoMp1Post = async (req, res) => {
  try {
    const {
      userId,
      currencyId,
      subCategoryId,
      categoryId,
      title,
      price,
      condition,
      location,
      locationLAT,
      locationLONG,
      description,
      thumbnailURL,
      attributes,
    } = req.body;
    const result = await marketPlaceFuncs.insertIntoMpPost(
      userId,
      currencyId,
      subCategoryId,
      categoryId,
      title,
      price,
      condition,
      location,
      locationLAT,
      locationLONG,
      description,
      thumbnailURL,
      attributes
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

function parseId(id, data) {
  console.log(data);
  data.forEach((element) => {
    element["marketPlaceId"] = id;
  });
  return data;
}

export const insertIntoMpPost = async (req, res) => {
  try {
    const body = req.body;
    body.id = uuid();
    const mpId = body.id;
    body["userId"] = req.user.id;
    if (body.subCategoryId === "" || !body.subCategory) {
      body.subCategoryId = null;
    }
    const data = await crudManager.create(marketPlace, body);
    body.marketPlaceId = body.id;
    body.id = uuid();
    var response = {};
    
    if (data) {
      if (body.media) {
        let payload = parseId(data.dataValues.id, body.media);
        const mediaResponse = await crudManager.bulkCreate(
          mpMediaLists,
          payload
        );
        response = {
          data,
          mediaResponse,
        };
      }
      if (body.attributes) {
        let attr = parseId(data.dataValues.id, body.attributes);
        const attrResponse = await crudManager.bulkCreate(
          mpAttributeValues,
          attr
        );
        response = {
          data,
          attrResponse,
        };
      }

      // response = {
      //   data,
      //   mediaResponse,
      //   attrResponse,
      // };
    }
    const mpData = await marketPlaceFuncs.mPDataById(mpId);
    let productName = mpData.productName;
    const uid = req.user.id;
    req.user.id = uid;
    let mainData = {
      ...req.user,
      productName,
      userId: uid
    }
    const inAppData = {
      postId: uid,
      notificationType: "marketplace-approvalPending"
    }
    await adminContNotificationFuncs.sendNotificationsByType("marketplace-approvalPending", mainData, inAppData)
    return successResponse(req, res, "successfullyCreated");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getConstructionStatus = async (req, res) => {
  try {
    const { attributeName } = req.body;
    const result = await marketPlaceFuncs.getConstructionStatus(attributeName);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const editPost = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.editPost(userId, body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getSingleMarketPost = async (req, res) => {
  try {
    const { marketPlaceId } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.getSingleMarketPost(
      marketPlaceId,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getButtonMark = async (req, res) => {
  try {
    const userId = req.user.id;
    const adManagersId = req.body.marketPlaceId;
    const result = await marketPlaceFuncs.getButtonMark(userId, adManagersId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCurrency = async (req, res) => {
  try {
    const result = await marketPlaceFuncs.getAllCurrency();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const changeButtonState = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const result = await marketPlaceFuncs.changeButtonState(
      userId,
      marketPlaceId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCommentById = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    const result = await marketPlaceFuncs.getCommentById(
      pageIndex,
      pageSize,
      userId,
      marketPlaceId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLikesById = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const result = await marketPlaceFuncs.getLikesById(userId, marketPlaceId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const like = req.body.like;
    const result = await marketPlaceFuncs.addLike(userId, marketPlaceId, like);
    let userD = req.user
    const postData = await marketPlaceFuncs.getMarketPlacePostOwnerDetails(marketPlaceId)
    let marketplace_name = postData.title;
    if (postData.userId !== userId) {
      let { likesCount } = postData
      let totalLikes = likesCount
      let and_n_others
      let mainData = {
        ...userD,
        userId : postData.userId
      }
      if (totalLikes === 2) {
        and_n_others = "and 1 other "
      }
      if (totalLikes === 1) {
        and_n_others = ''
      }
      if (totalLikes > 2) {
        and_n_others = `and ${totalLikes - 1} others`
      }
      mainData.and_n_others = and_n_others
      mainData.marketplace_name = marketplace_name
      const inAppData = {
        postId: marketPlaceId,
        notificationType: "marketplace-postLike"
      }
      await adminContNotificationFuncs.sendNotificationsByType("marketplace-postLike", mainData, inAppData)
    }
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const doBookMarkUnbookMark = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const bookmark = req.body.bookmark;
    const result = await marketPlaceFuncs.doBookMarkUnbookMark(
      userId,
      marketPlaceId,
      bookmark
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const result = await marketPlaceFuncs.deletePost(userId, marketPlaceId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const markSoldUnSold = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const sold = req.body.sold;
    const result = await marketPlaceFuncs.markSoldUnSold(
      userId,
      marketPlaceId,
      sold
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const marketPlaceId = req.body.marketPlaceId;
    const commentId = req.body.commentId;
    const result = await marketPlaceFuncs.deleteComment(
      userId,
      marketPlaceId,
      commentId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpReportOptions = async (req, res) => {
  try {
    const result = await marketPlaceFuncs.getMpReportOptions();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllProductsWithLatLong = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, lat, long, radius } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.getAllProductsWithLatLong(
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpFilterCategory = async (req, res) => {
  try {
    //const userId = req.user.id;
    const result = await marketPlaceFuncs.getMpFilterCategory();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchByCatgSub = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { pageIndex, pageSize, filter } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.searchByCatgSub(
      userId,
      pageIndex,
      pageSize,
      filter
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchByAtt = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { category, subCategory } = req.body;
    const result = await marketPlaceFuncs.searchByAtt(category, subCategory);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllSubComment = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { pageIndex, pageSize, marketPlaceId, commentId } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.getAllSubComment(
      pageIndex,
      pageSize,
      marketPlaceId,
      commentId,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addLikeByComment = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { commentId, like } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.addLikeByComment(
      commentId,
      userId,
      like
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportComment = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { commentId, reportOptionId, remark } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.reportComment(
      commentId,
      userId,
      reportOptionId,
      remark
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const allowNotif = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { marketPlaceId, allowNotif } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.allowNotif(marketPlaceId, allowNotif);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpPostUserList = async (req, res) => {
  try {
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    const marketPlaceId = req.body.marketPlaceId;
    const userId = req.user.id;
    if (!marketPlaceId) {
      return failResponse(req, res, "Please Enter marketPlaceId");
    }
    const type = req.body.type;
    if (!type) {
      return failResponse(req, res, "Please Insert Type");
    }
    const typeArr = ["liked", "commented", "shared"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please Enter one of liked,shared, commented or shared "
      );
    }
    const result = await marketPlaceFuncs.getMpPostUserList(
      marketPlaceId, type, userId, pageIndex, pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMpPostByType = async (req, res) => {
  try {
    const userId = req.user.id;
    const type = req.body.type;
    const pageIndex = req.body.pageIndex;
    const pageSize = req.body.pageSize;
    if (!type) {
      return failResponse(req, res, "Please Enter type");
    }
    const typeArr = ["all", "approval", "onsale", "sold"];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter only one of all , approval ,onsale or sold"
      );
    }
    const result = await marketPlaceFuncs.getMpPostByType(userId, type, pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addMpPostView = async (req, res) => {
  try {
    //const userId = req.user.id;
    const { marketPlaceId } = req.body;
    const userId = req.user.id;
    const result = await marketPlaceFuncs.addMpPostView(marketPlaceId, userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
