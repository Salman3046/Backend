module.exports = (sequelize, DataTypes) => {
  const mpMediaLists = sequelize.define(
    "mpMediaLists",
    {
      id: {
        type: DataTypes.STRING(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      marketPlaceId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      fileType: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      fileURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      capation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sequence: {
        type: DataTypes.NUMBER,
        allowNull: true,
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

  mpMediaLists.associate = (models) => {
    mpMediaLists.belongsTo(models.marketPlace, {
      foreignKey: "marketPlaceId",
      targetKey: "id",
    });
  };

  return mpMediaLists;
};
