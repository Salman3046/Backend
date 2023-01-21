require('dotenv').config();
import { sequelize, Sequelize } from "../models"
const { QueryTypes } = require('sequelize');
import * as generateThumbFunc from "../funcs/thumbGenerator.func"

export const generateAndUpdateProfileThumb = async () => {
    try {
        const userResult = await sequelize.query(
            `select * from users where profileImage IS NOT NULL and profileImageThumb = profileImage and isDeleted = false`,
            { type: QueryTypes.SELECT }
        );
        if(userResult.length > 0) {
            console.log(`users length == ${userResult.length}`);
             generateThumbFunc.generateSaveThumb(userResult);
        } else {
            console.log("profile thumb length is zero");
        }
    } catch (error) {
        console.log("generateAndUpdateProfilethumb failure == ", error);
    }
}

export const generateAndUpdatePostThumb = async () => {
    try {
        const postList = await sequelize.query(
            `select p.id AS postId, m.fileURL AS mediaUrl, m.fileType AS mediaType, a.data AS blogImage
            from posts AS p
            LEFT JOIN postMediaList AS m ON p.id = m.postId
            LEFT JOIN postArticleItems AS a ON p.id = a.postId
            where thumbnailURL IS NULL AND p.isDeleted = false AND (postType = "media" OR postType = "blog") AND
            (m.sequence = 0 OR m.sequence IS NULL OR a.sequence = 0 OR a.sequence IS NULL)`,
            { type: QueryTypes.SELECT }
        );
        if(postList.length > 0) {
            console.log(`post length == ${postList.length}`);
            generateThumbFunc.generateSavePostThumb(postList);
        } else {
            console.log("post thumb length is zero");
        }
    } catch (error) {
        console.log("generateAndUpdatePostThumb failure == ", error);
    }
}