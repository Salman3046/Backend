module.exports = (sequelize, DataTypes) => {
  const hashTags = sequelize.define(
    "hashTags",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      createdByUserId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      count: {
        type: DataTypes.NUMBER,
        allowNull: true,
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
  hashTags.associate = (models) => {
    // hashTags.belongsTo(models.posts, {
    //   foreignKey: "postId",
    //   targetKey: "id",
    // });
    hashTags.hasMany(models.postHashTags);
  };

  return hashTags;
};
