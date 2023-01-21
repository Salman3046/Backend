const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpRatingAndReviews = sequelize.define(
    "bpRatingAndReviews",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      ratingPoint: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
      },
      remark: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mediaURL: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      helpfullCount: {
        type: DataTypes.INTEGER,
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
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpRatingAndReviews",
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
          name: "fk_bpRatingAndReview_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpRatingAndReview_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
  bpRatingAndReviews.associate = (models) => {
    bpRatingAndReviews.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    bpRatingAndReviews.hasMany(models.bpReviewConversations, {
      foreignKey: "reviewId",
    });
    bpRatingAndReviews.hasMany(models.bpReviewHelpfull, {
      foreignKey: "reviewId",
    });
  };
  return bpRatingAndReviews;
};
