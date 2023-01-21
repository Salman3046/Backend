require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as settingfunc from "../../funcs/admin/settings.funcs";
import * as crudManager from "../../funcs/commanFunctions/crud.funcs";

import { sequelize, Sequelize } from "../../models";
import { censoredWords } from "../../models";

export const addgeneralSettings = async (req, res) => {
  try {
    const {
      siteTitle,
      siteName,
      siteEmail,
      siteMobileNumber,
      siteDescription,
      image,
    } = req.body;
    const Sresponse = await settingfunc.addgeneralSettings(
      siteTitle,
      siteName,
      siteEmail,
      siteMobileNumber,
      siteDescription,
      image
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addFileSize = async (req, res) => {
  try {
    const { imageMax, imageMin, videoMax, videoMin, audioMax, audioMin } =
      req.body;
    const Sresponse = await settingfunc.addFileSize(
      imageMax,
      imageMin,
      videoMax,
      videoMin,
      audioMax,
      audioMin
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addchatSettings = async (req, res) => {
  try {
    const { chatSystem, messageSeen, typingSystem } = req.body;
    const Sresponse = await settingfunc.addchatSettings(
      chatSystem,
      messageSeen,
      typingSystem
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addUploadSettings = async (req, res) => {
  try {
    const { fileSharing, videoUpload, audioSharing } = req.body;
    const Sresponse = await settingfunc.addUploadSettings(
      fileSharing,
      videoUpload,
      audioSharing
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addUserSettings = async (req, res) => {
  try {
    const { userRegistration, unusualLogins, userAccDel } = req.body;
    const Sresponse = await settingfunc.addUserSettings(
      userRegistration,
      unusualLogins,
      userAccDel
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addEmailSettings = async (req, res) => {
  try {
    const {
      serverType,
      smtpUserName,
      smtpPort,
      smtpHost,
      smtpPassword,
      smtpEncryption,
    } = req.body;
    const Sresponse = await settingfunc.addEmailSettings(
      serverType,
      smtpUserName,
      smtpPort,
      smtpHost,
      smtpPassword,
      smtpEncryption
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addSmsSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addSmsSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addAudioVideoSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addAudioVideoSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addSiteSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addSiteSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addsocialLoginSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addSocialLoginSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addcurrencySettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addcurrencySettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addNotificationSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addNotificationSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addPostSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addPostSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCurrencySettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addCurrencySettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addPaymentMethodSettings = async (req, res) => {
  try {
    const {
      paypal,
      paypalMode,
      paypalCurrency,
      paypalSecretKey,
      stripe,
      aliPayPaymentMethod,
      stripeCurrency,
      stripeAPISecretKey,
      stripePublishableKey,
    } = req.body;
    const Sresponse = await settingfunc.addPaymentMethodSettings(
      paypal,
      paypalMode,
      paypalCurrency,
      paypalSecretKey,
      stripe,
      aliPayPaymentMethod,
      stripeCurrency,
      stripeAPISecretKey,
      stripePublishableKey
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCensoredWords = async (req, res) => {
  try {
    const body = req.body;
    //const Sresponse1 = await crudManager.create(censoredWords,body);

    const Sresponse = await crudManager.bulkCreate(
      censoredWords,
      body.censoredWord
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addCommonSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.addCommonSettings(body);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//// get apis -->

export const getGeneralSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;
    const Sresponse = await settingfunc.getGeneralSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFileSize = async (req, res) => {
  try {
    const countryId = req.user.countryId;
    const Sresponse = await settingfunc.getFileSize(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPaymentMethodSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;
    const Sresponse = await settingfunc.getPaymentMethodSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getChatSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getChatSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUploadSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;
    console.log(req.user.id);
    const Sresponse = await settingfunc.getUploadSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getUserSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getEmailSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getEmailSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdvertisementSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getAdvertisementSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAudioVideoSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getAudioVideoSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSiteSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;
    console.log(req.user);
    const Sresponse = await settingfunc.getSiteSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getNotificationSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getNotificationSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPostSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getPostSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSocialLoginSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getSocialLoginSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSmsSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getSmsSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCurrencySettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getCurrencySettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCensoredWords = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getCensoredWords(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCommonSettings = async (req, res) => {
  try {
    const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getCommonSettings(countryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCountry = async (req, res) => {
  try {
    //const countryId = req.user.countryId;

    const Sresponse = await settingfunc.getAllCountry();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUserWallet = async (req, res) => {
  try {
    const Sresponse = await settingfunc.getUserWallet(req.body.userId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// update apis -->

export const updateUserWallet = async (req, res) => {
  try {
    const { walletId, userId, amount } = req.body;
    const Sresponse = await settingfunc.updateUserWallet(
      walletId,
      userId,
      amount
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateGeneralSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateGeneralSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateFileSize = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateFileSize(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updatePaymentMethodSettings = async (req, res) => {
  try {
    const {
      id,
      paypal,
      paypalMode,
      paypalCurrency,
      paypalSecretKey,
      stripe,
      aliPayPaymentMethod,
      stripeCurrency,
      stripeAPISecretKey,
      stripePublishableKey,
      bitcoinPayment,
      bitcoinPublishableKey,
      bitcoinAPIKey,
      TCheckOutPayment,
      TCheckOutPublishableKey,
      TCheckOutAPIKey,
      localBankPayment,
      localBankPublishableKey,
      localBankTransferNote,
      localBankDescription,
      TCheckOutSellerId,
      TCheckOutPrivateKey,
      paypalTransactionLogs,
      TCheckOutMode,
    } = req.body;
    const Sresponse = await settingfunc.updatePaymentMethodSettings(
      id,
      paypal,
      paypalMode,
      paypalCurrency,
      paypalSecretKey,
      stripe,
      aliPayPaymentMethod,
      stripeCurrency,
      stripeAPISecretKey,
      stripePublishableKey,
      bitcoinPayment,
      bitcoinPublishableKey,
      bitcoinAPIKey,
      TCheckOutPayment,
      TCheckOutPublishableKey,
      TCheckOutAPIKey,
      localBankPayment,
      localBankPublishableKey,
      localBankTransferNote,
      localBankDescription,
      TCheckOutSellerId,
      TCheckOutPrivateKey,
      paypalTransactionLogs,
      TCheckOutMode
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateChatSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateChatSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateUploadSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateUploadSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateUserSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateEmailSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateEmailSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateSmsSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateSmsSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAudioVideoSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateAudioVideoSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateSiteSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateSiteSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateNotificationSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateNotificationSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updatePostSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updatePostSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateSocialLoginSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateSocialLoginSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateCurrencySettings = async (req, res) => {
  try {
    const {
      currencyCode,
      currencySymbols,
      isDefault,
      id,
      isActive,
      isDeleted,
    } = req.body;
    const Sresponse = await settingfunc.updateCurrencySettings(
      currencyCode,
      currencySymbols,
      isDefault,
      id,
      isActive,
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateCensoredWords = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateCensoredWords(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateCommonSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateCommonSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAdvSettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.updateAdvSettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//Delete apis -->

export const deleteCurrencySettings = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.deleteCurrencySettings(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteCensoredWords = async (req, res) => {
  try {
    const body = req.body;
    const Sresponse = await settingfunc.deleteCensoredWords(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createAddInputTypes = async (req, res) => {
  try {
    const { name, price, type, limit, currency } = req.body;
    const Sresponse = await settingfunc.createAddInputTypes(
      name,
      price,
      type,
      limit,
      currency
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAdInputType = async (req, res) => {
  try {
    const { id, name, price, type, isActive, limit, currency } = req.body;
    const Sresponse = await settingfunc.updateInputTypes(
      id,
      name,
      price,
      type,
      isActive,
      limit,
      currency
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteInputType = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await settingfunc.deleteInputType(id);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
