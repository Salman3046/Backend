require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as langfunc from "../../funcs/admin/langaugeManager.funcs";

import { sequelize, Sequelize } from "../../models";

export const addLang = async (req, res) => {
  try {
    const { name } = req.body;
    const Sresponse = await langfunc.addLanguage(name);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const Sresponse = await langfunc.getLanguage();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeLanguage = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await langfunc.removeLanguage(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateLanguageSettings = async (req, res) => {
  try {
    const { name, isDefault, id } = req.body;
    const Sresponse = await langfunc.updateLanguageSettings(
      name,
      isDefault,
      id
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLangModules = async (req, res) => {
  try {
    const { id } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await langfunc.getLangModules(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getLangById = async (req, res) => {
  try {
    const { id } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await langfunc.getLangById(id);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const getModuleById = async (req, res) => {
  try {
    const { id, lang } = req.body;
    //const { name, stickerurl } = req.body;
    const sticker = await langfunc.getModuleById(id, lang);
    return successResponse(req, res, sticker);
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};


export const updateValue = async (req, res) => {
  try {
    const { id, value } = req.body;
    const Sresponse = await langfunc.updateValue(          
      id,value
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
