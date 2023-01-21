require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as searchFuncs from "../funcs/search.funcs";

export const searchUsers = async (req, res) => {
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
      sortBy,
    } = req.body;
    const userId = req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy")
        ;
    }
    const result = await searchFuncs.searchUsers(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      userId,
      interest,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Developed By LinkitSoft

export const searchPages = async (req, res) => {
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
      subCategory,
      rating,
      sortBy,
    } = req.body;
    const userId = req.user.id;
    const sortBys = ["name", "summary", "status", "isPrivate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchPages(
      searchKey,
      pageIndex,
      pageSize,
      lat,
      long,
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

export const searchGroups = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      category,
      location,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["name", "description", "privacy"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchGroups(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      category,
      location
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchVideos = async (req, res) => {
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
    const userId = req.body.userId || req.user.id;
    // const sortBys = ["capation"];
    // if (sortBy && !sortBys.includes(sortBy)) {
    //   return failResponse(req, res, "invalidSortBy");
    // }
    const result = await searchFuncs.searchVideos(
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
      pagesPost
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchImages = async (req, res) => {
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
    const sortBys = ["caption"];
    // if (sortBy && !sortBys.includes(sortBy)) {
    //   return failResponse(req, res, "invalidSortBy");
    //}
    const result = await searchFuncs.searchImages(
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
      pagesPost
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchArticle = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
      interest,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["type", "data"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchArticle(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
      interest
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchMusic = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["caption", "fileURL"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchMusic(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
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

export const searchShotz = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["caption", "fileURL"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchShotzVideos(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
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

export const searchHashTags = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, lat, long, radius, location } =
      req.body;
    const userId = req.user.id;
    // const sortBys = ["name", "count"];
    // if (sortBy && !sortBys.includes(sortBy)) {
    //   return failResponse(req, res, "invalidSortBy");
    // }
    const result = await searchFuncs.searchHashTags(
      searchKey,
      pageIndex,
      pageSize,
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

export const searchMarket = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      category,
      location
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["title", "price", "condition", "isSold"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchMarket(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      category,
      location
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchbpEvents = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy, lat, long, radius } =
      req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["title", "description", "eventStartDate", "eventEndDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchbpEvents(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchgrpEvents = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      long,
      lat,
      radius,
      location,
      category,
      startDate,
      endDate,
    } = req.body;
    //  const userId = req.body.userId || req.user.id;
    const sortBys = ["title", "description", "eventStartDate", "eventEndDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchgrpEvents(
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      long,
      lat,
      radius,
      location,
      category,
      startDate,
      endDate
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchAll = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
    } = req.body;
    if (!pageSize) {
      return failResponse(req, res, "Enter pageSize")
    }
    if (!pageIndex) {
      return failResponse(req, res, "Enter pageIndex")
    }
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.searchAll(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
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

export const getLocations = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getLocations(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getInterest = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getInterest(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getCategory(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSubCategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getSubCategory(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGroupCategory = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize, sortBy } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getGroupCategory(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserSuggestions = async (req, res) => {
  try {
    const {
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
      lat,
      long,
      radius,
      location,
    } = req.body;
    const userId = req.body.userId || req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getUserSuggestions(
      userId,
      searchKey,
      pageIndex,
      pageSize,
      sortBy,
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

//search HISTORY

export const addSearchHistory = async (req, res) => {
  try {
    const { searchContent, searchContentId, searchContentType } = req.body;
    const userId = req.user.id;
    const result = await searchFuncs.addSearchHistory(
      userId,
      searchContent,
      searchContentId,
      searchContentType
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const deleteSearchHistory = async (req, res) => {
  try {
    const { searchId } = req.body;
    const userId = req.user.id;
    const result = await searchFuncs.deleteSearchHistory(userId, searchId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getRecentSearch = async (req, res) => {
  try {
    const { searchContentType, sortBy } = req.body;
    const userId = req.user.id;
    const sortBys = ["userName", "fullName", "email", "followingDate"];
    if (sortBy && !sortBys.includes(sortBy)) {
      return failResponse(req, res, "invalidSortBy");
    }
    const result = await searchFuncs.getRecentSearch(
      userId,
      searchContentType,
      sortBy
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchHastagPosts = async (req, res) => {
  try {
    const { hashTag, pageIndex, pageSize, searchKey } = req.body;
    const userId = req.user.id;
    // const sortBys = ["userName", "fullName", "email", "followingDate"];
    // if (sortBy && !sortBys.includes(sortBy)) {
    //   return failResponse(req, res, "invalidSortBy");
    // }
    const result = await searchFuncs.searchPostByHashTag(
      hashTag, pageIndex, pageSize, searchKey, userId
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};



export const getEventCategory = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    const result = await searchFuncs.getEventCategory(pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPodcastCategory = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const userId = req.user.id;
    const result = await searchFuncs.getPodcastCategory(pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const feedEvents = async (req, res) => {
  try {
    const { searchKey,
      pageIndex,
      pageSize,
      radius,
      lat,
      long,
      category,
      startDate,
      endDate,
      location } = req.body
    const userId = req.user.id
    const result = await searchFuncs.feedEvents(searchKey, pageIndex,
      pageSize,
      radius,
      lat,
      long,
      category,
      startDate,
      endDate,
      userId,
      location)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchMedia = async (req, res) => {
  try {
    const { searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location } = req.body
    const userId = req.user.id
    const result = await searchFuncs.searchMedia(searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      userId)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const searchPodcast = async (req, res) => {
  try {
    const { 
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      category } = req.body
    const userId = req.user.id
    const result = await searchFuncs.searchPodcast(
      searchKey,
      pageIndex,
      pageSize,
      long,
      lat,
      radius,
      location,
      category,
      userId
      )
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};