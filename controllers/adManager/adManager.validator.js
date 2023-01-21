import { Joi } from "express-validation";

export const getAdStatus = {
  body: Joi.object({
    adStatus: Joi.string()
      .valid(
        "READY_TO_START",
        "PENDING",
        "CANCELLED",
        "RUNNING",
        "DRAFT",
        "DUE",
        "OVERDUE",
        "COMPLETED",
        "STOP"
      )
      .required(),
    pageNumber: Joi.number().required(),
    pageSize: Joi.number().required(),
    //userId: Joi.string().required(),
  }),
};

export const createAd = {
  body: Joi.object({
    adStatus: Joi.string()
      .valid(
        "READY_TO_START",
        "PENDING",
        "CANCELLED",
        "RUNNING",
        "DRAFT",
        "DUE",
        "OVERDUE",
        "COMPLETED",
        "STOP"
      )
      .required(),
    // adMastrerTypesId: Joi.string().guid().required(),
    adTypesId: Joi.string().guid().required(),
    adSubTypesId: Joi.string().guid().required(),
    discriptions: Joi.string().allow(""),
    websiteLink: Joi.string().uri().allow(""),
    media: Joi.array(),
  }),
};

export const createAdAudience = {
  body: Joi.object({
    adManagerId: Joi.string().guid().required(),
    adPreferrencesMastersId: Joi.string(),
    adTargetGenderBody: Joi.array(),
    startAge: Joi.number().required(),
    endAge: Joi.number().greater(Joi.ref("startAge")).required(),
    adProfessionBody: Joi.array(),
    adInterestsBody: Joi.array(),
    location: Joi.array().items(Joi.string().required()),
    isSaveForFuture: Joi.boolean().required(),
    adRangemasterId: Joi.string(),
  }),
};

export const createAdBudgetAndDurations = {
  body: Joi.object({
    adManagerId: Joi.string().guid().required(),
    dailyBudget: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().min(Joi.ref("startDate")).required(),
    totalAmountToBePaid: Joi.string(),
    timeZone : Joi.string()
  }),
};
