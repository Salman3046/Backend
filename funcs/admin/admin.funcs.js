require("dotenv").config();
import { sequelize, Sequelize } from "../../models";
const { QueryTypes } = require("sequelize");
import { v4 as uuid } from "uuid";
import * as optFuncs from "../loginSignup.funcs.js";
import crypto from "crypto";
import axios from "axios";

export const addAdmin = async (body, userId) => {
  let password = body.password;
  const userName = body.userName;
  const email = body.email;
  const countryId = body.countryId ? body.countryId : null;
  const role = body.role ? body.role : null;
  const fullName = body.fullName ? body.fullName : null;
  const dob = body.dob ? body.dob : null;
  const gender = body.gender ? body.gender : null;
  const github = body.github ? body.github : null;
  const twitter = body.twitter ? body.twitter : null;
  const facebook = body.facebook ? body.facebook : null;
  const instagram = body.instagram ? body.instagram : null;
  const google = body.google ? body.google : null;
  const linkedin = body.linkedin ? body.linkedin : null;
  const profileImage = body.profileImage ? body.profileImage : null;
  const personalMail = body.personalMail ? body.personalMail : null;
  const location1 = body.location1;
  const emailCheck = optFuncs.EmailCheck(email);
  const userNameAvail = await optFuncs.isUserNameAvailable(userName);

  // comment updates

  if (!userNameAvail) {
    //const list = await optFuncs.userNameSuggestion(fullName);
    return "user name exists";
  }
  if (!emailCheck) {
    return "email already exists";
  }
  if (!password) {
    return "please enter a password";
  }
  if (!location1) {
    return "please give a location/country for a start";
  }
  password = crypto.createHash("md5").update(password).digest("hex");
  const id = uuid();
  const result = await sequelize.query(
    `
      
      INSERT INTO users(id, email, password, userName, fullName, dob, gender, countryId, role, profileImage) 
      VALUES(:id, :email, :password, :userName, :fullName, :dob, :gender, :countryId, :role, :profileImage)
                
      `,
    {
      replacements: {
        id,
        email,
        password,
        countryId,
        role,
        password,
        userName,
        fullName,
        dob,
        gender,
        profileImage,
      },
      type: QueryTypes.INSERT,
    }
  );
  const id2 = uuid();
  const result2 = await sequelize.query(
    `
      
      INSERT INTO adminDetails(id, userId, github, twitter, facebook, instagram, google, linkedin, personalMail) 
      VALUES(:id2, :id, :github, :twitter, :facebook, :instagram, :google, :linkedin, :personalMail)
                
      `,
    {
      replacements: {
        id2,
        id,
        github,
        twitter,
        facebook,
        instagram,
        google,
        linkedin,
        personalMail,
      },
      type: QueryTypes.INSERT,
    }
  );
  const id3 = uuid();
  const interestResult = await sequelize.query(
    `insert into userSession 
        (id,userId,platform,isOnline,location1)
        values (:id3,:id,'web',1,:location1)`,
    {
      replacements: {
        id3,
        id,
        location1,
      },
      type: QueryTypes.INSERT,
    }
  );
};

export const getAdmins = async () => {
  const id = uuid();

  let query = `
    SELECT users.userName as userName, users.gender, users.id as userId, users.dob,
    users.fullName, users.email, 
    users.profileImage as userProfileImage, 
    users.isActive, users.isDeleted,
    country.name, country.id as countryId, users.role, 
    userSession.isOnline, userSession.deviceInfo, userSession.locationLAT, userSession.locationLONG, userSession.createdAt as lastLogin,
    userSession.location1 as location,
    adminDetails.type,adminDetails.github, adminDetails.twitter, adminDetails.facebook, adminDetails.instagram, adminDetails.google, adminDetails.linkedin,
    adminDetails.personalMail 
    FROM users 
    RIGHT JOIN userSession ON userSession.userId=users.id
    RIGHT JOIN country ON country.id = users.countryId
    RIGHT JOIN adminDetails ON adminDetails.userId = users.id
    WHERE users.isDeleted = 0 AND (users.role = 'admin' OR users.role='Country Admin' OR users.role = 'superAdmin')
    GROUP BY users.userName
  `;

  let result = {};
  result.admins = await sequelize.query(query, {
    replacements: {
      BaseURL: process.env.FTP_BASE_URL,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const updateDeleteAdmin = async (id, edit, remove, body) => {
  if (edit === 1 && remove === 0) {
    const {
      countryId,
      fullName,
      profileImage,
      gender,
      role,
      userName,
      email,
      github,
      twitter,
      facebook,
      instagram,
      google,
      linkedin,
      personalMail,
    } = body;
    let query = `
    UPDATE users SET fullName = '${fullName}', profileImage='${profileImage}', gender = '${gender}', role='${role}', countryId = '${countryId}', 
    userName = '${userName}', email = '${email}' 
    where users.id = '${id}'
      `;

    let result = {};
    result.users = await sequelize.query(query, {
      replacements: {},
      type: QueryTypes.UPDATE,
    });

    const adminDetailsUpdate = await sequelize.query(
      `UPDATE adminDetails SET github = '${github}', twitter='${twitter}', facebook='${facebook}', instagram='${instagram}', 
      google='${google}', linkedin='${linkedin}',
      personalMail='${personalMail}'  WHERE adminDetails.userId = '${id}'
      `,
      {
        replacements: {},
        type: QueryTypes.UPDATE,
      }
    );
  } else if (remove === 1 && edit === 0) {
    let query = `
    UPDATE users SET isActive = 0, isDeleted = 1 where users.id = :id
      `;

    let result = {};
    result.users = await sequelize.query(query, {
      replacements: {
        id,
        isActive,
        BaseURL: process.env.FTP_BASE_URL,
      },
      type: QueryTypes.UPDATE,
    });
  } else if ((remove === 0 && edit === 0) || (remove === 1 && edit === 1)) {
    return "please select one option";
  }
};

export const updateAdminStatus = async (id, value) => {
  let query = `
    UPDATE users SET isActive = '${value}' WHERE id = '${id}'
      `;

  let result = {};
  result.users = await sequelize.query(query, {
    replacements: {},
    type: QueryTypes.UPDATE,
  });
};

export const geoLocation = async () => {
  const res = await axios.get("https://geolocation-db.com/json/");
  return res.data;
};
