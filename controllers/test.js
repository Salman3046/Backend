import { successResponse, errorResponse , failResponse } from "../helpers/responce"
import { sequelize } from "../models";
const { QueryTypes } = require("sequelize");
import twilioSMS from "../helpers/twilio"
import * as media from "../helpers/media"
import email from "../helpers/email"
import * as utils from "../helpers/utils"
import * as notification from "../helpers/notification"
import path from "path";

require('dotenv').config();

export const hello = async (req, res) => {
    try {
        successResponse(req, res, req.params.name)
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

export const sendSMS = async (req, res) => {
    try {
        const mobile = req.body.mobile
        const text = req.body.text
        if (!text || text.length <= 0) {
            return failResponse(req, res, "twilo")
        }
        if (!mobile) {
            return failResponse(req, res, "twilo")
        }
        if (mobile.length !== 10) {
            return failResponse(req, res, "twilo")
        }
        twilioSMS(mobile, text)
            .then((data) => {
                return successResponse(req, res, `Sent sms text [${text}] to ${mobile}`);
            })
            .catch((error) => {
                return errorResponse(req, res, error, "twilo")
            })
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

export const sendEmail = async (req, res) => {
    try {
        const toId = req.body.toId
        const mailBody = req.body.mailBody
        const subject = req.body.subject
        if (!mailBody || mailBody.length <= 0) {
            return failResponse(req, res, "twilo")
        }
        if (!toId) {
            return failResponse(req, res, "twilo")
        }
        if (toId.length < 10) {
            return failResponse(req, res, "twilo")
        }
        var data = {
            to: toId,
            subject: subject,
            body: mailBody,
        };
        await email(data)
            .then((data) => {
                return successResponse(req, res, `Sent Email to ${toId}`);
            })
            .catch((error) => {
                return errorResponse(req, res, error, "twilo")
            })
    } catch (error) {
        return errorResponse(req, res, error)
    }
}

export const sendNotificationToFCM = async (req, res) => {
    try {
        const { token, type, payload } = req.body
        await notification.send(token,req.user, type, payload)
        return successResponse(req, res, "Success");
    } catch (error) {
        return errorResponse(req, res, error);
    }
}
export const sendNotificationToUserId = async (req, res) => {
    try {
        const { toUserId, type, payload } = req.body
        if(payload.imageUrl)payload.imageUrl = req.user.profileImageThumb || "https://picsum.photos/600/600"
        await notification.sendToUserId(toUserId, req.user, type, payload)
        return successResponse(req, res, "Success");
    } catch (error) {
        return errorResponse(req, res, error);
    }
}

export const uploadToS3 = async (req, res) => {
    console.log("insert -> req.files", req.files)
    try {
        let link = [];
        if (req.files.length) {
            req.files.map((x) => {
                x.uniquename = `${utils.uniqueFileName()}${path.extname(x.originalname)}`;
                return x;
            });
            //const x = req.file
            //x.uniquename = `${utils.uniqueFileName()}${path.extname(x.originalname)}`;
            for(var i = 0; i < req.files.length; i++) {
                const uploadedLink = await media.s3Upload('userUploads', req.files[i]);
                link.push( process.env.AWS_S3_URL + '/' + uploadedLink);
            }
        }
        // const payload = {
        //     url: link[0],
        //     userId: req.user.userId,
        //     mimeType: req.files[0].mimetype,
        //     fileSize: req.files[0].size / 1024
        // };
        // const upload = await medias.create(payload);
        return successResponse(req, res, link );
    } catch (error) {
        return errorResponse(req, res, error);
    }
}

export const insertTestData = async (req, res) => {
    try {
        const { jsonData, textData } = req.body
        if(!jsonData)jsonData = {};
        if(!textData)textData = null;
        const interestResult = await sequelize.query(
            `insert into testTable (textData,jsonData) values (:textData,:jsonData)`,
            {
                replacements: {textData,jsonData:JSON.stringify(jsonData)},
                type: QueryTypes.INSERT,
            }
        );
        return successResponse(req, res, "success" );
    } catch (error) {
        return errorResponse(req, res, error);
    }
}