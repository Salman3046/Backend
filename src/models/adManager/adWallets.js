
module.exports = (sequelize, DataTypes) => {
  const adWallets = sequelize.define(
    "adWallets",
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
      totalAmount: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("totalAmount")) {
            return "";
          }
          return this.getDataValue("totalAmount");
        },
      },
      lastTopUpAt: {
        type: DataTypes.DATE,
        get() {
          if (!this.getDataValue("lastTopUpAt")) {
            return "";
          }
          return this.getDataValue("lastTopUpAt");
        },
      },
    },
    {}
  );
  adWallets.associate = (models) => {
    adWallets.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
  };
  return adWallets;
};

