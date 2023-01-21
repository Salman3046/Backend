const Sequelize = require("sequelize");
const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true,
      },
      mobile: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
        allowNull: true,
      },
      addressBy: {
        type: DataTypes.ENUM("he", "she", "none"),
        allowNull: true,
      },
      loginMode: {
        type: DataTypes.ENUM("password", "google", "apple"),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      coverImage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          if (!this.getDataValue("profileImage")) {
            return "";
          }
          return (
            process.env.AWS_S3_URL + "/" + this.getDataValue("profileImage")
          );
        },
      },
      profileImageThumb: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      homeAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      maritalStatusId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "maritalStatus",
          key: "id",
        },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      countryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "country",
          key: "id",
        },
      },
      languagId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "appLanguages",
          key: "id",
        },
      },
      professionId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "professions",
          key: "id",
        },
      },
      isPrivate: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      blockedByAdmin: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      blockMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blockCode: {
        type: DataTypes.STRING(45),
        allowNull: true,
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
      sequenceNo: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "sequenceNo_UNIQUE",
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "sequenceNo_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "sequenceNo" }],
        },
        {
          name: "fk_users_languages1_idx",
          using: "BTREE",
          fields: [{ name: "languagId" }],
        },
        {
          name: "fk_users_countryFlag1_idx",
          using: "BTREE",
          fields: [{ name: "countryId" }],
        },
        {
          name: "fk_users_professions1_idx",
          using: "BTREE",
          fields: [{ name: "professionId" }],
        },
        {
          name: "fk_users_maritalStatus1_idx",
          using: "BTREE",
          fields: [{ name: "maritalStatusId" }],
        },
      ],
    }
  );
  users.associate = (models) => {
    users.hasMany(models.bpRatingAndReviews);
    users.hasMany(models.bpPostLikes);
    users.hasMany(models.postLikes);
    users.hasMany(models.paymentGatewayMasters);
    users.hasMany(models.userSession);
    users.hasMany(models.story);
    users.hasMany(models.strShares);
    users.hasMany(models.adUserTransactions);
    //users.hasMany(models.postTaggedUsers, { as: "taggedPeoples" });
    //users.hasMany(models.strLikes);
  };

  return users;
};
