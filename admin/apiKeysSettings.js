module.exports = (sequelize, DataTypes) => {
  const apiKeysSettings = sequelize.define("apiKeysSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    googleMapAPI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yandexTranslationAPI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    giphyAPI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleAnalyticsCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
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
  return apiKeysSettings;
};
