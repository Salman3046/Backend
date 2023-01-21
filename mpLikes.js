module.exports = (sequelize, DataTypes) => {
  const mpLikes = sequelize.define(
    "mpLikes",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      marketPlaceId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: false,
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

  mpLikes.associate = (models) => {
    mpLikes.belongsTo(models.marketPlace, {
      foreignKey: "marketPlaceId",
      targetKey: "id",
    });
    mpLikes.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    // mpCategory.hasMany(models.mpSubCategory);
    //mpCategory.hasMany(models.mpAttributes);
    // mpCategory.hasMany(models.marketPlace);
  };

  return mpLikes;
};
