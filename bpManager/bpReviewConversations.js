const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpReviewConversations = sequelize.define(
    "bpReviewConversations",
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
      messageText: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      helpfullCount: {
        type: DataTypes.NUMBER,
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
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpReviewConversations",
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
          name: "fk_bpReviewConversation_bpRatingAndReview1_idx",
          using: "BTREE",
          fields: [{ name: "reviewId" }],
        },
        {
          name: "fk_bpReviewConversation_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "fk_bpReviewConversation_users2_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );
  bpReviewConversations.associate = (models) => {
    // bpReviewConversations.belongsTo(models.bpRatingAndReviews, {
    //   foreignKey: "reviewId",
    //   targetKey: "id",
    // });
    bpReviewConversations.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    bpReviewConversations.hasMany(models.bpReviewHelpfull, {
      foreignKey: "reviewReplyId",
    });
  };
  return bpReviewConversations;
};
