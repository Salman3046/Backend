require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";
import * as groupsFuncs from "../../funcs/groups/group.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

/*Controller to create Group Member*/
export const createGroupMember = async (req, res) => {
    try {
        const data = await groupsMemberFuncs.createGroupMember(req.body);
        const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.groupId);
        const name = grpData[0].name;
        const groupOwnerId = grpData[0].groupOwnerId;
        const privacy = grpData[0].privacy;
        if (privacy == "private") {
            let mainData = {
              ...req.user,
              name,
              userId : groupOwnerId
            }
            const inAppData = {
              postId: req.body.groupId,
              notificationType: "group-followRequest"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-followRequest", mainData, inAppData)
        }
        return successResponse(req, res, 'Success'); 
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to acceptGroupJoinRequest*/
export const acceptGroupJoinRequest = async (req, res) => {
    try {
        for (let i = 0; i < req.body.memberIds.length; i++) {
            req.body.memberId = req.body.memberIds[i];
            var data = await groupsMemberFuncs.acceptGroupJoinRequest(req.body);
        };
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller getAllGroupMembers*/
export const getAllGroupMembers = async (req, res) => {
    try {
        let { sortBy } = req.body;
        const sortBys = ["userName", "fullName", "email", "followingDate", "createdAt"]
        if (sortBy && !sortBys.includes(sortBy)) {
            return failResponse(req, res, "invalidSortBy");
        }
        const members = await groupsMemberFuncs.getGroupMembersData(req.body);
        if (!members.rows) return errorResponse(req, res, 'NoMembersFound');
        return successResponse(req, res, members);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getAllGroupJoinMembersRequest = async (req, res) => {
    try {
        const data = await groupsMemberFuncs.getAllGroupJoinMembersRequest(req.body);
        if (data.length === 0) return errorResponse(req, res, 'Members not found');
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const removeGroupMember = async (req, res) => {
    try {
        const data = await groupsMemberFuncs.removeGroupMember(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getGroupMemberDetails = async (req, res) => {
    try {
        const {groupId} = req.body
        const data = await groupsMemberFuncs.getGroupMemberDetails(groupId);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};