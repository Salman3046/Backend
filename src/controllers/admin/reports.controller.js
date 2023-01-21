require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as reportFunc from "../../funcs/admin/reports.funcs";

import { sequelize, Sequelize } from "../../models";

export const getUserReports = async (req, res) => {
  try {
    // const reportFors = [
    //   "user",
    //   "marketPlace",
    //   "businessPage",
    //   "userPost",
    //   "story",
    //   "bpPost",
    //   "group",
    //   "grpPost",
    // ];
    const { pageIndex, pageSize, searchKey, value1 } = req.body;
    // if (!reportFors.includes(reportFor)) {
    //   return errorResponse(req, res, "report module not found");
    // }
    const Rresponse = await reportFunc.getUserReportDetails(
      pageIndex,
      pageSize,
      searchKey, 
      value1 
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserReportMore = async (req, res) => {
  try {
    // const reportFors = [
    //   "user",
    //   "marketPlace",
    //   "businessPage",
    //   "userPost",
    //   "story",
    //   "bpPost",
    //   "group",
    //   "grpPost",
    // ];
    const { pageIndex, pageSize, searchKey, value1, uId} = req.body;
    // if (!reportFors.includes(reportFor)) {
    //   return errorResponse(req, res, "report module not found");
    // }
    const Rresponse = await reportFunc.getUserReportMore(
      pageIndex,
      pageSize,
      searchKey, 
      value1,
      uId 
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getStoryReportDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getStoryReportDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMarketReportDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getMarketReportDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserPostReportDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getUserPostReportDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPostReports = async (req, res) => {
  try {
    const { type, searchValue, value1, pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getPostReports(
      type, searchValue, value1, pageIndex, pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPostReportMore = async (req, res) => {
  try {
    const { type, searchKey, pageIndex, pageSize, postId} = req.body;
    console.log(postId)  
    const Rresponse = await reportFunc.getPostReportMore(
      type, searchKey, pageIndex, pageSize, postId
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGrpReportsDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getGrpReportsDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGrpPostReportsDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getGrpPostReportsDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBpReportDetails = async (req, res) => {
  try {
    const { searchValue, value1, pageIndex, pageSize , from,to} = req.body;
    const Rresponse = await reportFunc.getBpReportDetails(searchValue, value1, pageIndex, pageSize,from,to);
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBpPostReportDetails = async (req, res) => {
  try {
    const { pageIndex, pageSize } = req.body;
    const Rresponse = await reportFunc.getBpPostReportDetails(
      pageIndex,
      pageSize
    );
    return successResponse(req, res, Rresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/// remove from report apis -->

export const removeUserReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an userId ");
    }
    const result = await reportFunc.removeUserReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeStoryReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeStoryReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeMpReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeMpReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeUserPostReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an userId ");
    }
    const result = await reportFunc.removeUserPostReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeGrpReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeGrpReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeGrpPostReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeGrpPostReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeBpReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeBpReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeBpPostReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.removeBpPostReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//report actions apis -->

export const deleteUserOnReport = async (req, res) => {
  try {
    const { id} = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteUserOnReport(
      id
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const blockUserOnReport = async (req, res) => {
  try {
    const {id, blockMessage} = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.blockUserOnReport(
      id,
      blockMessage
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteStoryOnReport = async (req, res) => {
  try {
    const { id, blockMessage, reportId } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteStoryOnReport(
      id,
      blockMessage,
      reportId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deletePostOnReport = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deletePostOnReport(
      id
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const blockPostOnReport = async (req, res) => {
  try {
    const { id, reportedPostId, blockMessage} = req.body;

    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.blockPostOnReport(
      id,
      reportedPostId,
      blockMessage
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBpOnReport = async (req, res) => {
  try {
    const { id, blockMessage, reportId } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteBpOnReport(
      id,
      blockMessage,
      reportId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBpPostOnReport = async (req, res) => {
  try {
    const { id, blockMessage, reportId } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteBpPostOnReport(
      id,
      blockMessage,
      reportId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteGrpOnReport = async (req, res) => {
  try {
    const { id, blockMessage, reportId } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteGrpOnReport(
      id,
      blockMessage,
      reportId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteGrpPostOnReport = async (req, res) => {
  try {
    const { id, blockMessage, reportId } = req.body;
    if (!id) {
      return errorResponse(req, res, "please provide an id ");
    }
    const result = await reportFunc.deleteGrpPostOnReport(
      id,
      blockMessage,
      reportId
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getReportOptionsByType = async (req, res) => {
  try {
    const type = req.body.type;
    if (!type) {
      failResponse(req, res, "Please enter type");
    }
    
    const typeArr = [
      "feedPost", "bizPost", "podcast", "comment", "ad", "user", "story", "shotz", "goLive", "group", "page", "marketPlace", "bizPage review report"
    ];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter one of feedPost,bizPost,podcast,comment,ad,user,story,shotz,goLive,group,page,marketPlace,bizPage review report"
      );
    }
    const result = await reportFunc.getReportOptionsByType(type);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const addReport = async (req, res) => {
  try {
    const type = req.body.type;
    const reportText = req.body.reportText;
    if (!type) {
      failResponse(req, res, "Please enter type");
    }
    
    const typeArr = [
      "feedPost", "bizPost", "podcast", "comment", "ad", "user", "story", "shotz", "goLive", "group", "page", "marketPlace", "bizPage review report"
    ];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter one of feedPost,bizPost,podcast,comment,ad,user,story,shotz,goLive,group,page,marketPlace,bizPage review report"
      );
    }
    const result = await reportFunc.addReport(type,reportText);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteReport = async (req, res) => {
  try {
    const id  = req.body.id;
    const Sresponse = await reportFunc.deleteReport(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateReport = async (req, res) => {
  try {
    const id = req.body.id;
    const type = req.body.type;
    const reportText = req.body.reportText;
    if (!type) {
      failResponse(req, res, "Please enter type");
    }
    const typeArr = [
      "feedPost", "bizPost", "podcast", "comment", "ad", "user", "story", "shotz", "goLive", "group", "page", "marketPlace", "bizPage review report"
    ];
    if (!typeArr.includes(type)) {
      return failResponse(
        req,
        res,
        "Please enter one of feedPost,bizPost,podcast,comment,ad,user,story,shotz,goLive,group,page,marketPlace,bizPage review report"
      );
    }
    const result = await reportFunc.updateReport(id,type,reportText);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const getReportById = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      failResponse(req, res, "Please enter reportId");
    }
    const result = await reportFunc.getReportById(id);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};