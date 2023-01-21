require('dotenv').config();
var nodemailer = require("nodemailer");

export const sendMail = (data) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_FROM_ID,
                pass: process.env.EMAIL_FROM_PASS,
            },
        });
        var mailOptions = {
            from: process.env.EMAIL_FROM_ID,
            to: data.to,
            subject: data.subject,
            text: data.body,
            html: data.html,
            attachments: data.attachment,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(info.response);
            }
        });
    });
}

module.exports = sendMail