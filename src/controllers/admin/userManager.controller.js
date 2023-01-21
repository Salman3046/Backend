require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
//import { otp } from "./../../helpers/utils";
import * as userManagerFuncs from "../../funcs/admin/userManager.funcs";

export const getOnlineUsers = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await userManagerFuncs.getOnline1Users();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserCount = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await userManagerFuncs.getUserCount();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const Sresponse = await userManagerFuncs.getAllUser(req.body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllStories = async (req, res) => {
  try {
    const Sresponse = await userManagerFuncs.getAllStories();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserAllStories = async (req, res) => {
  try {
    const userId = req.body.userId;
    const Sresponse = await userManagerFuncs.getUserAllStories(userId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await userManagerFuncs.removeUser(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reActiveUser = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await userManagerFuncs.reActiveUser(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await userManagerFuncs.getUserInfo(id);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserSessionDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    if(!userId){
      return failResponse(req, res, "Enter userId")
    }
    const Sresponse = await userManagerFuncs.getUserSessionDetails(userId, req.body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserDetailsLog = async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = await userManagerFuncs.getUserDetailsLog(userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};