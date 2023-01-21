module.exports = (sequelize, DataTypes) => {
  const mpSubCategory = sequelize.define(
    "mpSubCategory",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      mpCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
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
      sequence: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {}
  );
  mpSubCategory.associate = (models) => {
    // mpSubCategory.belongsTo(models.mpCategory, {
    //   foreignKey: "categoryId",
    //   targetKey: "id",
    // });
    mpSubCategory.hasMany(models.mpAttributes);
  };
  return mpSubCategory;
};
