require("dotenv").config();
const pdf = require('html-pdf');
let path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const moment = require("moment");
const nodePdf = require("pdf-creator-node")
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";
import * as adMaanagerFunc from "../../funcs/adManager/admanager.funcs";
import * as crudManager from "../../funcs/commanFunctions/crud.funcs";
import { otp } from "./../../helpers/utils";
import * as media from "../../helpers/media";
import { adManager } from "./dataInterface";
import { v4 as uuid } from "uuid";
const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

import {
  adMedias,
  adManagers,
  adPayments,
  adTargetProfessions,
  adProfessionMasters,
  professions,
  adPreferrences,
  adCancelReasonsMaster,
  adPreferrencesMasters,
  adTargetAges,
  adUserWallets,
  adUserTransactions,
  adTargetInterests,
  interests,
  adInterestsMasters,
  adTargetLocations,
  budgetAndDurations,
  adTargetGenders,
  genderMasters,
  paymentGatewayMasters,
  genderConfigs,
  adCallToActionMasters,
  adCancelReasons,
  adRangemasters,
  Sequelize,
  sequelize,
} from "../../models";
const { QueryTypes } = require("sequelize");

//import * as model from "./../importModels";
//import adWallets from "../../models/adManager/adWallets";
//import adCancelReasonsMaster from "../../models/adManager/adCancelReasonsMaster";
const Op = Sequelize.Op;

export const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return failResponse(req, res, "noFileFound");
    }
    let link = [];
    for (var i = 0; i < req.files.length; i++) {
      const uploadedLink = await media.s3Upload("ads", req.files[i]);
      link.push(process.env.AWS_S3_URL + "/" + uploadedLink);
    }
    return successResponse(req, res, link);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Create a new Ad
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createAd = async (req, res) => {
  try {
    const body = req.body;
    body.id = uuid();
    body["adId"] = "SAD-" + otp(11);
    body["userId"] = req.user.id;
    const data = await crudManager.create(adManagers, body);

    //creating the adWallet this code is for adWallet id

    body.adManagerId = body.id;
    body.id = uuid();
    body.callToActionName;
    // const wallet = await crudManager.create(adUserWallets, body);
    var response = {};
    if (body.callToActionName) {
      const calltoActionResponse = await crudManager.getOne(
        adCallToActionMasters,
        {
          name: body.callToActionName,
        }
      );
      // if(body.callToActionName)
      console.log(calltoActionResponse);
      if (calltoActionResponse) {
        var payload = parseId(
          data.dataValues.id,
          body.media,
          calltoActionResponse.id
        );
        const mediaResponse = await crudManager.bulkCreate(adMedias, payload);
        response = {
          data,
          mediaResponse,
          //wallet,
        };
      }
      else if (!calltoActionResponse) {
        return errorResponse(req, res, "please provide the correct call to action name")
      }

    }
    return successResponse(req, res, response);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Get a Ad By Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAd = async (req, res) => {
  try {
    const id = req.body.id;
    const data = await crudManager.getOne(adManagers, {
      id: id,
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateAd = async (req, res) => {
  try {
    const data = await crudManager.updateAd(adManagers, req.body, {
      id: req.params.id,
    });
    // const data = await crudManager.updateAd(adManagers, req.body, {
    //   id: req.params.id,
    // });
    // const data = await crudManager.updateAd(adManagers, req.body, {
    //   id: req.params.id,
    // });
    // const data = await crudManager.updateAd(adManagers, req.body, {
    //   id: req.params.id,
    // });
    // const data = await crudManager.updateAd(adManagers, req.body, {
    //   id: req.params.id,
    // });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Create media for ad
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createAdMedia = async (req, res) => {
  try {
    const body = req.body;
    const data = await crudManager.bulkCreate(adMedias, body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Get all By Media by ad Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAdMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await crudManager.getAll(adMedias, {
      adManagerId: id,
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Create audience for a ad
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const createAdAudience = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    var audienceId = body["adPreferrencesMastersId"];

    var adTargetGenderBody = [];
    if (body.isSaveForFuture) {
      var responseData = await crudManager.create(adPreferrencesMasters, {
        name: audienceId,
        userId: req.user.id,
      });
      body["adPreferrencesMastersId"] = JSON.parse(
        JSON.stringify(responseData)
      ).id;
      console.log(
        "🚀 ~ file: admanager.controller.js ~ line 140 ~ createAdAudience ~ responseData",
        body
      );
    }
    await crudManager.create(adPreferrences, body);
    await crudManager.create(adTargetAges, body);

    // Add Target Genders 
    await adMaanagerFunc.addAdTargetGenders(req.user.id, body.adManagerId, body.adTargetGenderBody)
    // Add Target Interests 
    await adMaanagerFunc.addAdTargetInterests(req.user.id, body.adManagerId, body.adInterestsBody)
    // Add Target Locations 
    await adMaanagerFunc.addAdTargetLocations(req.user.id, body.adManagerId, body.location)
    // Add Target Professions 
    await adMaanagerFunc.addAdTargetProfessions(req.user.id, body.adManagerId, body.adProfessionBody)
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};



export const removeSavedAudience = async (req, res) => {
  try {
    const { adPreferrencesMastersId } = req.body;
    const data = await adMaanagerFunc.removeSavedAudience(adPreferrencesMastersId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


/**
 * Create a budget and duration for ad
 * @param {*} req
 * @param {*} res
 * @returns
 */

export const createAdBudgetAndDurations = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    const checkBudget = await adMaanagerFunc.checkBudgetExists(req.body.adManagerId)
    if (!checkBudget) {
      const data = await crudManager.create(budgetAndDurations, body);
      return successResponse(req, res, data);
    }
    if (checkBudget) {
      const data = await crudManager.updateAd(budgetAndDurations, body, { adManagerId: req.body.adManagerId });
      return successResponse(req, res, data);
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Get ad By adStatus
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAdByStatus = async (req, res) => {
  try {
    const data = await adMaanagerFunc.getAdByStatus(req.user.id, req.body);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Get ad count by
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getCountForAd = async (req, res) => {
  try {
    const data = await adMaanagerFunc.getCountForAd(req.user.id);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addGenderConfigs = async (req, res) => {
  try {
    await crudManager.create(genderConfigs, req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getCallToActionButtons = async (req, res) => {
  try {
    const type = req.body.type;
    const data = await adMaanagerFunc.getCallToActionButtons(type);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGenderConfig = async (req, res) => {
  try {
    const data = await crudManager.getAllData(genderConfigs, {
      include: [
        {
          model: genderMasters,
          attributes: ["name"],
        },
      ],
      attributes: ["priceCount", "id"],
      order: [["sequence", "ASC"]],
      required: true,
    });
    var payload = [];
    data.forEach((ele) => {
      payload.push({
        name: ele.genderMaster ? ele.genderMaster.name : "",
        id: ele.id,
        price: parseInt(ele.priceCount),
      });
    });
    return successResponse(req, res, payload);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const getGenderConfigById = async (id, res) => {
  try {
    const data = await crudManager.getAllData(genderConfigs, {
      where: {
        id: id,
        isDeleted: false,
      },
      include: [
        {
          model: genderMasters,
          attributes: ["name"],
        },
      ],
      attributes: ["priceCount", "id"],
      order: [["sequence", "ASC"]],
      required: true,
    });
    var payload = [];
    data.forEach((ele) => {
      payload.push({
        name: ele.genderMaster ? ele.genderMaster.name : "",
        id: ele.id,
        priceCount: parseInt(ele.priceCount),
      });
    });
    return successResponse(req, res, payload);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPaymentGateway = async (req, res) => {
  try {
    var data = await crudManager.getAllData(paymentGatewayMasters, {
      attributes: ["id", "paymentGatewayName", "accessDevice"],
      order: [["sequence", "ASC"]],
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const adPaymentGateway = async (req, res) => {
  try {
    req.body.userId = req.user.id;
    await crudManager.create(paymentGatewayMasters, req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const adAgeMaster = async (req, res) => {
  try {
    await crudManager.create(adRangemasters, req.body);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdmaster = async (req, res) => {
  try {
    const { startAge, endAge } = req.body;
    const data = await adMaanagerFunc.getAdRangeMaster(startAge, endAge)
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTotatlBudget = async (req, res) => {
  try {
    const { adManagerId } = req.body;
    var data = await adMaanagerFunc.getTotalAmount(adManagerId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * Get a Ad Audience By ad Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAdById = async (req, res) => {
  try {
    const id = req.body.id;
    var data = await adMaanagerFunc.getAdById(req.user.id, id);
    // var ad = new adManager();
    // return successResponse(
    //   req,
    //   res,
    //   ad.get(JSON.parse(JSON.stringify(data))[0])
    // );
    return successResponse(req, res, data)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTotalSpent = async (req, res) => {
  try {
    let transaction = {};
    var data = await adMaanagerFunc.getSpentById(req.user.id, req.body);
    transaction.history = data;
    // var data1 = await adMaanagerFunc.getUserWalletAmount(req.user.id);
    // transaction.wallet = data1;
    return successResponse(req, res, transaction);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTotalTopUp = async (req, res) => {
  try {
    let transaction = {};
    var data = await adMaanagerFunc.getTopUpById(req.user.id, req.body);
    transaction.history = data;
    // var data1 = await adMaanagerFunc.getUserWalletAmount(req.user.id);
    // transaction.wallet = data1;
    return successResponse(req, res, transaction);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getTransactionHistoryById = async (req, res) => {
  try {
    let transaction = {};
    var data = await adMaanagerFunc.getTransactionHistoryById(
      req.user.id,
      req.body
    );

    transaction.history = data;
    // var data1 = await adMaanagerFunc.getUserWalletAmount(req.user.id);
    // transaction.wallet = data1;
    return successResponse(req, res, transaction);
    // return res.json();
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

function parseId(id, data, call_id) {
  console.log(data);
  data.forEach((element) => {
    element["callToActionId"] = element["callToActionId"]
      ? element["callToActionId"]
      : call_id;
    element["adManagerId"] = id;
  });
  return data;
}

export const deleteDraftedAd = async (req, res) => {
  try {
    const data = await adMaanagerFunc.undoDeleteDraftedAd(
      req.body.adManagerId,
      req.body.undo
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const UseradCancelReason = async (req, res) => {
  try {
    const id = uuid();
    const { name, descriptions, note, reasonId, adManagerId } = req.body;
    const userId = req.user.id;
    const userResult = await sequelize.query(
      `INSERT INTO adCancelReasonsMasters(id, userId, descriptions, note, reasonId, adManagerId) 
      VALUES(:id, :userId, :descriptions, :note, :reasonId, :adManagerId)`,
      {
        replacements: {
          id,
          userId,
          descriptions,
          note,
          reasonId,
          adManagerId,
        },
        type: QueryTypes.INSERT,
      }
    );
    const adResult = await sequelize.query(
      `UPDATE adManagers SET adStatus = 'STOPPED' 
      WHERE id = :adManagerId
      `,
      {
        replacements: {
          adManagerId,
        },
        type: QueryTypes.UPDATE,
      }
    );
    const adPaymentDetails = await adMaanagerFunc.getFreezeAmountDetailsForRefund(userId, adManagerId);
    if (adPaymentDetails) {
      const { isRefunded } = adPaymentDetails
      if (!isRefunded) {
        const { currencyId, currencySymbols, totalAmountOfAd, totalPaid, freezeAmountInWallet, availableBalanceInWallet, adId } = adPaymentDetails
        let refundAmount = totalAmountOfAd - totalPaid
        if ((refundAmount > 0) && (freezeAmountInWallet > 0)) {
          let updatedWalletAmount = parseInt(availableBalanceInWallet) + parseInt(refundAmount)
          let updatedFreezeAmount = parseInt(freezeAmountInWallet) - parseInt(refundAmount)

          const processRefund = await sequelize.query(`UPDATE adUserWallets SET amount=:updatedWalletAmount, freezeAmount=:updatedFreezeAmount WHERE userId=:userId`, {
            replacements: { userId, updatedWalletAmount, updatedFreezeAmount },
            type: QueryTypes.UPDATE
          })

          const updateAdStatus = await adMaanagerFunc.editAd(adManagerId, {
            adData: {
              isRefunded: true
            }
          }, userId)

          let charge = { name: "John", age: 30, city: "New York" }
          const addTransaction = await adMaanagerFunc.addUserTransaction(userId, {
            type: "credit",
            adManagerId,
            description: `${currencySymbols} ${refundAmount} successfully refunded for ad ID : #${adId} and added to wallet. Available Balance : ${currencySymbols}  ${updatedWalletAmount}`, currencyId,
            amount: refundAmount,
            closingBalance: updatedWalletAmount,
            paidTo: "wallet",
            paymentDetails: JSON.stringify(charge)
          })

        }
      }
    }
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createCancelReason = async (req, res) => {
  try {
    const { name, desc } = req.body;

    const createCancelReason = adCancelReasons.create({
      id: uuid(),
      name: name,
      desc: desc,
    });
    return successResponse(req, res, createCancelReason);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const adPaymentWallet = async (req, res) => {
//   try {
//     const wallet = await adWallets.create(req.body);
//     return successResponse(req, res, wallet);
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

export const adPaymentUserWallet = async (req, res) => {
  try {
    const { amount, walletId } = req.body;
    const wallet = await adMaanagerFunc.adPaymentUserWallet(amount, walletId);
    return successResponse(req, res, wallet);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createAdUserTransaction = async (req, res) => {
  try {
    let transaction = {};
    const body = req.body;
    body["userId"] = req.user.id;
    var data1 = await adMaanagerFunc.getUserWalletAmount(req.user.id);
    console.log(data1);
    if (req.body.type == "credit") {
      body["closingBalance"] =
        parseInt(data1.dataValues.amount) + parseInt(req.body.amount);
    } else if (req.body.type == "debit") {
      body["closingBalance"] =
        parseInt(data1.dataValues.amount) - parseInt(req.body.amount);
    }
    const paymentDetails = req.body.paymentDetails;
    if (!paymentDetails.paymentId || paymentDetails.paymentId === "") {
      return successResponse(
        req,
        res,
        "please provide a paymentGateway to proceed"
      );
    }
    const data = await crudManager.create(adUserTransactions, body);
    transaction.data = data;

    if (req.body.type == "credit") {
      var amountWallet = (
        parseInt(data1.dataValues.amount) + parseInt(req.body.amount)
      ).toString();
      let values = { amount: amountWallet };
      const data2 = await crudManager.updateAd(adUserWallets, values, {
        userId: req.user.id,
      });
      transaction.Wallet = {
        amount: amountWallet,
        totalSpent: data1.dataValues.totalSpent,
      };
    } else if (req.body.type == "debit") {
      console.log(data1.dataValues.amount);
      var amountWallet = (
        parseInt(data1.dataValues.amount) - parseInt(req.body.amount)
      ).toString();
      console.log(data1.dataValues.totalSpent);
      var spent = (
        parseInt(data1.dataValues.totalSpent) + parseInt(req.body.amount)
      ).toString();
      let values = { amount: amountWallet, totalSpent: spent };
      const data2 = await crudManager.updateAd(adUserWallets, values, {
        userId: req.user.id,
      });
      transaction.Wallet = { amount: amountWallet, totalSpent: spent };
    }
    return successResponse(req, res, transaction);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createAdUserTransactionNew = async (req, res) => {
  try {
    const { type, currencyId, paidTo, adManagerId } = req.body
    const userId = req.user.id

    let walletData = await adMaanagerFunc.getUserWalletAmount(userId)

    if (walletData.currencyId != currencyId) {
      return failResponse(req, res, "currency not matching with wallet")
    }

    let { currencyCode, currencySymbols, amount } = walletData
    let finalAmount = 0;
    // let charge = { name: "John", age: 30, city: "New York" }
    let charge
    if ((paidTo == "stripe") || (paidTo === "applePay")) {
      const token = req.body.stripeToken; // Using Express
      charge = await stripe.charges.create({
        amount: ((parseFloat(req.body.amount).toFixed(2)) * 100),
        currency: currencyCode,
        description: 'stripe payment',
        source: token,
      });
      if (charge.paid != true) {
        return failResponse(
          req,
          res,
          "please provide a valid paymentGateway to proceed"
        );
      }
    }

    if (type === "credit") {
      // const obj = {name: "John", age: 30, city: "New York"};
      finalAmount = parseFloat(amount) + parseFloat(req.body.amount)
      finalAmount = parseFloat(finalAmount).toFixed(2)
      const addTransaction = await adMaanagerFunc.addUserTransaction(userId, {
        type: "credit",
        adManagerId: null,
        description: `${currencySymbols} ${parseFloat(req.body.amount).toFixed(2)} successfully added to wallet. Available Balance : ${currencySymbols}  ${finalAmount}`, currencyId,
        amount: parseFloat(req.body.amount).toFixed(2),
        closingBalance: finalAmount,
        paidTo: "stripe",
        paymentDetails: JSON.stringify(charge)
      })
      if (addTransaction.status) {
        await adMaanagerFunc.updateUserWallet(userId, finalAmount)
      }
      return successResponse(req, res, addTransaction)
    }

    if (type === "debit") {
      if (parseFloat(req.body.walletAmount).toFixed(2) > parseFloat(amount).toFixed(2)) {
        return failResponse(req, res, "inSufficient balance in wallet")
      }
      const payDetails = await adMaanagerFunc.getAdPayDetailsById(adManagerId)
      if (!payDetails) {
        return failResponse(req, res, "inValid AdId")
      }
      if (payDetails.isPaid === 1) {
        return failResponse(req, res, "payment already received for this ad")
      }
      let adReceivedAmount =0
      adReceivedAmount = parseFloat(req.body.amount) + parseFloat(req.body.walletAmount)
      adReceivedAmount = parseFloat(adReceivedAmount).toFixed(2)
      if ((parseFloat(payDetails.totalAmountToBePaid).toFixed(2)) !== adReceivedAmount) {
        return failResponse(req, res, "amount not equal to the total amount required for ad")
      }
      console.log(walletData)
      let id = {}
      const { adId, dailyBudget, totalAmountToBePaid, duration, startDate, endDate, timeZone } = payDetails

      if (req.body.amount != 0) {
        // const obj = {name: "John", age: 30, city: "New York"};
        finalAmount = parseFloat(amount) + parseFloat(req.body.amount)
        finalAmount = parseFloat(finalAmount).toFixed(2)
        const addTransaction = await adMaanagerFunc.addUserTransaction(userId, {
          type: "credit",
          adManagerId: null,
          description: `${currencySymbols} ${req.body.amount} successfully added to wallet. Available Balance : ${currencySymbols}  ${finalAmount}`, currencyId,
          amount: parseFloat(req.body.amount).toFixed(2),
          closingBalance: finalAmount,
          paidTo: "stripe",
          paymentDetails: JSON.stringify(charge)
        })
        if (addTransaction.status) {
          await adMaanagerFunc.updateUserWallet(userId, finalAmount)
        }
      }
      finalAmount = 0;
      walletData = await adMaanagerFunc.getUserWalletAmount(userId)
      amount = walletData.amount
      if (req.body.walletAmount) {
        const obj = { name: "John", age: 30, city: "New York" };
        let total = parseFloat(req.body.walletAmount) + parseFloat(req.body.amount)
        total = parseFloat(total).toFixed(2)
        finalAmount = parseFloat(amount) - total
        finalAmount = parseFloat(finalAmount).toFixed(2)
        const addTransaction = await adMaanagerFunc.addUserTransaction(userId, {
          type: "debit",
          adManagerId,
          description: `${currencySymbols} ${total} successfully deducted from your wallet for ad Id : ${adId} . Available Balance : ${currencySymbols}  ${finalAmount} `, currencyId,
          amount: total,
          closingBalance: finalAmount,
          paidTo: "wallet",
          paymentDetails: JSON.stringify(obj)
        })
        if (addTransaction.status) {
          await adMaanagerFunc.updateUserWallet(userId, finalAmount)
        }
        id = addTransaction
      }


      await adMaanagerFunc.updateFreezeAmount(userId,
        {
          adManagerId,
          currencyId,
          startDate,
          endDate,
          dailyBudget,
          totalFreezeAmount: totalAmountToBePaid,
          fixedCharge: ((parseFloat(totalAmountToBePaid).toFixed(2)) - ((parseInt(duration) + 1) * (parseFloat(dailyBudget).toFixed(2)))),
          duration: (duration + 1)
        })
      await adMaanagerFunc.editAd(adManagerId,
        {
          adData: {
            adStatus: "RUNNING",
            isPaid: true
          }
        },
        userId)
      return successResponse(req, res, id)
    }
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addTopUpWallet = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    let transaction = await adMaanagerFunc.addTopUpWallet(
      req.user.id,
      req.body.amount
    );
    return successResponse(req, res, transaction);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const TopUpHistory = async (req, res) => {
  try {
    var data = await adMaanagerFunc.getSpentById(req.user.id, req.body);
    var ad = new adPayments();
    return res.json(data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const totalAmounts = async (req, res) => {
  try {
    // var data = await adMaanagerFunc.getUserWalletAmount(req.user.id);
    // let Wallet = {};
    // Wallet.error = false;
    // Wallet.success = true;
    // Wallet.wallet = data;
    // return res.json(Wallet);
    const data = await adMaanagerFunc.getUserWalletAmount(req.user.id)
    return successResponse(req, res, data)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const transactionDetails = async (req, res) => {
  try {
    var data = await adMaanagerFunc.transactionDetails(req.body.id);
    let Transaction = {};
    Transaction.error = false;
    Transaction.success = true;
    Transaction.transactionDetails = data;
    return res.json(Transaction);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

// export const downloadTransactionInvoice = async (req, res) => {
//   try {
//     let data = await adMaanagerFunc.getTransactionHistoryById(req.body.userId);
//     let ad = new adPayments();
//     let arr;
//     let txt;
//     data.SpentHistory.forEach((item) => {
//       arr = item;
//       //   for (let item2 in arr) {
//       //     console.log(`${item2}:${arr[item2]}`);
//       //     //txt += item2;
//       //   }
//       console.log(arr);
//       //   arr.adPayments.forEach((item2) => {
//       //     console.log(item2);
//       //   });
//     });
//     let pdfDoc = new PDFDocument();
//     pdfDoc.pipe(fs.createWriteStream("sample11.pdf"));
//     pdfDoc.text(txt);
//     pdfDoc.end();
//     return successResponse(req, res, "success");
//   } catch (error) {
//     return errorResponse(req, res, error);
//   }
// };

export const downloadTransactionInvoice = async (req, res) => {
  try {
    let data = await adMaanagerFunc.getInvoiceData(req.body.id, req.body);
    //let data = await adMaanagerFunc.getTransactionHistoryById(req.body.userId, req.body);
    var data1 = await adMaanagerFunc.getAdById(req.user.id, req.body.id);

    console.log("datad")

    var diffTime = Math.abs(data[0].endDate - data[0].startDate)
    var diffDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
    console.log(data1[0].adTargetAges[0].startAge)
    console.log(data1[0].adTargetAges[0].endAge)

    const filter = {
      where: {
        startAge: {
          [Op.lte]: data1[0].adTargetAges[0].startAge,
        },
        endAge: {
          [Op.gte]: data1[0].adTargetAges[0].endAge,
        },
      },
      attributes: ["audiancePice", "id"],
    };
    var data2 = await crudManager.getAllData(adRangemasters, filter);
    console.log(data2[0].dataValues.audiancePice)
    const targetAgePrice = data2[0].dataValues.audiancePice * diffDays
    ////////////////////////////////////////////////////////////
    console.log(data1[0].adTargetGenders[0].name)
    var targetGenderPrice = 0
    let genderStr = ""
    for (let i = 0; i < data1[0].adTargetGenders.length; i++) {
      console.log(i)
      console.log(data1[0].adTargetGenders[i].name)
      const adTargetGendersname = data1[0].adTargetGenders[i].name
      if (adTargetGendersname == null || !adTargetGendersname || adTargetGendersname === undefined) {
      }
      else {
        const data3 = await crudManager.getAllData(genderConfigs, {
          where: {
            id: adTargetGendersname,
            isDeleted: false,
          },
          include: [
            {
              model: genderMasters,
              attributes: ["name"],
            },
          ],
          attributes: ["priceCount", "id"],
          order: [["sequence", "ASC"]],
          required: true,
        });
        console.log("priceCount")
        console.log(data3[0].dataValues.genderMaster.name)
        if (adTargetGendersname == null || !adTargetGendersname || adTargetGendersname === undefined) {
        }
        else {
          genderStr += data3[0].dataValues.genderMaster.name + ", "
        }
        //return successResponse(req, res, data3[0].dataValues);
        console.log("targetGenderPrice")
        targetGenderPrice += data3[0].dataValues.priceCount * diffDays
        console.log(targetGenderPrice)
      }
    }
    genderStr = genderStr.substr(0, genderStr.length - 2)
    console.log(genderStr)
    console.log(targetGenderPrice)

    console.log(data1[0].adTargetInterests[0].id)
    var targetInterestsPrice = 0
    let interestsStr = ""
    for (let i = 0; i < data1[0].adTargetInterests.length; i++) {
      console.log(i)
      console.log(data1[0].adTargetInterests[i].id)
      const targetInterestsId = data1[0].adTargetInterests[i].id
      const data4 = await crudManager.getAllData(adTargetInterests, {
        where: {
          id: targetInterestsId,
          isDeleted: false,
        },
        include: [
          {
            model: adInterestsMasters,
            include: [
              {
                model: interests,
                attributes: ["name"],
              },
            ],
            attributes: ["priceForAudiance"],
          },
        ]
      });
      console.log(data4[0].dataValues.adInterestsMaster.interest.name)
      interestsStr += data4[0].dataValues.adInterestsMaster.interest.name + ", "
      console.log("priceForAudiance")
      console.log(data4[0].dataValues.adInterestsMaster.priceForAudiance)
      console.log("targetInterestsPrice")
      targetInterestsPrice += data4[0].dataValues.adInterestsMaster.priceForAudiance * diffDays
      console.log(targetInterestsPrice)
    }
    interestsStr = interestsStr.substr(0, interestsStr.length - 2)
    console.log(targetInterestsPrice)


    console.log(data1[0].adTargetProfessions[0].id)
    var targetProfessionsPrice = 0
    let professionStr = ""
    for (let i = 0; i < data1[0].adTargetProfessions.length; i++) {
      console.log(i)
      console.log(data1[0].adTargetProfessions[i].id)
      const targetProfessionsId = data1[0].adTargetProfessions[i].id
      const data4 = await crudManager.getAllData(adTargetProfessions, {
        where: {
          id: targetProfessionsId,
          isDeleted: false,
        },
        include: [
          {
            model: adProfessionMasters,
            include: [
              {
                model: professions,
                attributes: ["name"],
              },
            ],
            attributes: ["priceForAudiance"],
          },
        ]
      });
      console.log(data4[0].dataValues.adProfessionMaster.profession.name)
      professionStr += data4[0].dataValues.adProfessionMaster.profession.name + ", "
      // return successResponse(req, res, data4[0].dataValues);
      console.log("priceForAudiance")
      console.log(data4[0].dataValues.adProfessionMaster.priceForAudiance)
      console.log("targetProfessionsPrice")
      targetProfessionsPrice += data4[0].dataValues.adProfessionMaster.priceForAudiance * diffDays
      console.log(targetProfessionsPrice)
    }
    console.log(professionStr)
    professionStr = professionStr.substr(0, professionStr.length - 2)
    const subtotal = targetProfessionsPrice + targetInterestsPrice + targetGenderPrice + targetAgePrice
    console.log(moment().format("MM/DD/YYYY hh:mm:ss"));
    //return successResponse(req, res, data2); 
    //userss[0].date + 
    let html = '<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <meta name="viewport" content="width=device-width; initial-scale=1.0">    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">    <title>Invoice</title> <style>    .zoom {zoom: 1.0;    }</style> </head><body class="zoom">    <div>        <div class=container style=" margin: auto ; min-width: 836px ; max-width: 836px ;            box-shadow: "rgba(149; 157; 165; 0.2) 0px 8px 24px"">            <img src=https://ecodeacademy.com/sociomee/img/logo.png style=" margin-top: 2% ; width: 25%" />            <div class=row mt-4>                <div class="col-6">                    <h5 style=" color: #6E6B7B ; font-size: 14px ; font-family: Montserrat">                        Office 149; 450 South Brand Brooklyn                        <br />                        San Diego County; CA 91905; USA                        <br />                        +1 (123) 456 7891; +44 (876) 543 2198                    </h5>                </div>                <div class="col-6">                    <h5 style=" font-size: 18px ; color: #5E5873,">                        Order ID  ' + data[0].adId + '                         </h5>                    <h5 style=" color: #6E6B7B ; font-size: 14px">                        <span>Order date and time</span>                        <br />    ' + moment(data[0].createdAt).format("MM/DD/YYYY hh:mm A") + '                 </h5>                </div>            </div>            <hr style=" color: #82868B" />            <div class=row mt-3>                <div class="col-6 mb-2">                    <p style=" color: #6E6B7B ; font-size: 16px ; font-weight: bold">Invoice To:</p>                    <p style=" color: #6E6B7B ; font-size: 14px ; font-weight: 600 ; margin-top: 4%">' + data[0].fullName + '</p>                    <p style=" color: #82868B ; font-size: 14px ; font-weight: normal">' + data[0].homeAddress + '                                      <br />                    ' + data[0].mobile + '                            <br />                        ' + data[0].email + '                         </p>                </div>                <div class="col-6">                    <h5 style=" color: #6E6B7B ; font-size: 16px ; font-weight: bold">Payment Details:</h5>                    <p class=mt-4 style=" color: #82868B ; font-size: 14px ; font-weight: normal ;">Total                        Bill Amount:     $' + subtotal + '                    <br />                        Payment Status: <span style=" color: #28C76F ; font-size: 14px ; font-weight: bold ;">                            Complete</span>                        <br />                        Amount Paid:       $' + data[0].totalAmountToBePaid + '                               <br />                        Payment Gateway Name: ' + data[0].paidTo + '                            <br />                                                ID: ' + data[0].paymentDetails.id + '                        </p>      <br>         </div>            </div>            <div class=row mt-3 py-2 style=" background: #F3F2F7">                <div class=col-5 mb-1>                    <p style=" color: #5E5873 ; font-size: 14px ; font-weight: bold">AD DETAILS</p>                </div>                <div class="col-2 text-right">                    <span style=" color: #5E5873 ; font-size: 14px ; font-weight: bold">Duration:</span>                </div>                <div class="col-2 text-right">                    <span style=" color: #5E5873 ; font-size: 14px ; font-weight: bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PRICE/RATE</span>                </div>            </div>            <div class=row mt-3>                <div class=col-6>                    <p style=" color: #FF9F43 ; font-size: 18px ; font-weight: bold"> ' + data[0].adId + '     </p>                    <h5 class=mt-1 style=" font-size: 21px ; color: #5E5873 ; font-weight: 500" color="#5E5873">Fresh Ad                        for Startup</h5>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Target Genders (' + genderStr + ')</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Target Age Range (' + data1[0].adTargetAges[0].startAge + '-' + data1[0].adTargetAges[0].endAge + ')                    </p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Target Professions                        (' + professionStr + ')</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Target Interests                        (' + interestsStr + ')</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Target Locations (France;                        Italy; Germany)</p>                </div>                <div class=col-2 text-right mt-5>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal"></p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal"></p>                                       <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">&nbsp;&nbsp;&nbsp;</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">&nbsp;&nbsp;&nbsp;</p>         <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">' + diffDays + ' days</p>          <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">' + diffDays + ' days</p>        <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">' + diffDays + ' days</p>       <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">' + diffDays + ' days</p>           <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">' + diffDays + ' days</p>         </div>                <div class=col-2 text-right mt-5 >                        <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">  &nbsp;&nbsp;&nbsp; </p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">&nbsp;&nbsp;&nbsp;</p>                                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">$' + targetGenderPrice + '</p>         <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">$' + targetAgePrice + '</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">$' + targetProfessionsPrice + '</p>        <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">$' + targetInterestsPrice + '</p>      <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">$' + targetProfessionsPrice + '</p>             </div>            </div>            <hr style=" color: #82868B" />            <div class=row mt-3>                <div class=col-6>                    <span style=" color: #82868B ; font-size: 15px ; font-weight: normal">                        Tommy Shelby</span>                </div>                <div class=col-2 text-right>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Subtotal:</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal">Discount::</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal ;                        border-bottom: 1px solid #EBE9F1">Tax:</p>                    <p style=" color: #82868B ; font-size: 15px ; font-weight: normal ;">Total:</p>                </div>                <div class=col-2 text-right>                    <p style=" color: #5E5873 ; font-size: 15px ; font-weight: bold">$' + subtotal + '</p>                    <p style=" color: #5E5873 ; font-size: 15px ; font-weight: bold">$0</p>                    <p style=" color: #5E5873 ; font-size: 15px ; font-weight: bold ;                        border-bottom: 1px solid #EBE9F1">0%</p>                    <p style=" color: #5E5873 ; font-size: 15px ; font-weight: bold">$' + subtotal + '</p>                </div>            </div>            <br />            <hr style=" color: #82868B" />            <br />            <h5 style=" color: #82868B ; font-size: 15px ; font-weight: normal">                Print date and time:   ' + moment().format("MM/DD/YYYY hh:mm A") + '       </h5>            <br />        </div>    </div>    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"        crossorigin="anonymous"></script>    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"        crossorigin="anonymous"></script>    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"        crossorigin="anonymous"></script></body></html> '
    const options = {
      format: 'Letter'
    }
    pdf.create(html, options).toFile('pdfname.pdf', (err, res) => {
      if (err) {
        console.log(err);
      }
    });


    // let theOutput = new PDFDocument();
    // theOutput.pipe(fs.createWriteStream("sample111.pdf"));
    // userss.forEach((item) => {
    //   theOutput
    //     .fontSize(25)
    //     .text("Invoice", {
    //       align: "center",
    //     })
    //     .fontSize(12)
    //     .font("Helvetica-Bold");
    //   theOutput.text("<div className='row mt-4'>      <div className='col-6'>          <h5 style={{ color: '#6E6B7B', fontSize: '14px', fontFamily: 'Montserrat' }}>              Office 149, 450 South Brand Brooklyn              <br />              San Diego County, CA 91905, USA              <br />              +1 (123) 456 7891, +44 (876) 543 2198          </h5>      </div>      <div className='col-6' >          <h5 align='right' style={{ fontSize: '18px', color: '#5E5873' }}>              Order ID #3492              {totalItems}          </h5>          <h5 align='right' style={{ color: '#6E6B7B', fontSize: '14px' }}>              <span>Order date and time</span>              <br />              01-05-2022, 06:00 pm          </h5>      </div>  </div> ");
    //   theOutput.text("date:");
    //   theOutput.font("Helvetica").text(item.date).font("Helvetica"); 
    //   theOutput.text(" ");
    //   theOutput.text("TRANSACTION:");
    //   theOutput.font("Helvetica").text(item.TRANSACTION).font("Helvetica"); 
    //   theOutput.text(" ");
    //   theOutput.text("type:");
    //   theOutput.font("Helvetica").text(item.type).font("Helvetica");
    //   theOutput.text(" ");
    //   theOutput.text("closingBalance:");
    //   theOutput.font("Helvetica").text(item.closingBalance).font("Helvetica");
    //   theOutput.text(" ");
    //   theOutput.text("paidTo:");
    //   theOutput.font("Helvetica").text(item.paidTo).font("Helvetica");
    //   theOutput.text(" ");
    //   theOutput.text("id:");
    //   theOutput.font("Helvetica").text(item.id).font("Helvetica");
    //   theOutput.text(" ");
    //   theOutput.text("changedAmount:");
    //   theOutput.font("Helvetica").text(item.changedAmount).font("Helvetica");
    //   theOutput.text(" ");
    //   theOutput.text("time:");
    //   theOutput.font("Helvetica").text(item.time).font("Helvetica");
    // });
    //theOutput.end()  

    // console.log(theOutput)  
    // const file = theOutput
    //     res.setHeader("Content-Type", "application/pdf");

    var file = fs.createReadStream('pdfname.pdf');
    var stat = fs.statSync('pdfname.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
    //return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getInsight = async (req, res) => {
  try {
    var data = await adMaanagerFunc.getInsight(req.body.adManagerId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addInsight = async (req, res) => {
  try {
    const userId = req.user.id;
    var data = await adMaanagerFunc.addInsight(req.body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLocationInsight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location, gender, age } = req.body;
    const adManagerId = req.body.adManagerId;
    var data = await adMaanagerFunc.getLocationInsight(
      adManagerId,
      location,
      gender,
      age
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getDayInsight = async (req, res) => {
  try {
    const adManagerId = req.body.adManagerId;
    const timePeriod = req.body.timePeriod;
    var data = await adMaanagerFunc.getDayInsight(adManagerId, timePeriod);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getGenderInsight = async (req, res) => {
  try {
    const userId = req.user.id;
    const adManagerId = req.body.adManagerId;
    var data = await adMaanagerFunc.getGenderInsight(adManagerId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAgeInsight = async (req, res) => {
  try {
    const userId = req.user.id;
    const adManagerId = req.body.adManagerId;
    var data = await adMaanagerFunc.getAgeInsight(adManagerId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addLike = async (req, res) => {
  try {
    console.log(req.user.email);
    const body = req.body;
    body.id = uuid();
    const userId = req.user.id;
    var data = await adMaanagerFunc.addLike(body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addShare = async (req, res) => {
  try {
    const body = req.body;
    body.id = uuid();
    const userId = req.user.id;
    var data = await adMaanagerFunc.addShare(body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addComment = async (req, res) => {
  try {
    const body = req.body;
    body.id = uuid();
    const userId = req.user.id;
    var data = await adMaanagerFunc.addComment(body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addView = async (req, res) => {
  try {
    const body = req.body;
    body.id = uuid();
    const userId = req.user.id;
    var data = await adMaanagerFunc.addView(body, userId);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    var result = await adMaanagerFunc.verifyPayment(
      body.id,
      body.adManagerId,
      body.paymentDetails
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const restartAd = async (req, res) => {
  try {
    const adManagerId = req.body.adManagerId;
    var result = await adMaanagerFunc.restartAd(adManagerId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const exportPdf = async (req, res) => {
  try {
    let adManagerId = req.body.adManagerId;
    adManagerId = adManagerId.toString();
    const direc = 1;
    const folder = 1;
    const timePeriod = req.body.timePeriod;
    const customDate1 = req.body.customDate1;
    const customDate2 = req.body.customDate2;
    var result = await adMaanagerFunc.exportPdf(
      adManagerId,
      direc,
      folder,
      timePeriod,
      customDate1,
      customDate2
    );
    // let a = result.filename;
    // a = a.toString();
    // const result1 = a.replace("\\", "");
    // console.log(result1);
    //path.resolve("./");
    //return res.download(path.dirname("TestDocument.pdf"));
    const __filename = "TestDocument.pdf";
    console.log(path.dirname(__filename));
    console.log(path.dirname(require.main.filename) + "/TestDocument.pdf");
    const filename = path.dirname(require.main.filename) + "/TestDocument.pdf";
    var file = fs.createReadStream(
      path.dirname(require.main.filename) + "/TestDocument.pdf"
    );
    var stat = fs.statSync(
      path.dirname(require.main.filename) + "/TestDocument.pdf"
    );
    let data = fs.readFileSync(filename);
    // res.setHeader("Content-Length", stat.size);
    // res.setHeader("Content-Type", "application/pdf");
    // // res.setHeader("Content-Disposition", "attachment; filename=agreement.pdf");
    // // file.pipe(res);

    // fs.writeFile(data, result, function (err, data) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   // console.log("Reading from file " + args);
    //   res.set("Content-Type", "application/pdf");
    //   res.download(filename);
    // });

    res.set("Content-Type", "application/pdf");
    setTimeout(function () {
      res.download(path.dirname(require.main.filename) + "/TestDocument.pdf");
    }, 3000);

    //res.sendFile(path.dirname(require.main.filename) + "/TestDocument.pdf");
    // res.sendF(result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const exportExcel = async (req, res) => {
  try {
    const adManagerId = req.body.adManagerId;
    const filePath = path.dirname(require.main.filename);
    let direc = path.dirname(require.main.filename);
    direc = direc.replace("\\", "/");
    direc = direc + "/";
    console.log(filePath);
    var result = await adMaanagerFunc.exportExcel(adManagerId, direc);
    res.set(
      "Content-Type",
      "	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    setTimeout(function () {
      res.download(result);
    }, 3000);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdCancelReasons = async (req, res) => {
  try {
    let result = await adMaanagerFunc.getAdCancelReasons();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createLeadGenerationForm = async (req, res) => {
  try {
    let { adManagerId, name, description, fields } = req.body;
    let result = await adMaanagerFunc.createLeadGenerationForm(
      adManagerId,
      name,
      description,
      fields,
      req.user.id
    );
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLeadInputTypes = async (req, res) => {
  try {
    let { } = req.body;
    let result = await adMaanagerFunc.getLeadInputTypes();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getLeadGenerationForm = async (req, res) => {
  try {
    let { adManagerId } = req.body;
    let result = await adMaanagerFunc.getLeadGenerationForm(adManagerId);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const answerLeadGenForm = async (req, res) => {
  try {
    let { fields } = req.body;
    const userId = req.user.id;
    let result = await adMaanagerFunc.answerLeadGenForm(userId, fields);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getWalletStatementsByDate = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body
    var html = fs.readFileSync(path.resolve(__dirname, "../../pdfTemplate/walletStatement.html"), "utf8");

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "28mm",
        contents: {
          first: 'Page : 1',
          2: 'Page : 2',
          default: '<span style="color: #444; text-align:"center">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
        }
      }
    };

    const userData = req.user
    const walletData = await adMaanagerFunc.getUserWalletAmount(req.user.id)
    const transactionData = await adMaanagerFunc.getTransactionDetailsByDate(req.user.id, fromDate, toDate)
    if (transactionData.length === 0) {
      return failResponse(req, res, "No Record Found")
    }
    var user = {
      name: userData.fullName,
      address: userData.homeAddress,
      country: "India",
      mobile: userData.mobile
    }
    var wallet = {
      walletId: walletData.id,
      balance: `${walletData.currencySymbols} ${walletData.amount}`,
      freezeBalance: `${walletData.currencySymbols} ${walletData.freezeAmount}`,
      spentAmount: `${walletData.currencySymbols} ${walletData.spentAmount}`
    }
    var date = {
      from: moment(fromDate).format('MMMM Do YYYY'),
      to: moment(toDate).format('MMMM Do YYYY')
    }
    var document = {
      html: html,
      data: {
        user,
        wallet,
        date,
        transactionData
      },
      path: "./output.pdf",
      type: "",
    };
    await nodePdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    var file = fs.createReadStream('output.pdf');
    var stat = fs.statSync('output.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
    // return successResponse(req, res, "success")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const getTransactionPdfById = async (req, res) => {
  try {
    const { id } = req.body
    let transactionData = await adMaanagerFunc.getTransDetailsById(id)
    if (!transactionData) {
      return failResponse(req, res, "Enter correct transaction id")
    }
    var html = fs.readFileSync(path.resolve(__dirname, "../../pdfTemplate/transactionInvoice.html"), "utf8");

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "28mm",
        contents: {
          first: 'Page : 1',
          2: 'Page : 2',
          default: '<span style="color: #444; text-align:"center">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
        }
      }
    };
    if (transactionData.type === "credit") {
      transactionData.description = `${transactionData.amount} successfully added`
    }
    var document = {
      html: html,
      data: {
        transactionData
      },
      path: "./invoice.pdf",
      type: "",
    };
    await nodePdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    var file = fs.createReadStream('invoice.pdf');
    var stat = fs.statSync('invoice.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
    // return successResponse(req,res,"success")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editAd = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return failResponse(req, res, "Enter ad - id")
    }
    const result = await adMaanagerFunc.editAd(id, req.body, req.user.id)
    return successResponse(req, res, "success")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdInvoice = async (req, res) => {
  try {
    const { id } = req.body
    let adDetails = await adMaanagerFunc.getAdDetailsForInvoice(req.user.id, id)
    if (!adDetails) {
      return failResponse(req, res, "Enter correct ad id")
    }

    var html = fs.readFileSync(path.resolve(__dirname, "../../pdfTemplate/adinvoice.html"), "utf8");

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "28mm",
        contents: {
          first: 'Page : 1',
          2: 'Page : 2',
          default: '<span style="color: #444; text-align:"center">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
        }
      }
    };

    var document = {
      html: html,
      data: {
        adDetails
      },
      path: "./adinvoice.pdf",
      type: "",
    };
    await nodePdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    var file = fs.createReadStream('adinvoice.pdf');
    var stat = fs.statSync('adinvoice.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
    // return successResponse(req,res,"success")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getFreezeAmountTransactionDetails = async (req, res) => {
  try {
    const userId = req.user.id
    const data = await adMaanagerFunc.getFreezeAmountTransactionDetails(userId, req.body)
    return successResponse(req, res, data)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdInsightPdf = async (req, res) => {
  try {
    const adDetails = await adMaanagerFunc.getInsightByDate(req.body)
    if (!adDetails) {
      return failResponse(req, res, "Enter correct adManagerId, toDate and fromDate")
    }
    var html = fs.readFileSync(path.resolve(__dirname, "../../pdfTemplate/adInsight.html"), "utf8");

    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      footer: {
        height: "28mm",
        contents: {
          first: 'Page : 1',
          2: 'Page : 2',
          default: '<span style="color: #444; text-align:"center">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
        }
      }
    };

    var document = {
      html: html,
      data: {
        adDetails
      },
      path: "./adInsight.pdf",
      type: "",
    };
    await nodePdf
      .create(document, options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
    var file = fs.createReadStream('adInsight.pdf');
    var stat = fs.statSync('adInsight.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=adInsight.pdf');
    file.pipe(res);
    // return successResponse(req,res,"success")
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdByUserId = async (req, res) => {
  try {
    // const result = await adMaanagerFunc.getAdByUserId(req.body)
    const result = await adMaanagerFunc.getAdByUserId(req.body.userId, req.body)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAdForDisplay = async (req, res) => {
  try {
    const userId = req.user.id
    const result = await adMaanagerFunc.getAdForDisplay(userId, req.body.type)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const reportAd = async (req, res) => {
  try {
    const userId = req.user.id
    const {reportId, adManagerId} = req.body
    if(!req.body.reportId){
      return failResponse(req, res, "Enter reportId")
    }
    if(!req.body.adManagerId){
      return failResponse(req, res, "Enter adManagerId")
    }
    const result = await adMaanagerFunc.reportAd(userId, reportId, adManagerId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const hideAd = async (req, res) => {
  try {
    const userId = req.user.id
    const {adManagerId} = req.body
    if(!req.body.adManagerId){
      return failResponse(req, res, "Enter adManagerId")
    }
    const result = await adMaanagerFunc.hideAd(userId, adManagerId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const dontShowThisTypeOfAd = async (req, res) => {
  try {
    const userId = req.user.id
    const { adSubTypeId } = req.body
    if(!req.body.adSubTypeId){
      return failResponse(req, res, "Enter adSubTypeId")
    }
    const result = await adMaanagerFunc.dontShowThisTypeOfAd(userId, adSubTypeId)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
};