module.exports = (sequelize, DataTypes) => {
  const mpAttributes = sequelize.define(
    "mpAttributes",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      mpSubCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      subChildCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      label: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      placeHolder: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      info: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      validation: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      fieldLimit: {
        type: DataTypes.STRING(250),
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
      isActive: {
        allowNull: true,
        type: DataTypes.TINYINT,
      },
      isDeleted: {
        allowNull: true,
        type: DataTypes.TINYINT,
      },
    },
    {}
  );

  mpAttributes.associate = (models) => {
    //   mpAttributes.belongsTo(models.mpSubCategory, {
    //     foreignKey: "subCategoryId",
    //     targetKey: "id",
    //   });
    mpAttributes.hasMany(models.mpAttributeValues);
  };

  return mpAttributes;
};
