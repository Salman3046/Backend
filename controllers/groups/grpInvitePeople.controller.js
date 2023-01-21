require('dotenv').config();
import { successResponse, errorResponse, failResponse } from "../../helpers/responce";
import * as InvitePeopleFuncs from "../../funcs/groups/grpInvitePeople.funcs";
import * as groupsFuncs from "../../funcs/groups/group.funcs";
import * as adminContNoti from '../../funcs/adminContNotificationFuncs/adminContNotification.funcs'

/*Controller to grpInvitePeople*/
export const grpInvitePeople = async (req, res) => {
    try {
        let { groupId, grpAdminId } = req.body;
        const userID = req.user.id
        const groupData = await groupsFuncs.getGroupById({groupId, userId : userID})
        const {name} = groupData
        for (let i = 0; i < req.body.userIds.length; i++) {
                var data = await InvitePeopleFuncs.grpInvitePeople({ userId: req.body.userIds[i], groupId, grpAdminId });
                // NOTIFICATION CODE 
            const userData = {
                ...req.user,
                name,
                userId : req.body.userIds[i]
            }
            const inApp = {
                notificationType : "group-inviteToGroup",
                postId : groupId
            }
            await adminContNoti.sendNotificationsByType("group-inviteToGroup",userData,inApp)
        };
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};

/*Controller to get grpInvitePeople*/
export const getGrpInvitePeople = async (req, res) => {
    try {
        const invitePeople = await InvitePeopleFuncs.getAllInvitePeople(req.body);
        if (invitePeople && invitePeople.length) {
            var data = await InvitePeopleFuncs.getGrpInvitePeopleData(invitePeople);
        };
        if (!data && !data) {
            return failResponse(req, res, "NoRecordsFounnds");
        };
        return successResponse(req, res, data);
    } catch (error) {
        return errorResponse(req, res, error);
    };
};