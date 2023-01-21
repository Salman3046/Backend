module.exports = (sequelize, DataTypes) => {
  const postHashTags = sequelize.define(
    "postHashTags",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      postId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      hashTagId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        paranoid: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {}
  );
  postHashTags.associate = (models) => {
    postHashTags.belongsTo(models.posts, {
      foreignKey: "postId",
      targetKey: "id",
    });
    postHashTags.belongsTo(models.hashTags, {
      foreignKey: "hashTagId",
      targetKey: "id",
    });
  };

  return postHashTags;
};
