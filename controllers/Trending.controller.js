require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as trendingFuncs from "../funcs/Trending.func";

// CODE below Developed By linkitsoft

// Location Applied
// Radius should be given in Kms

export const getAllTPosts = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    const result = await trendingFuncs.getAllTPosts(body, userId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Location was not applied because there was no lat or long given in table

export const getAllTHashtag = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, lat, long, radius, location,isMedia } =
      req.body;
    const result = await trendingFuncs.getAllTHashtag(
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      location,
      true
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSingleTHashtag = async (req, res) => {
  try {
    const { pageIndex, pageSize, hashTagId } = req.body;
    const result = await trendingFuncs.getSingleTHashtag(
      pageIndex,
      pageSize,
      hashTagId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Location was not applied because there was no lat or long given in table

export const getAllTStory = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const result = await trendingFuncs.getAllTStory(pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Location was not applied because there was no lat or long given in table

export const getAllTBusinessPages = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      userId,
      location,
      category,
      subCategory,
      rating,
    } = req.body;
    const result = await trendingFuncs.getAllTrendingBusinessPages(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      userId,
      location,
      category,
      subCategory,
      rating
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Location was not applied because there was no lat or long given in table

export const getAllTInterest = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const result = await trendingFuncs.getAllTInterest(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTusers = async (req, res) => {
  try {
    let {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      userId,
      interest,
    } = req.body;
    if(!userId){
      userId = req.user.id
    }
    const result = await trendingFuncs.getAllTusers(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      userId,
      interest
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTcategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, field } = req.body;
    const fields = [
      "grpCategory",
      "feelingCategory",
      "mpCategory",
      "bpCategory",
      "eventCategory",
    ];
    if (field && !fields.includes(field)) {
      return failResponse(req, res, "invalidfield");
    }
    const result = await trendingFuncs.getAllTcategory(
      searchKey,
      pageIndex,
      pageSize,
      field
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTsubcategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, field } = req.body;
    const fields = ["bpSubCategory", "mpSubCategory"];
    if (field && !fields.includes(field)) {
      return failResponse(req, res, "invalidfield");
    }
    const result = await trendingFuncs.getAllTsubcategory(
      searchKey,
      pageIndex,
      pageSize,
      field
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTlocation = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const result = await trendingFuncs.getAllTlocations(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTImages = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      interest,
      promos,
      peoplePost,
      pagesPost,
    } = req.body;
    const userId = req.user.id;
    const result = await trendingFuncs.getAllTImages(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      interest,
      promos,
      peoplePost,
      pagesPost,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTVideos = async (req, res) => {
  const userId2 = req.user.id;
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      interest,
      liveVid,
      peoplePost,
      pagesPost,
    } = req.body;
    const userId = req.user.id;
    const result = await trendingFuncs.getAllTVideos(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      interest,
      liveVid,
      peoplePost,
      pagesPost,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTMedia = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, long, lat, radius, location } =
      req.body;
    const result = await trendingFuncs.getAllTMedia(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//getAllsuggestion;

export const getAllTUserSuggestions = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, lat, long, radius, location } =
      req.body;
    const userId = req.body.userId || req.user.id;
    const result = await trendingFuncs.getAllTUserSuggestions(
      searchKey,
      pageIndex,
      pageSize,
      userId,
      lat,
      long,
      radius,
      location
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTPodcast = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      location,
      category,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const result = await trendingFuncs.getAllTPodcast(
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      location,
      category
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getTrendingMedia = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
    } = req.body;
    const userId = req.user.id;
    const result = await trendingFuncs.getTrendingMedia(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getTrendingPodcast = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      category
    } = req.body;
    const userId = req.user.id;
    const result = await trendingFuncs.getTrendingPodcast(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      category,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};