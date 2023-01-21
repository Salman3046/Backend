require('dotenv').config();
import { sequelize, Sequelize } from "../models"
const { QueryTypes } = require('sequelize');
import * as messengerSocket from '../messenger/messenger.socket'
import * as goLiveFuncs from '../funcs/goLive.funcs'

export const checkExistingGoLive = async () => {
    try {
        const goLiveStatus = await goLiveFuncs.getGoLiveStatus()
        const { timeLimit, status } = goLiveStatus
        if (status == true) {
            const checkAnyLive = await sequelize.query(`SELECT * from glGoLive WHERE ( endTime is NULL OR endTime="0000-00-00 00:00:00" ) `, {
                type: QueryTypes.SELECT
            })
            if (checkAnyLive.length > 0) {
                const getGoLive = await sequelize.query(`SELECT id,userId , TIMESTAMPDIFF(MINUTE,startTime,now()) as dif FROM glGoLive 
                WHERE TIMESTAMPDIFF(MINUTE,startTime,now()) >= ${timeLimit - 2} AND isActive=true AND isDeleted=false AND ( endTime is NULL OR endTime="0000-00-00 00:00:00" ) AND isReminded=false`, {
                    type: QueryTypes.SELECT
                })
                if (getGoLive.length > 0) {
                    getGoLive.forEach(async (value, index) => {
                        const updateReminded = await sequelize.query(` UPDATE glGoLive SET isReminded=true WHERE id=:id `, {
                            type: QueryTypes.UPDATE,
                            replacements: { id: value.id }
                        })
                        await messengerSocket.reminderTimeLimitGoLive(value.id, value.userId, 2)
                    })
                }
                const getEndGoLive = await sequelize.query(`SELECT id,userId ,uid,sid,resourceId, TIMESTAMPDIFF(MINUTE,startTime,now()) as dif FROM glGoLive 
                 WHERE TIMESTAMPDIFF(MINUTE,startTime,now()) >= ${timeLimit} AND isActive=true AND isDeleted=false AND ( endTime is NULL OR endTime="0000-00-00 00:00:00" ) AND  isReminded=true AND isTimeOver=false`, {
                    type: QueryTypes.SELECT
                })
                if (getEndGoLive.length > 0) {
                    getEndGoLive.forEach(async (value, index) => {
                        const updateReminded = await sequelize.query(` UPDATE glGoLive SET isTimeOver=true,endTime=now(),isLive=false WHERE id=:id `, {
                            type: QueryTypes.UPDATE,
                            replacements: { id: value.id }
                        })
                        await messengerSocket.timeLimitCompleteGoLive(value.id, value.userId, value)
                    })
                }
                return { remindedGoLive: getGoLive.length, goLiveEnd: getEndGoLive.length }
            }
        }
    } catch (error) {
        console.log("goLiveEnd Cron : Error = ", error);
    }
}
