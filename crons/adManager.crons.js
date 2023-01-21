require('dotenv').config();
import { sequelize, Sequelize } from "../models"
const { QueryTypes } = require('sequelize');
import * as adManagerFuncs from '../funcs/adManager/admanager.funcs'

export const deductAdFreezeAmount = async () => {
    try {
        const getAds = await adManagerFuncs.getAdDetailsForFreezeAmountDeduction()
        if (getAds.length > 0) {
            getAds.forEach(async (value, index) => {
                const paymentData = await adManagerFuncs.getTotalFreezeAmountPaid(value.adManagerId, value.userId)
                const { totalPaid, totalAvailableFreezeAmount } = paymentData
                const adValidityLeft = value.daysLeft;
                if(totalAvailableFreezeAmount == 0 || totalAvailableFreezeAmount < 0 || adValidityLeft < 0){
                    return false
                }
                const totalToBePaid = value.totalFreezeAmount - adValidityLeft * (value.dailyBudget)
                if(totalToBePaid < 0 ){
                    return false
                }
                if (totalPaid != totalToBePaid) {
                    const amount = totalToBePaid - totalPaid
                    await adManagerFuncs.deductAdFreezeAmount(value.id, value.adManagerId, value.userId, amount, totalAvailableFreezeAmount)
                }
            })
        }
        // UPDATE COMPLETED ADS
        const completedAd = await adManagerFuncs.getCompletedAds()
        if(completedAd.length > 0){
            completedAd.forEach( async(value,index) => {
                await adManagerFuncs.editAd(value.adManagerId,
                    {
                      adData: {
                        adStatus: "COMPLETED"
                      }
                    })
            })
        }
    } catch (error) {
        console.log("goLiveEnd Cron : Error = ", error);
    }
}
