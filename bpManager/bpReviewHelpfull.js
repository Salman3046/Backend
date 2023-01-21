const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpReviewHelpfull = sequelize.define(
    "bpReviewHelpfull",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      reviewId: {
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
    },
    {
      sequelize,
      tableName: "bpReviewHelpfull",
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
          name: "fk_bpReviewHelpfull_bpReviewConversation1_idx",
          using: "BTREE",
          fields: [{ name: "reviewId" }],
        },
        {
          name: "fk_bpReviewHelpfull_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
      ],
    }
  );
  bpReviewHelpfull.associate = (models) => {
    bpReviewHelpfull.belongsTo(models.bpRatingAndReviews, {
      foreignKey: "reviewId",
      targetKey: "id",
    });
    bpReviewHelpfull.belongsTo(models.bpReviewConversations, {
      foreignKey: "reviewReplyId",
      targetKey: "id",
    });
    bpReviewHelpfull.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };
  return bpReviewHelpfull;
};
