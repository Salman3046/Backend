
module.exports = (sequelize, DataTypes) => {
  const adPreferrences = sequelize.define(
    "adPreferrences",
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
      adPreferrencesMastersId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adPreferrencesMasters",
          key: "id",
        },
      },
    },
    {}
  );
  adPreferrences.associate = (models) => {
    adPreferrences.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adPreferrences.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });
    adPreferrences.belongsTo(models.adPreferrencesMasters, { foreignKey: "adPreferrencesMastersId", targetKey: "id" });
  };
  return adPreferrences;
};

