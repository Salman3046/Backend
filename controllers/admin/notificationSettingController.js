require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";
import * as notificationSettingFuncs from '../../funcs/admin/notificationSetting.funcs'

export const addNotificationSetting = async (req, res) => {
  try {
    const { module, type, description } = req.body
    if (!module || !type ) {
      return failResponse(req, res, "Enter module,type and description")
    }
    const result = await notificationSettingFuncs.addNotificationSetting(module, type, description)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getNotificationSettings = async (req, res) => {
  try {
    const {searchKey} = req.body
    const result = await notificationSettingFuncs.getNotificationSettings(searchKey)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const result = await notificationSettingFuncs.updateNotificationStatus(req.body)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getNotificationSettingsById = async (req, res) => {
  try {
    const id = req.body.id
    if(!id){
      return failResponse(req,res,"Enter id")
    }
    const result = await notificationSettingFuncs.getNotificationSettingsById(id)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};