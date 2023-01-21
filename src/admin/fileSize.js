module.exports = (sequelize, DataTypes) => {
  const fileSize = sequelize.define("fileSize", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    imageMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    imageMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    videoMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    videoMin: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    audioMax: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    audioMin: {
      type: DataTypes.STRING(45),
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
  return fileSize;
};
