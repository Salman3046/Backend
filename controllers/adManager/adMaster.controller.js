require('dotenv').config();
import {
    successResponse,
    errorResponse,
    failResponse
} from "../../helpers/responce"
import * as adMaanager from "../../funcs/adManager/adMaster.funcs"
import * as adManaFuncs from '../../funcs/adManager/admanager.funcs'
import * as crudFuncs from "../../funcs/commanFunctions/crud.funcs"
import {
    adMastrerTypes,
    adTypes,
    adSubTypes,
    adProfessionMasters,
    professions,
    adCallToActionMasters,
    adInterestsMasters,
    adPreferrencesMasters,
    interests,
    Sequelize
} from "../../models";
import * as model from './../importModels';
const Op = Sequelize.Op

/**
 * Add ad Master Types by admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const create = async (req, res) => {
    try {
        const data = await crudFuncs.create(adMastrerTypes, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * Get All Ad Master List like CPL/CPC/CPV
 * @param {Null} req 
 * @param {*} res 
 * @returns 
 */
export const get = async (req, res) => {
    try {
        const data = await crudFuncs.getAll(adMastrerTypes)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * Create Ad Type with referenece of adMasterType
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createAdType = async (req, res) => {
    try {
        const body = req.body
        const data = await crudFuncs.create(adTypes, body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of Ad Type
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getAdType = async (req, res) => {
    try {        
        const {
            pageIndex = "", pageSize = "", searchText = ""
        } = req.body;
        let data = ""        
        if (pageIndex !== undefined && pageSize) {    
        data = await crudFuncs.getAllData(adTypes, {
            where: {
                adTypes: {
                    [Op.like]: `%${searchText}%`
                }
            },
            include: [{
                model: adMastrerTypes,
                attributes: ['name']
            }],
            attributes: ['adTypes', 'descriptions', 'typeofPage', 'id', 'adMastrerTypesId'],
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
            order : [["typeofPage","ASC"]]
        })
        }
        else{
            data = await crudFuncs.getAllData(adTypes, {
                where: {
                    adTypes: {
                        [Op.like]: `%${searchText}%`
                    }
                },
                include: [{
                    model: adMastrerTypes,
                    attributes: ['name']
                }],
                attributes: ['adTypes', 'descriptions', 'typeofPage', 'id', 'adMastrerTypesId'],   
                order : [["typeofPage","ASC"]]             
            })
        }
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}


/**
 * get List of Ad Type by adMasterId
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getAdTypeByAdMaterType = async (req, res) => {
    try {
        const data = await crudFuncs.getAll(adTypes, {
            adMastrerTypesId: req.params.id
        })
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}


/**
 * Create Sub Ad Type with referenece of AdType
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createSubAdType = async (req, res) => {
    try {
        const data = await crudFuncs.create(adSubTypes, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of Sub Ad Type
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getSubAdType = async (req, res) => {
    try {
        const data = await crudFuncs.getAll(adSubTypes)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of Sub Ad Type by adTypes
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getSubAdTypeByAdTypes = async (req, res) => {
    try {
        // const data = await crudFuncs.getAll(adSubTypes, {
        //     adTypesId: req.body.id
        // })
        const data = await adManaFuncs.getSubAdTypeByAdTypes(req.body.id)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * Create Professions by admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createProfessions = async (req, res) => {
    try {
        const data = await crudFuncs.create(adProfessionMasters, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List Professions
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 
export const getAllProfessionList = async (req, res) => {
    try {
        const {pageIndex = 1, pageSize =20, searchKey = ""} = req.body;
        var filter = {
            include: [{
                where: {name: {[Op.like]: `%${searchKey}%`}},
                model: professions,
                attributes: ['name'],
            }],
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
            attributes: ['name', 'id', 'priceForAudiance']
        }
        const data = await crudFuncs.getAllData(adProfessionMasters, filter);   
        var payload = [];
        data.forEach(ele => {
            payload.push({
                name: ele.profession.name,
                id: ele.id,
                price: ele.priceForAudiance
            })
        })  
        return successResponse(req, res, payload);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * Create Intrests records by admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createIntrests = async (req, res) => {
    try {
        const data = await crudFuncs.create(adInterestsMasters, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of Interests
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getAllInterests = async (req, res) => {
    try {
        const {pageIndex = 1, pageSize = 20, searchKey = ""} = req.body;
        var filter = {
            include: [{
                where: {name: {[Op.like]: `%${searchKey}%`}},
                model: interests,
                attributes: ['name'],
            }],
            offset: (pageIndex - 1) * pageSize,
            limit: pageSize,
            attributes: ['name', 'id', 'priceForAudiance']
        }
        const data = await crudFuncs.getAllData(adInterestsMasters, filter)
        var payload = [];
        data.forEach(ele => {
            payload.push({
                name: ele.interest.name,
                id: ele.id,
                price: ele.priceForAudiance
            })
        })  
        return successResponse(req, res, payload);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}


/**
 * Create Preferences records by admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createPreferrences = async (req, res) => {
    try {
        req.body['userId'] = req.user.id;
        const data = await crudFuncs.create(adPreferrencesMasters, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of Preferences
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getAllPreferences = async (req, res) => {
    try {
        const {
            pageIndex = 1,
                pageSize = 10,
                searchText = ""
        } = req.body;
        // var attributes = ['name', 'id'];
        const data = await crudFuncs.getAllWithPagignation(adPreferrencesMasters, {
                userId: req.user.id,
                // userId : req.body.userId,
                name: {
                    [Op.like]: `%${searchText}%`
                },
                isActive : {
                    [Op.eq] : 1
                }
            }, pageIndex,
            pageSize,
            ['name', 'id']);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * Create CallToActionMaster records by admin
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createCallToActionMaster = async (req, res) => {
    try {
        const data = await crudFuncs.create(adCallToActionMasters, req.body)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

/**
 * get List of CallToActionMaster
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

export const getAllCallToActionMaster = async (req, res) => {
    try {
        const data = await crudFuncs.getAll(adCallToActionMasters)
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error)
    }
}