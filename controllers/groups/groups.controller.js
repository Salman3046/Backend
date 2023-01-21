require('dotenv').config();
import { v4 as uuid } from "uuid";
import { successResponse, errorResponse, failResponse } from "../../helpers/responce"
import * as groupsFuncs from '../../funcs/groups/group.funcs';
import * as groupsCategoryFuncs from "../../funcs/groups/grpCategory.funcs";
import * as groupsMember from "../../funcs/groups/grpMembers.funcs";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";

import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

export const createGroup = async (req, res) => {
    try {
        const userId = req.user.id
        const id = uuid()
        const data = await groupsFuncs.createGroup(id, req.body);
        const addToAdministrator = await groupsFuncs.addToAdministratorAsSuperAdmin(id,userId)
        if(addToAdministrator){
            return successResponse(req, res, data);
        }
    } catch (error) {
        return errorResponse(req, res, error);
    }
}

/*Get users groups*/
export const geAlltUsersGroup = async (req, res) => {
    try {
        const data = await groupsFuncs.getAllUsersGroup(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Get All groups*/
export const geAllGroups = async (req, res) => {
    try {
        const data = await groupsFuncs.getAllGroups(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Search groups*/
export const searchGroups = async (req, res) => {
    try {
        const data = await groupsFuncs.searchGroups(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Groups general setings*/
export const updateGroupsDetails = async (req, res) => {
    try {
        const data = await groupsFuncs.updateGroupsDetails(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Get groups by id*/
export const getGroupById = async (req, res) => {
    try {
        const data = await groupsFuncs.getGroupById(req.body);
        const category = await groupsCategoryFuncs.getGroupCategoryById({ id: data.grpCategoryId });
        data.grpCategory = category;
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Groups groups details*/
export const updateGroupsGeneralSettings = async (req, res) => {
    try {
        const data = await groupsFuncs.updateGroupsGeneralSettings(req.body);
        const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.id);
        const name = grpData[0].name;
        let mainData = {
            ...req.user,
            name,
            userId : req.user.id 
          }
        if(req.body.privacy == "public"){
            const inAppData = {
              postId: req.user.id,
              notificationType: "group-statusPublic"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-statusPublic", mainData, inAppData)
        }
        if(req.body.privacy == "private"){
                const inAppData = {
                    postId: req.user.id,
                    notificationType: "group-statusPrivate"
                }
              await adminContNotificationFuncs.sendNotificationsByType("group-statusPrivate", mainData, inAppData)
        }
        return successResponse(req, res,"Success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Get groups general setings*/
export const getGroupGeneralSetings = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'GroupId required');
    try {
        const data = await groupsFuncs.getGroupGeneralSettings(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Abot group API*/
export const getAboutGroup = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'GroupId required');
    try {
        const data = await groupsFuncs.getAboutGroup(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Delete group API*/
export const deleteGroup = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'GroupId required');
    try {
        // const data = await groupsFuncs.deleteGroup(req.body);
        const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.groupId);
        const name = grpData[0].name;
        const grpMembers = await groupsMemberFuncs.getGroupMembersByGroupId(req.body.groupId);
        for (let i = 0; i < grpMembers.length; i++) { 
        // NOTIFICATION CODE 
        const userData = {
            ...req.user,
            name,
            userId : grpMembers[i].membersId
        }
        const inApp = {
            notificationType : "group-deleteUser",
            postId : req.body.groupId
        }
        await adminContNotificationFuncs.sendNotificationsByType("group-deleteUser", userData, inApp)
        };
        const data = await groupsFuncs.deleteGroup(req.body);
        return successResponse(req, res, "Success");
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*leaveGroup*/
export const leaveGroup = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'GroupId required');
    try {
        const data = await groupsMember.leaveGroup(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*reportGroup*/
export const reportGroup = async (req, res) => {
    if (!req.body.groupId) return failResponse(req, res, 'groupIdRequired');
    if (!req.body.reportedBy) return failResponse(req, res, 'reportedByIdRequired');
    try {
        const checkExist = await groupsFuncs.checkReportExist(req.body);
        if(checkExist && checkExist.length) {             
            return failResponse(req, res, 'alreadyReportede');
        };
        const data = await groupsFuncs.reportGroup(req.body);
        return successResponse(req, res, 'rePorted');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};