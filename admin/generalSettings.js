module.exports = (sequelize, DataTypes) => {
  const generalSettings = sequelize.define("generalSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    siteTitle: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    siteName: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    siteEmail: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    siteNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    siteDescription: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    siteKeyword: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(45),
      allowNull: true,
      get() {
        if (!this.getDataValue("image")) {
          return "";
        }
        return process.env.AWS_S3_URL + "/" + this.getDataValue("image");
      },
    },
    maintenanceMode: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    SEOFriendlyURL: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    SEOFriendly: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    developerMode: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    welcomePage: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
  return generalSettings;
};
