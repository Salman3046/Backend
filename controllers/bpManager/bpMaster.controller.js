require("dotenv").config();
import { successResponse, errorResponse } from "../../helpers/responce";
import * as crudManager from "../../funcs/commanFunctions/crud.funcs";

import * as model from "../importModels";
import { v4 as uuid } from "uuid";
import { Sequelize, bpCategory, bpSubCategory } from "../../models";
const Op = Sequelize.Op;

/**
 * Create a BP Category
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const createBusinessCategory = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    body["id"] = uuid();
    const data = await crudManager.findAndCreate(bpCategory, body, {
      name: body.name,
    });
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBusinessCategory = async (req, res) => {
  try {
    const { pageIndex, pageSize, searchText } = req.body;
    const attributes = ["name", "id"];
    const data = await crudManager.getAllWithPagignation(
      model.bpCategory,
      {
        isDeleted: 0,
        name: {
          [Op.like]: `%${searchText}%`,
        },
      },
      pageIndex,
      pageSize,
      attributes
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBusinessCategory = async (req, res) => {
  try {
    const data = await crudManager.getAll(model.bpCategory);
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const result = await crudManager.getAllCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllSubCategory = async (req, res) => {
  try {
    const result = await crudManager.getAllSubCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBusinessCategory = async (req, res) => {
  try {
    const data = await crudManager.updateAd(
      model.bpCategory,
      {
        isDeleted: 1,
      },
      {
        id: req.params.id,
      }
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateBusinessCategory = async (req, res) => {
  try {
    const data = await crudManager.findAndUpdate(
      model.bpCategory,
      req.body,
      {
        id: req.params.id,
      },
      {
        name: req.body.name,
        id: {
          [Op.not]: req.params.id,
        },
      }
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createBusinessSubCategory = async (req, res) => {
  try {
    const body = req.body;
    body["userId"] = req.user.id;
    body["id"] = uuid();
    const data = await crudManager.findAndCreate(bpSubCategory, body, {
      name: body.name,
      categoryId: body.categoryId,
    });
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBusinessSubCategory = async (req, res) => {
  try {
    const data = await crudManager.getAll(model.bpSubCategory, {
      isDeleted: 0,
      categoryId: body.categoryId,
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getBusinessSubCategoryBy = async (req, res) => {
  try {
    const { pageSize, pageIndex, searchText } = req.body;
    const attributes = ["name", "id"];
    const data = await crudManager.getAllWithPagignation(
      model.bpSubCategory,
      {
        isDeleted: 0,
        categoryId: req.body.categoryId,
        name: {
          [Op.like]: `%${searchText}%`,
        },
      },
      pageIndex,
      pageSize,
      attributes
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getAllBusinessSubCategory = async (req, res) => {
  try {
    const data = await crudManager.getAll(model.bpSubCategory, {
      categoryId: body.categoryId,
    });
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteBusinessSubCategory = async (req, res) => {
  try {
    const data = await crudManager.updateAd(
      model.bpSubCategory,
      {
        isDeleted: 1,
      },
      {
        id: req.params.id,
      }
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateBusinessSubCategory = async (req, res) => {
  try {
    const data = await crudManager.findAndUpdate(
      model.bpSubCategory,
      req.body,
      {
        id: req.params.id,
      },
      {
        name: req.body.name,
        categoryId: req.body.categoryId,
        id: {
          [Op.not]: req.params.id,
        },
      }
    );
    return successResponse(req, res, data);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
