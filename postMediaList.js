module.exports = (sequelize, DataTypes) => {
    const postMediaList = sequelize.define(
      "postMediaList",
      {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fileURL: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        fileType: {
            type: DataTypes.BLOB,
            allowNull: true
        },
        postId: {
            type: DataTypes.STRING(36),
            allowNull: false
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
    return postMediaList;
  };
  