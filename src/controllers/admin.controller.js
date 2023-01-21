require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as adminFuncs from "../funcs/admin.funcs";
import * as media from "../helpers/media";
import * as model from "../controllers/importModels";
import * as crud from "../funcs/commanFunctions/crud.funcs";
import * as adminPortalFuncs from "../funcs/admin/settings.funcs";
import { sequelize, Sequelize } from "../models";
const { QueryTypes } = require("sequelize");
const Op = Sequelize.Op;

export const uploadFile = async (req, res) => {
  console.log("insert -> req.files", req.files);
  try {
    if (!req.files || !req.files.length) {
      return failResponse(req, res, "noFileFound");
    }
    let { uploadFor } = req.body;
    const uploadFors = [
      "test",
      "userProfileDp",
      "userProfileCover",
      "groupDp",
      "postAttachment",
      "messageAttachment",
      "ads",
      "adMedia",
      "groupImage",
      "groupPostMedia",
      "postMedia",
      "postArticleCoverImage",
      "postArticleMedia",
      "postRecommendationCoverImage",
      "postEventCoverImage",
      "shotzMedia",
      "shotzAudio",
      "reportProblem",
      "logo",
      "podcast",
    ];
    if (!uploadFor) {
      return failResponse(req, res, "noUploadFor");
    }

    if (!uploadFors.includes(uploadFor)) {
      return failResponse(req, res, "invalidUploadFor");
    }

    // let fileType ;
    // const fileSizeInMegabytes = Math.ceil(req.files[0].size / (1024 * 1024));
    // const videoExt = ["mp4", "mov", "avi", "flv", "mkv", "wmv", "avchd", "webm", "mpeg-4", "mpeg"]
    // const audioExt = ["mp3", "mp4a", "wav", "aac", "wma", "flac", "3ga", "mp4p", "mp4b", "wma", "wpl", "ogg"]
    // const imageExt = ["jpeg", "png", "gif", "tiff", "psd", "eps", "ai", "indd", "raw","jpg"]
    // const documentExt = ["pdf", "doc", "docx", "xls", "xlsx", "txt"]
    // const fileName = req.files[0].originalname
    // const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
    // const fileLimit = await adminPortalFuncs.getFileSize()
    // const {imageMax , imageMin, videoMax , videoMin, audioMax , audioMin} = fileLimit.dataValues
    // if (videoExt.includes(fileExtension)) {
    //   fileType = "video"
    //   if((fileSizeInMegabytes < videoMin) || (fileSizeInMegabytes > videoMax )){
    //     return failResponse(req,res,`Enter video within ${videoMin}mb - ${videoMax}mb`)
    //   }
    // }
    // if (audioExt.includes(fileExtension)) {
    //   fileType = "audio"
    //   if((fileSizeInMegabytes < audioMin) || (fileSizeInMegabytes > audioMax)){
    //     return failResponse(req,res,`Enter audio within ${audioMin}mb - ${audioMax}mb`)
    //   }
    // }
    // if (imageExt.includes(fileExtension)) {
    //   fileType = "image"
    //   if((fileSizeInMegabytes < imageMin) || (fileSizeInMegabytes > imageMax)){
    //     return failResponse(req,res,`Enter image within ${imageMin}mb - ${imageMax}mb`)
    //   }
    // }
    // if (documentExt.includes(fileExtension)) {
    //   fileType = "document"
    // }

    // let user = req.user;
    // if (!user.countryId || user.countryId === null) {
    //   return errorResponse(
    //     req,
    //     res,
    //     "please select your country it is not selected "
    //   );
    // }
    // let countryId = user.countryId;
    // const uploadSettings = await sequelize.query(
    //   `
    //   SELECT * from uploadSettings WHERE countryId = :countryId
    //   `,
    //   {
    //     replacements: {
    //       countryId,
    //     },
    //     type: QueryTypes.SELECT,
    //   }
    // );
    // let uploadSettings2 = uploadSettings[0];

    // // getting all the upload settings to validate

    // let byte = 1000000;
    // let adminExtension = [];
    // uploadSettings2.maxSize;
    // adminExtension = uploadSettings2.allowedExtensions.split(",");
    // console.log(adminExtension);
    // uploadSettings2.allowedMIMETypes;
    // let imageMin = parseInt(uploadSettings2.imageMin) * byte;
    // let imageMax = parseInt(uploadSettings2.imageMax) * byte;
    // let videoMin = parseInt(uploadSettings2.videoMin) * byte;
    // let videoMax = parseInt(uploadSettings2.videoMax) * byte;
    // let fileMin = parseInt(uploadSettings2.fileMin) * byte;
    // let fileMax = parseInt(uploadSettings2.fileMax) * byte;
    // let audioMin = parseInt(uploadSettings2.audioMin) * byte;
    // let audioMax = parseInt(uploadSettings2.audioMax) * byte;
    // ///////////////////////////////////////

    let link = [];
    for (var i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      // let fileType = file.mimetype.split("/")[0];
      // let extension = file.mimetype.split("/")[1];
      // ////////////////////////////
      // console.log(fileType);
      // console.log(extension);
      // ///////////////////////////
      // const imgsizeInMb = imageMax / byte;
      // const audiosizeInMb = audioMax / byte;
      // const videosizeInMb = videoMax / byte;
      // const filesizeInMb = fileMax / byte;
      // if (fileType === "image") {
      //   if (adminExtension.includes(extension)) {
      //     if (file.size > imageMax) {
      //       return errorResponse(
      //         req,
      //         res,
      //         `image size exceeds, max size is ${imageMax} bytes/ ${imgsizeInMb} MB`
      //       );
      //     }
      //   } else {
      //     return errorResponse(
      //       req,
      //       res,
      //       `only these extensions are allowed ${adminExtension}`
      //     );
      //   }
      // }
      // if (fileType === "audio") {
      //   if (file.size > audioMax) {
      //     return errorResponse(
      //       req,
      //       res,
      //       `audio size exceeds, max size is ${audiosizeInMb} MB`
      //     );
      //   }
      // }
      // if (fileType === "video") {
      //   if (file.size > videoMax) {
      //     return errorResponse(
      //       req,
      //       res,
      //       `video size exceeds, max size is ${videosizeInMb} MB`
      //     );
      //   }
      // } else {
      //   if (file.size > fileMax) {
      //     return errorResponse(
      //       req,
      //       res,
      //       `file size exceeds, max size is ${filesizeInMb} MB`
      //     );
      //   }
      // }
      const uploadedLink = await media.s3Upload(uploadFor, req.files[i]);
      link.push(uploadedLink);
    }
    return successResponse(req, res, link);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getReportOptions = async (req, res) => {
  try {
    const type = req.body.type;
    if (!type) {
      return failResponse(req, res, "typeNotAvailable");
    }
    const data = await adminFuncs.getReportOptions(type);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getColors = async (req, res) => {
  try {
    const type = req.body.type;
    const data = await adminFuncs.getColors(type);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllProfessions = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const result = await adminFuncs.getAllProfessions(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getAllReactions = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const result = await adminFuncs.getAllReactions(pageIndex, pageSize);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllInterests = async (req, res) => {
  try {
    const result = await adminFuncs.getAllInterests(req.body);
    return successResponse(req, res, { count: result.length, rows: result });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllHobbies = async (req, res) => {
  try {
    const searchKey = req.body.searchKey;
    const result = await adminFuncs.getAllHobbies(searchKey);
    return successResponse(req, res, { count: result.length, rows: result });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllMaritalStatus = async (req, res) => {
  try {
    const data = await adminFuncs.getAllMaritalStatus();
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllSpeakLanguages = async (req, res) => {
  try {
    const {searchKey} = req.body
    const data = await adminFuncs.getAllSpeakLanguages(searchKey);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllAppLanguages = async (req, res) => {
  try {
    const appLanguageResult = await adminFuncs.getAllAppLanguages();
    return successResponse(req, res, {
      count: appLanguageResult.length,
      rows: appLanguageResult,
    });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCountry = async (req, res) => {
  try {
    const countryResult = await adminFuncs.getAllCountry(
     req.body
    );
    return successResponse(req, res, countryResult);
  } catch (error) {
    return errorResponse(req, res, error, "countryResultFail");
  }
};

export const getFeelingCategories = async (req, res) => {
  try {
    const { searchKey, pageIndex, pageSize } = req.body;
    const result = await adminFuncs.getFeelingCategories(
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error, "countryResultFail");
  }
};
export const getFeelings = async (req, res) => {
  try {
    const { categoryId, searchKey, pageIndex, pageSize } = req.body;
    if (!categoryId) {
      return failResponse(req, res, "categoryIdNotAvailable");
    }
    const result = await adminFuncs.getFeelings(
      categoryId,
      searchKey,
      pageIndex,
      pageSize
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error, "countryResultFail");
  }
};

export const addGender = async (req, res) => {
  try {
    await crud.create(model.genderMasters, req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error, "faildToInsert");
  }
};

export const getGenders = async (req, res) => {
  try {
    const result = await crud.getAllData(model.genderMasters, {
      attributes: ["name", "id"],
    });
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error, "faildToGet");
  }
};

export const getAllCountryWithSearch = async (req, res) => {
  try {
    const { pageIndex, pageSize, searchText } = req.body;
    const countryResult = await crud.getAllWithPagignation(
      model.country,
      { name: { [Op.like]: `%${searchText}%` } },
      pageIndex,
      pageSize,
      ["name", "id"]
    );
    return successResponse(req, res, countryResult);
  } catch (error) {
    return errorResponse(req, res, error, "countryResultFail");
  }
};
export const getGlobalSettingByCountryId = async (req, res) => {
  try {
    const { countryId } = req.body;
    if (!countryId) {
      return failResponse(req, res, "countryIdNotAvailable");
    }
    const settings = await adminFuncs.getGlobalSettingByCountryId(countryId);
    return successResponse(req, res, settings);
  } catch (error) {
    return errorResponse(req, res, error, "GlobalSettingsResultFail");
  }
};

export const getTextColors = async (req, res) => {
  try {
    const data = await adminFuncs.getTextColors(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addTextColors = async (req, res) => {
  try {
    const data = await adminFuncs.addTextColors(req.body);
    return successResponse(req, res, "Added");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBackgroundColors = async (req, res) => {
  try {
    const data = await adminFuncs.getBackgroundColors(req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addBackgroundColors = async (req, res) => {
  try {
    const data = await adminFuncs.addBackgroundColors(req.body);
    return successResponse(req, res, "Added");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEventCategory = async (req, res) => {
  try {
    const { searchKey } = req.body;
    const data = await adminFuncs.getEventCategory(searchKey);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addShotzAudioCategory = async (req, res) => {
  try {
    const audioCategory = req.body.audioCategory;
    if (!audioCategory) {
      return failResponse(req, res, "Please add audio category");
    }
    const data = await adminFuncs.addShotzAudioCategory(audioCategory);
    return successResponse(req, res, `Audio Categoty : ${audioCategory} added`);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addProfessions = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return failResponse(req, res, "Please add profession name");
    }
    const data = await adminFuncs.addProfessions(name);
    return successResponse(req, res, "Added");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
