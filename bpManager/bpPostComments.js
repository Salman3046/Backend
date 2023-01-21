const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bpPostComments",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      commentId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "bpPostComments",
          key: "id",
        },
      },
      isSubComment: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      comment: {
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
    },
    {
      sequelize,
      tableName: "bpPostComments",
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
          name: "fk_bpPostComments_bpPosts1_idx",
          using: "BTREE",
          fields: [{ name: "postId" }],
        },
        {
          name: "fk_bpPostComments_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "fk_bpPostComments_bpPostComments1_idx",
          using: "BTREE",
          fields: [{ name: "commentId" }],
        },
      ],
    }
  );
};
