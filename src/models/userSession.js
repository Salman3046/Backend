const Sequelize = require("sequelize");
//const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const userSession = sequelize.define(
    "userSession",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      platform: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      isOnline: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      expired: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      socketId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      fcmToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      voipToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastActivity: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      deviceId: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      deviceInfo: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      locationLAT: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      locationLONG: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      location1: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location2: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location3: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location4: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      blockedByAdmin: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
    }
    // {
    //   sequelize,
    //   tableName: "users",
    //   timestamps: true,
    //   paranoid: true,
    // //   indexes: [
    // //     {
    // //       name: "PRIMARY",
    // //       unique: true,
    // //       using: "BTREE",
    // //       fields: [{ name: "id" }],
    // //     },
    // //     {
    // //       name: "sequenceNo_UNIQUE",
    // //       unique: true,
    // //       using: "BTREE",
    // //       fields: [{ name: "sequenceNo" }],
    // //     },
    // //     {
    // //       name: "fk_users_languages1_idx",
    // //       using: "BTREE",
    // //       fields: [{ name: "languagId" }],
    // //     },
    // //     {
    // //       name: "fk_users_countryFlag1_idx",
    // //       using: "BTREE",
    // //       fields: [{ name: "countryId" }],
    // //     },
    // //     {
    // //       name: "fk_users_professions1_idx",
    // //       using: "BTREE",
    // //       fields: [{ name: "professionId" }],
    // //     },
    // //     {
    // //       name: "fk_users_maritalStatus1_idx",
    // //       using: "BTREE",
    // //       fields: [{ name: "maritalStatusId" }],
    // //     },
    // //   ],
    // }
  );
  //   users.associate = (models) => {
  //     users.hasMany(models.bpRatingAndReviews);
  //     users.hasMany(models.bpPostLikes);
  //     users.hasMany(models.postLikes);
  //     users.hasMany(models.paymentGatewayMasters);
  //   };

  return userSession;
};
