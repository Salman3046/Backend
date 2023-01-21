require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../../helpers/responce";

import { v4 as uuid } from "uuid";
import { otp } from "./../../helpers/utils";
import * as categoryFuncs from "../../funcs/admin/categoryManager.funcs";


export const getArticleCategory = async (req, res) => {
  try {

    const { searchKey } = req.body;

    const Sresponse = await categoryFuncs.getArticleCategory(searchKey);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteArticleCategory = async (req, res) => {
  try {
    const { id, name, edit, remove } = req.body;
    const Sresponse = await categoryFuncs.editDeleteArticleCategory(
      id,
      name,
      edit,
      remove
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteBpCategory = async (req, res) => {
  try {
    const { id, name, edit, remove } = req.body;
    const Sresponse = await categoryFuncs.editDeleteBpCategory(
      id,
      name,
      edit,
      remove
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteBpSubCategory = async (req, res) => {
  try {
    const { id, name, edit, remove } = req.body;
    const Sresponse = await categoryFuncs.editDeleteBpSubCategory(
      id,
      name,
      edit,
      remove
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeletePodcastCategory = async (req, res) => {
  try {
    const { id, name, edit, remove } = req.body;
    const Sresponse = await categoryFuncs.editDeletePodcastCategory(
      id,
      name,
      edit,
      remove
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteMpSubCategory = async (req, res) => {
  try {
    const { id, name, edit, remove, isActive, isDeleted } = req.body;
    const Sresponse = await categoryFuncs.editDeleteMpSubCategory(
      id,
      name,
      edit,
      remove,
      isActive,
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteMpCategory = async (req, res) => {
  try {
    const { id, name, edit, remove, isActive, isDeleted } = req.body;
    const Sresponse = await categoryFuncs.editDeleteMpCategory(
      id,
      name,
      edit,
      remove,
      isActive,
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteMpSubChildCategory = async (req, res) => {
  try {
    const { id, name, edit, remove, isActive, isDeleted } = req.body;
    const Sresponse = await categoryFuncs.editDeleteMpSubChildCategory(
      id,
      name,
      edit,
      remove,
      isActive,
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeletePostEventCategory = async (req, res) => {
  try {
    const { id, name, edit, remove, thumbnailUrl } = req.body;
    const Sresponse = await categoryFuncs.editDeletePostEventCategory(
      id,
      name,
      edit,
      remove,
      thumbnailUrl
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getMarketPlaceCategories = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await categoryFuncs.getMarketPlaceCategories();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getSubChildCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.body;
    const Sresponse = await categoryFuncs.getSubChildCategory(subCategoryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBusinessPageCategories = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await categoryFuncs.getBusinessPageCategories();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPodCastCategory = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await categoryFuncs.getPodCastCategory();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getPostEventCategory = async (req, res) => {
  try {
    // const { name } = req.body;
    const Sresponse = await categoryFuncs.getPostEventCategory();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createBpCategory = async (req, res) => {
  try {
    const { name, sequence } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createBpCategory(
      name,
      userId,
      sequence
    );
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createBpSubCategory = async (req, res) => {
  try {
    const { name, categoryId, sequence } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createBpSubCategory(
      name,
      userId,
      categoryId,
      sequence
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createArticleCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createArticleCategory(name);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createPodCastCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createPodCastCategory(name, userId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createPostEventCategory = async (req, res) => {
  try {
    const { name, thumbnailUrl } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createPostEventCategory(
      name,
      thumbnailUrl
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createMarketPlaceCategory = async (req, res) => {
  try {
    const { name, sequence, isActive, isDeleted } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createMarketPlaceCategory(
      name,
      userId,
      sequence,
      isActive, 
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createMarketPlaceSubCategory = async (req, res) => {
  try {
    const { name, categoryId, sequence, isActive, isDeleted } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createMarketPlaceSubCategory(
      name,
      userId,
      categoryId,
      sequence,
      isActive, 
      isDeleted
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createMarketPlaceSubChildCategory = async (req, res) => {
  try {
    const { name, categoryId, subCategoryId } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createMarketPlaceSubChildCategory(
      name,
      userId,
      categoryId,
      subCategoryId
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createMpAtts = async (req, res) => {
  try {
    const {
      categoryId,
      subCategoryId,
      subChildCategory,
      label,
      type,
      placeHolder,
      info,
      validation,
      limit,
      attributeVals,
    } = req.body;
    const userId = req.user.id;
    const Sresponse = await categoryFuncs.createMpAtts(
      categoryId,
      subCategoryId,
      subChildCategory,
      label,
      type,
      placeHolder,
      info,
      validation,
      limit,
      attributeVals
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteMpAtts = async (req, res) => {
  try {
    const { id } = req.body;
    const Sresponse = await categoryFuncs.deleteMpAtts(id);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateMpAttribute = async (req, res) => {
  try {
    const body = req.body
    const Sresponse = await categoryFuncs.updateMpAttribute(body);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const countCategory = async (req, res) =>{
  try {
    const { type, module } = req.body;

    if(type === null || type === undefined){
      return failResponse(req, res, "Please define type")
    }
    let table = null;
    switch(type) {
      case "article":
        table = "articleCategory";
        break;
      case "group":
        table = "grpCategory";
        break;
      default:
        failResponse(req, res, "Not an authentic type")
        break;
    };

    const result = await categoryFuncs.countCategory(table, type, module);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

export const countForPagination = async (req, res) => {
  try {
    let body = req.body;
    if (!body.type || !body.table || !body.module || !body.range) { 
      return errorResponse(req, res, "Not enough data provided!")
    }

    const result = await categoryFuncs.countForPagination(body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error)
  }

}


export const restoreCategory = async (req, res) => {
  try {
    const { type, data } = req.body;
    let table;
    if(type === null || type === undefined) {
      return failResponse(req, res, "Please define category type");
    }

    switch(type.toLowerCase()) {
      case "articles":
        table = "articleCategory"
        break;
      default: 
        return failResponse(req, res, "Please give an authentic type");
        break;
    }

    const result = await categoryFuncs.restoreCategory(table, data);
    return successResponse(req, res, "Restored successfull");

  } catch (error) {
    return errorResponse(req, res, error);
  }
}



export const getMpSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const Sresponse = await categoryFuncs.getMpSubCategory(categoryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getBpSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const Sresponse = await categoryFuncs.getBpSubCategory(categoryId);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const getCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.getCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getRequestedCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.getRequestedCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

export const getCategorywithimage = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.getCategorywithimage(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//get all the deleted category in the admin panel
export const getDeletedCategory = async (req, res) => {

  try {
    if(!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.getDeletedCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }

};

export const addCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    if (!req.body.name) {
      return failResponse(req, res, "Enter Category name");
    }
    let body = req.body;
    // console.log(body)
    body.adminId = req.user.id;
    body.userId = req.user.id;
    const result = await categoryFuncs.addCategory(body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};
export const addCategoryWithImage = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    if (!req.body.name) {
      return failResponse(req, res, "Enter Category name");
    }
    const result = await categoryFuncs.addCategoryWithImage(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const removeCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    let body = req.body;
    body.deletedById = req.user.id;
    const result = await categoryFuncs.removeCategory(body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.editCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editCategoryWithImage = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    const result = await categoryFuncs.editCategoryWithImage(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const addColorCategory = async (req, res) => {
  try {
    if (!req.body.table) {
      return failResponse(req, res, "Please Enter table");
    }
    if (!req.body.name) {
      return failResponse(req, res, "Enter name");
    }
    if (!req.body.code) {
      return failResponse(req, res, "Enter code");
    }
    const result = await categoryFuncs.addColorCategory(req.body);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

//feeling

export const getFeelingCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const Sresponse = await categoryFuncs.getFeelingCategory();
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const createFeelingCategory = async (req, res) => {
  try {
    const { name, iconURL, description, sequence } = req.body;
    // const userId = req.user.id;
    const Sresponse = await categoryFuncs.createFeelingCategory(
      name,
      iconURL,
      description,
      sequence
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const editDeleteFeelingCategory = async (req, res) => {
  try {
    const { id, name, isActive, description, edit, remove, iconURL } = req.body;
    const Sresponse = await categoryFuncs.editDeleteFeelingCategory(
      id, name, isActive, description, edit, remove, iconURL
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};



export const updateFeelingCatgSequence = async (req, res) => {
  try {
    const { id, sequnceNo } = req.body;
    const Sresponse = await categoryFuncs.updateFeelingCatgSequence(id, sequnceNo);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateCatgSequence = async (req, res) => {
  try {
    const { id, sequnceNo } = req.body;
    const Sresponse = await categoryFuncs.updateCatgSequence(id, sequnceNo);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateSubCatgSequence = async (req, res) => {
  try {
    const { id, sequnceNo } = req.body;
    const Sresponse = await categoryFuncs.updateSubCatgSequence(id, sequnceNo);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateBpCatgSequence = async (req, res) => {
  try {
    const { id, sequnceNo } = req.body;
    const Sresponse = await categoryFuncs.updateBpCatgSequence(id, sequnceNo);
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const updateBpSubCatgSequence = async (req, res) => {
  try {
    const { id, sequnceNo } = req.body;
    const Sresponse = await categoryFuncs.updateBpSubCatgSequence(
      id,
      sequnceNo
    );
    return successResponse(req, res, Sresponse);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};


export const getFeelingsAndActivites = async (req,res) =>{
  try { 
        const feelingCategoryId = req.body.feelingCategoryId;
        const result = await categoryFuncs.getFeelingsAndActivites(feelingCategoryId);
        return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

export const addFeelingsAndActivites = async (req, res) => {
  try {
    const {feelingCategoryId,name,iconURL} = req.body;
    const result = await categoryFuncs.addFeelingsAndActivites(feelingCategoryId,name,iconURL);
    return successResponse(req, res, "Success");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const deleteFeelingsAndActivites = async (req,res) =>{
  try { 
        const id = req.body.id;
        const result = await categoryFuncs.deleteFeelingsAndActivites(id);
        return successResponse(req, res, "Success")
  } catch (error) {
        return errorResponse(req, res, error)
  }
}

export const updateFeelingsAndActivites = async (req,res) =>{
  try {
    const {id,name,iconURL}= req.body;
    const result = await categoryFuncs.updateFeelingsAndActivites(id,name,iconURL);
    return successResponse(req, res, "Success")
  } catch (error) {
    return errorResponse(req,res,error);
  }
}

export const getInterestCategory = async (req,res) =>{
  try {
    const result = await categoryFuncs.getInterestCategory(req.body)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req,res,error);
  }
}
export const addInterestCategory = async (req,res) =>{
  try {
    const result = await categoryFuncs.addInterestCategory(req.body)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req,res,error);
  }
}
export const editInterestCategory = async (req,res) =>{
  try {
    const result = await categoryFuncs.editInterestCategory(req.body)
    return successResponse(req, res, "Success")
  } catch (error) {
    return errorResponse(req,res,error);
  }
}


export const getAdminActivityLog = async (req, res) => {
  try {
    const result = await categoryFuncs.getAdminActivityLog(req.body)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

export const postFeedGetAdminActivityLog = async (req, res) => {
  try {
    const result = await categoryFuncs.postFeedGetAdminActivityLog(req.body)
    return successResponse(req, res, result)
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

export const addAdminActivityLog = async (req, res) => {
  try {
    let body = req.body;
    body.adminId = req.user.id;
    const result = await categoryFuncs.addAdminActivityLog(body);
    return successResponse(req, res, "Activity Added successfully!");
  } catch (error) {
    return errorResponse(req, res, error);
  }
}