require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as announcementFuncs from "../../funcs/admin/announcement.funcs";

export const addAnnouncement = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      recipentType,
      callToAction,
      ctaURL,
      isScheduled,
      scheduleTime,
    } = req.body;
    const Sresponse = await announcementFuncs.addAnnouncement(
      title,
      description,
      image,
      recipentType,
      callToAction,
      ctaURL,
      isScheduled,
      scheduleTime
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//get all announcements

export const getAnnoucnements = async (req, res) => {
  try {
    const {} = req.body;
    const response = await announcementFuncs.getAnnoucnements();
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//get annoucement recipents

export const getAnnoucnementRecipent = async (req, res) => {
  try {
    const { id } = req.body;
    const response = await announcementFuncs.getAnnoucnementRecipent(id);
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//edit annoucement

export const editAnnouncement = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      image,
      recipentType,
      callToAction,
      ctaURL,
      isScheduled,
      scheduleTime,
    } = req.body;
    const Sresponse = await announcementFuncs.editAnnouncement(
      id,
      title,
      description,
      image,
      recipentType,
      callToAction,
      ctaURL,
      isScheduled,
      scheduleTime
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//delete announcement

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await announcementFuncs.deleteAnnouncement(id);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//resend announcement

//get stats

//adult image apis

//get adult image settings

export const getAdultImageSetting = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await announcementFuncs.getAdultImageSetting();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAdultImageSetting = async (req, res) => {
  try {
    const { id, adultImage, actionForImage, visionApiKey } = req.body;
    const Sresponse = await announcementFuncs.updateAdultImageSetting(
      id,
      adultImage,
      actionForImage,
      visionApiKey
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
