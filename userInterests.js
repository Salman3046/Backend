const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const userInterests = sequelize.define("userInterests", {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true,
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
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  //   users.associate = (models) => {
  //     users.hasMany(models.bpRatingAndReviews);
  //     users.hasMany(models.bpPostLikes);
  //     users.hasMany(models.postLikes);
  //     users.hasMany(models.paymentGatewayMasters);
  //   };

  return userInterests;
};
