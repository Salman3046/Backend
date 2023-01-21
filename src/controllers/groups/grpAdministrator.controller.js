require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce"
import * as groupAdministraterFuncs from "../../funcs/groups/grpAdministrator.funcs";
import * as groupsMemberFuncs from "../../funcs/groups/grpMembers.funcs";
import * as adminContNotificationFuncs from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'


export const createGroupAdministrater = async (req, res) => {
    try {
        const grpAdminId = req.user?.id;
        const data = await groupAdministraterFuncs.createGrpAdministrater(req.body, grpAdminId);
        const grpData = await groupsMemberFuncs.getGroupDetailByGroupId(req.body.groupId);
        const name = grpData[0].name;
        req.user.id = grpAdminId;
        if (req.body.userId!== grpAdminId) {
            let mainData = {
              ...req.user,
              name,
              userId : req.body.userId
            }
            const inAppData = {
              postId: req.body.groupId,
              notificationType: "group-adminAdd"
            }
            await adminContNotificationFuncs.sendNotificationsByType("group-adminAdd", mainData, inAppData)
        }
        return successResponse(req, res, 'Sucess');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const getGroupAdministrater = async (req, res) => {
    try {
        const data = await groupAdministraterFuncs.getGrpAdministrater(req.body);
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

export const removeGroupAdministrater = async (req, res) => {
    try {
        const data = await groupAdministraterFuncs.removeGrpAdministrater(req.body);
        return successResponse(req, res, 'Success');
    } catch (error) {
        return errorResponse(req, res, error);
    };
};