module.exports = (sequelize, DataTypes) => {
  const advertisementSettings = sequelize.define("advertisementSettings", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    advertisementSettings: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    costPerView: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    costByClick: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    costByLead: {
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
  return advertisementSettings;
};
