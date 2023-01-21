module.exports = (sequelize, DataTypes) => {
  const uploadSettings = sequelize.define("uploadSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fileSharing: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    videoUpload: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    audioSharing: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    maxSize: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    cssUpload: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    allowedExtensions: {
      type: DataTypes.STRING(245),
      allowNull: true,
      defaultValue: "10GB",
    },
    allowedMIMETypes: {
      type: DataTypes.STRING(245),
      allowNull: true,
      defaultValue: "10GB",
    },
    imageMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    imageMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    videoMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    videoMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    fileMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    fileMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    audioMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
    },
    audioMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "10GB",
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
  return uploadSettings;
};
