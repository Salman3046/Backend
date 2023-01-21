require("dotenv").config();
import { sequelize, Sequelize } from "../../models";
const { QueryTypes } = require("sequelize");
import { v4 as uuid } from "uuid";

export const getAllUser = async () => {
  let query = `
    SELECT COUNT(*) from users WHERE isActive = 1 AND isDeleted = 0 AND blockedByAdmin = 0
    `;

  let result = {};
  result.users = await sequelize.query(query, {
    replacements: {
      BaseURL: process.env.FTP_BASE_URL,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const getAllUsers = async () => {
  let query = `
      SELECT COUNT(*) from users 
      `;

  let result = {};
  result.users = await sequelize.query(query, {
    replacements: {
      BaseURL: process.env.FTP_BASE_URL,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const getReportedUsers = async () => {
  let query = `
        SELECT COUNT(*) from userReports WHERE isActive = 1 AND isDeleted = 0 
        `;

  let result = {};
  result.users = await sequelize.query(query, {
    replacements: {
      BaseURL: process.env.FTP_BASE_URL,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};

export const getInactiveUsers = async () => {
  let query = `
          SELECT COUNT(*) from users INNER JOIN userSession WHERE userSession.isOnline = 0 AND users.isActive = 1 AND users.isDeleted = 0 GROUP BY users.id
          `;

  let result = {};
  result.users = await sequelize.query(query, {
    replacements: {
      BaseURL: process.env.FTP_BASE_URL,
    },
    type: QueryTypes.SELECT,
  });
  return result;
};
