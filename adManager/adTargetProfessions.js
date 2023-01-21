
module.exports = (sequelize, DataTypes) => {
  const adTargetProfessions = sequelize.define(
    "adTargetProfessions",
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
      adProfessionMastersId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adProfessionMasters",
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
  adTargetProfessions.associate = (models) => {
    adTargetProfessions.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adTargetProfessions.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });
    adTargetProfessions.belongsTo(models.adProfessionMasters, { foreignKey: "adProfessionMastersId", targetKey: "id" });
  };
  return adTargetProfessions;
};

