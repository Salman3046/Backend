require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as countryFuncs from "../../funcs/admin/countryManager.funcs";

export const addCountry = async (req, res) => {
  try {
    const { name, code, teleCode, flagURL, iconURL, nativeLanguagesId } =
      req.body;
    const Sresponse = await countryFuncs.addCountry(
      name,
      code,
      teleCode,
      flagURL,
      iconURL,
      nativeLanguagesId
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editRemoveCountry = async (req, res) => {
  try {
    const {
      id,
      edit,
      remove,
      name,
      code,
      teleCode,
      flagURL,
      iconURL,
      nativeLanguagesId,
      isDefault,
    } = req.body;
    const Sresponse = await countryFuncs.editDeleteCountry(
      id,
      edit,
      remove,
      name,
      code,
      teleCode,
      flagURL,
      iconURL,
      nativeLanguagesId,
      isDefault
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCountry = async (req, res) => {
  try {

    const { searchKey } = req.body;
    const Sresponse = await countryFuncs.getAllCountry(searchKey);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
