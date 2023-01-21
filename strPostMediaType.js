const Sequelize = require("sequelize");
//const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const strPostMediaType = sequelize.define("strPostMediaType", {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    postType: {
      type: DataTypes.ENUM(
        "feed",
        "group",
        "businessPage",
        "marketPlace",
        "ad",
        "shotz"
      ),
    },
    fileType: {
      type: DataTypes.ENUM("text", "thought", "svs", "article"),
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    storyId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    feedPostId: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    feedPostId: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    groupPostId: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
  });
  strPostMediaType.associate = (models) => {
    //     users.hasMany(models.bpRatingAndReviews);
    //     users.hasMany(models.bpPostLikes);
    //     users.hasMany(models.postLikes);
    //     users.hasMany(models.paymentGatewayMasters);
    //     users.hasMany(models.userSession);
    strPostMediaType.belongsTo(models.story, {
      foreignKey: "storyId",
      targetKey: "id",
    });
  };

  return strPostMediaType;
};
