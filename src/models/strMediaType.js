const Sequelize = require("sequelize");
//const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const strMediaType = sequelize.define("strMediaType", {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    storyId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    fileType: {
      type: DataTypes.ENUM("image", "video", "music"),
      allowNull: true,
    },
    fileURL: {
      type: DataTypes.TEXT,
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
  });
  strMediaType.associate = (models) => {
    //     users.hasMany(models.bpRatingAndReviews);
    //     users.hasMany(models.bpPostLikes);
    //     users.hasMany(models.postLikes);
    //     users.hasMany(models.paymentGatewayMasters);
    //     users.hasMany(models.userSession);
    strMediaType.belongsTo(models.story, {
      foreignKey: "storyId",
      targetKey: "id",
    });
  };

  return strMediaType;
};
