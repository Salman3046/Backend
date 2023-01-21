
require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupPin from "../../funcs/groups/grpPin.funcs";

/*Controller to addPinnedGroup*/
export const addPinnedGroup = async (req, res) => {
    try {
        const data = await groupPin.addPinGroup(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to addPinnedGroup*/
export const getPinnedGroup = async (req, res) => {
    try {
        const data = await groupPin.getPinGroup(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};