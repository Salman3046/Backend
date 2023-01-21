module.exports = (sequelize, DataTypes) => {
  const feelingCategory = sequelize.define("feelingCategory", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    iconURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
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
  });
  feelingCategory.associate = (models) => {
    // feelingCategory.belongsTo(models.posts, {
    //   foreignKey: "feelingCategoryId",
    //   targetKey: "id",
    // });
    //feelingCategory.hasMany(models.posts);
  };
  return feelingCategory;
};
