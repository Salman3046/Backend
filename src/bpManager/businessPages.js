const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const businesspgae = sequelize.define(
    "businessPages",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      bpSubCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      summary: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logoThumb: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      visitorCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      operatingStatus: {
        type: DataTypes.ENUM("hide", "alwaysOpen", "tempClose", "available"),
        allowNull: true,
      },
      isPrivate: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      blockedByAdmin: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      blockCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      blockMessage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      visibility: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      allowCall: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowMessage: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowSharing: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowPageSuggestion: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowQuestion: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowNotificationOnEmail: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowNotificationOnSms: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      allowNotification: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      isDeleted: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      bpCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      defaultContact: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      defaultLocation: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      isPin: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "businessPages",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            {
              name: "id",
            },
          ],
        },
        {
          name: "fk_businessPage_users1_idx",
          using: "BTREE",
          fields: [
            {
              name: "userId",
            },
          ],
        },
        {
          name: "fk_businessPages_bpSubCategory1_idx",
          using: "BTREE",
          fields: [
            {
              name: "bpSubCategoryId",
            },
          ],
        },
      ],
    }
  );
  businesspgae.associate = (models) => {
    businesspgae.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    businesspgae.hasMany(models.bpLocations);
    businesspgae.hasMany(models.bpCoverImages);
    businesspgae.hasMany(models.bpAdminstrator);
    businesspgae.hasMany(models.bpRatingAndReviews);
    businesspgae.hasMany(models.bpOperatingHours);
    businesspgae.hasMany(models.bpWebsites);
    businesspgae.hasMany(models.bpContacts);
    businesspgae.hasMany(models.bpVisitors);
    businesspgae.hasMany(models.bpAdditionalInfo);
    businesspgae.hasMany(models.bpQuestionAnswers);
    businesspgae.hasMany(models.bpCatalogue);
    businesspgae.hasMany(models.bpPosts);
    businesspgae.hasMany(models.bpFollowersList);
    businesspgae.hasMany(models.bpMessageSettings);
    businesspgae.hasMany(models.bpNotificationSettings);
    businesspgae.hasMany(models.bpFAQ);

    businesspgae.belongsTo(models.bpSubCategory, {
      foreignKey: "bpSubCategoryId",
      targetKey: "id",
    });
    businesspgae.belongsTo(models.bpCategory, {
      foreignKey: "bpCategoryId",
      targetKey: "id",
    });
  };
  return businesspgae;
};
