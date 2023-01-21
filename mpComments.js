module.exports = (sequelize, DataTypes) => {
  const mpComments = sequelize.define(
    "mpComments",
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
      marketPlaceId: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      commentId: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      isSubComment: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
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

  mpComments.associate = (models) => {
    mpComments.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    mpComments.belongsTo(models.mpComments, {
      foreignKey: "commentId",
      targetKey: "id",
    });
    mpComments.belongsTo(models.marketPlace, {
      foreignKey: "marketPlaceId",
      targetKey: "id",
    });
    // mpCategory.hasMany(models.mpSubCategory);
    //mpCategory.hasMany(models.mpAttributes);
    // mpCategory.hasMany(models.marketPlace);
  };

  return mpComments;
};
