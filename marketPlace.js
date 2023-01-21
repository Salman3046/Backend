module.exports = (sequelize, DataTypes) => {
  const marketPlace = sequelize.define(
    "marketPlace",
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

      currencyId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },

      categoryId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      subCategoryId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      condition: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      isSold: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      locationLAT: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      locationLONG: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbnailURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      communicationMode: {
        type: DataTypes.ENUM('Chat','Call','Both'),
        allowNull: true,
      },
      viewsCount: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },

      commentsCount: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },

      likesCount: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },

      sharesCount: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      isOwner: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
      },
      allowNotification: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
      },
      isActive: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT.UNSIGNED,
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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );

  marketPlace.associate = (models) => {
    marketPlace.belongsTo(models.mpSubCategory, {
      foreignKey: "subCategoryId",
      targetKey: "id",
    });
    marketPlace.belongsTo(models.mpCategory, {
      foreignKey: "categoryId",
      targetKey: "id",
    });

    marketPlace.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    marketPlace.belongsTo(models.mpCurrency, {
      foreignKey: "currencyId",
      targetKey: "id",
    });

    marketPlace.hasMany(models.mpMediaLists);

    marketPlace.hasMany(models.mpAttributeValues);
    marketPlace.hasMany(models.mpLikes);
    marketPlace.hasMany(models.mpBookmarks);
    marketPlace.hasMany(models.mpComments);
  };

  return marketPlace;
};
