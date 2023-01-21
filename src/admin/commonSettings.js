module.exports = (sequelize, DataTypes) => {
  const commonSettings = sequelize.define("commonSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    defaultLang: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    userProfile: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    cacheHomePage: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    dateFormat: {
      type: DataTypes.ENUM(
        "mm-yy-dd",
        "dd-mm-yyyy,hh-mm",
        "mm-dd-yyyy,hh-mm",
        "dd-mm-yyyy,mm-hh",
        "mm-dd-yyyy,hh-mm"
      ),
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
  return commonSettings;
};
