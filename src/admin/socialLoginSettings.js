module.exports = (sequelize, DataTypes) => {
  const socialLoginSettings = sequelize.define("socialLoginSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    google: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    appleId: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    googleApiKeys: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    googleSecretKey: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    googleApiKeys: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    googleSecretKey: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    appleApiKeys: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
    },
    appleSecretKey: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "abcd",
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
  return socialLoginSettings;
};
