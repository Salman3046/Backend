module.exports = (sequelize, DataTypes) => {
  const adUserTransactions = sequelize.define(
    "adUserTransactions",
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
          model: "adManager",
          key: "id",
        },
      },
      // ttype: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   // references: {
      //   //   model: "adManagers",
      //   //   key: "id",
      //   // },
      // },
      type: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("type")) {
            return "";
          }
          return this.getDataValue("type");
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      currencyId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "currencySettings",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(9,2),
        get() {
          if (!this.getDataValue("amount")) {
            return "";
          }
          return this.getDataValue("amount");
        },
      },
      closingBalance: {
        type: DataTypes.DECIMAL(9,2),
        get() {
          if (!this.getDataValue("closingBalance")) {
            return "";
          }
          return this.getDataValue("closingBalance");
        },
      },
      paidTo: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("paidTo")) {
            return "";
          }
          return this.getDataValue("paidTo");
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

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
  adUserTransactions.associate = (models) => {
    adUserTransactions.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    adUserTransactions.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
    adUserTransactions.belongsTo(models.currencySettings, {
      foreignKey: "currencyId",
      targetKey: "id",
    });
  };
  return adUserTransactions;
};
