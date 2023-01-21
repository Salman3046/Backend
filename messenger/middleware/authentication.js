import jwt from "jsonwebtoken";
import { errorResponse } from "../helpers/responce";
import * as userFuncs from "../funcs/users.funcs";

//token format
//Authorization: Bearer <access_tocken>
// SecretKey =this is the application secret key to decode the token issued by the jwt

// ***************  DATA IN AUTH TOKEN
// >> User Id
// >> Session Id
export function authenticatetoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearertoken = bearer[1];
    req.token = bearertoken;
    jwt.verify(
      req.token,
      process.env.AUTH_TOKEN_SECRET,
      async (err, Authdata) => {
        if (err) {
          return errorResponse(
            req,
            res,
            "TokenVefificationFailed",
            "authFailed",
            403
          );
        } else {
          const user = await userFuncs.getUserById(Authdata.user.id);
          
          if (!user || user.length <= 0) {
            return errorResponse(req, res, "userNotExist", "authFailed", 403);
          }
          if (user.isDeleted) {
            return errorResponse(req, res, "userDeleted", "authFailed", 403);
          }
          if (user.blockedByAdmin) {
            return errorResponse(
              req,
              res,
              "userBlockedByAdmin",
              "authFailed",
              403
            );
          }
          await userFuncs.refreshSessions(Authdata.user.id);
          const session = await userFuncs.getSessionById(Authdata.session.id);
          if (session[0].expired) {
            return errorResponse(req, res, "sessionExpired", "authFailed", 403);
          }
          if (session[0].blockedByAdmin) {
            return errorResponse(
              req,
              res,
              "sessionBlockedByAdmin",
              "authFailed",
              403
            );
          }
          userFuncs.renewSessions(Authdata.session.id);
          req.user = user; //Authdata.user
          req.session = session[0]; // Authdata.session
          next();
        }
      }
    );
  } else {
    return errorResponse(req, res, "NoBearerToken", "authFailed");
  }
}
