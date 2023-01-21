const Sequelize = require("sequelize");
//const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const story = sequelize.define("story", {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    fileType: {
      type: DataTypes.ENUM("media", "post"),
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    blockByAdmin: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    lineStikerURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    blockMessage: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    blockCode: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    allowComment: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    thumbnailURL: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    visibility: {
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
  story.associate = (models) => {
    story.hasMany(models.strMediaType);
    story.hasMany(models.strPostMediaType);
    story.hasMany(models.strLikes);
    story.hasMany(models.strComments);
    story.hasMany(models.strShares);
    story.hasMany(models.strViews);
    // users.hasMany(models.postLikes);
    // users.hasMany(models.paymentGatewayMasters);
    // users.hasMany(models.userSession);
    story.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };

  return story;
};
