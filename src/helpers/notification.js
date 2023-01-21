const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../configs/sociomee-social-firebase-node.json");
import { sequelize, Sequelize } from "../models";
const { QueryTypes } = require("sequelize");
import { v4 as uuid } from "uuid";
import * as userFuncs from "../funcs/users.funcs"
import * as notificationFuncs from "../funcs/notification.funcs"

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

export const sendToUserId= async (toUserId, fromUser, type, payload)=>{

    const toUser = await userFuncs.getUserById(toUserId);
    sendToUser(toUser, fromUser, type, payload)

}

export const sendToUser= async (toUser, fromUser, type, payload)=>{

    try{
        toUser = {
            id: toUser.id,
            email: toUser.email,
            gender: toUser.gender,
            fullName: toUser.fullName,
            userName:toUser.userName ,
            sequenceNo: toUser.sequenceNo,
            profileImageThumb:toUser.profileImageThumb 
        }
    }catch(err){console.log("Trimming toUserData Failed:\n",toUser)}
    try{
        if(fromUser){
            fromUser = {
                id: fromUser.id,
                email: fromUser.email,
                gender: fromUser.gender,
                fullName: fromUser.fullName,
                userName:fromUser.userName ,
                sequenceNo: fromUser.sequenceNo,
                profileImageThumb:fromUser.profileImageThumb 
            }
        }
    }catch(err){console.log("Trimming fromUserData Failed:\n",fromUser)}


    if(!payload.noSave){
        const noti = await notificationFuncs.createNotification(toUser.id,fromUser.id,type,payload)
        payload.notification = noti
    }
    const sessions =  await userFuncs.validTokenSessions(toUser.id)

    for(let i=0;i<sessions.length;i++){
        if(sessions[i].fcmToken){
            payload.platform = sessions[i].platform
            send(sessions[i].fcmToken, fromUser, type, payload)
        }
    }
}

export const send = async (token,from, type, data) => {
    const payload = {type,from, data }
    return new Promise(async (resolve, reject) => {
        var message = {
            notification : {
                title : "Sociomee",
                body : `${from.fullName} ${data.title}`
            },
            data: {
                type,
                payload: JSON.stringify(payload)
            },
        };
        // if(data.platform ==='ios'){
        //     message.apns = {
        //         payload: {
        //             aps: {
        //                 "mutable-content": 1,
        //             }
        //         },
        //         fcm_options: {
        //         }
        //     }
        //     if(data.imageUrl){
        //         message.apns.fcm_options.image = data.imageUrl
        //     }

        //     if(data.silent){
        //         message.apns.payload.aps["content-available"] = true
        //     }
        //     else{
        //         message.notification = {
        //             title: data.title,
        //             // sound: "default",
        //             // body : data.body || data.title
        //         }
        //     }
        // }
        console.log("Notification Sending ... :\n",JSON.stringify(message))
        try{
            firebaseAdmin
                .messaging()
                .sendToDevice(token,message)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    if(error.errorInfo.code === "messaging/registration-token-not-registered"){
                        console.log("Session FCM Token Invalid, Clearing...");
                        userFuncs.logoutByFCMToken(token)
                    }
                    else{
                        console.log("Error sending message:", error.errorInfo.code);
                    }
                    reject(error);
                });
        }
        catch(error){
            reject("error sending Notification");
        }
    });
};

export const sendNotification = async (token, message, type, data) => {
    const test = {
        notification: {
            title: "Sociomee",
            body: message
        },
        data: {
            type: type,
            postId: data
        }
    }
    firebaseAdmin.messaging().sendToDevice(token, test)
        .then(response => {
            console.log("Notification Send")
        })
        .catch(error => {
            console.log(error);
        });
};

export const sendPushNotification = async (token, message) => {
    // const test = {
    //     notification: {
    //         title: "Sociomee",
    //         body: message
    //     }
    // }
    // firebaseAdmin.messaging().sendToDevice(token, test)
    //     .then(response => {
    //         console.log("Notification Send")
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
        const test = {
            notification: {
                title: "Sociomee",
                body: message
            },
            tokens : token
        }
        firebaseAdmin.messaging().sendMulticast(test)
            .then(response => {
                console.log("Notification Send")
            })
            .catch(error => {
                console.log(error);
            });
};

export const addToNotification = async (toUserId, fromUserId, type, category, notificationText, data) => {
    const postId = data.postId || null
    const payload = {
        type,
        postId : data.postId || null
    }
    const jsonData = JSON.stringify(payload)
    const sessions = await userFuncs.validTokenSessions(toUserId)
    for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].fcmToken) {
            sendNotification(sessions[i].fcmToken, notificationText, type, jsonData)
        }
    }
    const checkExistingNotification = await sequelize.query(`SELECT id FROM appNotifications WHERE toUserId=:toUserId AND type=:type AND category=:category AND postId=:postId`,{
        replacements : {toUserId,type,category,postId},
        type : QueryTypes.SELECT
    })
    if(checkExistingNotification.length > 0){
        const {id} = checkExistingNotification[0]
        const updateNotification = await sequelize.query(`UPDATE appNotifications SET notificationText=:notificationText,isRead=false,fromUserId=:fromUserId WHERE id=:id `,{
            replacements : {notificationText,id,fromUserId},
            type : QueryTypes.UPDATE
        })
    }
    if(checkExistingNotification.length === 0 ){
        const id = uuid()
        const addToNotification = await sequelize.query(`INSERT INTO appNotifications(id,toUserId,fromUserId,type,category,notificationText,data,isRead,isReceived,postId) VALUES(:id,:toUserId,:fromUserId,:type,:category,:notificationText,:jsonData,false,true,:postId)
        `, {
            replacements: { id, toUserId, fromUserId, type, category, notificationText, jsonData,postId },
            type: QueryTypes.INSERT
        })
    }
  
}


export const sendToFriends=async (friendsOfUserId,fromUser,type,payload)=>{  
    const friends = await userFuncs.getUserFollowers(friendsOfUserId,friendsOfUserId)
    friends.rows.forEach(friend => {
        // console.log(friend,fromUser,type,payload)
        sendToUser(friend,fromUser,type,payload)
    });
}
export const sendToConnections = async (friendsOfUserId,fromUser,type,payload,connectionId)=>{  
    const connections = await userFuncs.getUserConnectionsByConnectionId(friendsOfUserId,connectionId)
    connections.forEach((friend) => {
        sendToUser(friend,fromUser,type,payload)
    })
}
// export const sendToFriends=async (friendsOfUserId,fromUser,type, category, notificationText, data)=>{  
//     // const friends = await userFuncs.getUserFriends0(friendsOfUserId)
//     // friends.rows.forEach(friend => {
//     //     sendToUser(friend,fromUser,type,payload)
//     // });
//     const followers = await userFuncs.getUserFollowers(friendsOfUserId)
//     if((followers.rows).length > 0 ) {
//         followers.rows.forEach(follower => {
//             addToNotification(follower.id,fromUser,type,category,notificationText,data.goLive.goLiveId)
//         })
//     }
// }