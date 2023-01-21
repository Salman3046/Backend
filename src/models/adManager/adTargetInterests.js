
module.exports = (sequelize, DataTypes) => {
  const adTargetInterests = sequelize.define(
    "adTargetInterests",
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
      adInterestsMastersId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adInterestsMasters",
          key: "id",
        },
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
  adTargetInterests.associate = (models) => {
    adTargetInterests.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adTargetInterests.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });
    adTargetInterests.belongsTo(models.adInterestsMasters, { foreignKey: "adInterestsMastersId", targetKey: "id" });


  };
  return adTargetInterests;
};

