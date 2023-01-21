require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupsMemberBlockFuncs from "../../funcs/groups/grpBlockedUsers.funcs";
import * as groupsAdminisraterFuncs from "../../funcs/groups/grpAdministrator.funcs";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

/*Controller to blockGroupMember*/
export const blockGroupMember = async (req, res) => {
    try {
        const data = await groupsMemberBlockFuncs.blockGroupMember(req.body);
        const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.groupId);
        const name = grpData[0].name;
        const postUserId = req.body.userId;
        const groupId = req.body.groupId;
        let mainData = {
            name,
            userId: postUserId
        }
        const inAppData = {
            postId: groupId,
            notificationType: "group-blockMember"
        }
        await adminContNotificationFuncs.sendNotificationsByType("group-blockMember", mainData, inAppData)
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to get blockGroupMember*/
export const getBlockGroupMember = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'groupId is required');
    try {
        const data = await groupsMemberBlockFuncs.getBlockedGroupUsers(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to unblockBlockGroupMember*/
export const unblockBlockGroupMember = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'groupId is required');
    if (!req.body.grpAdminId) return failResponse(req, res, 'grpAdminId is required');
    try {
        const grpAdministrater = await groupsAdminisraterFuncs.getGrpAdministraterDetails(req.body);
        for (let i = 0; i < req.body.userIds.length; i++) {
            const data = await groupsMemberBlockFuncs.unblockBlockGroupMember(req.body, req.body.userIds[i], grpAdministrater);
        };
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

