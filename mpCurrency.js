module.exports = (sequelize, DataTypes) => {
  const mpCurrency = sequelize.define(
    "mpCurrency",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      symbol: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      isDeleted: {
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
    },
    {}
  );

  // mpCategory.associate = (models) => {
  //   // mpCategory.belongsTo(models.marketPlace, {
  //   // foreignKey: "categoryId",
  //   // targetKey: "id",
  //   //        });
  //   mpCategory.hasMany(models.mpSubCategory);
  //   //mpCategory.hasMany(models.mpAttributes);
  //   // mpCategory.hasMany(models.marketPlace);
  // };

  return mpCurrency;
};
