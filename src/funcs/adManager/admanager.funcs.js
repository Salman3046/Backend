require("dotenv").config();
const moment = require("moment");
let path = require("path");
import AWS from "aws-sdk";
import { log } from "console";
import { v4 as uuid } from "uuid";

const PDFGenerator = require("pdfkit");
import { adManager } from "../../controllers/adManager/dataInterface";
var fs = require("fs");
import {
  sequelize,
  Sequelize,
  adManagers,
  adMedias,
  adMastrerTypes,
  adTypes,
  adSubTypes,
  adCallToActionMasters,
  adPreferrencesMasters,
  adProfessionMasters,
  adInterestsMasters,
  budgetAndDurations,
  adTagedPeopels,
  adTargetLocations,
  adTargetInterests,
  adTargetProfessions,
  adTargetGenders,
  adTargetAges,
  adPreferrences,
  interests,
  adWallets,
  adUserWallets,
  adUserTransactions,
  paymentGatewayMasters,
  adPayments,
  users,
  adPostComments,
  adPostEngagements,
  adPostReactions,
  adPostShares,
  insights,
  adPostImpressions,
  adPeopleReacheds,
  userSession,
  adCancelReasonsMasters,
  adCancelReasons,
  currencySettings
} from "../../models";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_S3_REGION,
});

const spacesEndpoint = new AWS.Endpoint(process.env.AWS_S3_ENDPOINT);
const s3 = new AWS.S3({ endpoint: spacesEndpoint });

const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");

export const getCountForAd = async (userId) => {
  return {
    runningAd: await adManagers.count({
      where: {
        userId,
        adStatus: "RUNNING",
        isDeleted: false,
      },
    }),
    draftAd: await adManagers.count({
      where: {
        userId,
        adStatus: "DRAFT",
        isDeleted: false,
      },
    }),
    completedAd: await adManagers.count({
      where: {
        userId,
        adStatus: "COMPLETED",
        isDeleted: false,
      },
    }),
  };
};

export const getAdByStatus = async (userId, params) => {
  const { adStatus, pageNumber, pageSize } = params;

  const getData = await sequelize.query(`
    SELECT 
    am.id,
    am.discriptions,
    am.adStatus,
    am.adId,
    am.isPaid,
    am.createdAt,
    am.websiteLink,
    
    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adMedias.id,
      "file",CONCAT(:BaseURL,adMedias.file),
      "fileType",adMedias.fileType,
      "heading",adMedias.heading,
      "subHeading",adMedias.subHeading,
      "callToActionId",adMedias.callToActionId,
      "adCallToActionMaster",(SELECT JSON_OBJECT(
        "id",acam.id,
        "name",acam.name,
        "descriptions",acam.descriptions
      )
      FROM adCallToActionMasters acam WHERE acam.id=adMedias.callToActionId
      )
    )) FROM adMedias WHERE adManagerId=am.id AND isActive=true AND isDeleted=false ORDER BY createdAt desc ),JSON_ARRAY()) as adMedias,

    (SELECT JSON_OBJECT(
      "id",at.id,
      "adTypes",at.adTypes,
      "descriptions",at.descriptions,
      "adMastrerTypesId",at.adMastrerTypesId,
      "adMasterTypes",(SELECT JSON_OBJECT(
        "name",amt.name,
        "id",amt.id
      ) FROM adMastrerTypes amt WHERE id=at.adMastrerTypesId
      )
    ) FROM adTypes at WHERE at.id=am.adTypesId AND at.isActive=true AND at.isDeleted=false ) as adType ,
    
    (SELECT JSON_OBJECT(
     "id",ast.id,
     "adTypesId",ast.adTypesId,
     "name",ast.name,
     "descriptions",ast.descriptions,
     "note",ast.note,
     "file",ast.file,
     "adFormat",ast.adFormat
    ) FROM adSubTypes ast WHERE ast.id=am.adSubTypesId AND ast.isActive=true AND isDeleted=false) as adSubType ,
    
    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adP.id,
      "adPreferrencesMaster",(JSON_OBJECT(
        "name",adPM.name
      ))
    )) FROM adPreferrences adP INNER JOIN adPreferrencesMasters adPM ON
    adPM.id=adP.adPreferrencesMastersId WHERE adP.adManagerId=am.id AND adP.isActive=true AND adPM.isActive=true
    ),JSON_ARRAY()) as adPreferrences,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adPro.id,
    "adProfessionMaster",(JSON_OBJECT(
      "name",(SELECT name FROM professions WHERE id=adProMas.professionId)
    ))
    )) FROM adTargetProfessions adPro 
    INNER JOIN 
    adProfessionMasters adProMas ON adProMas.id=adPro.adProfessionMastersId WHERE adPro.adManagerId=am.id AND adPro.isActive=true AND adPro.isDeleted=false
    ),JSON_ARRAY()) as adTargetProfessions,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adTI.id,
      "adInterestsMaster",(JSON_OBJECT(
        "name",(SELECT name FROM interests WHERE id=adIM.intrestId)
      ))
      )) FROM adTargetInterests adTI INNER JOIN 
      adInterestsMasters adIM ON adIM.id=adTI.adInterestsMastersId AND adIM.isActive=true AND adTI.isActive=true AND adTI.adManagerId=am.id
      ),JSON_ARRAY()) as adTargetInterests,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "startAge",adTA.startAge,
     "endAge",adTA.endAge
      )) FROM adTargetAges adTA where adTA.adManagerId=am.id AND adTA.isActive=true
      ),JSON_ARRAY()) as adTargetAges,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adTG.id,
     "genderId",adTG.genderId,
     "name",gm.name,
     "price",gc.priceCount
      )) FROM  adTargetGenders adTG 
      INNER JOIN genderConfigs gc ON 
      gc.id=adTG.genderId
      INNER JOIN genderMasters gm 
      ON gm.id=gc.genderMastersId
      WHERE gm.isActive=true AND gc.isActive=true AND adTG.adManagerId=am.id AND adTG.isActive=true AND adTG.isDeleted=false
      ),JSON_ARRAY()) as adTargetGenders,

      IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adTL.id,
     "location",adTL.location,
     "lat",adTL.lat,
     "long",adTL.lang
      )) FROM adTargetLocations adTL WHERE adManagerId=am.id AND adTL.isActive=true AND adTL.isDeleted=false
      ),JSON_ARRAY()) as adTargetLocations,

      IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",bd.id,
     "userId",bd.userId,
     "adManagerId",bd.adManagerId,
     "dailyBudget",bd.dailyBudget,
     "startDate",DATE(bd.startDate),
     "endDate",DATE(bd.endDate),
     "totalAmountToBePaid",bd.totalAmountToBePaid
      )) FROM budgetAndDurations bd WHERE bd.adManagerId=am.id AND bd.isActive=true
      ),JSON_ARRAY()) as budgetAndDurations,

      (SELECT JSON_OBJECT(
        "id",u.id,
        "profileImage",CONCAT(:BaseURL,u.profileImage),
        "userName",u.userName,
        "fullName",u.fullName,
        "profileImageThumb",CONCAT(:BaseURL,u.profileImageThumb)
      ) FROM users u WHERE u.id=am.userId ) as user,
      
      bm.totalAmountToBePaid,
      aw.amount as availableBalance,
      cs.currencyCode,
      cs.currencySymbols  
      FROM adManagers am
      LEFT JOIN budgetAndDurations bm ON
      bm.adManagerId=am.id
      INNER JOIN adUserWallets aw ON
      aw.userId=:userId
      INNER JOIN currencySettings cs ON
      cs.id=aw.currencyId

      WHERE am.userId=:userId AND am.adStatus=:adStatus AND am.isActive=true AND am.isDeleted=false
    `, {
    type: QueryTypes.SELECT,
    replacements: { userId, adStatus, BaseURL: process.env.FTP_BASE_URL }
  })
  return getData
};

export const getAdById = async (userId, id) => {
  const getData = await sequelize.query(`
    SELECT 
    am.id,
    am.discriptions,
    am.adStatus,
    am.adId,
    am.isPaid,
    am.websiteLink,
    
    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adMedias.id,
      "file",CONCAT(:BaseURL,adMedias.file),
      "fileType",adMedias.fileType,
      "heading",adMedias.heading,
      "subHeading",adMedias.subHeading,
      "callToActionId",adMedias.callToActionId,
      "adCallToActionMaster",(SELECT JSON_OBJECT(
        "id",acam.id,
        "name",acam.name,
        "descriptions",acam.descriptions
      )
      FROM adCallToActionMasters acam WHERE acam.id=adMedias.callToActionId
      )
    )) FROM adMedias 
    WHERE adMedias.adManagerId=:id AND adMedias.isActive=true AND adMedias.isDeleted=false ORDER BY adMedias.createdAt desc ),JSON_ARRAY()) as adMedias,

    (SELECT JSON_OBJECT(
      "id",at.id,
      "adTypes",at.adTypes,
      "descriptions",at.descriptions,
      "adMasterTypes",(SELECT JSON_OBJECT(
        "name",amt.name,
        "id",amt.id
      ) FROM adMastrerTypes amt WHERE id=at.adMastrerTypesId
      )
    ) FROM adTypes at WHERE at.id=am.adTypesId AND at.isActive=true AND at.isDeleted=false ) as adType ,
    
    (SELECT JSON_OBJECT(
     "id",ast.id,
     "adTypesId",ast.adTypesId,
     "name",ast.name,
     "descriptions",ast.descriptions,
     "note",ast.note,
     "file",ast.file,
     "adFormat",ast.adFormat
    ) FROM adSubTypes ast WHERE ast.id=am.adSubTypesId AND ast.isActive=true AND isDeleted=false) as adSubType ,
    
    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adP.id,
      "adPreferrencesMastersId",adP.adPreferrencesMastersId,
      "name",adPM.name,
      "discriptions",adPM.discriptions
    )) FROM adPreferrences adP INNER JOIN adPreferrencesMasters adPM ON
    adPM.id=adP.adPreferrencesMastersId WHERE adP.adManagerId=:id AND adP.isActive=true AND adPM.isActive=true
    ),JSON_ARRAY()) as adPreferrences,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adPro.id,
    "adProfessionMastersId",adPro.adProfessionMastersId,
    "name",(SELECT name FROM professions WHERE id=adProMas.professionId),
    "price",adProMas.priceForAudiance
    )) FROM adTargetProfessions adPro 
    INNER JOIN 
    adProfessionMasters adProMas ON adProMas.id=adPro.adProfessionMastersId WHERE adPro.adManagerId=:id AND adPro.isActive=true AND adPro.isDeleted=false
    ),JSON_ARRAY()) as adTargetProfessions,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adTI.id,
      "adInterestsMastersId",adTI.adInterestsMastersId,
      "name",(SELECT name FROM interests WHERE id=adIM.intrestId),
      "price",adIM.priceForAudiance
      )) FROM adTargetInterests adTI INNER JOIN 
      adInterestsMasters adIM ON adIM.id=adTI.adInterestsMastersId AND adIM.isActive=true AND adTI.isActive=true AND adTI.adManagerId=:id
      ),JSON_ARRAY()) as adTargetInterests,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "startAge",adTA.startAge,
     "endAge",adTA.endAge
      )) FROM adTargetAges adTA where adTA.adManagerId=:id AND adTA.isActive=true
      ),JSON_ARRAY()) as adTargetAges,

    IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adTG.id,
     "genderId",adTG.genderId,
     "name",gm.name,
     "price",gc.priceCount
      )) FROM  adTargetGenders adTG 
      INNER JOIN genderConfigs gc ON 
      gc.id=adTG.genderId
      INNER JOIN genderMasters gm 
      ON gm.id=gc.genderMastersId
      WHERE gm.isActive=true AND gc.isActive=true AND adTG.adManagerId=:id AND adTG.isActive=true AND adTG.isDeleted=false
      ),JSON_ARRAY()) as adTargetGenders,

      IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",adTL.id,
     "location",adTL.location,
     "lat",adTL.lat,
     "long",adTL.lang
      )) FROM adTargetLocations adTL WHERE adManagerId=:id AND adTL.isActive=true AND adTL.isDeleted=false
      ),JSON_ARRAY()) as adTargetLocations,

      IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
     "id",bd.id,
     "userId",bd.userId,
     "adManagerId",bd.adManagerId,
     "dailyBudget",bd.dailyBudget,
     "startDate",DATE(bd.startDate),
     "endDate",DATE(bd.endDate),
    "totalAmountToBePaid",bd.totalAmountToBePaid
      )) FROM budgetAndDurations bd WHERE bd.adManagerId=:id AND bd.isActive=true
      ),JSON_ARRAY()) as budgetAndDurations,

      (SELECT JSON_OBJECT(
        "id",u.id,
        "profileImage",CONCAT(:BaseURL,u.profileImage),
        "userName",u.userName,
        "fullName",u.fullName,
        "profileImageThumb",CONCAT(:BaseURL,u.profileImageThumb)
      ) FROM users u WHERE u.id=am.userId ) as user,
      
      bm.totalAmountToBePaid,
      aw.amount as availableBalance,
      cs.currencyCode,
      cs.currencySymbols  

      FROM adManagers am
      LEFT JOIN budgetAndDurations bm ON
      bm.adManagerId=am.id
      INNER JOIN adUserWallets aw ON
      aw.userId=am.userId
      INNER JOIN currencySettings cs ON
      cs.id=aw.currencyId

      WHERE am.id=:id 
    `, {
    type: QueryTypes.SELECT,
    replacements: { id, BaseURL: process.env.FTP_BASE_URL }
  })
  if (getData.length > 0) {
    return getData[0]
  }
  return {}
};

export const getSpentById = async (userId, params) => {
  const { pageNumber, pageSize } = params;
  let history = {};
  var totalSpent = await adUserTransactions.findAll({
    where: {
      userId: userId,
      type: "debit",
      isDeleted: false,
    },
    // include: [
    //   {
    //     model: users,        
    //     include: [
    //       {
    //         model: paymentGatewayMasters,
    //         attributes: ["paymentGatewayName"],
    //       },
    //     ],
    //   },
    // ],

    attributes: [
      "id",
      "type",
      "adManagerId",
      "description",
      "currencyId",
      "amount",
      "closingBalance",
      "paidTo",
      "paymentDetails",
      "createdAt"
    ],
    include: [
      {
        model: adManagers,
        required: true,
        attributes: ["id", "adId", "adStatus", "discriptions", "isActive"],
      },
    ],
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  });
  let finalArray = [];
  totalSpent.forEach((item) => {
    console.log(item.createdAt);
    let date = moment(item.createdAt).format("YYYY-MM-DD");
    let time = moment(item.createdAt).format("hh:mm:ss");
    let details = [];
    let transs = {
      TRANSACTION: 0,
      adManagerId: item.adManager.id,
      type: item.type,
      closingBalance: item.closingBalance,
      paidTo: item.adManagerId,
      id: item.id,
      closingBalance: item.closingBalance,
      changedAmount: item.amount,
      //SPENT: item.adManagerId,
      adId: item.adManager.adId,
      isActive: item.adManager.isActive,
      discriptions: item.adManager.discriptions,
      adStatus: item.adManager.adStatus,
      //paymentGateway: item.paymentGatewayName,
      time: time,
      transactionDescription: item.description,
      currencyId: item.currrencyId,
      currencySymbols: "$"
    };
    details.push(transs);

    // let Date = {};
    // Date.DATE = 1;
    // Date.date = date;

    let obj = finalArray.find((x) => x.date == date);
    if (obj == null) {
      let trans = {
        DATE: 1,
        date: date,
        details: details,
      };
      finalArray.push(trans);
    } else {
      obj.details.push(transs);
    }
  });
  //history.TopUpHistory = groupBy(totalSpent, "createdAt");
  console.log(finalArray);
  history.error = false;
  history.success = true;
  //console.log(grouped);
  history.TopUpHistory = totalSpent;

  finalArray.forEach((item) => {
    let length = item.details.length;
    item.details.forEach((final) => {
      final.TRANSACTION = length;
    });
  });
  return finalArray;
};

export const getTopUpById = async (userId, params) => {
  const { pageNumber, pageSize } = params;
  let history = {};
  var totalSpent = await adUserTransactions.findAll({
    where: {
      userId: userId,
      type: "credit",
      isDeleted: false,
    },
    include: [
      {
        model: users
      },
    ],
    attributes: [
      "id",
      "type",
      "description",
      "currencyId",
      "amount",
      "closingBalance",
      "paidTo",
      "paymentDetails",
      "createdAt"
    ],
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
    // group: ["createdAt"],
    order: [["createdAt", "DESC"]],
  });
  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  let finalArray = [];
  console.log(totalSpent);
  totalSpent.forEach((item) => {
    console.log(item.createdAt);
    let date = moment(item.createdAt).format("YYYY-MM-DD");
    let time = moment(item.createdAt).format("hh:mm:ss");
    let details = [];
    let transs = {
      TRANSACTION: 0,
      type: item.type,
      closingBalance: item.closingBalance,
      id: item.id,
      closingBalance: item.closingBalance,
      changedAmount: item.amount,
      time: time,
      transactionDescription: item.description,
      paidTo: item.paidTo,
      currencySymbols: "$"
    };
    details.push(transs);

    // let Date = {};
    // Date.DATE = 1;
    // Date.date = date;

    let obj = finalArray.find((x) => x.date == date);
    if (obj == null) {
      let trans = {
        DATE: 1,
        date: date,
        details: details,
      };
      finalArray.push(trans);
    } else {
      obj.details.push(transs);
    }
  });
  history.TopUpHistory = groupBy(totalSpent, "createdAt");
  console.log(finalArray);
  history.error = false;
  history.success = true;
  //console.log(grouped);
  history.TopUpHistory = totalSpent;

  finalArray.forEach((item) => {
    let length = item.details.length;
    item.details.forEach((final) => {
      final.TRANSACTION = length;
    });
    console.log("================================");
  });
  return finalArray;
};

export const getTotalAmount = async (id) => {
  var adResponse = await budgetAndDurations.findAll({
    where: {
      adManagerId: id,
    },
    // include: [
    //     {
    //         model: adTargetGenders,
    //         attributes: ['name', 'id']
    //     },
    //     {
    //         model: adTargetGenders,
    //         attributes: ['name', 'id']
    //     },
    //     {
    //         model: adTargetProfessions,
    //         include: [{
    //             model: adProfessionMasters,
    //             attributes: ['name']
    //         }],
    //         attributes: ['id']
    //     },
    //     {
    //         model: adTargetInterests,
    //         include: [{
    //             model: adInterestsMasters,
    //             attributes: ['name']
    //         }],
    //         attributes: ['id']
    //     },
    //     {
    //         model: budgetAndDurations,
    //         attributes: {
    //             exclude: ['createdAt', 'updatedAt']
    //         }
    //     },
    //     {
    //         model: adTargetLocations,
    //         attributes: ['location', 'id']
    //     }
    // ]
  });
  return adResponse;
};

export const getTransactionHistoryById = async (userId, params) => {
  const { pageNumber, pageSize } = params;
  let history = {};
  var totalSpent = await adUserTransactions.findAll({
    where: {
      userId: userId,
      isDeleted: false,
    },
    include: [
      {
        model: adManagers,
        required: false,
        attributes: ["id", "adId", "adStatus", "discriptions", "isActive"],
      },
    ],
    attributes: [
      "id",
      "userId",
      "type",
      "adManagerId",
      "description",
      "currencyId",
      "amount",
      "closingBalance",
      "paidTo",
      "createdAt",
      "paymentDetails",
      "isActive"
    ],
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  });
  let finalArray = [];
  totalSpent.forEach((item) => {
    let date = moment(item.createdAt).format("YYYY-MM-DD");
    let time = moment(item.createdAt).format("hh:mm:ss");
    let details = [];
    let transs = {};
    if (item.type == "credit") {
      transs = {
        TRANSACTION: 0,
        type: item.type,
        closingBalance: item.closingBalance,
        //paidTo: item.user.paymentGatewayMasters[0].paymentGatewayName,
        paidTo: item.paidTo,
        id: item.id,
        closingBalance: item.closingBalance,
        changedAmount: item.amount,
        time: time,
        currencyId: item.currencyId,
        description: item.description,
        currencySymbols: "$"
      };
    } else if (item.type == "debit") {
      let adId = ""
      let adManagerId = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        adId = "null"
      }
      else {
        adId = item.adManager.adId
        adManagerId = item.adManager.id
      }
      let isActive = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        isActive = "null"
      }
      else {
        isActive = item.adManager.isActive
      }
      let discriptions = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        discriptions = "null"
      }
      else {
        discriptions = item.adManager.discriptions
      }
      let adStatus = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        adStatus = "null"
      }
      else {
        adStatus = item.adManager.adStatus
      }
      transs = {
        TRANSACTION: 0,
        type: item.type,
        closingBalance: item.closingBalance,
        paidTo: item.adManagerId,
        id: item.id,
        closingBalance: item.closingBalance,
        changedAmount: item.amount,
        adId: adId,
        adManagerId: adManagerId,
        isActive: isActive,
        discriptions: discriptions,
        adStatus: adStatus,
        time: time,
        currencyId: item.currencyId,
        description: item.description,
        currencySymbols: "$"
      };
    }
    details.push(transs);

    // let Date = {};
    // Date.DATE = 1;
    // Date.date = date;

    let obj = finalArray.find((x) => x.date == date);
    if (obj == null) {
      let trans = {
        DATE: 1,
        date: date,
        details: details,
      };
      finalArray.push(trans);
    } else {
      obj.details.push(transs);
    }
  });
  //history.TopUpHistory = groupBy(totalSpent, "createdAt");
  console.log(finalArray);
  history.error = false;
  history.success = true;
  //console.log(grouped);
  history.TopUpHistory = totalSpent;
  // console.log(finalArray);
  finalArray.forEach((item) => {
    let length = item.details.length;
    item.details.forEach((final) => {
      final.TRANSACTION = length;
    });
    console.log("================================");
  });
  return finalArray;
};

export const getInvoiceData = async (id, params) => {
  const { pageNumber, pageSize } = params;
  let history = {};
  // var totalSpent = await adUserTransactions.findAll({
  //   where: {
  //     userId: userId,
  //     isDeleted: false,
  //   },
  //   include: [
  //     {
  //       model: adManagers,
  //       required: false,
  //       attributes: ["adId","adStatus","discriptions","isActive"],
  //     },
  //   ],
  //   attributes: [
  //     "id",
  //     "amount",
  //     "ttype",
  //     "type",
  //     "paidTo",
  //     "createdAt",
  //     "closingBalance",
  //     "paymentDetails",
  //   ],
  //   offset: (pageNumber - 1) * pageSize,
  //   limit: pageSize,
  //   order: [["createdAt", "DESC"]],
  // });

  const q = 'SELECT adId, adManagers.userId, u.fullName,u.email, u.mobile, u.homeAddress, b.totalAmountToBePaid,b.startDate,b.endDate, a.paidTo, a.paymentDetails, a.createdAt from adManagers INNER JOIN users u ON u.id=adManagers.userId INNER JOIN budgetAndDurations b ON b.adManagerId=adManagers.id INNER JOIN adUserTransactions a ON a.adManagerId=adManagers.id where adManagers.id=:id'
  const totalSpent = await sequelize.query(
    q,
    {
      replacements: { id },
      type: QueryTypes.SELECT,
    }
  );
  return totalSpent;

  let finalArray = [];
  console.log(totalSpent);
  totalSpent.forEach((item) => {
    console.log(item.createdAt);
    let date = moment(item.createdAt).format("YYYY-MM-DD");
    let time = moment(item.createdAt).format("hh:mm:ss");
    let details = [];
    let transs = {};
    if (item.type == "credit") {
      transs = {
        TRANSACTION: 0,
        type: item.type,
        closingBalance: item.closingBalance,
        //paidTo: item.user.paymentGatewayMasters[0].paymentGatewayName,
        paidTo: item.paidTo,
        id: item.id,
        closingBalance: item.closingBalance,
        changedAmount: item.amount,
        time: time,
      };
    } else if (item.type == "debit") {
      let adId = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        adId = "null"
      }
      else {
        adId = item.adManager.adId
      }
      let isActive = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        isActive = "null"
      }
      else {
        isActive = item.adManager.isActive
      }
      let discriptions = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        discriptions = "null"
      }
      else {
        discriptions = item.adManager.discriptions
      }
      let adStatus = ""
      if (item.adManager == null || !item.adManager || item.adManager === undefined) {
        adStatus = "null"
      }
      else {
        adStatus = item.adManager.adStatus
      }
      transs = {
        TRANSACTION: 0,
        type: item.type,
        closingBalance: item.closingBalance,
        paidTo: item.adManagerId,
        id: item.id,
        closingBalance: item.closingBalance,
        changedAmount: item.amount,
        adId: adId,
        isActive: isActive,
        discriptions: discriptions,
        adStatus: adStatus,
        time: time,
      };
    }
    details.push(transs);

    // let Date = {};
    // Date.DATE = 1;
    // Date.date = date;

    let obj = finalArray.find((x) => x.date == date);
    if (obj == null) {
      let trans = {
        DATE: 1,
        date: date,
        details: details,
      };
      finalArray.push(trans);
    } else {
      obj.details.push(transs);
    }
  });
  //history.TopUpHistory = groupBy(totalSpent, "createdAt");
  console.log(finalArray);
  history.error = false;
  history.success = true;
  //console.log(grouped);
  history.TopUpHistory = totalSpent;
  // console.log(finalArray);
  finalArray.forEach((item) => {
    let length = item.details.length;
    item.details.forEach((final) => {
      final.TRANSACTION = length;
    });
    console.log("================================");
  });
  return finalArray;
};

export const getTransactionDetails = async (userId, params) => {
  const { pageNumber, pageSize } = params;
  let history = {};
  var totalSpent = await adUserTransactions.findAll({
    where: {
      userId: userId,
      isDeleted: false,
    },
    attributes: [
      "id",
      "amount",
      "type",
      "paidTo",
      "createdAt",
      "closingBalance",
    ],
    offset: (pageNumber - 1) * pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  });
  history.error = false;
  history.success = true;
  history.totalTransaction = totalSpent;

  return history;
};

export const deleteDraftedAd = async (userId, adManagerId) => {
  let deleted = await adManagers.update(
    { values: { isDeleted: true, isActive: false } },
    {
      returning: true,
      where: { id: adManagerId, userId: userId, adStatus: "DRAFT" },
    }
  );
  console.log("inside dlt");
  return deleted;
};

export const adPaymentUserWallet = async (amount, walletId) => {
  console.log(walletId);
  adUserWallet
    .update(
      { values: { amount: amount } },
      {
        // returning: true,
        where: { id: walletId },
      }
    )
    .then(function (result) {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDefaultCountryCurrency = async () => {
  const getDefaultCurrency = await sequelize.query(`
  SELECT 
  id as currencyId,
  currencyCode,
  currencySymbols
  FROM currencySettings WHERE isDefault=true
  `, {
    type: QueryTypes.SELECT
  })
  return getDefaultCurrency[0]
}

export const getUserWalletAmount = async (userId) => {
  const countryData = await getDefaultCountryCurrency()
  const { currencyId } = countryData
  const getWalletAmount = await sequelize.query(`SELECT auw.id,
  auw.userId,
  auw.currencyId,
  cs.currencyCode,
  cs.currencySymbols,
  auw.amount,
  auw.freezeAmount,
  auw.spentAmount
   FROM adUserWallets auw
  JOIN currencySettings cs 
  ON cs.id=auw.currencyId
  WHERE userId=:userId `, {
    replacements: { userId },
    type: QueryTypes.SELECT
  })

  if (getWalletAmount.length > 0) {
    return getWalletAmount[0];
  }

  const id = uuid()
  const makeWallet = await sequelize.query(`INSERT INTO adUserWallets(id,userId,currencyId) VALUES(:id,:userId,:currencyId)`, {
    replacements: { id, userId, currencyId },
    type: QueryTypes.INSERT
  })

  return {
    id,
    userId,
    amount: 0,
    freezeAmount: 0,
    spentAmount: 0,
    ...countryData
  }
};

export const transactionDetails = async (transactionId) => {
  var transactions = {};
  var transactionDetails = await adUserTransactions.findOne({
    where: {
      id: transactionId,
    },
    attributes: [
      "type",
      "amount",
      "closingBalance",
      "createdAt",
      "id",
      "paymentDetails",
      "paidTo",
      "adManagerId",
      "description",
      "currencyId"
    ],
  });
  
  // console.log(transactionDetails.dataValues);

  const adData = await sequelize.query(`SELECT adId from adManagers WHERE id=(SELECT adManagerId FROM adUserTransactions WHERE id=:transactionId)`,{
    replacements: { transactionId },
    type : QueryTypes.SELECT
  })
  console.log(adData)
  let adId
  if (adData.length !== 0) {
    adId = adData[0].adId
  }

  let {type, amount, closingBalance} = transactionDetails.dataValues
  let openingBalance = 0;
  if(type == "debit"){
    openingBalance = parseFloat(closingBalance) + parseFloat(amount)
  } 
  if(type == "credit"){
    openingBalance = parseFloat(closingBalance) - parseFloat(amount)
  }

  if (!transactionDetails.dataValues.paymentDetails.id) {
    transactions.id = transactionDetails.dataValues.id;
    transactions.type = transactionDetails.dataValues.type;
    transactions.closingBalance = transactionDetails.dataValues.closingBalance;
    transactions.amount = transactionDetails.dataValues.amount;
    transactions.date = transactionDetails.dataValues.createdAt;
    transactions.paidTo = transactionDetails.dataValues.paidTo;
    transactions.adManagerId = transactionDetails.dataValues.adManagerId;
    transactions.description = transactionDetails.dataValues.description;
    transactions.currencyId = transactionDetails.dataValues.currencyId;
    transactions.paymentGateway = "Wallet";
    transactions.openingBalance = openingBalance
    transactions.adId = adId
    return transactions;
  } else {
    var paymentGateway = await paymentGatewayMasters.findOne({
      where: {
        id: transactionId,
      },
      attributes: ["id", "paymentGatewayName"],
    });
    transactions.id = transactionDetails.dataValues.paymentDetails.id;
    transactions.type = transactionDetails.dataValues.type;
    transactions.closingBalance = transactionDetails.dataValues.closingBalance;
    transactions.amount = transactionDetails.dataValues.amount;
    transactions.currency = transactionDetails.dataValues.paymentDetails.currency;
    transactions.date = transactionDetails.dataValues.createdAt;
    transactions.paymentGateway = transactionDetails.dataValues.paidTo;
    transactions.paidTo = transactionDetails.dataValues.paidTo;
    transactions.adManagerId = transactionDetails.dataValues.adManagerId;
    transactions.description = transactionDetails.dataValues.description;
    transactions.currencyId = transactionDetails.dataValues.currencyId;
    transactions.openingBalance = openingBalance ;
    transactions.adId = adId ;
    return transactions;
  }
};

export const getInsight = async (adManagerId) => {
  const getInsight = await sequelize.query(`SELECT
  am.id as adManagerId,
  am.adId,
  am.discriptions,
  am.adStatus,
  (SELECT JSON_OBJECT(
    "id",at.id,
    "adTypes",at.adTypes,
    "descriptions",at.descriptions,
    "adMasterTypes",(SELECT JSON_OBJECT(
      "name",amt.name,
      "id",amt.id
    ) FROM adMastrerTypes amt WHERE id=at.adMastrerTypesId
    )
  ) FROM adTypes at WHERE at.id=am.adTypesId AND at.isActive=true AND at.isDeleted=false ) as adType ,
  (SELECT JSON_OBJECT(
    "id",ast.id,
    "adTypesId",ast.adTypesId,
    "name",ast.name,
    "descriptions",ast.descriptions,
    "note",ast.note,
    "file",ast.file,
    "adFormat",ast.adFormat
   ) FROM adSubTypes ast WHERE ast.id=am.adSubTypesId AND ast.isActive=true AND isDeleted=false) as adSubType ,
  bd.dailyBudget as budgetAmount,
  bd.totalAmountToBePaid as initialAmountPaid,
  adFt.fixedCharge as stopAdCharge,
  IFNULL((SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adManagerId=:adManagerId),0) as totalPaid,
  IFNULL(ABS(bd.totalAmountToBePaid - (SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adManagerId=:adManagerId)),bd.totalAmountToBePaid) as totalLeft,
  DATEDIFF(bd.endDate,bd.startDate) as daysCount,
  DATEDIFF(bd.endDate,bd.startDate) as duration,
  CONCAT(genderMasters.name,", ", adTargetAges.startAge,"-",adTargetAges.endAge," ages")  as audience,
  bd.startDate,
  bd.endDate,
  am.userId,
  u.userName,
  u.fullName,
  CONCAT(:BaseURL, u.profileImage) as profileImage,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT(
    "id",adMedias.id,
    "file",CONCAT(:BaseURL,adMedias.file),
    "heading",adMedias.heading,
    "subHeading",adMedias.subHeading,
    "callToActionId",adMedias.callToActionId,
      "adCallToActionMaster",(SELECT JSON_OBJECT(
        "id",acam.id,
        "name",acam.name,
        "descriptions",acam.descriptions
      )
      FROM adCallToActionMasters acam WHERE acam.id=adMedias.callToActionId
      )
  )) FROM adMedias WHERE adManagerId=:adManagerId AND adMedias.isActive=true AND adMedias.isDeleted=false) as mediaFiles,

  (SELECT COUNT(*) FROM adPostReactions WHERE adManagerId=:adManagerId) as Reactions,
  (SELECT COUNT(*) FROM adPostEngagements WHERE adManagerId=:adManagerId) as PostEngagements,
  (SELECT COUNT(*) FROM adPostComments WHERE adManagerId=:adManagerId) as Comments,
  (SELECT COUNT(*) FROM adPostShares WHERE adManagerId=:adManagerId) as Shares,
  (SELECT COUNT(*) FROM adPeopleReacheds WHERE adManagerId=:adManagerId) as PeopleReached,

  (SELECT COUNT(*) FROM adPostImpressions WHERE adManagerId=:adManagerId) as Impressions,
  (SELECT COUNT(*) FROM adPostReactions WHERE adManagerId=:adManagerId) as Reactions,
  adTargetAges.startAge,
  adTargetAges.endAge,
  aw.amount as availableBalance,
  aw.freezeAmount as totalFreezedAmount,
  cs.currencyCode,
  cs.currencySymbols


  FROM adManagers am 
  INNER JOIN users u 
  ON am.userId=u.id
  LEFT JOIN budgetAndDurations bd
  ON bd.adManagerId=am.id
  LEFT JOIN adTargetAges ON 
  adTargetAges.adManagerId = am.id
  LEFT JOIN adFreezeTransactions adFt
  ON adFt.adManagerId=am.id
  LEFT JOIN adFreezeSystemTransaction
  ON adFreezeSystemTransaction.adManagerId=am.id
  INNER JOIN adUserWallets aw
  ON aw.userId=am.userId
  INNER JOIN currencySettings cs
  ON cs.id=aw.currencyId 
  LEFT JOIN adTargetGenders
  ON adTargetGenders.adManagerId=am.id
  LEFT JOIN genderConfigs
  ON genderConfigs.id=adTargetGenders.genderId
  LEFT JOIN genderMasters ON
  genderMasters.id=genderConfigs.genderMastersId
  WHERE am.id=:adManagerId AND am.isActive=true AND am.isDeleted=false 

  `, {
    replacements: { adManagerId, BaseURL: process.env.FTP_BASE_URL }
  })

  if (getInsight.length > 0) {
    return getInsight[0][0]
  }
  return {}
};


// export const addViews = async() => {
//   let peopleReached = await insights.find({

//     where: {adManagerId: body.adManagerId}

// })
// if(peopleReached){
//   let insights = await insights.update
// }

//}

export const addInsight = async (body, userId) => {
  let created = adPostImpressions.create({
    adManagerId: body.adManagerId,
    userId: userId,
  });
  return created;
  // console.log(body.impressions);
  // console.log(body.adManagerId);
  // let value = await adPostImpressions.findOne({
  //   where: { adManagerId: body.adManagerId, isDeleted: 0 },
  // });
  //console.log(value.dataValues);
  //if (!value) {

  //}
  // let update = await value.update({
  //   impressions: value.impressions + 1,
  // });
  // return update;
  // let adResponse = await insights.update(
  //   {
  //     values: {
  //       impressions: body.impressions,
  //       peopleReached: body.peopleReached,
  //     },
  //   },
  //   {
  //     // returning: true,
  //     where: { adManagerId: body.adManagerId, isActive: 1 },
  //   }
  // );

  // .then((updated) => {
  //   if (!updated) {
  //     console.log("not found");
  //   } else {
  //     console.log("found");
  //   }
  // });
  // return adResponse;
};

export const addLike = async (body, userId) => {
  let likef = await adPostReactions.findOne({
    where: { userId: userId, adManagerId: body.adManagerId },
  });

  if (!likef) {
    let like = await adPostReactions.create({
      id: body.id,
      userId: userId,
      adManagerId: body.adManagerId,
      reactionId: body.reactionId,
    });
    let postReach = await adPeopleReacheds.findOne({
      where: { adManagerId: body.adManagerId, userId: userId },
    });

    let user = await users.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: userSession,
          attributes: ["location1"],
        },
      ],
    });

    var today = new Date();
    var birthDate = new Date(user.dataValues.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!postReach) {
      let postReached = await adPeopleReacheds.create({
        adManagerId: body.adManagerId,
        userId: userId,
        age: age,
        gender: user.dataValues.gender,
        location: user.dataValues.userSessions[0].dataValues.location1,
      });
    }
    let adPostEngagement = await adPostEngagements.create({
      adManagerId: body.adManagerId,
      userId: userId,
      likeId: body.id,
      age: age,
      gender: user.dataValues.gender,
      location: user.dataValues.userSessions[0].dataValues.location1,
    });
    return "added";
  }

  //console.log(user.dataValues.userSessions[0].dataValues.location1);
  // console.log(user.dataValues.gender);
  // console.log(user.dataValues.fullName);
  //console.log(req.user);
  return "already exists";
};

export const addShare = async (body, userId) => {
  let likef = await adPostShares.findOne({
    where: { userId: userId, adManagerId: body.adManagerId },
  });

  if (!likef) {
    let like = await adPostShares.create({
      id: body.id,
      userId: userId,
      adManagerId: body.adManagerId,
      reactionId: body.reactionId,
    });
    let postReach = await adPeopleReacheds.findOne({
      where: { adManagerId: body.adManagerId, userId: userId },
    });
    let user = await users.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: userSession,
          attributes: ["location1"],
        },
      ],
    });

    var today = new Date();
    var birthDate = new Date(user.dataValues.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!postReach) {
      let postReached = await adPeopleReacheds.create({
        adManagerId: body.adManagerId,
        userId: userId,
        age: age,
        gender: user.dataValues.gender,
        location: user.dataValues.userSessions[0].dataValues.location1,
      });
    }
    let adPostEngagement = await adPostEngagements.create({
      adManagerId: body.adManagerId,
      userId: userId,
      shareId: body.id,
      age: age,
      gender: user.dataValues.gender,
      location: user.dataValues.userSessions[0].dataValues.location1,
    });
    return "added";
  }

  return "already exists";
};

export const addComment = async (body, userId) => {
  let likef = await adPostComments.findOne({
    where: { userId: userId, adManagerId: body.adManagerId },
  });

  if (!likef) {
    let like = await adPostComments.create({
      id: body.id,
      userId: userId,
      adManagerId: body.adManagerId,
      comment: body.comment,
    });
    let postReach = await adPeopleReacheds.findOne({
      where: { adManagerId: body.adManagerId, userId: userId },
    });
    let user = await users.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: userSession,
          attributes: ["location1"],
        },
      ],
    });

    var today = new Date();
    var birthDate = new Date(user.dataValues.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (!postReach) {
      let postReached = await adPeopleReacheds.create({
        adManagerId: body.adManagerId,
        userId: userId,
        age: age,
        gender: user.dataValues.gender,
        location: user.dataValues.userSessions[0].dataValues.location1,
      });
    }
    let adPostEngagement = await adPostEngagements.create({
      adManagerId: body.adManagerId,
      userId: userId,
      commentId: body.id,
      age: age,
      gender: user.dataValues.gender,
      location: user.dataValues.userSessions[0].dataValues.location1,
    });
    return "added";
  }

  return "already exists";
};

export const addView = async (body, userId) => {
  let {id, adManagerId} = body

  const checkView = await sequelize.query(` SELECT id FROM adPeopleReacheds WHERE adManagerId=:adManagerId AND userId=:userId `,{
    replacements : {adManagerId, userId},
    type : QueryTypes.SELECT
  })

  if(checkView.length > 0){
    const updateView = await sequelize.query(` UPDATE adPeopleReacheds SET updatedAt=now(),age=(SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) FROM users WHERE id=:userId),isActive=true,isDeleted=false WHERE adManagerId=:adManagerId AND userId=:userId  `,{
      replacements : {userId, adManagerId},
      type : QueryTypes.UPDATE
    })
  } else {
    const uID = uuid()
    const addView = await sequelize.query(` INSERT INTO adPeopleReacheds(id,adManagerId,userId,age,gender) VALUES(:uID,:adManagerId,:userId,(SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) FROM users WHERE id=:userId),(SELECT gender FROM users WHERE id=:userId)) `,{
      replacements : {uID,userId, adManagerId},
      type : QueryTypes.INSERT
    })
  }

  const uId = uuid()
  const addImpression = await sequelize.query(`INSERT into adPostImpressions(id, adManagerId,userId) VALUES(:uId, :adManagerId, :userId) `,{
    replacements : {uId, adManagerId, userId},
    type : QueryTypes.INSERT
  })

  return "success"
};

export const getLocationInsight = async (adManagerId) => {
  let targetLocations = await adTargetLocations.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: ["location"],
  });

  let object = [];
  targetLocations.forEach((item) => {
    if (!object.includes(item.dataValues.location)) {
      object.push(item.dataValues.location);
    }
  });

  let locationInsight = await adPeopleReacheds.findAll({
    where: {
      adManagerId: adManagerId,
      location: { [Op.in]: object },
    },
    attributes: ["location"],
  });

  let totalCount = locationInsight.length;

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  locationInsight = groupBy(locationInsight, "location");

  let key = [];

  for (const property in locationInsight) {
    key.push(property);
  }

  let finalArray = [];
  if (key[0] == null || key[0] == undefined) {
    object.forEach((item) => {
      let obj1 = {};
      obj1.location = item;
      obj1.reached = 0;
      obj1.engagement = 0;
      finalArray.push(obj1);
    });
  }

  let locationInsightEngagement = await adPostEngagements.findAll({
    where: {
      adManagerId: adManagerId,
      location: { [Op.in]: object },
    },
    attributes: ["location"],
  });

  for (let index = 0; index < key.length; index++) {
    let obj1 = {};
    obj1.location = key[index];
    obj1.reached = locationInsight[key[index]].length;
    obj1.engagement = 0;
    finalArray.push(obj1);
  }

  locationInsightEngagement = groupBy(locationInsightEngagement, "location");

  let key1 = [];

  for (const property in locationInsightEngagement) {
    key1.push(property);
  }

  key1.forEach((item) => {
    var a = finalArray.find((element) => element.location == item);
    if (a != null) {
      a.engagement = locationInsightEngagement[item].length;
    }
  });
  console.log(locationInsightEngagement);

  let result = {};
  result.totalCount = totalCount;
  result.details = finalArray;

  return result;
};

export const getGenderInsight = async (adManagerId) => {
  let targetGender = await adTargetGenders.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: ["name"],
  });

  let object = [];
  targetGender.forEach((item) => {
    if (!object.includes(item.dataValues.name)) {
      object.push(item.dataValues.name);
    }
  });

  let genderInsight = await adPeopleReacheds.findAll({
    where: {
      adManagerId: adManagerId,
      gender: { [Op.in]: object },
    },
    attributes: ["gender"],
  });

  let totalCount = genderInsight.length;

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  genderInsight = groupBy(genderInsight, "gender");

  let key = [];

  for (const property in genderInsight) {
    key.push(property);
  }

  let finalArray = [];
  if (key[0] == null || key[0] == undefined) {
    object.forEach((item) => {
      let obj1 = {};
      obj1.gender = item;
      obj1.reached = 0;
      obj1.engagement = 0;
      finalArray.push(obj1);
    });
  }

  let genderInsightEngagement = await adPostEngagements.findAll({
    where: {
      adManagerId: adManagerId,
      gender: { [Op.in]: object },
    },
    attributes: ["gender"],
  });

  for (let index = 0; index < key.length; index++) {
    let obj1 = {};
    obj1.gender = key[index];
    obj1.reached = genderInsight[key[index]].length;
    obj1.engagement = 0;
    finalArray.push(obj1);
  }

  genderInsightEngagement = groupBy(genderInsightEngagement, "gender");

  let key1 = [];

  for (const property in genderInsightEngagement) {
    key1.push(property);
  }

  key1.forEach((item) => {
    var a = finalArray.find((element) => element.gender == item);
    if (a != null) {
      a.engagement = genderInsightEngagement[item].length;
    }
  });
  console.log(genderInsightEngagement);

  let result = {};
  result.totalCount = totalCount;
  result.details = finalArray;

  return result;
};

export const getDayInsight = async (adManagerId, timePeriod) => {
  let engagement = null;
  let reached = null;
  let spent = null;

  if (timePeriod == "weekly") {
    var d = new Date();
    d.setDate(d.getDate() - 7);
    engagement = await adPostEngagements.findAll({
      where: {
        adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPostEngagements.id")), "count"],
      ],
    });
    reached = await adPeopleReacheds.findAll({
      where: {
        adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPeopleReacheds.id")), "count"],
      ],
    });
    spent = await adUserTransactions.findAll({
      where: {
        //adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: ["type", "amount", "createdAt"],
      order: [["createdAt", "ASC"]],
    });
  } else if (timePeriod == "today") {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    engagement = await adPostEngagements.findAll({
      where: {
        adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPostEngagements.id")), "count"],
      ],
    });
    reached = await adPeopleReacheds.findAll({
      where: {
        adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPeopleReacheds.id")), "count"],
      ],
    });
    spent = await adUserTransactions.findAll({
      where: {
        //adManagerId: adManagerId,
        createdAt: {
          [Op.gte]: d,
        },
      },
      attributes: ["type", "amount", "createdAt"],
      order: [["createdAt", "ASC"]],
    });
  } else if (timePeriod == "lifeTime") {
    engagement = await adPostEngagements.findAll({
      where: {
        adManagerId: adManagerId,
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPostEngagements.id")), "count"],
      ],
    });
    reached = await adPeopleReacheds.findAll({
      where: {
        adManagerId: adManagerId,
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("adPeopleReacheds.id")), "count"],
      ],
    });
    spent = await adUserTransactions.findAll({
      // where: {
      //   adManagerId: adManagerId,
      // },
      attributes: ["type", "amount", "createdAt"],
      order: [["createdAt", "ASC"]],
    });
  }

  let obj = {};

  obj.engagement = engagement[0].dataValues.count;
  obj.reached = reached[0].dataValues.count;
  obj.spent = 0;
  obj.total = 0;

  spent.forEach((item) => {
    console.log(parseInt(item.dataValues.amount));
    if (item.dataValues.type == "debit") {
      obj.spent = obj.spent + parseInt(item.dataValues.amount);
      obj.total += parseInt(item.dataValues.amount);
    } else if (item.dataValues.type == "credit") {
      obj.total += parseInt(item.dataValues.amount);
    }
    if (spent.length > 0) {
      obj.startDate = spent[0].dataValues.createdAt;
      obj.endDate = spent[spent.length - 1].dataValues.createdAt;
    }
  });

  return obj;
};

export const getAgeInsight = async (adManagerId) => {
  let targetAge = await adTargetAges.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: ["startAge", "endAge"],
  });

  //console.log(targetAge[0].dataValues.startAge);
  //console.log(targetAge[0].dataValues.endAge);
  if (targetAge) {
    let ageInsight = await adPeopleReacheds.findAll({
      where: {
        adManagerId: adManagerId,
        age: {
          [Op.between]: [
            parseInt(targetAge[0].dataValues.startAge),
            parseInt(targetAge[0].dataValues.endAge),
          ],
        },
      },
      attributes: ["age"],
    });

    let totalCount = ageInsight.length;

    let ageInsightss = await adPostEngagements.findAll({
      where: {
        adManagerId: adManagerId,
        age: {
          [Op.between]: [
            parseInt(targetAge[0].dataValues.startAge),
            parseInt(targetAge[0].dataValues.endAge),
          ],
        },
      },
      attributes: ["age"],
    });

    let finalArray = [];

    let s = parseInt(targetAge[0].dataValues.startAge);
    let e = parseInt(targetAge[0].dataValues.endAge);
    let i = s;
    console.log(s);
    console.log(e);
    for (i = s; i < e; i += 6) {
      let obj = {};
      obj.from = i;
      obj.to = i + 6;
      obj.reached = 0;
      obj.engagement = 0;
      finalArray.push(obj);
    }

    ageInsight.forEach((item) => {
      var a = finalArray.find((element) => element.from <= item <= element.to);
      if (a != null) {
        a.reached = a.reached + 1;
      }
    });

    ageInsightss.forEach((item) => {
      var a = finalArray.find((element) => element.from <= item <= element.to);
      if (a != null) {
        a.engagement = a.engagement + 1;
      }
    });

    let result = {};
    result.totalCount = totalCount;
    result.details = finalArray;

    return result;
  } else {
    return "no ages found on this ad";
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const getGenderInsight = async (adManagerId, location, gender, age) => {
//   let locationInsight = await adPeopleReacheds.findAll({
//     where: {
//       adManagerId: adManagerId,
//       //[Op.or]: [{ location: location }, { gender: gender }, { age: age }],
//     },
//     attributes: [[sequelize.fn("count", sequelize.col("id")), "PeopleReached"]],
//   });

//   let PostEngagementLoc = await adPostEngagements.findAll({
//     where: {
//       adManagerId: adManagerId,
//       //[Op.or]: [{ location: location }, { gender: gender }, { age: age }],
//     },
//     attributes: [
//       //[sequelize.fn("count", sequelize.col("id")), "Engaged"],
//       //[sequelize.fn("count", sequelize.col("location")), "Totlocations"],
//       "gender",
//     ],
//   });
//   let PostEngagementLoc1 = await adPostEngagements.findAll({
//     where: {
//       adManagerId: adManagerId,
//       //[Op.or]: [{ location: location }, { gender: gender }, { age: age }],
//     },
//     attributes: [
//       [sequelize.fn("count", sequelize.col("id")), "Engaged"],
//       [sequelize.fn("count", sequelize.col("gender")), "Totgenders"],
//       // "location",
//     ],
//   });
//   // console.log();
//   // console.log();
//   let PeopleReached = locationInsight[0].dataValues.PeopleReached;
//   let Engaged = PostEngagementLoc1[0].dataValues.Engaged;
//   let TotalLocations = PostEngagementLoc1[0].dataValues.Totgenders;
//   //console.log(PostEngagementLoc1[0].dataValues.Totlocations);
//   //let locations = PostEngagementLoc[0].dataValues.location;
//   let newArr = [];
//   PostEngagementLoc.forEach((item) => {
//     newArr.push(item.gender);
//   });

//   const count = (newArr) =>
//     newArr.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // don't forget to initialize the accumulator

//   const duplicates = (dict) => Object.keys(dict).filter((a) => dict[a] > 1);

//   console.log(count(newArr));
//   let countLocs = count(newArr);

//   let result = {
//     Engaged,
//     PeopleReached,
//     countLocs: countLocs,
//     TotalLocations,
//   };

//   return result;
// };

export const verifyPayment = async (id, adManagerId, paymentDetails) => {
  let value = await adUserTransactions.findOne({
    where: { id: id, adManagerId: adManagerId ,isActive: 1 },
  });
  console.log(value.dataValues);
  let update = await value.update({
    paymentDetails: paymentDetails,
  });
  return update;
  // return value
};

export const restartAd = async (adManagerId) => {
  let value = await adManagers.findOne({
    where: { id: adManagerId, isActive: 1 },
  });
  let update = await value.update({
    adStatus: "RUNNING",
  });
  return "Success";
};

async function adManagerApiCall(adManagerId, formatting) {
  let adManager = await adManagers.findAll({
    where: {
      id: adManagerId,
    },
    include: [
      {
        model: users,
        attributes: ["id", "fullName", "profileImage"],
      },
      {
        model: adMedias,
        attributes: ["file", "heading", "subHeading"],
      },
      {
        model: budgetAndDurations,
        attributes: ["dailyBudget"],
      },
    ],
    attributes: ["id", "discriptions", "createdAt", "endDate"],
  });

  let budget = adManager[0].dataValues.budgetAndDurations;
  let sum = 0;
  if (budget.length > 0) {
    budget.forEach((item) => {
      sum = sum + parseInt(item.dataValues.dailyBudget);
    });
  }

  // date formatting

  ///////
  let budgetAmount = sum;

  //let format = date1.toDateString();
  console.log("this is date=== " + formatting);
  let adReactions = await adPostReactions.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Reactions"]],
  });
  /////////////////////////////////////
  let adPostEngagement = await adPostEngagements.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Engagements"]],
  });
  //////////////////////////////////////////////////
  let adComments = await adPostComments.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Comments"]],
  });
  //////////////////////////////////////////////////////
  let adShares = await adPostShares.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Shares"]],
  });
  /////////////////////////////////////////////////////////////////////

  let adReached = await adPeopleReacheds.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "PeopleReached"]],
  });
  ///////////////////////////////////////////////////////////////////////////

  let adWallet = await adUserWallets.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          formatting
        ),
      ],
    },
    attributes: ["totalSpent"],
  });
  var today = new Date();
  let ddate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  ddate.setHours(0, 0, 0, 0);
  ddate.setHours(0);
  console.log(ddate.getHours());
  console.log(ddate, "=================================================");
  let todaysTransact = await adUserTransactions.findAll({
    where: {
      //adManagerId: adManagerId,
      createdAt: {
        [Op.gte]: ddate,
      },
      type: "debit",
    },
    attributes: ["amount"],
  });

  let spentAtDate = 0;
  if (todaysTransact.length > 0) {
    todaysTransact.forEach((item) => {
      spentAtDate = spentAtDate + parseInt(item.dataValues.amount);
    });
  }

  let impressions = await adPostImpressions.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Impressions"]],
  });

  let targetAudience = await adManagers.findAll({
    where: {
      id: adManagerId,
    },

    include: [
      {
        model: adTargetAges,
      },
      {
        model: adTargetGenders,
      },
      {
        model: adTargetLocations,
      },
      {
        model: adTargetInterests,
      },
    ],
    attributes: ["id"],
  });

  let Reactions = 0;
  let PostEngagements = 0;
  let Comments = 0;
  let Shares = 0;
  let TotalSpent = 0;
  let PeopleReached = 0;
  let Impressions = 0;
  let startAge = 0;
  let endAge = 0;
  let location = "not found";
  let gender = "not found";

  console.log("================================================++");

  if (adReactions) {
    Reactions = adReactions[0].dataValues.Reactions;
  }

  if (adPostEngagement) {
    PostEngagements = adPostEngagement[0].dataValues.Engagements;
  }

  if (adComments) {
    Comments = adComments[0].dataValues.Comments;
  }

  if (adShares) {
    if (adShares.length <= 0) {
      Shares = 0;
    }
    Shares = adShares[0].dataValues.Shares;
  }
  if (adWallet) {
    console.log(adWallet.length);
    if (adWallet.length <= 0) {
      TotalSpent = 0;
    } else {
      TotalSpent = adWallet[0].dataValues.totalSpent;
    }
  }
  if (adReached) {
    PeopleReached = adReached[0].dataValues.PeopleReached;
  }
  if (impressions) {
    Impressions = impressions[0].dataValues.Impressions;
  }
  if (targetAudience) {
    if (typeof targetAudience[0].adTargetLocations[0] !== "undefined") {
      location = targetAudience[0].adTargetLocations[0].location;
    }

    if (typeof targetAudience[0].adTargetAges[0] !== "undefined") {
      startAge = targetAudience[0].adTargetAges[0].startAge;
      endAge = targetAudience[0].adTargetAges[0].endAge;
    }
    if (typeof targetAudience[0].adTargetGenders !== "undefined") {
      gender = targetAudience[0].adTargetGenders.gender;
    }
  }

  let adId = adManager[0].dataValues.id;
  let discriptions = adManager[0].dataValues.discriptions;
  let startDate = adManager[0].dataValues.createdAt;
  let endDate = adManager[0].dataValues.endDate;
  let userId = adManager[0].dataValues.user.dataValues.id;
  let userName = adManager[0].dataValues.user.dataValues.fullName;
  let profileImage = process.env.FTP_BASE_URL;
  let mediaFiles = adManager[0].dataValues.adMedias;
  let audience = gender + "," + startAge + " to " + endAge + "," + location;
  const oneDay = 24 * 60 * 60 * 1000;
  let s = new Date(startDate);
  let e = new Date(endDate);
  let daysCount = Math.round(Math.abs((e - s) / oneDay));

  var userss = [
    {
      adId: adId,
      discriptions: discriptions,
      budgetAmount: budgetAmount,
      startDate: startDate,
      endDate: endDate,
      audience: audience,
      userId: userId,
      userName: userName,
      Reactions: Reactions,
      PostEngagements: PostEngagements,
      Comments: Comments,
      Shares: Shares,
      TotalSpent: TotalSpent,
      PeopleReached: PeopleReached,
      Impressions: Impressions,
      startAge: startAge,
      endAge: endAge,
      location: location,
      daysCount: daysCount,
      spentAtDate: spentAtDate,
    },
  ];

  console.log(userss);

  // var html = fs.readFileSync("template.html", "utf8");
  // var options = {
  //   format: "A3",
  //   phantomPath: "./node_modules/phantomjs/bin/phantomjs",
  //   orientation: "portrait",
  //   border: "10mm",
  //   header: {
  //     height: "45mm",
  //     contents: '<div style="text-align: center;"></div>',
  //   },
  //   footer: {
  //     height: "28mm",
  //     contents: {
  //       first: "Cover page",
  //       2: "Second page", // Any page number is working. 1-based index
  //       default:
  //         '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
  //       last: "Last Page",
  //     },
  //   },
  // };
  // var document = {
  //   html: html,
  //   data: {
  //     users: userss,
  //   },
  //   path: direc + adId + ".pdf",
  //   type: "",
  // };

  //var a = await pdf.create(document, options);

  // instantiate the library
  let theOutput = new PDFGenerator();
  theOutput.pipe(fs.createWriteStream("TestDocument.pdf"));
  userss.forEach((item) => {
    theOutput
      .fontSize(25)
      .text("Ad Manager", {
        align: "center",
      })
      .fontSize(12)
      .font("Helvetica-Bold");
    theOutput.text(" ");
    theOutput.text("adId:");
    theOutput.font("Helvetica").text(item.adId).font("Helvetica");
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("discriptions: ");
    theOutput.font("Helvetica").text(item.discriptions);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("budgetAmount: ");
    theOutput.font("Helvetica").text(item.budgetAmount);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("startDate: ");
    theOutput.font("Helvetica").text(item.startDate);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("endDate: ");
    theOutput.font("Helvetica").text(item.endDate);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("audience: ");
    theOutput.font("Helvetica").text(item.audience);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("userId: ");
    theOutput.font("Helvetica").text(item.userId);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("userName: ");
    theOutput.font("Helvetica").text(item.userName);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("Reactions: ");
    theOutput.font("Helvetica").text(item.Reactions);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("PostEngagements: ");
    theOutput.font("Helvetica").text(item.PostEngagements);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("Comments: ");
    theOutput.font("Helvetica").text(item.Comments);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("TotalSpent: ");
    theOutput.font("Helvetica").text(item.TotalSpent);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("PeopleReached: ");
    theOutput.font("Helvetica").text(item.PeopleReached);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("Impressions: ");
    theOutput.font("Helvetica").text(item.Impressions);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("startAge: ");
    theOutput.font("Helvetica").text(item.startAge);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("endAge: ");
    theOutput.font("Helvetica").text(item.endAge);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("daysCount: ");
    theOutput.font("Helvetica").text(item.daysCount);
    theOutput.text(" ");
    theOutput.font("Helvetica-Bold").text("spentAtDate: ");
    theOutput.font("Helvetica").text(item.spentAtDate);
  });
  theOutput.end();
  return theOutput;
}

async function adManagerCustomApiCall(adManagerId, customDate1, customDate2) {
  let adManager = await adManagers.findAll({
    where: {
      id: adManagerId,
    },
    include: [
      {
        model: users,
        attributes: ["id", "fullName", "profileImage"],
      },
      {
        model: adMedias,
        attributes: ["file", "heading", "subHeading"],
      },
      {
        model: budgetAndDurations,
        attributes: ["dailyBudget"],
      },
    ],
    attributes: ["id", "discriptions", "createdAt", "endDate"],
  });

  let budget = adManager[0].dataValues.budgetAndDurations;
  let sum = 0;
  if (budget.length > 0) {
    budget.forEach((item) => {
      sum = sum + parseInt(item.dataValues.dailyBudget);
    });
  }

  // date formatting

  ///////
  let budgetAmount = sum;

  //let format = date1.toDateString();
  // console.log("this is date=== " + formatting);
  let adReactions = await adPostReactions.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate2
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Reactions"]],
  });
  /////////////////////////////////////
  let adPostEngagement = await adPostEngagements.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate2
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Engagements"]],
  });
  //////////////////////////////////////////////////
  let adComments = await adPostComments.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate2
        ),
        ,
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Comments"]],
  });
  //////////////////////////////////////////////////////
  let adShares = await adPostShares.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate2
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Shares"]],
  });
  /////////////////////////////////////////////////////////////////////

  let adReached = await adPeopleReacheds.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate2
        ),
      ],
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "PeopleReached"]],
  });
  ///////////////////////////////////////////////////////////////////////////

  let adWallet = await adUserWallets.findAll({
    where: {
      [Sequelize.Op.and]: [
        { adManagerId: adManagerId },
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          ">=",
          customDate1
        ),
        Sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "<=",
          customDate2
        ),
      ],
    },
    attributes: ["totalSpent"],
  });
  var today = new Date();
  let ddate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  ddate.setHours(0, 0, 0, 0);
  ddate.setHours(0);
  console.log(ddate.getHours());
  console.log(ddate, "=================================================");
  let todaysTransact = await adUserTransactions.findAll({
    where: {
      //adManagerId: adManagerId,
      createdAt: {
        [Op.gte]: ddate,
      },
      type: "debit",
    },
    attributes: ["amount"],
  });

  let spentAtDate = 0;
  if (todaysTransact.length > 0) {
    todaysTransact.forEach((item) => {
      spentAtDate = spentAtDate + parseInt(item.dataValues.amount);
    });
  }

  let impressions = await adPostImpressions.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Impressions"]],
  });

  let targetAudience = await adManagers.findAll({
    where: {
      id: adManagerId,
    },

    include: [
      {
        model: adTargetAges,
      },
      {
        model: adTargetGenders,
      },
      {
        model: adTargetLocations,
      },
      {
        model: adTargetInterests,
      },
    ],
    attributes: ["id"],
  });

  let Reactions = 0;
  let PostEngagements = 0;
  let Comments = 0;
  let Shares = 0;
  let TotalSpent = 0;
  let PeopleReached = 0;
  let Impressions = 0;
  let startAge = 0;
  let endAge = 0;
  let location = "not found";
  let gender = "not found";

  if (adReactions) {
    Reactions = adReactions[0].dataValues.Reactions;
  }

  if (adPostEngagement) {
    PostEngagements = adPostEngagement[0].dataValues.Engagements;
  }

  if (adComments) {
    Comments = adComments[0].dataValues.Comments;
  }

  if (adShares) {
    Shares = adShares[0].dataValues.Shares;
  }
  if (adWallet) {
    TotalSpent = adWallet[0].dataValues.totalSpent;
  }
  if (adReached) {
    PeopleReached = adReached[0].dataValues.PeopleReached;
  }
  if (impressions) {
    Impressions = impressions[0].dataValues.Impressions;
  }
  if (targetAudience) {
    if (typeof targetAudience[0].adTargetLocations[0] !== "undefined") {
      location = targetAudience[0].adTargetLocations[0].location;
    }

    if (typeof targetAudience[0].adTargetAges[0] !== "undefined") {
      startAge = targetAudience[0].adTargetAges[0].startAge;
      endAge = targetAudience[0].adTargetAges[0].endAge;
    }
    if (typeof targetAudience[0].adTargetGenders !== "undefined") {
      gender = targetAudience[0].adTargetGenders.gender;
    }
  }

  let adId = adManager[0].dataValues.id;
  let discriptions = adManager[0].dataValues.discriptions;
  let startDate = adManager[0].dataValues.createdAt;
  let endDate = adManager[0].dataValues.endDate;
  let userId = adManager[0].dataValues.user.dataValues.id;
  let userName = adManager[0].dataValues.user.dataValues.fullName;
  let profileImage = process.env.FTP_BASE_URL;
  let mediaFiles = adManager[0].dataValues.adMedias;
  let audience = gender + "," + startAge + " to " + endAge + "," + location;
  const oneDay = 24 * 60 * 60 * 1000;
  let s = new Date(startDate);
  let e = new Date(endDate);
  let daysCount = Math.round(Math.abs((e - s) / oneDay));

  var userss = [
    {
      adId: adId,
      discriptions: discriptions,
      budgetAmount: budgetAmount,
      startDate: startDate,
      endDate: endDate,
      audience: audience,
      userId: userId,
      userName: userName,
      Reactions: Reactions,
      PostEngagements: PostEngagements,
      Comments: Comments,
      Shares: Shares,
      TotalSpent: TotalSpent,
      PeopleReached: PeopleReached,
      Impressions: Impressions,
      startAge: startAge,
      endAge: endAge,
      location: location,
      daysCount: daysCount,
      spentAtDate: spentAtDate,
    },
  ];

  console.log(userss);

  // var html = fs.readFileSync("template.html", "utf8");
  // var options = {
  //   format: "A3",
  //   phantomPath: "./node_modules/phantomjs/bin/phantomjs",
  //   orientation: "portrait",
  //   border: "10mm",
  //   header: {
  //     height: "45mm",
  //     contents: '<div style="text-align: center;"></div>',
  //   },
  //   footer: {
  //     height: "28mm",
  //     contents: {
  //       first: "Cover page",
  //       2: "Second page", // Any page number is working. 1-based index
  //       default:
  //         '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
  //       last: "Last Page",
  //     },
  //   },
  // };
  // var document = {
  //   html: html,
  //   data: {
  //     users: userss,
  //   },
  //   path: direc + adId + ".pdf",
  //   type: "",
  // };

  //var a = await pdf.create(document, options);

  // instantiate the library
  let theOutput = new PDFGenerator();
  theOutput.pipe(fs.createWriteStream("TestDocument.pdf"));
  userss.forEach((item) => {
    theOutput.text("adId: " + item.adId);
    theOutput.text("discriptions: " + item.discriptions);
    theOutput.text("budgetAmount: " + item.budgetAmount);
    theOutput.text("startDate: " + item.startDate);
    theOutput.text("endDate: " + item.endDate);
    theOutput.text("audience: " + item.audience);
    theOutput.text("userId: " + item.userId);
    theOutput.text("userName: " + item.userName);
    theOutput.text("Reactions: " + item.Reactions);
    theOutput.text("PostEngagements: " + item.PostEngagements);
    theOutput.text("Comments: " + item.Comments);
    theOutput.text("TotalSpent: " + item.TotalSpent);
    theOutput.text("PeopleReached: " + item.PeopleReached);
    theOutput.text("Impressions: " + item.Impressions);
    theOutput.text("startAge: " + item.startAge);
    theOutput.text("endAge: " + item.endAge);
    theOutput.text("daysCount: " + item.daysCount);
    theOutput.text("spentAtDate: " + item.spentAtDate);
  });
  theOutput.end();
  return theOutput;
}

export const exportPdf = async (
  adManagerId,
  direc,
  folder,
  timePeriod,
  customDate1,
  customDate2
) => {
  var pdf = require("pdf-creator-node");
  //let filePath = path.join(direc, folder);
  // const path = require("path");
  let date1 = new Date();
  //const formatting1 = formatDate(date1, "yy-mm-dd");
  function formatDate(date, format, month) {
    const map = {
      mm: date.getMonth() - month,
      dd: date.getDate(),
      yy: date.getFullYear().toString(),
      yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
  }

  if (timePeriod === "Last 1 Month") {
    let date2 = new Date();
    let month = date2.getMonth() - 0;
    let formatting = await formatDate(date2, "yy-mm-dd", 0);
    console.log(formatting);
    adManagerApiCall(adManagerId, formatting);
  }
  if (timePeriod === "Last 3 Month") {
    let date2 = new Date();
    let month = date2.getMonth() - 3;
    let formatting = await formatDate(date2, "yy-mm-dd", 2);
    console.log(formatting);
    adManagerApiCall(adManagerId, formatting);
  }
  if (timePeriod === "Last 6 Month") {
    let date2 = new Date();
    let month = date2.getMonth() - 3;
    let formatting = await formatDate(date2, "yy-mm-dd", 5);
    console.log(formatting);
    adManagerApiCall(adManagerId, formatting);
  }
  if (timePeriod === "Custom" && customDate1 !== "" && customDate2 !== "") {
    adManagerCustomApiCall(adManagerId, customDate1, customDate2);
  }
};

export const exportExcel = async (adManagerId, direc) => {
  const xlsx = require("xlsx");
  //const path = require("path");
  //let filePath = path.join(direc, folder);
  let adManager = await adManagers.findAll({
    where: {
      id: adManagerId,
    },
    include: [
      {
        model: users,
        attributes: ["id", "fullName", "profileImage"],
      },
      {
        model: adMedias,
        attributes: ["file", "heading", "subHeading"],
      },
      {
        model: budgetAndDurations,
        attributes: ["dailyBudget"],
      },
    ],
    attributes: ["id", "discriptions", "createdAt", "endDate"],
  });

  let budget = adManager[0].dataValues.budgetAndDurations;
  let sum = 0;
  if (budget.length > 0) {
    budget.forEach((item) => {
      sum = sum + parseInt(item.dataValues.dailyBudget);
    });
  }
  let budgetAmount = sum;

  let adReactions = await adPostReactions.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Reactions"]],
  });
  /////////////////////////////////////
  let adPostEngagement = await adPostEngagements.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Engagements"]],
  });
  //////////////////////////////////////////////////
  let adComments = await adPostComments.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Comments"]],
  });
  //////////////////////////////////////////////////////
  let adShares = await adPostShares.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Shares"]],
  });
  /////////////////////////////////////////////////////////////////////

  let adReached = await adPeopleReacheds.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "PeopleReached"]],
  });
  ///////////////////////////////////////////////////////////////////////////

  let adWallet = await adUserWallets.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: ["totalSpent"],
  });
  var today = new Date();
  let ddate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  ddate.setHours(0, 0, 0, 0);
  ddate.setHours(0);
  console.log(ddate.getHours());
  console.log(ddate, "=================================================");
  let todaysTransact = await adUserTransactions.findAll({
    where: {
      //adManagerId: adManagerId,
      createdAt: {
        [Op.gte]: ddate,
      },
      type: "debit",
    },
    attributes: ["amount"],
  });

  let spentAtDate = 0;
  if (todaysTransact.length > 0) {
    todaysTransact.forEach((item) => {
      spentAtDate = spentAtDate + parseInt(item.dataValues.amount);
    });
  }

  let impressions = await adPostImpressions.findAll({
    where: {
      adManagerId: adManagerId,
    },
    attributes: [[sequelize.fn("count", sequelize.col("id")), "Impressions"]],
  });

  let targetAudience = await adManagers.findAll({
    where: {
      id: adManagerId,
    },

    include: [
      {
        model: adTargetAges,
      },
      {
        model: adTargetGenders,
      },
      {
        model: adTargetLocations,
      },
      {
        model: adTargetInterests,
      },
    ],
    attributes: ["id"],
  });

  let Reactions = 0;
  let PostEngagements = 0;
  let Comments = 0;
  let Shares = 0;
  let TotalSpent = 0;
  let PeopleReached = 0;
  let Impressions = 0;
  let startAge = 0;
  let endAge = 0;
  let location = "not found";
  let gender = "not found";

  if (adReactions) {
    Reactions = adReactions[0].dataValues.Reactions;
  }

  if (adPostEngagement) {
    PostEngagements = adPostEngagement[0].dataValues.Engagements;
  }

  if (adComments) {
    Comments = adComments[0].dataValues.Comments;
  }

  if (adShares) {
    Shares = adShares[0].dataValues.Shares;
  }
  if (adWallet) {
    TotalSpent = adWallet[0].dataValues.totalSpent;
  }
  if (adReached) {
    PeopleReached = adReached[0].dataValues.PeopleReached;
  }
  if (impressions) {
    Impressions = impressions[0].dataValues.Impressions;
  }
  if (targetAudience) {
    if (typeof targetAudience[0].adTargetLocations[0] !== "undefined") {
      location = targetAudience[0].adTargetLocations[0].location;
    }

    if (typeof targetAudience[0].adTargetAges[0] !== "undefined") {
      startAge = targetAudience[0].adTargetAges[0].startAge;
      endAge = targetAudience[0].adTargetAges[0].endAge;
    }
    if (typeof targetAudience[0].adTargetGenders !== "undefined") {
      gender = targetAudience[0].adTargetGenders.gender;
    }
  }

  let adId = adManager[0].dataValues.id;
  let discriptions = adManager[0].dataValues.discriptions;
  let startDate = adManager[0].dataValues.createdAt;
  let endDate = adManager[0].dataValues.endDate;
  let userId = adManager[0].dataValues.user.dataValues.id;
  let userName = adManager[0].dataValues.user.dataValues.fullName;
  let profileImage = process.env.FTP_BASE_URL;
  let mediaFiles = adManager[0].dataValues.adMedias;
  let audience = gender + "," + startAge + " to " + endAge + "," + location;
  const oneDay = 24 * 60 * 60 * 1000;
  let s = new Date(startDate);
  let e = new Date(endDate);
  let daysCount = Math.round(Math.abs((e - s) / oneDay));

  var userss = [
    {
      adId: adId,
      discriptions: discriptions,
      budgetAmount: budgetAmount,
      startDate: "#" + startDate + "#",
      endDate: "#" + endDate + "#",
      audience: audience,
      userId: userId,
      userName: userName,
      Reactions: Reactions,
      PostEngagements: PostEngagements,
      Comments: Comments,
      Shares: Shares,
      TotalSpent: TotalSpent,
      PeopleReached: PeopleReached,
      Impressions: Impressions,
      startAge: startAge,
      endAge: endAge,
      location: location,
      daysCount: daysCount,
      spentAtDate: spentAtDate,
    },
  ];

  const workSheetColumnNames = [
    "adId",
    "discriptions",
    "budgetAmount",
    "startDate",
    "endDate",
    "audience",
    "userId",
    "userName",
    "Reactions",
    "PostEngagements",
    "Comments",
    "Shares",
    "TotalSpent",
    "PeopleReached",
    "Impressions",
    "startAge",
    "endAge",
    "location",
    "daysCount",
    "spentAtDate",
  ];
  const workSheetName = "AdInsight";
  const filePath = direc + "adExcel" + ".xlsx";

  let newFile;

  const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [workSheetColumnNames, ...data];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    newFile = xlsx.writeFile(workBook, path.resolve(filePath));
    var params = {
      key: filePath,
      body: xlsx,
      bucket: "bucketName",
      contentType: "application/pdf",
    };
  };
  console.log(newFile);
  const exportUsersToExcel = (
    users,
    workSheetColumnNames,
    workSheetName,
    filePath
  ) => {
    const data = users.map((user) => {
      return [
        user.adId,
        user.discriptions,
        user.budgetAmount,
        user.startDate,
        user.endDate,
        user.audience,
        user.userId,
        user.userName,
        user.Reactions,
        user.PostEngagements,
        user.Comments,
        user.Shares,
        user.TotalSpent,
        user.PeopleReached,
        user.Impressions,
        user.startAge,
        user.endAge,
        user.location,
        user.daysCount,
        user.spentAtDate,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  };
  const nodepath = process.env.NODE_PATH;
  console.log(nodepath);

  var a = await exportUsersToExcel(
    userss,
    workSheetColumnNames,
    workSheetName,
    filePath
  );

  return filePath;
};

export const addTopUpWallet = async (userId, uamount) => {
  let userWallet = await adUserWallets.findOne({
    where: {
      userId: userId,
      isActive: 1,
    },
  });
  console.log(userWallet.dataValues.amount);
  let newAmount = parseInt(userWallet.dataValues.amount) + parseInt(uamount);
  console.log(newAmount);
  if (userWallet) {
    let update = userWallet.update({
      amount: newAmount,
    });
    return update;
  }
  if (!userWallet) {
    let create = await adUserWallets.create({
      userId: userId,
      amount: uamount,
    });
  }
};

export const getAdCancelReasons = async () => {
  let adCancelReason = await adCancelReasons.findAll({
    where: {
      isActive: 1,
    },
    attributes: ["id", "name", "desc"],
  });
  return adCancelReason;
};

export const getCallToActionButtons = async (type) => {
  if (type === "CPC") {
    const result = await sequelize.query(
      `
                          SELECT * from adCallToActionMasters WHERE type='${type}' AND isActive = 1 AND isDeleted = 0
                          
                          `,
      {
        replacements: {},
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }
  if (type === "CPL") {
    const result = await sequelize.query(
      `
                          SELECT * from adCallToActionMasters WHERE type='${type}' AND isActive = 1 AND isDeleted = 0
                          
                          `,
      {
        replacements: {},
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }
};

export const undoDeleteDraftedAd = async (adManagerId, undo) => {
  if (undo === 0) {
    const result = await sequelize.query(
      `
                  UPDATE adManagers SET isActive = 0, isDeleted = 1 WHERE adManagers.id = :adManagerId 
                          
                          `,
      {
        replacements: { adManagerId },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  } else if (undo === 1) {
    const result = await sequelize.query(
      `
                  UPDATE adManagers SET isActive = 1, isDeleted = 0 WHERE adManagers.id = :adManagerId 
                          
                          `,
      {
        replacements: { adManagerId },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  }
};

export const createLeadGenerationForm = async (
  adManagerId,
  name,
  description,
  fields,
  userId
) => {
  const id = uuid();
  const result = await sequelize.query(
    `
                  INSERT INTO adLeadGenrationForms(id, userId, adManagerId, formName, formDescription)
                  VALUES(:id,:userId, :adManagerId, :name, :description)
                          
                          `,
    {
      replacements: { id, userId, adManagerId, name, description, fields },
      type: QueryTypes.INSERT,
    }
  );

  for (const m of fields) {
    let value = JSON.stringify(m.value);
    const result = await sequelize.query(
      `
                    INSERT INTO adLeadGenerationQues(id, adLeadGenerationId, inputTypeId, question, isMandatory, value)
                    VALUES('${uuid()}', '${id}', '${m.inputTypeId}',
                    '${m.question}','${m.isMandatory}', '${value}')
                            
                            `,
      {
        replacements: { id, fields },
        type: QueryTypes.INSERT,
      }
    );
  }
  return "success";
};

export const getLeadInputTypes = async () => {
  const id = uuid();
  const result = await sequelize.query(
    `
        SELECT * from adLeadInputTypes WHERE isDeleted = 0

        
                          `,
    {
      replacements: {},
      type: QueryTypes.SELECT,
    }
  );

  return result;
};

export const getLeadGenerationForm = async (adManagerId) => {
  const id = uuid();
  const result = await sequelize.query(
    `
                  SELECT 
                  adLeadGenrationForms.id, 
                  adLeadGenrationForms.adManagerId, 
                  adLeadGenrationForms.formName, 
                  adLeadGenrationForms.formDescription, 
                  adLeadGenrationForms.isActive, 
                  adLeadGenrationForms.isDeleted,
                  (
                    SELECT 
                    JSON_ARRAYAGG(JSON_OBJECT(
                        "id",adLeadGenerationQues.id,
                        "adLeadGenId",adLeadGenerationId,
                        "typeId", inputTypeId,
                        "type",adLeadInputTypes.type,
                        "price",adLeadInputTypes.price,
                        "limitSet",adLeadInputTypes.limitSet,
                        "description",adLeadInputTypes.name,
                        "question",question,
                        "value",value,
                        "isMandatory",isMandatory
                    )) 
                    FROM adLeadGenerationQues
                    INNER JOIN adLeadInputTypes 
                    ON adLeadInputTypes.id=adLeadGenerationQues.inputTypeId
                    WHERE adLeadGenerationQues.adLeadGenerationId = adLeadGenrationForms.id AND adLeadGenerationQues.isActive=true AND adLeadGenerationQues.isDeleted=false AND adLeadInputTypes.isActive=true AND adLeadInputTypes.isDeleted=false
                ) as fields
                  FROM adLeadGenrationForms 
                  WHERE 
                  adLeadGenrationForms.adManagerId = :adManagerId 
                  AND
                  adLeadGenrationForms.isActive = 1 AND adLeadGenrationForms.isDeleted = 0
                          
                          `,
    {
      replacements: { adManagerId },
      type: QueryTypes.SELECT,
    }
  );

  return result;
};

export const answerLeadGenForm = async (userId, fields) => {
  const id = uuid();

  for (const m of fields) {
    let answer = JSON.stringify(m.answer);
    const result = await sequelize.query(
      `
                    INSERT INTO adLeadGenerationAns(id, questionId, userId, answer)
                    VALUES('${uuid()}', '${m.questionId}', '${userId}',
                    '${answer}')
                            
                            `,
      {
        replacements: { userId, fields },
        type: QueryTypes.INSERT,
      }
    );
  }
  return "success";
};

export const removeSavedAudience = async (adPreferrencesMastersId) => {
  const result = await sequelize.query(
    `
    UPDATE adPreferrencesMasters SET isActive = 0, isDeleted = 1 WHERE id = :adPreferrencesMastersId
                          
                          `,
    {
      replacements: { adPreferrencesMastersId },
      type: QueryTypes.UPDATE,
    }
  );
  const result2 = await sequelize.query(
    `
    UPDATE adPreferrences SET isActive = 0, isDeleted = 1 WHERE adPreferrencesMastersId = :adPreferrencesMastersId
                          
                          `,
    {
      replacements: { adPreferrencesMastersId },
      type: QueryTypes.UPDATE,
    }
  );
  return "success";
}

export const getTransactionDetailsByDate = async (userId, fromDate, toDate) => {
  const getData = await sequelize.query(`
   SELECT 
   aut.id,
   aut.userId,
   aut.type,
   aut.amount,
   aut.closingBalance,
   aut.adManagerId,
   IFNULL(am.adId,"BALANCE TOP-UP") as adId,
   IFNULL(am.discriptions,aut.description) as description,
   DATE(aut.createdAt) as date,
   TIME(aut.createdAt) as time FROM
   adUserTransactions aut 
   LEFT JOIN 
   adManagers am
   ON aut.adManagerId=am.id
   WHERE aut.isActive=true AND aut.isDeleted=false AND aut.userId=:userId AND ( DATE(:fromDate) <= DATE(aut.createdAt) <= DATE(:toDate) ) order by aut.createdAt desc
  `, {
    replacements: { toDate, fromDate, userId },
    type: QueryTypes.SELECT
  })
  return getData
}

export const getTransDetailsById = async (id) => {
  const getData = await sequelize.query(`
  SELECT 
  aut.id,
  u.fullName,
  u.userName,
  u.mobile,
  u.homeAddress,
  aut.userId,
  aut.type,
  aut.amount,
  aut.closingBalance,
  aut.paymentDetails,
  aut.adManagerId,
  am.adId,
  aut.paidTo,
  am.discriptions as description,
  DATE(aut.createdAt) as date,
  TIME(aut.createdAt) as time FROM
  adUserTransactions aut 
  LEFT JOIN 
  adManagers am
  ON aut.adManagerId=am.id
  INNER JOIN users u 
  ON u.id=aut.userId
  WHERE aut.isActive=true AND aut.isDeleted=false AND aut.id=:id
  `, {
    replacements: { id },
    type: QueryTypes.SELECT
  })
  if (getData.length > 0) {
    return getData[0]
  }
  return false
}

export const editAd = async (id, body, userId) => {

  const { adData, media, adTargetGenderBody, adInterestsBody, adProfessionBody, location, adPreferrencesMastersId, adTargetAgesBody, adRangemasterId, dateAndBudget, adLeadForm } = body

  // UPDATE adData 
  if (adData) {
    var updateQry = `UPDATE adManagers SET `;
    let replacements = { id }
    for (const [key, value] of Object.entries(adData)) {
      updateQry = updateQry + ` ${key} = :${key},`;
      console.log(`${key} ${value}`);
      replacements[key] = value;
    }

    updateQry = updateQry.replace(/,+$/, "");
    updateQry =
      updateQry +
      `
      WHERE 
      id=:id`;
    console.log(updateQry)
    await sequelize.query(updateQry, {
      replacements,
      type: QueryTypes.UPDATE,
    });
  }

  // UPDATE adMedia 
  if (media && media.length > 0) {
    const removeRecords = await sequelize.query(`UPDATE adMedias SET isActive=false , isDeleted=true WHERE adManagerId=:id`, {
      replacements: { id },
      type: QueryTypes.UPDATE
    })

    media.forEach(async (record, index) => {
      if (record.id) {
        var updateQry = `UPDATE adMedias SET `;
        let replacements = { id: record.id }
        for (const [key, value] of Object.entries(record)) {
          updateQry = updateQry + ` ${key} = :${key},`;
          console.log(`${key} ${value}`);
          replacements[key] = value;
        }

        updateQry = updateQry.replace(/,+$/, "");
        updateQry =
          updateQry +
          `
     ,isActive=true,isDeleted=false WHERE 
    id=:id`;
        console.log(updateQry)
        await sequelize.query(updateQry, {
          replacements,
          type: QueryTypes.UPDATE,
        });

      } else {
        const uId = uuid()
        const addMedia = await sequelize.query(`INSERT INTO adMedias(id,userId,adManagerId,file,fileType,heading,subHeading,callToActionId,createdAt) VALUES( :uId,:userId, :adManagerId,:file,:fileType,:heading,:subHeading ,:callToActionId,now())`, {
          replacements: { uId, userId, adManagerId: id, file: record.file, fileType: record.fileType, heading: record.heading, subHeading: record.subHeading, callToActionId: ( record.callToActionId || null ) },
          type: QueryTypes.INSERT
        })
      }
    })
  }

  // UPDATE adTargetGenders
  if (adTargetGenderBody && adTargetGenderBody.length > 0) {
    const removeRecords = await sequelize.query(`UPDATE adTargetGenders SET isActive=false , isDeleted=true WHERE adManagerId=:id`, {
      replacements: { id },
      type: QueryTypes.UPDATE
    })
    adTargetGenderBody.forEach(async (value, index) => {
      const checkData = await sequelize.query(`SELECT id from adTargetGenders WHERE userId=:userId AND adManagerId=:id AND genderId=:value`, {
        replacements: { userId, id, value },
        type: QueryTypes.SELECT
      })
      if (checkData.length > 0) {
        checkData.forEach(async (gen) => {
          const update = await sequelize.query(`UPDATE adTargetGenders SET isActive=true,isDeleted=false,updatedAt=now() WHERE id=:val`, {
            replacements: { val: gen.id },
            type: QueryTypes.UPDATE
          })
        })
      } else {
        const UId = uuid()
        const addData = await sequelize.query(`INSERT INTO adTargetGenders(id,userId,adManagerId,genderId,createdAt) VALUES(:UId,:userId,:id,:value,now())`, {
          replacements: { UId, userId, id, value }
        })
      }
    })
  }

  // UPDATE adTargetInterests
  if (adInterestsBody && adInterestsBody.length > 0) {
    const removeRecords = await sequelize.query(`UPDATE adTargetInterests SET isActive=false , isDeleted=true WHERE adManagerId=:id`, {
      replacements: { id },
      type: QueryTypes.UPDATE
    })
    adInterestsBody.forEach(async (value, index) => {
      const checkData = await sequelize.query(`SELECT id from adTargetInterests WHERE userId=:userId AND adManagerId=:id AND adInterestsMastersId=:value`, {
        replacements: { userId, id, value },
        type: QueryTypes.SELECT
      })
      if (checkData.length > 0) {
        checkData.forEach(async (gen) => {
          const update = await sequelize.query(`UPDATE adTargetInterests SET isActive=true,isDeleted=false,updatedAt=now() WHERE id=:val`, {
            replacements: { val: gen.id },
            type: QueryTypes.UPDATE
          })
        })
      } else {
        const UId = uuid()
        const addData = await sequelize.query(`INSERT INTO adTargetInterests(id,userId,adManagerId,adInterestsMastersId,createdAt) VALUES(:UId,:userId,:id,:value,now())`, {
          replacements: { UId, userId, id, value }
        })
      }
    })
  }

  // UPDATE adTargetProfessions
  if (adProfessionBody && adProfessionBody.length > 0) {
    const removeRecords = await sequelize.query(`UPDATE adTargetProfessions SET isActive=false , isDeleted=true WHERE adManagerId=:id`, {
      replacements: { id },
      type: QueryTypes.UPDATE
    })
    adProfessionBody.forEach(async (value, index) => {
      const checkData = await sequelize.query(`SELECT id from adTargetProfessions WHERE userId=:userId AND adManagerId=:id AND adProfessionMastersId=:value`, {
        replacements: { userId, id, value },
        type: QueryTypes.SELECT
      })
      if (checkData.length > 0) {
        checkData.forEach(async (gen) => {
          const update = await sequelize.query(`UPDATE adTargetProfessions SET isActive=true,isDeleted=false,updatedAt=now() WHERE id=:val`, {
            replacements: { val: gen.id },
            type: QueryTypes.UPDATE
          })
        })
      } else {
        const UId = uuid()
        const addData = await sequelize.query(`INSERT INTO adTargetProfessions(id,userId,adManagerId,adProfessionMastersId,createdAt) VALUES(:UId,:userId,:id,:value,now())`, {
          replacements: { UId, userId, id, value }
        })
      }
    })
  }

  // UPDATE adTargetLocations
  if (location && location.length > 0) {
    const removeRecords = await sequelize.query(`UPDATE adTargetLocations SET isActive=false , isDeleted=true WHERE adManagerId=:id`, {
      replacements: { id },
      type: QueryTypes.UPDATE
    })
    location.forEach(async (value, index) => {
      console.log(value)
      const checkData = await sequelize.query(`SELECT id from adTargetLocations WHERE userId=:userId AND adManagerId=:id AND lat=:lat AND lang=:long`, {
        replacements: { userId, id, lat: value.lat, long: value.long },
        type: QueryTypes.SELECT
      })
      console.log(checkData)
      if (checkData.length > 0) {
        console.log(checkData)
        checkData.forEach(async (gen) => {
          console.log(gen)
          const update = await sequelize.query(`UPDATE adTargetLocations SET isActive=true,isDeleted=false,updatedAt=now() WHERE id=:val`, {
            replacements: { val: gen.id },
            type: QueryTypes.UPDATE
          })
        })
      } else {
        const UId = uuid()
        const addData = await sequelize.query(`INSERT INTO adTargetLocations(id,userId,adManagerId,location,lat,lang,createdAt) VALUES(:UId,:userId,:id,:location,:lat,:long,now())`, {
          replacements: { UId, userId, id, location: value.location, lat: value.lat, long: value.long }
        })
      }
    })
  }

  // UPDATE adTargetAges 
  if (adTargetAgesBody) {
    const updateAges = await sequelize.query(`UPDATE adTargetAges SET startAge=:startAge, endAge=:endAge, adRangemasterId=:adRangemasterId WHERE adManagerId=:id`, {
      replacements: { id, startAge: adTargetAgesBody.startAge, endAge: adTargetAgesBody.endAge, adRangemasterId : adTargetAgesBody.adRangemasterId },
      type: QueryTypes.UPDATE
    })
  }

  // UPDATE budgetAndDurations
  if (dateAndBudget) {
    var updateQry = `UPDATE budgetAndDurations SET `;
    let replacements = { id }
    for (const [key, value] of Object.entries(dateAndBudget)) {
      updateQry = updateQry + ` ${key} = :${key},`;
      console.log(`${key} ${value}`);
      replacements[key] = value;
    }

    updateQry = updateQry.replace(/,+$/, "");
    updateQry =
      updateQry +
      `
     ,isActive=true,isDeleted=false WHERE 
    adManagerId=:id`;
    await sequelize.query(updateQry, {
      replacements,
      type: QueryTypes.UPDATE,
    });
  }

  // UPDATE adLeadGenrationForms and adLeadGenerationQues
  // adLeadForm
  if (adLeadForm) {
    const fields = adLeadForm.fields
    delete adLeadForm["fields"]

    // UPDATE adLeadGenrationForms
    var updateQry = `UPDATE adLeadGenrationForms SET `;
    let replacements = { id }
    for (const [key, value] of Object.entries(adLeadForm)) {
      updateQry = updateQry + ` ${key} = :${key},`;
      console.log(`${key} ${value}`);
      replacements[key] = value;
    }
    updateQry = updateQry.replace(/,+$/, "");
    updateQry =
      updateQry +
      `
      WHERE 
    adManagerId=:id`;
    console.log(updateQry)
    await sequelize.query(updateQry, {
      replacements,
      type: QueryTypes.UPDATE,
    });

    if (fields && fields.length > 0) {

      const getFormId = await sequelize.query(`SELECT id as formId FROM  adLeadGenrationForms WHERE adManagerId=:id AND isActive=true`, {
        replacements: { id },
        type: QueryTypes.SELECT
      })
      const { formId } = getFormId[0]

      const updateLeadQues = await sequelize.query(`UPDATE adLeadGenerationQues SET isActive=false,isDeleted=true WHERE adLeadGenerationId=:formId`, {
        replacements: { formId },
        type: QueryTypes.UPDATE
      })

      fields.forEach(async (quesRecord, index) => {
        if (quesRecord.id) {
          // UPDATE adLeadGenerationQues
          var updateQry = `UPDATE adLeadGenerationQues SET isActive=true,isDeleted=false, `;
          let replacements = { formId, id: quesRecord.id }
          for (const [key, value] of Object.entries(quesRecord)) {
            updateQry = updateQry + ` ${key} = :${key},`;
            console.log(`${key} ${value}`);
            replacements[key] = value;
          }

          if (quesRecord.value) {
            replacements.value = JSON.stringify(quesRecord.value)
          }

          updateQry = updateQry.replace(/,+$/, "");
          updateQry =
            updateQry +
            `
      WHERE 
    adLeadGenerationId=:formId AND id=:id`;
          await sequelize.query(updateQry, {
            replacements,
            type: QueryTypes.UPDATE,
          });
        } else {
          const qId = uuid()
          const addLeadQues = await sequelize.query(`INSERT INTO adLeadGenerationQues(id,userId,adLeadGenerationId,inputTypeId,question,isMandatory,value) VALUES(:qId,:userId,:formId,:inputTypeId,:question,:isMandatory,:value)`, {
            replacements: { qId, userId, formId, inputTypeId: quesRecord.inputTypeId, question: quesRecord.question, isMandatory: quesRecord.isMandatory, value: JSON.stringify(quesRecord.value) },
            type: QueryTypes.INSERT
          })
        }
      })
    }
  }
}

export const addAdTargetGenders = async (userId, adId, data) => {
  data.forEach(async (value) => {
    const id = uuid()
    const addData = await sequelize.query(`INSERT INTO adTargetGenders (id,userId,adManagerId,genderId, createdAt) VALUES(:id,:userId,:adId,:value,now())`, {
      replacements: { id, userId, adId, value },
      type: QueryTypes.INSERT
    })
  })
}

export const addAdTargetInterests = async (userId, adId, data) => {
  data.forEach(async (value) => {
    const id = uuid()
    const addData = await sequelize.query(`INSERT INTO adTargetInterests (id,userId,adManagerId,adInterestsMastersId, createdAt) VALUES(:id,:userId,:adId,:value,now())`, {
      replacements: { id, userId, adId, value },
      type: QueryTypes.INSERT
    })
  })
}

export const addAdTargetLocations = async (userId, adId, data) => {
  data.forEach(async (value) => {
    const id = uuid()
    const addData = await sequelize.query(`INSERT INTO adTargetLocations (id,userId,adManagerId,location,lat,lang, createdAt) VALUES(:id,:userId,:adId,:location,:lat,:long,now())`, {
      replacements: { id, userId, adId, location: value.location, lat: value.lat, long: value.long },
      type: QueryTypes.INSERT
    })
  })
}

export const addAdTargetProfessions = async (userId, adId, data) => {
  data.forEach(async (value) => {
    const id = uuid()
    const addData = await sequelize.query(`INSERT INTO adTargetProfessions (id,userId,adManagerId,adProfessionMastersId, createdAt) VALUES(:id,:userId,:adId,:value,now())`, {
      replacements: { id, userId, adId, value },
      type: QueryTypes.INSERT
    })
  })
}

export const addUserTransaction = async (userId, body) => {
  const { type, adManagerId, description, currencyId, amount, closingBalance, paidTo, paymentDetails } = body
  const id = uuid()
  const addUserTransaction = await sequelize.query(`INSERT INTO adUserTransactions(id, userId, type, adManagerId, description, currencyId, amount, closingBalance, paidTo, paymentDetails) VALUES(:id,:userId,:type,:adManagerId,:description,:currencyId,:amount,:closingBalance,:paidTo, :paymentDetails)`, {
    replacements: { id, userId, type, adManagerId, description, currencyId, amount, closingBalance, paidTo, paymentDetails },
    type: QueryTypes.INSERT
  })
  return {
    status: true,
    id
  }
}

export const updateUserWallet = async (userId, amount) => {
  const updateWallet = await sequelize.query(`
  UPDATE adUserWallets SET amount=:amount WHERE userId=:userId
  `, {
    replacements: { userId, amount },
    type: QueryTypes.UPDATE
  })
  return true
}

export const getAdPayDetailsById = async (adId) => {
  const getDetails = await sequelize.query(`SELECT 
  am.adId,
  am.isPaid,
  bd.dailyBudget,
  bd.totalAmountToBePaid,
  DATEDIFF(bd.endDate,bd.startDate) as duration,
  bd.startDate,
  bd.endDate,
  bd.timeZone
  FROM budgetAndDurations bd
  JOIN adManagers am
  ON am.id = bd.adManagerId
  WHERE bd.adManagerId=:adId
  `, {
    replacements: { adId },
    type: QueryTypes.SELECT
  })
  if (getDetails.length > 0) {
    return getDetails[0]
  }
  return false
}

export const updateFreezeAmount = async (userId, body) => {
  const { adManagerId, currencyId, startDate, endDate, dailyBudget, totalFreezeAmount, fixedCharge, duration } = body

  const updateFreezeAmount = await sequelize.query(`UPDATE adUserWallets SET freezeAmount = freezeAmount + :totalFreezeAmount WHERE userId =:userId`, {
    replacements: { userId, totalFreezeAmount }
  })

  const id = uuid()
  const addFreezeAmountRecord = await sequelize.query(`
  INSERT INTO adFreezeTransactions(id, adManagerId, userId, currencyId, startDate, endDate, dailyBudget, totalFreezeAmount, fixedCharge, duration) VALUES(:id, :adManagerId,:userId, :currencyId,:startDate,:endDate,:dailyBudget, :totalFreezeAmount, :fixedCharge, :duration)
  `, {
    replacements: { id, adManagerId, userId, currencyId, startDate, endDate, dailyBudget, totalFreezeAmount, fixedCharge, duration }
  })
  return true
}

export const getAdDetailsForInvoice = async (userId, adId) => {
  const getData = await sequelize.query(`
  SELECT 
  am.id,
  am.adId,
  u.fullName,
  u.mobile,
  u.homeAddress,

  DATE(bd.startDate) as startDate,  DATE(bd.endDate) as endDate,    
  TIME(bd.startDate) as startTime,  TIME(bd.endDate) as endTime,    
  bd.totalAmountToBePaid,
  bd.dailyBudget,
  am.discriptions as description, 
  (DATEDIFF(bd.endDate,bd.startDate)+1) as duration,
  IF(am.isPaid = 1,"COMPLETED","DUE") as isPaid,
  auw.currencyId,
cs.currencyCode as currencyCode,
cs.currencySymbols,
  auw.amount,
  auw.freezeAmount,
  auw.spentAmount
  FROM adManagers am
  INNER JOIN adUserWallets auw    
  ON auw.userId=:userId
  INNER JOIN currencySettings cs  
  ON cs.id=auw.currencyId
  LEFT JOIN budgetAndDurations bd
  ON bd.adManagerId=am.id
  INNER JOIN users u 
  ON u.id=am.userId
  WHERE am.id=:adId AND am.isActive=true AND u.id=:userId

  `, {
    replacements: { adId, userId },
    type: QueryTypes.SELECT
  })
  if (getData.length > 0) {
    return getData[0]
  }
  return false
}

export const getFreezeAmountTransactionDetails = async (userId, body) => {

  const { pageIndex, pageSize } = body
  let offset = pageIndex * pageSize

  const getData = await sequelize.query(`

  SELECT adFreezeTransactions.*,
  adManagers.adId,
  adManagers.adStatus,
  adManagers.discriptions as adDescription,
  currencySettings.currencyCode,
  currencySettings.currencySymbols,
  IFNULL((SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adFreezeSystemTransaction.adManagerId=adFreezeTransactions.adManagerId),0) as totalSpend,
  IFNULL(ABS(adFreezeTransactions.totalFreezeAmount -    (SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adFreezeSystemTransaction.adManagerId=adFreezeTransactions.adManagerId)),adFreezeTransactions.totalFreezeAmount) as totalFreezeAmountLeft,
  (SELECT heading FROM adMedias WHERE adManagerId=adManagers.id ORDER BY createdAt desc LIMIT 1) as heading,
  (SELECT subHeading FROM adMedias WHERE adManagerId=adManagers.id ORDER BY createdAt desc LIMIT 1) as subHeading
  FROM 

  adFreezeTransactions 
  INNER JOIN adManagers ON
  adManagers.id=adFreezeTransactions.adManagerId
  INNER JOIN currencySettings
  ON currencySettings.id=adFreezeTransactions.currencyId
  WHERE adFreezeTransactions.userId=:userId AND 
  
  IFNULL(ABS(adFreezeTransactions.totalFreezeAmount -    (SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adFreezeSystemTransaction.adManagerId=adFreezeTransactions.adManagerId)),adFreezeTransactions.totalFreezeAmount) != 0 AND ( adManagers.adStatus="RUNNING" OR adManagers.adStatus="PAUSED" )
  
  ORDER BY adFreezeTransactions.startDate DESC LIMIT ${offset}, ${pageSize}

  `, {
    replacements: { userId },
    type: QueryTypes.SELECT
  })
  return getData
}

export const getInsightByDate = async (body) => {
  const { adManagerId, fromDate, toDate } = body
  const getInsight = await sequelize.query(`SELECT
  am.adId,
  am.id,
  am.adStatus,
  am.discriptions as description,
  uw.amount,
  uw.freezeAmount,
  DATE(:fromDate) as fromDate,
  DATE(:toDate) as toDate,
  am.userId,
  u.fullName,
  u.userName,
  u.mobile,
  u.email,
  cs.currencyCode,
  cs.currencySymbols
  FROM adManagers am
  INNER JOIN adUserWallets uw ON 
  am.userId=uw.userId
  INNER JOIN users u
  ON u.id=am.userId
  INNER JOIN currencySettings cs
  ON cs.id=uw.currencyId
  WHERE am.id=:adManagerId
  
  `, {
    replacements: { adManagerId, BaseURL: process.env.FTP_BASE_URL, fromDate, toDate }
  })

  if (getInsight.length > 0) {
    return getInsight[0][0]
  }
  return false
};

export const getAdDetailsForFreezeAmountDeduction = async () => {
  const getData = await sequelize.query(`
  SELECT 
  adFT.*,
  bd.timeZone,
  DATEDIFF(adFT.endDate,DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bd.timeZone))) as daysLeft

  FROM adFreezeTransactions adFT 
  INNER JOIN adManagers am
  ON am.id=adFT.adManagerId
  INNER JOIN budgetAndDurations bd
  ON bd.adManagerId=adFT.adManagerId
  WHERE am.adStatus="RUNNING" AND am.isActive=true AND am.isDeleted=false 
  AND DATE(adFT.startDate) <= DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bd.timeZone)) AND 
  DATE(adFT.endDate) >= DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bd.timeZone)) 
  `, {
    type: QueryTypes.SELECT
  })
  return getData
};

export const getCompletedAds = async () => {
  const getData = await sequelize.query(`
  SELECT 
  adFT.adManagerId
  
  FROM adFreezeTransactions adFT 
  INNER JOIN adManagers am
  ON am.id=adFT.adManagerId
  INNER JOIN budgetAndDurations bd
  ON bd.adManagerId=adFT.adManagerId
  WHERE am.adStatus="RUNNING" AND am.isActive=true AND am.isDeleted=false 
  AND 
  DATE(adFT.endDate) < DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bd.timeZone)) 
  `, {
    type: QueryTypes.SELECT
  })
  return getData
};

export const getTotalFreezeAmountPaid = async (adManagerId, userId) => {
  const getData = await sequelize.query(`SELECT 
 IFNULL(SUM(amount),0) as totalPaid,
 (SELECT freezeAmount FROM adUserWallets WHERE userId=:userId) as totalAvailableFreezeAmount
 FROM 
 adFreezeSystemTransaction 
 WHERE adManagerId=:adManagerId
 `, {
    replacements: { adManagerId, userId },
    type: QueryTypes.SELECT
  })
  return getData[0]
};

export const deductAdFreezeAmount = async (freezeTransactionId, adId, userId, amount, freezeAmount) => {

  const updateWallet = await sequelize.query(`UPDATE adUserWallets SET freezeAmount= freezeAmount - :amount WHERE userId=:userId`, {
    replacements: { userId, amount },
    type: QueryTypes.UPDATE
  })

  const updateSpendWallet = await sequelize.query(`UPDATE adUserWallets SET spentAmount= spentAmount + :amount WHERE userId=:userId`, {
    replacements: { userId, amount },
    type: QueryTypes.UPDATE
  })


  freezeAmount = freezeAmount - amount
  const id = uuid()
  const addFreezeTransaction = await sequelize.query(`INSERT INTO adFreezeSystemTransaction(id, freezeTransactionId, adManagerId, userId, amount, freezeAmountLeft) VALUES(:id, :freezeTransactionId, :adId, :userId, :amount, :freezeAmount)`, {
    replacements: { id, freezeTransactionId, adId, userId, amount, freezeAmount },
    type: QueryTypes.INSERT
  })
}

export const getAdByUserId = async (userId, body, type) => {
  let { lat, long, timeZone } = body
  if (!lat) lat = 0
  if (!long) long = 0
  if (!timeZone) timeZone = "Asia/KolKata"

  let query = `
  SELECT 
  (SELECT JSON_UNQUOTE(JSON_QUOTE('suggestedAd'))) as postType,
    am.id,
    am.discriptions,
    am.adStatus,
    am.adId,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT(
      "id",adMedias.id,
      "file",CONCAT(:BaseURL,adMedias.file),
      "fileType",adMedias.fileType,
      "heading",adMedias.heading,
      "subHeading",adMedias.subHeading,
      "callToActionId",adMedias.callToActionId,
      "adCallToActionMaster",(SELECT JSON_OBJECT(
        "id",acam.id,
        "name",acam.name,
        "descriptions",acam.descriptions
      )
      FROM adCallToActionMasters acam WHERE acam.id=adMedias.callToActionId
      )
    )) FROM adMedias 
    WHERE adMedias.adManagerId=am.id AND adMedias.isActive=true AND adMedias.isDeleted=false ORDER BY adMedias.createdAt desc ) as adMedias,
      (JSON_OBJECT(
        "id",at.id,
        "adTypes",at.adTypes,
        "descriptions",at.descriptions,
        "adMasterTypes",(SELECT JSON_OBJECT(
          "name",amt.name,
          "id",amt.id
        ) FROM adMastrerTypes amt WHERE id=at.adMastrerTypesId)
      )) as adType,

      (JSON_OBJECT(
        "id",ast.id,
        "adTypesId",ast.adTypesId,
        "name",ast.name,
        "descriptions",ast.descriptions,
        "note",ast.note,
        "file",ast.file,
        "adFormat",ast.adFormat
       )) as adSubType,

       (SELECT JSON_OBJECT(
        "id",u.id,
        "profileImage",CONCAT(:BaseURL,u.profileImage),
        "userName",u.userName,
        "fullName",u.fullName,
        "profileImageThumb",CONCAT(:BaseURL,u.profileImageThumb)
      ) FROM users u WHERE u.id=am.userId AND u.isDeleted=false) as user,

      DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bm.timeZone)) as currentDate

  FROM adManagers am
  INNER JOIN budgetAndDurations bm ON
  bm.adManagerId=am.id
  INNER JOIN adSubTypes ast
  ON ast.id=am.adSubTypesId
  INNER JOIN adTypes at
  ON at.id=am.adTypesId
  WHERE 
  am.adStatus="RUNNING" AND 
  DATE(bm.startDate)<=DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bm.timeZone)) AND
  DATE(bm.endDate)>=DATE(CONVERT_TZ(now(),@@GLOBAL.time_zone,bm.timeZone)) AND
  am.isActive=true AND 
  am.isDeleted=false AND 
  ast.isActive=true AND at.isActive=true AND at.isDeleted=false
    `;


  const result = await sequelize.query(query, {
    replacements: { BaseURL: process.env.FTP_BASE_URL },
    type: QueryTypes.SELECT
  })

  return result
  // if(result.length > 0){
  //   return result[0]
  // }
  // return []
}

export const checkBudgetExists = async (adManagerId) => {
  const checkBudget = await sequelize.query(`SELECT id from budgetAndDurations WHERE adManagerId=:adManagerId AND isActive=true AND isDeleted=false`, {
    replacements: { adManagerId },
    type: QueryTypes.SELECT
  })
  if (checkBudget.length > 0) {
    return true
  }
  return false
}
export const getSubAdTypeByAdTypes = async (adTypesId) => {
  const getData = await sequelize.query(` 
  SELECT * from adSubTypes WHERE adTypesId=:adTypesId ORDER BY sequence ASC
  `, {
    replacements: { adTypesId },
    type: QueryTypes.SELECT
  })
  return getData
}

export const getAdRangeMaster = async (startAge, endAge) => {
  const getAdRange = await sequelize.query(`
  SELECT 
  id,
  startAge,
  endAge,
  audiancePice,
  audiancePice as price  FROM  
adRangemasters WHERE isActive=true AND startAge <= :startAge AND 
endAge >= :endAge ORDER BY endAge-startAge LIMIT 1
    `, {
    replacements: { startAge, endAge },
    type: QueryTypes.SELECT
  })
  return getAdRange
}

export const getFreezeAmountDetailsForRefund = async (userId, adManagerId) => {
 const getData = await sequelize.query(`
 SELECT 
 adFT.id,
 adFT.adManagerId,
 adFT.userId,
 adFT.currencyId,
 cs.currencyCode,
 cs.currencySymbols,
 adFT.totalFreezeAmount as totalAmountOfAd,
 (SELECT SUM(amount) FROM adFreezeSystemTransaction WHERE adManagerId=:adManagerId) as totalPaid,
 (SELECT freezeAmount FROM adUserWallets WHERE userId=:userId) as freezeAmountInWallet,
 (SELECT amount FROM adUserWallets WHERE userId=:userId) as availableBalanceInWallet,
 am.isRefunded,
 am.adId
 FROM adFreezeTransactions adFT
 INNER JOIN currencySettings cs 
 ON cs.id=adFT.currencyId
 INNER JOIN adManagers am 
 ON am.id=adFT.adManagerId
 WHERE adManagerId=:adManagerId
 `,{
  replacements : {userId, adManagerId},
  type : QueryTypes.SELECT
 })
 if(getData.length > 0){
  return getData[0]
 }
 return false
}

export const getAdForDisplay = async (userId, type) => {

  let typeArr = ["socialFeed","shotz","story","marketPlace","group","bizPage","podCast","event","suggestedGroup","suggestedBizPage"]
  if(!typeArr.includes(type)){
    return false
  }

  let query = `
  SELECT
  am.id,
  am.userId,
  am.adTypesId,
  am.adStatus,
  am.adId,
  am.websiteLink,
  am.adSubTypesId,
  am.discriptions as description,

  IFNULL((SELECT JSON_ARRAYAGG(JSON_OBJECT(
    "id",adMedias.id,
    "file",CONCAT(:BaseURL,adMedias.file),
    "fileType",adMedias.fileType,
    "heading",adMedias.heading,
    "subHeading",adMedias.subHeading,
    "callToActionId",adMedias.callToActionId,
    "adCallToActionMaster",(SELECT JSON_OBJECT(
      "id",acam.id,
      "name",acam.name,
      "descriptions",acam.descriptions
    )
    FROM adCallToActionMasters acam WHERE acam.id=adMedias.callToActionId
    )
  )) FROM adMedias 
  WHERE adMedias.adManagerId=am.id AND adMedias.isActive=true AND adMedias.isDeleted=false ORDER BY adMedias.createdAt desc ),JSON_ARRAY()) as adMedias,

  (SELECT JSON_OBJECT(
    "id",at.id,
    "adTypes",at.adTypes,
    "descriptions",at.descriptions,
    "adMasterTypes",(SELECT JSON_OBJECT(
      "name",amt.name,
      "id",amt.id
    ) FROM adMastrerTypes amt WHERE id=at.adMastrerTypesId
    )
  ) FROM adTypes at WHERE at.id=am.adTypesId AND at.isActive=true AND at.isDeleted=false ) as adType ,
  
  (SELECT JSON_OBJECT(
   "id",ast.id,
   "adTypesId",ast.adTypesId,
   "name",ast.name,
   "descriptions",ast.descriptions,
   "note",ast.note,
   "file",ast.file,
   "adFormat",ast.adFormat
  ) FROM adSubTypes ast WHERE ast.id=am.adSubTypesId AND ast.isActive=true AND isDeleted=false) as adSubType ,
  
  (SELECT JSON_OBJECT(
    "id",u.id,
    "profileImage",CONCAT(:BaseURL,u.profileImage),
    "userName",u.userName,
    "fullName",u.fullName,
    "profileImageThumb",CONCAT(:BaseURL,u.profileImageThumb)
  ) FROM users u WHERE u.id=am.userId ) as user,
  (SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) FROM users WHERE id=:userId ) as diff


  FROM adManagers am 
  INNER JOIN adTypes at ON 
  at.id=am.adTypesId
  INNER JOIN adMastrerTypes amt ON
  amt.id=at.adMastrerTypesId
  INNER JOIN adSubTypes ast ON
  ast.id=am.adSubTypesId
  INNER JOIN adTargetAges adAges ON 
  adAges.adManagerId=am.id
  WHERE am.adStatus="RUNNING" AND am.isActive=true AND am.isDeleted=false AND 
  adAges.startAge <= (SELECT TIMESTAMPDIFF(YEAR, dob, CURDATE()) FROM users WHERE id=:userId ) <= adAges.endAge AND am.id NOT IN ( SELECT adManagerId FROM adReports WHERE isActive=true AND isDeleted=false AND userId=:userId ) AND am.id NOT IN ( SELECT adManagerId FROM adHide WHERE isActive=true AND isDeleted=false AND userId=:userId ) 

  `

  let adMatrix = await sequelize.query(`SELECT * FROM adMatrix WHERE module=:type`,{
    replacements : {type},
    type : QueryTypes.SELECT
  })
  
  let adData = adMatrix[0]

  if(!(adData.leadFormAd)){
    query = query + ` AND amt.name NOT IN ("CPL")`
  }
  if(!(adData.singleImageAd)){
    query = query + ` AND ast.adFormat NOT IN ("SingelImage")`
  }
  if(!(adData.carouselImageAd)){
    query = query + ` AND ast.adFormat NOT IN ("caroselImage")`
  }
  if(!(adData.videoAd)){
    query = query + ` AND ast.adFormat NOT IN ("Video")`
  }
  if(!(adData.fullScreenAd)){
    query = query + ` AND ast.adFormat NOT IN ("FullScreenVideo")`
  }
  

  query = query + ` ORDER BY (SELECT COUNT(*) FROM adPostImpressions WHERE adManagerId=am.id AND userId=:userId) ASC LIMIT 1 `

  const result = await sequelize.query(query,{
    replacements : {BaseURL : process.env.FTP_BASE_URL, userId},
    type : QueryTypes.SELECT
  })

  let data
  if(result.length > 0){
    return {
      postType : "suggestedAd",
      adData : {...result[0]}
    }
  }
  return false
 }

 export const reportAd = async (userId, reportId, adManagerId) => {
  const checkAd = await sequelize.query(` SELECT id FROM adReports WHERE userId=:userId AND adManagerId=:adManagerId `,{
    replacements : {userId, adManagerId},
    type : QueryTypes.SELECT
  })

  if(checkAd.length > 0){
    const updateReport = await sequelize.query(` UPDATE adReports SET reportId=:reportId, isActive=true, isDeleted=false WHERE userId=:userId AND adManagerId=:adManagerId `,{
      replacements : {reportId, userId, adManagerId},
      type : QueryTypes.UPDATE
    })
    return "success"
  }

  const id = uuid()
  const reportAd = await sequelize.query(` INSERT INTO adReports(id,userId,reportId,adManagerId) VALUES(:id, :userId, :reportId, :adManagerId) `,{
    replacements : {id, userId, adManagerId, reportId},
    type : QueryTypes.INSERT
  })
  return "success"
 }

 export const hideAd = async (userId, adManagerId) => {
  const checkAd = await sequelize.query(` SELECT id FROM adHide WHERE userId=:userId AND adManagerId=:adManagerId `,{
    replacements : {userId, adManagerId},
    type : QueryTypes.SELECT
  })

  if(checkAd.length > 0){
    const updateReport = await sequelize.query(` UPDATE adHide SET isActive=true, isDeleted=false WHERE userId=:userId AND adManagerId=:adManagerId `,{
      replacements : {userId, adManagerId},
      type : QueryTypes.UPDATE
    })
    return "success"
  }

  const id = uuid()
  const reportAd = await sequelize.query(` INSERT INTO adHide(id,userId,adManagerId) VALUES(:id, :userId, :adManagerId) `,{
    replacements : {id, userId, adManagerId },
    type : QueryTypes.INSERT
  })
  return "success"
 }

 export const dontShowThisTypeOfAd = async (userId, adSubTypeId) => {
  const checkAd = await sequelize.query(` SELECT id FROM adDontShowToUser WHERE userId=:userId AND adSubTypeId=:adSubTypeId `,{
    replacements : {userId, adSubTypeId},
    type : QueryTypes.SELECT
  })

  if(checkAd.length > 0){
    const updateReport = await sequelize.query(` UPDATE adDontShowToUser SET isActive=true, isDeleted=false,createdAt=now(),updatedAt=now() WHERE userId=:userId AND adSubTypeId=:adSubTypeId `,{
      replacements : {userId, adSubTypeId},
      type : QueryTypes.UPDATE
    })
    return "success"
  }

  const id = uuid()
  const reportAd = await sequelize.query(` INSERT INTO adDontShowToUser(id,userId,adSubTypeId) VALUES(:id, :userId, :adSubTypeId) `,{
    replacements : {id, userId, adSubTypeId },
    type : QueryTypes.INSERT
  })
  return "success"
 }