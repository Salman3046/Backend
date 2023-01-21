
module.exports = (sequelize, DataTypes) => {
  const adTargetGenders = sequelize.define(
    "adTargetGenders",
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
      name: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("name")) {
            return "";
          }
          return this.getDataValue("name");
        },
      },
    },
    {}
  );
  adTargetGenders.associate = (models) => {
    adTargetGenders.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adTargetGenders.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });
  };
  return adTargetGenders;
};

