module.exports = (sequelize, DataTypes) => {
  const mpAttributeValues = sequelize.define(
    "mpAttributeValues",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      mpAttributeId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      marketPlaceId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      value: {
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
    },
    {}
  );

  mpAttributeValues.associate = (models) => {
    mpAttributeValues.belongsTo(models.mpAttributes, {
      foreignKey: "mpAttributeId",
      targetKey: "id",
    });
    mpAttributeValues.belongsTo(models.marketPlace, {
      foreignKey: "marketPlaceId",
      targetKey: "id",
    });
    // mpAttributeValues.hasMany(models.mpAttributeValues);
  };

  return mpAttributeValues;
};
