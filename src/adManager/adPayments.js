
module.exports = (sequelize, DataTypes) => {
  const adPayments = sequelize.define(
    "adPayments",
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
      totalAmount: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("totalAmount")) {
            return "";
          }
          return this.getDataValue("totalAmount");
        },
      },
      opningAmount: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("opningAmount")) {
            return "";
          }
          return this.getDataValue("opningAmount");
        },
      },
      closingAvailableBalance: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("closingAvailableBalance")) {
            return "";
          }
          return this.getDataValue("closingAvailableBalance");
        },
      },
     
      availableBalanceAfterTopup: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("availableBalanceAfterTopup")) {
            return "";
          }
          return this.getDataValue("availableBalanceAfterTopup");
        },
      },
      debitBalanceAd: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("debitBalanceAd")) {
            return "";
          }
          return this.getDataValue("debitBalanceAd");
        },
      },
      paidBy: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("paidBy")) {
            return "";
          }
          return this.getDataValue("paidBy");
        },
      },
      paymentDetails: {
        type: DataTypes.JSON,
        get() {
          if (!this.getDataValue("paymentDetails")) {
            return "";
          }
          return this.getDataValue("paymentDetails");
        },
      },
    },
    {}
  );
  adPayments.associate = (models) => {
    adPayments.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adPayments.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id"
    });
  };
  return adPayments;
};

