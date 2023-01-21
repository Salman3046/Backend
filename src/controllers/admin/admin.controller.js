require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as adminFuncs from "../../funcs/admin/admin.funcs";

export const addAdmin = async (req, res) => {
  try {
    const { type, email, countryId, roleId, userName, password } = req.body;

    if (!email) {
      return failResponse(req, res, {
        message: " Email",
      });
    }
    if (!countryId || countryId === "") {
      return failResponse(req, res, {
        message: "Select/Provide a country/countryId,",
      });
    }
    if (!userName) {
      return failResponse(req, res, {
        message: "Enter username",
      });
    }
    if (userName > 32) {
      return failResponse(req, res, {
        message: "Maximum 32 characters allowed.",
      });
    }

    if (!password) {
      return failResponse(req, res, {
        message: "Enter Password",
      });
    }
    const passLen = password.length;
    if (passLen < 8 || passLen > 16) {
      return failResponse(req, res, {
        message: "Enter Password between 8-16 characters",
      });
    }

    const Sresponse = await adminFuncs.addAdmin(req.body, req.user.id);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdmins = async (req, res) => {
  try {
    //const { type, email } = req.body;
    const Sresponse = await adminFuncs.getAdmins();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateDeleteAdmin = async (req, res) => {
  try {
    const { id, edit, remove } = req.body;
    const Sresponse = await adminFuncs.updateDeleteAdmin(
      id,
      edit,
      remove,
      req.body
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAdminStatus = async (req, res) => {
  try {
    const { id, value } = req.body;
    const Sresponse = await adminFuncs.updateAdminStatus(id, value);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const geoLocation = async (req, res) => {
  try {
    const Sresponse = await adminFuncs.geoLocation();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
