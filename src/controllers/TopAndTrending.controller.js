require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as topAndTrendingFuncs from "../funcs/topAndTrending.func";

// CODE below Developed By linkitsoft

// Location Applied
// Radius should be given in Kms

export const getAllTPosts = async (req, res) => {
  try {
    // const { searchKey, pageIndex, pageSize, long, lat, radius, location } =
    //   req.body;
    const body = req.body;
    const userId = req.user.id;
    const result = await topAndTrendingFuncs.getAllTPosts(
      // searchKey,
      // pageIndex,
      // pageSize,
      // long,
      // lat,
      // radius,
      // location
      body,
      userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Location was not applied because there was no lat or long given in table

export const getAllTHashtag = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
      radius,
      location
    } = req.body;
    const result = await topAndTrendingFuncs.getAllTHashtag(
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
    const result = await topAndTrendingFuncs.getSingleTHashtag(
      pageIndex,
      pageSize,
      hashTagId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getHeaderTHashtag = async (req, res) => {
  try {
    const { pageIndex, pageSize, hashTagId } = req.body;
    const result = await topAndTrendingFuncs.getHeaderTHashtag(
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
    const { pageIndex, pageSize, location, lat, long } = req.body;
    const result = await topAndTrendingFuncs.getAllTStory(
      pageIndex,
      pageSize,
      location,
      lat,
      long
    );
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
    const result = await topAndTrendingFuncs.getAllTBusinessPages(
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
    const result = await topAndTrendingFuncs.getAllTInterest(
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
    const {
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      interest,
    } = req.body;
    const userId = req.user.id;
    console.log(userId);
    const result = await topAndTrendingFuncs.getAllTusers(
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
    const result = await topAndTrendingFuncs.getAllTcategory(
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
    const result = await topAndTrendingFuncs.getAllTsubcategory(
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
    const { searchKey, pageIndex, pageSize, type } = req.body;
    const result = await topAndTrendingFuncs.getAllTlocations(
      searchKey,
      pageIndex,
      pageSize,
      type
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
    const result = await topAndTrendingFuncs.getAllTImages(
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
    const result = await topAndTrendingFuncs.getAllTVideos(
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
    const result = await topAndTrendingFuncs.getAllTMedia(
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

export const getAllTUserSuggestions = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, lat, long, radius, location } =
      req.body;
    const userId = req.body.userId || req.user.id;
    const result = await topAndTrendingFuncs.getAllTUserSuggestions(
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
    const result = await topAndTrendingFuncs.getAllTPodcast(
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

export const getAllTBusinessPageLocations = async (req, res) => {
  try {
    const result = await topAndTrendingFuncs.getAllTBusinessPageLocations();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTUserLocations = async (req, res) => {
  try {
    const result = await topAndTrendingFuncs.getAllTUserLocations();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllTopMedia = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, long, lat, radius, location } =
      req.body;
      const userId = req.user.id
    const result = await topAndTrendingFuncs.getAllTopMedia(
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

export const getAllTopPodcast = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, long, lat, radius, location, category } =
      req.body;
      const userId = req.user.id
    const result = await topAndTrendingFuncs.getAllTopPodcast(
      userId, searchKey, pageIndex, pageSize, long, lat, radius, location, category
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};