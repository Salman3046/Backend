const Sequelize = require("sequelize");
//const { bpRatingAndReviews } = require("../controllers/importModels");
module.exports = function (sequelize, DataTypes) {
  const strLikes = sequelize.define("strLikes", {
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
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
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
  strLikes.associate = (models) => {
    //strLikes.hasMany(models.users);
    //     users.hasMany(models.bpPostLikes);
    //     users.hasMany(models.postLikes);
    //     users.hasMany(models.paymentGatewayMasters);
    //     users.hasMany(models.userSession);
    strLikes.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };

  return strLikes;
};
