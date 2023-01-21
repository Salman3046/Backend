module.exports = (sequelize, DataTypes) => {
  const otherSettings = sequelize.define("otherSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    defaultLanguage: {
      type: DataTypes.ENUM("English", "Hindi"),
      allowNull: true,
      defaultValue: "English",
    },
    updateUserProfileSideBar: {
      type: DataTypes.ENUM("2 Minutes", "5 Minutes"),
      allowNull: true,
      defaultValue: "2 Minutes",
    },
    DateStyle: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "2 Minutes",
    },
    cacheHomePageSideBar: {
      type: DataTypes.ENUM("2 Minutes", "5 Minutes"),
      allowNull: true,
      defaultValue: "2 Minutes",
    },
    connectivitySystemLimit: {
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
      allowNull: false,
    },
  });
  //   feelingCategory.associate = (models) => {
  //     // feelingCategory.belongsTo(models.posts, {
  //     //   foreignKey: "feelingCategoryId",
  //     //   targetKey: "id",
  //     // });
  //     //feelingCategory.hasMany(models.posts);
  //   };
  return otherSettings;
};
