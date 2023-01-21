require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";
import * as ManagementHistoryfuncs from "../../funcs/groups/grpManagementHistory.funcs";

/*Controller to createGroupManagementHistory*/
export const createGroupManagementHistory = async (req, res) => {
    try {
        const data = await ManagementHistoryfuncs.createGroupManagementHistory(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to create Group Member*/
export const getGroupManagementHistory = async (req, res) => {
    try {
        const data = await ManagementHistoryfuncs.getGroupManagementHistory(req.body);
        if (!data.rows.length) return failResponse(req, res, 'NoHistoryFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};