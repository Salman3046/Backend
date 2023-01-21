module.exports = (sequelize, DataTypes) => {
    const postArticleItems = sequelize.define(
      "postArticleItems",
      {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
        },
        postId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        type: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        sequence: {
            type: DataTypes.NUMBER,
            allowNull: true
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


     
    },
      {}
    );
    return postArticleItems;
  };
  