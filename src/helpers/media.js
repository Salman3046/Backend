import AWS from "aws-sdk";
import path from "path";
import * as utils from "../helpers/utils"

// const Jimp = require("jimp");

require("dotenv").config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
});

const spacesEndpoint = new AWS.Endpoint(process.env.AWS_S3_ENDPOINT);
const s3 = new AWS.S3({ endpoint: spacesEndpoint });

export const s3Upload = async (key, file) => {
    // if (file.mimetype === "image/tiff") {
    //     await Jimp.read(file.buffer)
    //         .then((image) => {
    //             image.getBuffer("image/jpeg", (error, data) => {
    //                 if (error) {
    //                     return error;
    //                 }
    //                 file.buffer = data;
    //                 file.mimetype = "image/jpeg";
    //                 file.uniquename = `${file.uniquename.substr(
    //                     0,
    //                     file.uniquename.lastIndexOf(".") < 0
    //                         ? file.uniquename.length
    //                         : file.uniquename.lastIndexOf(".")
    //                 )}.jpeg`;
    //                 file.originalname = `${file.originalname.substr(
    //                     0,
    //                     file.originalname.lastIndexOf(".") < 0
    //                         ? file.originalname.length
    //                         : file.originalname.lastIndexOf(".")
    //                 )}.jpeg`;
    //             });
    //         })
    //         .catch((err) => err);
    // }
    if(!file.uniquename){
        file.uniquename = `${utils.uniqueFileName()}${path.extname(file.originalname)}`;
    }
    if (!path.extname(file.uniquename) || path.extname(file.uniquename) === ".") {
        file.uniquename = `${file.uniquename}${`.${file.mimetype.split("/")[1]}`}`;
        file.originalname = `${file.originalname}${`.${file.mimetype.split("/")[1]}`}`;
    }
    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${key}/${file.uniquename}`,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
        ContentDisposition: `inline; filename="${file.originalname}"`,
    };
    return new Promise((res, rej) =>
        s3.upload(params, (error, data) => {
            if (error) {
                console.log("upload -> error", error);
                rej(error);
                throw error;
            } else {
                console.log(data.Location, "files");
                res(params.Key);
            }
        })
    );
};

export const s3UploadInternal = async (imageKey, thumbnail) => {
    return new Promise((res, rej) =>
        s3.putObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: imageKey,
            ACL: "public-read",
            Body: thumbnail
        }, async function (putErr, _) {
            if (putErr) {
                console.error("error", putErr);
                rej('error');
            } else {
                res("success");
            }
        })
    );
};