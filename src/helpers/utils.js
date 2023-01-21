export const uniqueFileName = (length = 13) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const otp = (length = 6) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// export const firebaseCallingPush = async (userId, body, token, title, toId, type) => {
//   return new Promise(async (resolve, reject) => {
//     var resData = body;
//     var message = {
//       // notification: {
//       //   title: title,
//       // },
//       data: { ...resData },
//       token: token,
//       apns: {
//         headers: {
//           "apns-expiration": "1604750400"
//         }
//       },
//       android: {
//         ttl: 3600000,
//         priority: "high"
//       },
//       webpush: {
//         "headers": {
//           "TTL": "4500"
//         }
//       },
//     };
//     var notification = {
//       userId: userId,
//       notifyTo: toId,
//       notificationBody: resData,
//       message: title,
//       notificationType: type,
//     };

//     const responseData = await meestNotifications.create(notification);
//     const TypeFeed = body.type === "SVS" ? "SVS" : "Feed"
//     const unreadNotification = await getUnReadnotifcationCount(TypeFeed, toId)
//     message.data["unreadNotification"] = unreadNotification + "";
//     admin
//       .messaging()
//       .send(message)
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         console.log("Error sending message:", error);
//         reject(error);
//       });
//   });

// };

