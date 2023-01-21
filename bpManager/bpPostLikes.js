const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpPostLikes = sequelize.define(
    "bpPostLikes",
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
        references: {
          model: "users",
          key: "id",
        },
      },
      likeReactionId: {
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
      tableName: "bpPostLikes",
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
          name: "uniqueCol",
          unique: true,
          using: "BTREE",
          fields: [{ name: "userId" }, { name: "postId" }],
        },
        {
          name: "fk_bpPostLikes_bpPosts1_idx",
          using: "BTREE",
          fields: [{ name: "postId" }],
        },
        {
          name: "fk_bpPostLikes_users1_idx",
          using: "BTREE",
          fields: [{ name: "userId" }],
        },
        {
          name: "fk_bpPostLikes_likeReactions1_idx",
          using: "BTREE",
          fields: [{ name: "likeReactionId" }],
        },
      ],
    }
  );

  bpPostLikes.associate = (models) => {
    bpPostLikes.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };
  return bpPostLikes;
};
