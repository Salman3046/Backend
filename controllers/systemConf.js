require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import { sequelize, Sequelize } from "../models";
const { QueryTypes } = require("sequelize");
const Op = Sequelize.Op;
import * as sysFuncs from "../funcs/systemConfFuncs"

export const basicGetAll = async (req, res) => {
    try {
        const result = await sysFuncs.basicGetAll()
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, error);
    }
  };
 
export const basicUpdate = async (req, res) => {
    try {
        const result = await sysFuncs.basicUpdate(req.body)
      return successResponse(req, res, "success");
    } catch (error) {
      return errorResponse(req, res, error);
    }
};

export const loginSignupGetAll = async (req, res) => {
  try {
      const result = await sysFuncs.loginSignupGetAll()
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const loginSignupUpdate = async (req, res) => {
  try {
      const result = await sysFuncs.loginSignupUpdate(req.body)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const userProfileGetAll = async (req, res) => {
  try {
      const result = await sysFuncs.userProfileGetAll()
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const userProfileUpdate = async (req, res) => {
  try {
      const result = await sysFuncs.userProfileUpdate(req.body)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const groupBizPageGetAll = async (req, res) => {
  try {
      const result = await sysFuncs.groupBizPageGetAll()
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const groupBizPageUpdate = async (req, res) => {
  try {
      const result = await sysFuncs.groupBizPageUpdate(req.body)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllByType = async (req, res) => {
  try {
      const type = req.body.type
      if(!type){
        return failResponse(req, res, "Enter type")
      }
      let table 
      switch(type){
        case "adMatrix" : table = "systemConfigAdMatrix"
        break ;
        case "report" : table = "systemConfigReport"
        break ;
        case "adManager" : table = "systemConfigAdManager"
        break ;
        case "socialFeed" : table = "systemConfigSocialFeed"
        break ;
        default : return failResponse(req, res, "Enter correct type")
      }
      const result = await sysFuncs.getAllByType(table)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAllByType = async (req, res) => {
  try {
    const type = req.body.type
      if(!type){
        return failResponse(req, res, "Enter type")
      }
      let table 
      switch(type){
        case "adMatrix" : table = "systemConfigAdMatrix"
        break ;
        case "report" : table = "systemConfigReport"
        break ;
        case "adManager" : table = "systemConfigAdManager"
        break ;
        case "socialFeed" : table = "systemConfigSocialFeed"
        break ;
        default : return failResponse(req, res, "Enter correct type")
      }
      const result = await sysFuncs.updateAllByType(table, req.body.data)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const resetToDefaultByType = async (req, res) => {
  try {
    const type = req.body.type
      if(!type){
        return failResponse(req, res, "Enter type")
      }
      let table 
      switch(type){
        case "basic" : table = "systemConfigBasic"
        break ;
        case "groupBizPage" : table = "systemConfigGroupBizPage"
        break ;
        case "loginSignup" : table = "systemConfigLoginSignup"
        break ;
        case "userProfile" : table = "systemConfigUserProfile"
        break ;
        case "adMatrix" : table = "systemConfigAdMatrix"
        break ;
        case "report" : table = "systemConfigReport"
        break ;
        case "adManager" : table = "systemConfigAdManager"
        break ;
        case "socialFeed" : table = "systemConfigSocialFeed"
        break ;
        default : return failResponse(req, res, "Enter correct type")
      }
      const result = await sysFuncs.resetToDefaultByType(table)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};