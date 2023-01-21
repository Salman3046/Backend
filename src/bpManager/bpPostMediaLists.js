const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpPostMediaLists = sequelize.define(
    "bpPostMediaLists",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bpPostId: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "bpPosts",
          key: "id",
        },
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fileURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fileType: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      sequence: {
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
    }
    // {
    //   sequelize,
    //   tableName: "bpPostMediaLists",
    //   timestamps: true,
    //   paranoid: true,
    //   indexes: [
    //     {
    //       name: "PRIMARY",
    //       unique: true,
    //       using: "BTREE",
    //       fields: [{ name: "id" }],
    //     },
    //     {
    //       name: "fk_bpPostsMedia_bpPosts1_idx",
    //       using: "BTREE",
    //       fields: [{ name: "postId" }],
    //     },
    //   ],
    // }
  );

  bpPostMediaLists.associate = (models) => {
    bpPostMediaLists.belongsTo(models.bpPosts, {
      foreignKey: "postId",
      targetKey: "id",
    });
  };

  return bpPostMediaLists;
};
