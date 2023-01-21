module.exports = (sequelize, DataTypes) => {
  const adUserWallets = sequelize.define(
    "adUserWallets",
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
      currencyId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "currencySettings",
          key: "id",
        },
      },
      // adManagerId: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   references: {
      //     model: "adManagers",
      //     key: "id",
      //   },
      // },
      amount: {
        type: DataTypes.DECIMAL(9,2),
        defaultValue: "0",
        get() {
          if (!this.getDataValue("amount")) {
            return "";
          }
          return this.getDataValue("amount");
        },
      },
      // totalSpent: {
      //   type: DataTypes.STRING,
      //   defaultValue: "0",
      //   get() {
      //     if (!this.getDataValue("totalSpent")) {
      //       return "";
      //     }
      //     return this.getDataValue("totalSpent");
      //   },
      // },
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
  adUserWallets.associate = (models) => {
    adUserWallets.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
    adUserWallets.belongsTo(models.currencySettings, {
      foreignKey: "currencyId",
      targetKey: "id",
    });
    // adUserWallets.belongsTo(models.adManagers, {
    //   foreignKey: "adManagerId",
    //   targetKey: "id",
    // });
  };
  return adUserWallets;
};
