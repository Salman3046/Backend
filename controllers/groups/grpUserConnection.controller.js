require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce"
import * as groupUserFuncs from '../../funcs/groups/grpUsersConections.funcs';
import * as groupMemberFuncs from '../../funcs/groups/grpMembers.funcs';

/*Controller to get user connections list*/
export const getGroupUserConnection = async (req, res) => {
    try {
        console.log("=---------------", req.body)
        const data = await groupUserFuncs.getGroupUserConnection(req.body);
        if (data.length === 0) return failResponse(req, res, 'NoUsersFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to Things in common API*/
export const getGroupUserThingsInCommon = async (req, res) => {
    try {
        const data = await groupUserFuncs.getMembersThingCommonWithYou(req.body);
        if (data.length === 0) return failResponse(req, res, 'NoUsersFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to Things in common API*/
export const getMutualFollowers = async (req, res) => {
    try {
        const data = await groupMemberFuncs.getMutualFollowers(req.body);
        if (data.length === 0) return failResponse(req, res, 'NoUsersFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getMembersNearByYou = async (req, res) => {
    console.log(req.user)
    try {
        const data = await groupMemberFuncs.getMembersNearByYou(req.body);
        if (data.length === 0) return failResponse(req, res, 'NoUsersFound');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};