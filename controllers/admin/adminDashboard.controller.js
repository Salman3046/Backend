require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as dashboard from "../../funcs/admin/adminDashboard.funcs";

export const getAllUser = async (req, res) => {
  try {
    const {} = req.body;
    const Sresponse = await dashboard.getAllUser();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const {} = req.body;
    const Sresponse = await dashboard.getAllUsers();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getReportedUsers = async (req, res) => {
  try {
    const {} = req.body;
    const Sresponse = await dashboard.getReportedUsers();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getInactiveUsers = async (req, res) => {
  try {
    const {} = req.body;
    const Sresponse = await dashboard.getInactiveUsers();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
