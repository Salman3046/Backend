// const firebaseAdmin = require("firebase-admin");
// const serviceAccount = require("../configs/sociomee-social-firebase-node.json");
// import * as userFuncs from "../funcs/users.funcs"
// import * as notificationFuncs from "../funcs/notification.funcs"

// firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAccount),
// });

// export const sendToFriends=async (user,type,data)=>{   
//     const friends = await userFuncs.getUserFriends(user.id)
//     friends.rows.forEach(friend => {
//         sendToUser(friend,user,type,data)
//     });
// }
// export const sendToUserId= async (toUserId, fromUser, type, data)=>{

//     const toUser = await userFuncs.getUserById(toUserId);
//     sendToUser(toUser, fromUser, type, data)
    
// }

// export const sendToUser= async (toUser, fromUser, type, data)=>{
    
//     try{
//         toUser = {
//             id: toUser.id,
//             email: toUser.email,
//             gender: toUser.gender,
//             fullName: toUser.fullName,
//             userName:toUser.userName ,
//             sequenceNo: toUser.sequenceNo,
//             profileImageThumb:toUser.profileImageThumb 
//         }
//     }catch(err){console.log("Trimming toUserData Failed:\n",toUser)}
//     try{
//         if(fromUser){
//             fromUser = {
//                 id: fromUser.id,
//                 email: fromUser.email,
//                 gender: fromUser.gender,
//                 fullName: fromUser.fullName,
//                 userName:fromUser.userName ,
//                 sequenceNo: fromUser.sequenceNo,
//                 profileImageThumb:fromUser.profileImageThumb 
//             }
//         }
//     }catch(err){console.log("Trimming fromUserData Failed:\n",fromUser)}


//     const noti = await notificationFuncs.createNotification(toUser.id,fromUser.id,type,data)
//     data.notification = noti
//     const sessions =  await userFuncs.validTokenSessions(toUser.id)
//     for(let i=0;i<sessions.length;i++){
//         if(sessions[i].fcmToken){
//             send(sessions[i].fcmToken, fromUser, type, data, sessions[i].platform)
//         }
//     }
// }

// export const send = async (token,from, type, data, platform) => {
//     const payload = {type,from, data }
//     return new Promise(async (resolve, reject) => {
//         var message = {
//             token,
//             data: {
//                 type,
//                 payload: JSON.stringify(payload)
//             },
//             // android: {
//             //     ttl: "4500s", // for call notification
//             //     priority: "high"
//             // },
//             // priority: "high",
//         };
//         if(platform ==='ios'){
//             message.notification = {
//                 title: data.type,
//                 body : JSON.stringify(data.body),
//             }
//         }
//         firebaseAdmin
//             .messaging()
//             .send(message)
//             .then((response) => {
//                 resolve(response);
//             })
//             .catch((error) => {
//                 if(error.errorInfo.code === "messaging/registration-token-not-registered"){
//                     console.log("Session FCM Token Invalid, Clearing...");
//                     userFuncs.logoutByFCMToken(token)
//                 }
//                 else{
//                     console.log("Error sending message:", error.errorInfo.code);
//                 }
//                 reject(error);
//             });
//     });
// };

