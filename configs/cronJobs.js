const cron = require("node-cron");
import moment from "moment"
import * as thumbGenerator from "../crons/thumbGenerator"
import * as goLiveCrons from '../crons/goLive.crons'
import * as adManagerCrons from '../crons/adManager.crons'

// [1 * * * *] time min 1
// [*/1 * * * *] interval 1
// [*/10 * * * * *] time second 1
cron.schedule("*/5 * * * *", function () {
    console.log("============this is cron job==========");

});
cron.schedule("30 * * * *", async function () {
    console.log("<<<<<----- CRON JOB >> Start/Stop Ads ----->>>>>>>");
    console.log("---------AdManager -Deduct Freeze Amount CRON------------")
    await adManagerCrons.deductAdFreezeAmount()
});

cron.schedule("0 0 * * *", function () {
    console.log("<<<<<----- CRON JOB >> Send Firebase Notification ----->>>>>>>");
});

cron.schedule("0 0 * * *", function () {
    console.log("<<<<<----- CRON JOB >> Send Email ----->>>>>>>");
});

cron.schedule("50 * * * * *", function () {
    console.log("<<<<<----- CRON JOB >> Check for profile thumbnail ----->>>>>>>");
    // thumbGenerator.generateAndUpdateProfileThumb();
});

cron.schedule("*/15 * * * * *", async function () {
    console.log(moment().utcOffset("+05:30").format('LTS'),"Curr Time ");
    console.log("---------GOLIVE - CRON------------")
    await goLiveCrons.checkExistingGoLive()
});
cron.schedule("50 * * * * *", function () {
    console.log("<<<<<----- CRON JOB >> Check for Post thumbnail ----->>>>>>>");
    // thumbGenerator.generateAndUpdatePostThumb();
});


//email Sending
//notification Sending
//Running Scheduled Post
//creating Thumbnails
//s3 cleanup