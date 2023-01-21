module.exports = (sequelize, DataTypes) => {
  const currencySettings = sequelize.define("currencySettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    currencyCode: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    currencySymbols: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.TINYINT,
      allowNull: false,
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
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    countryId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  //   feelingCategory.associate = (models) => {
  //     // feelingCategory.belongsTo(models.posts, {
  //     //   foreignKey: "feelingCategoryId",
  //     //   targetKey: "id",
  //     // });
  //     //feelingCategory.hasMany(models.posts);
  //   };
  return currencySettings;
};
