module.exports = (sequelize, DataTypes) => {
    const postLikes = sequelize.define(
      "postLikes",
      {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING(36),
            allowNull: false,
        
        },
        postId: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        likeReactionId: {
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

    postLikes.associate = (models) => {
        postLikes.belongsTo(models.users, {
          foreignKey: "userId",
          targetKey: "id",
        });
      };

    return postLikes;
  };
  