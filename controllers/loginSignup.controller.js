require("dotenv").config();
import {
  successResponse,
  errorResponse,
  failResponse,
} from "../helpers/responce";
import * as optFuncs from "../funcs/loginSignup.funcs";
import * as loginFuncs from "../funcs/loginSignup.funcs";
import * as userFuncs from "../funcs/users.funcs";
import * as adminPortalFuncs from "../funcs/admin/settings.funcs";
import crypto from "crypto";
import { sequelize, Sequelize, users } from "../models";
import { otp } from "../helpers/utils";
//const { QueryTypes } = require("sequelize");
import * as adminContNotificationFuncs from '../funcs/adminContNotificationFuncs/adminContNotification.funcs'

export const sendOtp = async (req, res) => {
  try {
    const isEmail = req.body.isEmail;
    const type = req.body.type;
    const types = [
      "signup",
      "resetPassword",
      "forgotPassword",
      "addContact",
      "addEmail",
      "messagmee",
    ];
    if (!types.includes(type)) {
      return failResponse(req, res, "invalidOtpResion");
    }
    if (isEmail) {
      const email = req.body.email;

      const checkInUsers = await optFuncs.isEmailAvailable(email)
      const checkInContacts = await userFuncs.existsInUserContacts(email)

      let usersTable = !checkInUsers // false if not in table , true if in table
      let contactTable = checkInContacts // false if not in table , true if in table

      if(type === "signup"){
       if(usersTable){
        return failResponse(req, res, "Email Already Exists")
       }
       if(contactTable){
        return failResponse(req, res, "Email Linked With Another SocioMee Account")
       }
      }

      if(type === "resetPassword" || type === "forgotPassword"){
        if(!usersTable){
         return failResponse(req, res, "Not a User")
        }
       }

       if(type === "addContact" || type === "addEmail"){
        if(usersTable){
          return failResponse(req, res, "Already Added With an account")
         }
         if(contactTable){
          return failResponse(req, res, "Email Linked With Another SocioMee Account")
         }
       }

      const otpResult = await optFuncs.sendEmailOTP(email, type);
    } else {
      let mobile = req.body.mobile;
      mobile = mobile.trim()
      // This Code separates country code from mobile number 
      var re = /(?:^|\W)+(\w+)(?!\w)/g
      let match = re.exec(mobile)
      const code = match[0]
      let countryCode = code.substring(1)
      const replacedNum = mobile.replace(`${code} `, "")

      const checkInUsers = await optFuncs.isMobileAvailable(replacedNum, countryCode)
      const checkInContacts = await userFuncs.existsInUserContacts(replacedNum)
      // const countryCodeUsers = await userFuncs.checkUserCountryCodeInUsers(replacedNum, countryCode)
      // const countryCodeUserContacts = await userFuncs.checkUserCountryCodeInUserContacts(replacedNum, countryCode)

      let usersTable = !checkInUsers // false if not in table , true if in table
      let contactTable = checkInContacts // false if not in table , true if in table

      if(type === "signup"){
       if(usersTable){
        return failResponse(req, res, "MobileNo Already Exists")
       }
       if(contactTable){
        return failResponse(req, res, "Number Linked With Another SocioMee Account")
       }
      }

      if(type === "resetPassword" || type === "forgotPassword"){
        if(!usersTable){
         return failResponse(req, res, "Not a User")
        }
       }

       if(type === "addContact"){
        if(usersTable){
          return failResponse(req, res, "Already Added With an account")
         }
         if(contactTable){
          return failResponse(req, res, "Number Linked With Another SocioMee Account")
         }
       }

       if(type === "messagmee"){
        if(contactTable){
          return failResponse(req, res, "Number Linked With Sociomee Account")
        }
       }
        const otpResult = await optFuncs.sendMobileOTP(mobile, type,replacedNum);
    }
    return successResponse(req, res, "OtpSent");
  } catch (error) {
    return errorResponse(req, res, error, "Invalid phone number");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    if(!otp){
      return failResponse(req, res, "Enter otp")
    }
    let sentTo = req.body.sentTo;
    if(!sentTo){
      return failResponse(req,res, "Enter sentTo")
    }
    const type = req.body.type;
    if(!type){
      return failResponse(req, res, "Enter type")
    }
    sentTo = sentTo.trim()
    const otpResult = await optFuncs.verifyOtp(otp, sentTo, type);
    if (otpResult) {
      return successResponse(req, res, "OtpVerified");
    }
    return failResponse(req, res, "wrongOtp");
  } catch (error) {
    return errorResponse(req, res, error, "verifyFailed");
  }
};

export const isUserNameAvailable = async (req, res) => {
  try {
    const userName = req.body.userName;
    const fullName = req.body.fullName;
    const result = await optFuncs.isUserNameAvailable(userName);
    if (result) {
      return successResponse(req, res, "available");
    } else {
      const list = await optFuncs.userNameSuggestion(fullName);
      return failResponse(req, res, {
        message: "userNameExists",
        userNameList: list,
      });
    }
  } catch (error) {
    return errorResponse(req, res, error, "verifyFailed");
  }
};

export const isEmailAvailable = async (req, res) => {
  try {
    const email = req.body.email;
    const result = await optFuncs.isEmailAvailable(email);
    if (result) {
      return successResponse(req, res, "available");
    } else {
      return failResponse(req, res, "notAvailable");
    }
  } catch (error) {
    return errorResponse(req, res, error, "verifyFailed");
  }
};

export const isMobileAvailable = async (req, res) => {
  try {
    let mobile = req.body.mobile;
    mobile = mobile.trim()
    var re = /(?:^|\W)+(\w+)(?!\w)/g
    let match = re.exec(mobile)
    const code = match[0]
    const replacedNum = mobile.replace(`${code} `, "")
    mobile = replacedNum
    console.log("Number" + replacedNum)
    console.log(code)
    let countryCode = false
    if(code !== replacedNum){
      countryCode = code.substring(1)
    }
    const result = await optFuncs.isMobileAvailable(mobile, countryCode);
    if (result) {
      return successResponse(req, res, "available");
    } else {
      return failResponse(req, res, "notAvailable");
    }
  } catch (error) {
    return errorResponse(req, res, error, "verifyFailed");
  }
};

export const registerUser = async (req, res) => {
  try {
    let {
      mobile,
      email,
      fullName,
      userName,
      password,
      loginMode,
      languagId,
      dob,
      gender,
      addressBy,
      locationLAT,
      locationLONG,
      countryId
    } = req.body;
    // const userSettings = await adminPortalFuncs.getUserSettings()
    // if(!userSettings.dataValues.userRegistration){
    //   return failResponse(req,res,{ message : "User Registration is temporarily stopped from admin " })
    // }
    // let countryId = "27134d17-1db8-4ee3-8050-d8ec89f4f7f3"
    mobile = mobile.trim()
    var re = /(?:^|\W)+(\w+)(?!\w)/g
    let match = re.exec(mobile)
    const code = match[0]
    const replacedNum = mobile.replace(`${code} `, "")
    mobile = replacedNum
  
    const mobileValidate = await optFuncs.MobileCheck(mobile);
    const emailValidate = await optFuncs.EmailCheck(email);
    if (!mobile && !email) {
      return failResponse(req, res, {
        message: "Enter Mobile Number or Email",
      });
    }

    if (!mobileValidate) {
      return failResponse(req, res, {
        message: "Mobile Number already exists.",
      });
    }

    if (!countryId || countryId === "") {
      return failResponse(req, res, {
        message: "Select/Provide a country/countryId,",
      });
    }

    if (!emailValidate) {
      return failResponse(req, res, {
        message: "Email already exists.",
      });
    }

    if (!fullName) {
      return failResponse(req, res, {
        message: "Enter FullName",
      });
    }
    if (fullName.length > 64) {
      return failResponse(req, res, {
        message: "Maximum 64 characters allowed.",
      });
    }

    if (loginMode != "phone") {
      if (!userName) {
        return failResponse(req, res, {
          message: "Enter username",
        });
      }
      if (userName > 32) {
        return failResponse(req, res, {
          message: "Maximum 32 characters allowed.",
        });
      }

      const userNameValidate = userName.search(/^[a-zA-Z0-9\-\@\#\_]*$/);
      if (userNameValidate === -1) {
        return failResponse(req, res, {
          message: "Enter username with only a-z A-Z 0-9 @ # - ",
        });
      }

      const userNameAvail = await optFuncs.isUserNameAvailable(userName);
      if (!userNameAvail) {
        const list = await optFuncs.userNameSuggestion(fullName);
        return failResponse(req, res, {
          message: "userNameExists",
          userNameList: list,
        });
      }
      if (!password) {
        return failResponse(req, res, {
          message: "Enter Password",
        });
      }
      const passLen = password.length;
      if (passLen < 8 || passLen > 16) {
        return failResponse(req, res, {
          message: "Enter Password between 8-16 characters",
        });
      }
    }

    // const passwordValidate = password.search(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // );
    // if (passwordValidate === -1) {
    //   return failResponse(req, res, {
    //     message:
    //       "Enter password with atleast one lowercase character , uppercase character , number and special character",
    //   });
    // }

    if (!languagId) {
      return failResponse(req, res, {
        message: "Enter languagId",
      });
    }
    const loginModes = ["password", "google", "apple", "phone"];
    if (!loginModes.includes(loginMode)) {
      return failResponse(req, res, { message: "invalidLoginMode" });
    }
    //////////////////////////////////////////////////////////////
    if (loginMode == "google") {
      const {
        mobile,
        email,
        fullName,
        userName,
        password,
        gender,
        dob,
        addressBy,
        loginMode,
        googleId,
        countryId,
      } = req.body;
      const userNameAvail = await optFuncs.isUserNameAvailable(userName);
      if (!userNameAvail) {
        const list = await optFuncs.userNameSuggestion(fullName);
        return failResponse(req, res, {
          message: "userNameExists",
          userNameList: list,
        });
      }
      const userId = await userFuncs.createUserWithGoogleOrApple(
        mobile,
        email,
        fullName,
        userName,
        password,
        gender,
        dob,
        addressBy,
        loginMode,
        googleId,
        countryId,
        locationLAT,
        locationLONG
      );

      console.log("userId--------------------", userId);
      // if(mobile && mobile!==""){
      //     req.body.type = "mobile"
      //     req.body.loginId = mobile;
      // }
      // else{
      //     req.body.type = "email"
      //     req.body.loginId = email;
      // }
      const {
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        fcmToken,
      } = req.body;

      const userResult = await userFuncs.getUserById(userId);
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      userResult.userId = userResult.id
      const data = await adminContNotificationFuncs.sendNotificationsByType("loginSignup-registerWithEmail", userResult)
      const token = loginFuncs.getAuthToken(userResult, session);
      delete userResult.password;
      userResult.token = token;
      return successResponse(req, res, userResult);
    }
    /////////////////////////////////////////////////////////////////////
    if (loginMode == "apple") {
      const {
        mobile,
        email,
        fullName,
        userName,
        password,
        gender,
        dob,
        addressBy,
        loginMode,
        appleId,
        countryId,
      } = req.body;
      const userNameAvail = await optFuncs.isUserNameAvailable(userName);
      if (!userNameAvail) {
        const list = await optFuncs.userNameSuggestion(fullName);
        return failResponse(req, res, {
          message: "userNameExists",
          userNameList: list,
        });
      }
      const userId = await userFuncs.createUserApple(
        mobile,
        email,
        fullName,
        userName,
        password,
        loginMode,
        gender,
        dob,
        addressBy,
        appleId,
        countryId,
        locationLAT,
        locationLONG
      );
      // if(mobile && mobile!==""){
      //     req.body.type = "mobile"
      //     req.body.loginId = mobile;
      // }
      // else{
      //     req.body.type = "email"
      //     req.body.loginId = email;
      // }
      const {
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        fcmToken,
      } = req.body;

      const userResult = await userFuncs.getUserById(userId);
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      const token = loginFuncs.getAuthToken(userResult, session);
      delete userResult.password;
      userResult.token = token;
      return successResponse(req, res, userResult);
    }

    if (loginMode == "phone") {
      const { profileImage, profileImageThumb } = req.body;
      const userId = await userFuncs.createUserPhone(
        mobile,
        fullName,
        loginMode,
        languagId,
        profileImage,
        profileImageThumb,
        countryId,
        locationLAT,
        locationLONG
      );

      const {
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        fcmToken,
        countryId,
      } = req.body;

      const userResult = await userFuncs.getUserById(userId);
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      userResult.userId = userResult.id

      const data = await adminContNotificationFuncs.sendNotificationsByType("loginSignup-registerWithMobile", userResult)
      const token = loginFuncs.getAuthToken(userResult, session);
      userResult.token = token;
      return successResponse(req, res, userResult);
    } else {
      const userId = await userFuncs.createUser(
        mobile,
        email,
        fullName,
        userName,
        password,
        loginMode,
        gender,
        dob,
        addressBy,
        languagId,
        countryId,
        locationLAT,
        locationLONG
      );
      // if(mobile && mobile!==""){
      //     req.body.type = "mobile"
      //     req.body.loginId = mobile;
      // }
      // else{
      //     req.body.type = "email"
      //     req.body.loginId = email;
      // }

      const {
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        fcmToken,
      } = req.body;

      const userResult = await userFuncs.getUserById(userId);
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      userResult.userId = userResult.id
      const data = await adminContNotificationFuncs.sendNotificationsByType("loginSignup-registerWithMobile", userResult)
      const token = loginFuncs.getAuthToken(userResult, session);
      delete userResult.password;
      userResult.token = token;
      return successResponse(req, res, userResult);
    }

    //await login(req, res);
    //return successResponse(req, res, "Registered");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const expireSessionsById = async (req, res) => {
  try {
    const { sessionId } = req.body;
    await userFuncs.logOutSessions([sessionId]);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "loginFail");
  }
};

export const expireOlderSessions = async (req, res) => {
  try {
    const { userId } = req.body;
    await userFuncs.logoutOlderSessions(userId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "loginFail");
  }
};
export const expireAllSessions = async (req, res) => {
  try {
    const { userId } = req.body;
    await userFuncs.logoutUserAllSessions(userId);
    return successResponse(req, res, "success");
  } catch (error) {
    return errorResponse(req, res, error, "error");
  }
};

export const login = async (req, res) => {
  try {
    const {
      loginMode,
      loginId,
      password,
      type,
      platform,
      ipAddress,
      deviceId,
      deviceInfo,
      locationLAT,
      locationLONG,
      fcmToken,
      googleId,
      appleId,
      languagId,
    } = req.body;

    const types = ["userName", "email", "mobile", "google", "apple"];

    if (type === "google") {
      const googleId = req.body.loginId;
      userResult = await userFuncs.getUserByGoogleId(googleId);
      userResult = userResult[0];
      console.log("=================" + userResult.countryId);
      if (!userResult) {
        return failResponse(req, res, "userNotExists");
      }
      // if (userResult.loginMode !== loginMode) {
      //   return failResponse(req, res, "incorrectLoginMode");
      // }
      if (userResult.isDeleted) {
        return failResponse(req, res, "userDeleted");
      }
      if (userResult.blockedByAdmin) {
        return failResponse(req, res, "blockedByAdmin");
      }
      if (!userResult.isActive) {
        return failResponse(req, res, "notActive");
      }
      const userSessions = await userFuncs.getSessions(userResult.id);
      if (userSessions.length >= process.env.USER_MAX_SESSIONS) {
        return failResponse(req, res, "maxSession", {
          userSessions,
          userId: userResult.id,
        });
      }
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );

      const token = loginFuncs.getAuthToken(userResult, session);
      delete userResult.password;
      userResult.token = token;
      return successResponse(req, res, userResult);
    }

    if (type === "apple") {
      userResult = await userFuncs.getUserByAppleId(appleId);
      userResult = userResult[0];
      //console.log(userResult);
      if (!userResult) {
        return failResponse(req, res, "userNotExists");
      }
      // if (userResult.loginMode !== loginMode) {
      //   return failResponse(req, res, "incorrectLoginMode");
      // }
      if (userResult.isDeleted) {
        return failResponse(req, res, "userDeleted");
      }
      if (userResult.blockedByAdmin) {
        return failResponse(req, res, "blockedByAdmin");
      }
      if (!userResult.isActive) {
        return failResponse(req, res, "notActive");
      }
      const userSessions = await userFuncs.getSessions(userResult.id);
      if (userSessions.length >= process.env.USER_MAX_SESSIONS) {
        return failResponse(req, res, "maxSession", {
          userSessions,
          userId: userResult.id,
        });
      }
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );

      const token = loginFuncs.getAuthToken(userResult, session);
      //delete userResult.password;
      userResult.token = token;
      return successResponse(req, res, userResult);
    }
    if (!loginId) {
      return failResponse(req, res, "noLoginId");
    }
    const loginModes = ["google", "apple", "password"];
    if (!loginModes.includes(loginMode)) {
      return failResponse(req, res, "invalidLoginModes");
    }
    const platforms = ["ios", "android", "web"];
    if (!platforms.includes(platform)) {
      return failResponse(req, res, "invalidPlatform");
    }
    if (loginMode === "password" && !password) {
      return failResponse(req, res, "noPassword");
    }

    if (!type) {
      return failResponse(req, res, "noType");
    }

    if (!types.includes(type)) {
      return failResponse(req, res, "invalidType");
    }

    var userResult = {};
    if (type === "userName")
      userResult = await userFuncs.getUserByUserName(loginId, languagId);
    if (type === "email") {
      const emailValidate = await loginFuncs.isEmailAvailable(loginId);
      if (emailValidate) {
        return failResponse(req, res, "incorrectEmail");
      }
      userResult = await userFuncs.getUserByEmail(loginId, languagId);
    }
    if (type === "mobile") {
      const mobileValidate = await loginFuncs.isMobileAvailable(loginId);
      if (mobileValidate) {
        return failResponse(req, res, "incorrectMobile");
      }
      userResult = await userFuncs.getUserByMobile(loginId, languagId);
      // if (userResult.countryId !== null) {
      //   if (userResult.countryId !== req.body.countryId) {
      //     return failResponse(req, res, "invalidCountrySelected");
      //   }
      // }
    }
    userResult = userResult[0];
    if (!userResult) {
      return failResponse(req, res, "userNotExists");
    }
    if (userResult.loginMode !== loginMode) {
      return failResponse(req, res, "incorrectLoginMode");
    }
    if (userResult.isDeleted) {
      return failResponse(req, res, "userDeleted");
    }
    if (userResult.blockedByAdmin) {
      return failResponse(req, res, "blockedByAdmin");
    }
    if (!userResult.isActive) {
      return failResponse(req, res, "notActive");
    }
    if (loginMode === "password") {
      const passHash = crypto.createHash("md5").update(password).digest("hex");
      if (userResult.password !== passHash) {
        return failResponse(req, res, "incorrectPassword");
      }
    }
    // if (loginMode === "google") {
    //   if (userResult.email !== loginId) {
    //     return failResponse(req, res, "incorrectEmail");
    //   }
    // }
    // if (loginMode === "apple") {
    //   if (userResult.email !== loginId) {
    //     return failResponse(req, res, "incorrectEmail");
    //   }
    // }
    const userSessions = await userFuncs.getSessions(userResult.id);
    if (userSessions.length >= process.env.USER_MAX_SESSIONS) {
      return failResponse(req, res, "maxSession", {
        userSessions,
        userId: userResult.id,
      });
    }
    const session = await userFuncs.createSession(
      userResult.id,
      platform,
      ipAddress,
      deviceId,
      deviceInfo,
      locationLAT,
      locationLONG,
      fcmToken
    );
    const token = loginFuncs.getAuthToken(userResult, session);
    delete userResult.password;
    userResult.token = token;
    return successResponse(req, res, userResult);
  } catch (error) {
    return errorResponse(req, res, error, "loginFail");
  }
};

export const connectWithGoogle = async (req, res) => {
  try {
    const {
      loginMode,
      loginId,
      password,
      type,
      platform,
      ipAddress,
      deviceId,
      deviceInfo,
      locationLAT,
      locationLONG,
      fcmToken,
      googleId,
      appleId,
    } = req.body;

    const types = ["userName", "email", "mobile", "google"];

    if (!loginId) {
      return failResponse(req, res, "noLoginId");
    }
    const loginModes = ["password"];
    if (!loginModes.includes(loginMode)) {
      return failResponse(
        req,
        res,
        "please enter your password to login/connect with google/apple"
      );
    }
    const platforms = ["ios", "android", "web"];
    if (!platforms.includes(platform)) {
      return failResponse(req, res, "invalidPlatform");
    }
    if (loginMode === "password" && !password) {
      return failResponse(req, res, "noPassword");
    }

    if (!type) {
      return failResponse(req, res, "noType");
    }

    if (!types.includes(type)) {
      return failResponse(req, res, "invalidType");
    }

    var userResult = {};
    if (type === "userName")
      userResult = await userFuncs.getUserByUserName(loginId);
    if (type === "email") userResult = await userFuncs.getUserByEmail(loginId);
    if (type === "mobile")
      userResult = await userFuncs.getUserByMobile(loginId);
    /////////////////////////////////////////////////////
    //////////////////////////////////////////////
    userResult = userResult[0];
    console.log(userResult);
    if (!userResult) {
      return failResponse(req, res, "userNotExists");
    }
    if (userResult.loginMode !== loginMode) {
      return failResponse(req, res, "incorrectLoginMode");
    }
    if (userResult.isDeleted) {
      return failResponse(req, res, "userDeleted");
    }
    if (userResult.blockedByAdmin) {
      return failResponse(req, res, "blockedByAdmin");
    }
    if (!userResult.isActive) {
      return failResponse(req, res, "notActive");
    }
    if (loginMode === "password") {
      const passHash = crypto.createHash("md5").update(password).digest("hex");
      if (userResult.password !== passHash) {
        return failResponse(req, res, "incorrectPassword");
      }
    }

    if (googleId && appleId === "") {
      const updateId = await userFuncs.updateGoogleAppleId(loginId, googleId);
    }
    if (appleId && googleId === "") {
      const updateId = await userFuncs.updateAppleId(loginId, appleId);
    }

    // const find = await users.findOne({
    //   where: {
    //     id: userResult.id,
    //   },
    // });

    // const update = await find.update({
    //   googleId: googleId,
    // });
    // console.log("updated " + update);

    const userSessions = await userFuncs.getSessions(userResult.id);
    if (userSessions.length >= process.env.USER_MAX_SESSIONS) {
      return failResponse(req, res, "maxSession", {
        userSessions,
        userId: userResult.id,
      });
    }
    const session = await userFuncs.createSession(
      userResult.id,
      platform,
      ipAddress,
      deviceId,
      deviceInfo,
      locationLAT,
      locationLONG,
      fcmToken
    );
    const token = loginFuncs.getAuthToken(userResult, session);
    delete userResult.password;
    userResult.token = token;
    return successResponse(req, res, userResult);
  } catch (error) {
    return errorResponse(req, res, error, "loginFail");
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { loginId, password, isEmail, logoutAll } = req.body;
    if (!loginId) {
      return failResponse(req, res, "noLoginId");
    }
    if (!password) {
      return failResponse(req, res, "noPassword");
    }
    const passLen = password.length;
    if (passLen < 8 || passLen > 16) {
      return failResponse(req, res, "Enter Password between 8-16 characters");
    }

    // const passwordValidate = password.search(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // );
    // if (passwordValidate === -1) {
    //   return failResponse(req, res,
    //       "Enter password with atleast one lowercase character , uppercase character , number and special character"
    //   );
    // }
    var userResult = {};
    if (isEmail) {
      const validate = await loginFuncs.isEmailAvailable(loginId);
      if (validate) {
        return failResponse(req, res, "No User Found with This Email");
      }
      userResult = await userFuncs.getUserByEmail(loginId);
    } else {
      const validate = await loginFuncs.isMobileAvailable(loginId);
      if (validate) {
        return failResponse(req, res, "No User Found with This Mobile");
      }
      userResult = await userFuncs.getUserByMobile(loginId);
    }
    userResult = userResult[0];
    if (!userResult) {
      return failResponse(req, res, "userNotExists");
    }
    if (userResult.isDeleted) {
      return failResponse(req, res, "userDeleted");
    }
    if (userResult.blockedByAdmin) {
      return failResponse(req, res, "blockedByAdmin");
    }
    if (!userResult.isActive) {
      return failResponse(req, res, "notActive");
    }
    await userFuncs.setPassword(userResult.id, password);
    if (logoutAll) {
      await userFuncs.logoutUserAllSessions(userResult.id);
    }
    return successResponse(req, res, "passwordReset");
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const confirmPassword = async (req, res) => {
  try {
    let { userId, password } = req.body;
    if (!userId) return failResponse(req, res, "userIdIsRequired");
    if (!password) return failResponse(req, res, "passwordIdIsRequired");
    const userResult = await userFuncs.getUserById(userId);
    const passHash = crypto.createHash("md5").update(password).digest("hex");
    if (userResult.password !== passHash) {
      return failResponse(req, res, "incorrectPassword");
    }
    return successResponse(req, res, "correctPassword");
  } catch (error) {
    return failResponse(req, res, error);
  }
};
export const loginWithMessagmee = async (req, res) => {
  try {
    let { mobile, otp } = req.body;
    if (!mobile) {
      return failResponse(req, res, "Enter mobile");
    }
    if (!otp) {
      return failResponse(req, res, "Enter otp")
    }
    mobile = mobile.trim()
    const otpResult = await optFuncs.verifyOtp(otp, mobile, "messagmee");
    // This Code separates country code from mobile number 
    if (!otpResult) {
      return failResponse(req, res, "inValidOtp")
    }
    var re = /(?:^|\W)+(\w+)(?!\w)/g
    let match = re.exec(mobile)
    const code = match[0]
    const replacedNum = mobile.replace(`${code} `, "")
    const checkMobile = await loginFuncs.isMobileAvailable(replacedNum);
    // const languagId = "12c840f6-fddf-44d3-9680-8c6411ecaff7"
    const {
      languagId,
      platform,
      ipAddress,
      deviceId,
      deviceInfo,
      locationLAT,
      locationLONG,
      fcmToken,
      countryId
    } = req.body;
    if(!countryId){
      return failResponse(req,res,"Enter countryId")
    }
    // if (
    //   !languagId ||
    //   !platform ||
    //   !ipAddress ||
    //   !deviceId ||
    //   !deviceInfo ||
    //   !locationLAT ||
    //   !locationLONG ||
    //   !fcmToken
    // ) {
    //   return failResponse(
    //     res,
    //     res,
    //     "Enter  platform ,ipAddress ,deviceId , deviceInfo , locationLAT , locationLONG , fcmToken"
    //   );
    // }
    if (checkMobile) {
      const userId = await userFuncs.createMessagmeeUser(replacedNum, languagId, countryId, locationLAT, locationLONG);
      const userResult = await userFuncs.getUserById(userId);
      const session = await userFuncs.createSession(
        userResult.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      const token = loginFuncs.getAuthToken(userResult, session);
      userResult.token = token;
      userResult.userStatus = "newUser";
      userResult.profileSetupNameStatus = "inComplete";
      return successResponse(req, res, userResult);
    } else {
      const userResult = await userFuncs.getUserByMobile(replacedNum, languagId);
      const result = userResult[0];
      const session = await userFuncs.createSession(
        result.id,
        platform,
        ipAddress,
        deviceId,
        deviceInfo,
        locationLAT,
        locationLONG,
        fcmToken
      );
      const token = loginFuncs.getAuthToken(result, session);
      result.token = token;
      result.userStatus = "existingUser";
      const { fullName, userName } = result;
      if (userName === null || userName === "") {
        result.profileSetupNameStatus = "inComplete";
      } else {
        result.profileSetupNameStatus = "complete";
      }
      return successResponse(req, res, result);
    }
  } catch (error) {
    return failResponse(req, res, error);
  }
};
