import {
    Joi
} from 'express-validation';
import { join } from 'path';

/*Validate group*/
export const createGroup = {
    body: Joi.object({
        userId: Joi.string().guid().required(),
        grpCategoryId: Joi.string().guid().required(),
        name: Joi.string().required(),
        privacy: Joi.string().required(),
        allowMessage: Joi.boolean().required(),
        allowNotificationOnEmail: Joi.boolean().required(),
        description: Joi.string().required(),
        visibility: Joi.boolean(),
        coverPic: Joi.string(),
        coverThumb: Joi.string(),
        blockMessage: Joi.boolean(),
        visibility: Joi.boolean()
    })
};

/*Validate the group category*/
export const createGroupCategory = {
    body: Joi.object({
        userId: Joi.string().guid().required(),
        name: Joi.string().required(),
        status: Joi.string().required(),
    })
};

/*Validate the Group Notification Settings*/
export const groupNotificationSettings = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        grpAdminId: Joi.string().guid().required(),
        id: Joi.string().guid().required(),
        isAllowed: Joi.boolean().required(),
        notificationType: Joi.string().required()
    })
};

/*Validate Group member*/
export const createGroupMember = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        memberId: Joi.string().guid().required(),
        staus: Joi.string().required(),
    })
};

/*Validate Group member*/
export const acceptGroupJoinRequest = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        memberIds: Joi.array(),
        staus: Joi.string().required(),
    })
};

/*grpInvitePeople*/
export const grpInvitePeople = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        userIds: Joi.array().required(),
        grpAdminId: Joi.string().guid().required(),
    })
};

/*grpInvitePeople getAll*/
export const grpInvitePeopleGetAll = {
    body: Joi.object({
        groupId: Joi.string().guid().required()
    })
};


/*Get All users groups*/
export const getAllUsersGroups = {
    body: Joi.object({
        userId: Joi.string().guid().required()
    })
};

/*createGroupAdministrater*/
export const createGroupAdministrater = {
    body: Joi.object({
        userId: Joi.string().guid().required(),
        groupId: Joi.string().guid().required(),
        role: Joi.string().required(),
        roleAdd: Joi.boolean().required(),
        roleUpdate: Joi.boolean().required(),
        roleDelete: Joi.boolean().required()
    })
};

/*getGroupAdministrater*/
export const getGroupAdministrater = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
    })
};

/*remove GroupAdministrater*/
export const removeGroupAdministrater = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        userId: Joi.string().guid().required(),
        isDeleted: Joi.boolean()
    })
};

/*block group memeber*/
export const blockGroupMember = {
    body: Joi.object({
        groupId: Joi.string().guid().required(),
        userId: Joi.string().guid().required(),
        grpAdminId: Joi.string().guid().required()
    })
};
