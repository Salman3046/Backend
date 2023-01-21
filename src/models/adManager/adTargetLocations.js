
module.exports = (sequelize, DataTypes) => {
  const adTargetLocations = sequelize.define(
    "adTargetLocations",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      adManagerId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adManagers",
          key: "id",
        },
      },
      location: {
        type: DataTypes.TEXT,
      },
      lat: {
        type: DataTypes.TEXT,
      },
      lang: {
        type: DataTypes.TEXT,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        paranoid: true,
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
  adTargetLocations.associate = (models) => {
    adTargetLocations.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adTargetLocations.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });
  };
  return adTargetLocations;
};

