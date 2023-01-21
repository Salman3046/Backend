require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupsNotificationSettingsFuncs from '../../funcs/groups/grpNotificationSettings.funcs';

/*Controller to set Group Notification Settings*/
export const createGroupNotificationSettings = async (req, res) => {
    try {
        const data = await groupsNotificationSettingsFuncs.createGroupNotificationSettings(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to update Group Notification Settings*/
export const getGroupNotificationSettings = async (req, res) => {
    try {
        const data = await groupsNotificationSettingsFuncs.getGroupNotificationSettings(req.body);
        if (data.length === 0) return failResponse(req, res, 'NoSettings Founds');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to update Group Notification Settings*/
export const updateGroupNotificationSettings = async (req, res) => {
    try {
        const data = await groupsNotificationSettingsFuncs.updateGroupNotificationSettings(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const setGroupNotificationSettings = async (req, res) => {
    try {
        const data = await groupsNotificationSettingsFuncs.setGroupNotificationSettings(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};