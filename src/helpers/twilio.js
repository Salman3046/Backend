require('dotenv').config();
const client = require("twilio")(process.env.TWILLIO_ACCOUNT_SID, process.env.TWILLIO_AUTH_TOKEN)

export const twilioSendMsg = async (to, body) => {
    console.log("SEND OTP :" + to + "--------" + body)
    return new Promise(async (res, rej) => {
        try {
            const num = to.replace(/\s/g, '')
            const message = await client.messages.create({
                from: process.env.TWILLIO_MOBILE,
                body: `Your verification code for Sociomee is ${body} `,
                to: to,//"+917895720597",//
                // to: num
            });
            console.log("SMS Sent", message);
            res(message);
        } catch (error) {
            console.log("SMS Sending Failed", error);
            rej("SMS Sending Failed");
        }
    });
};
