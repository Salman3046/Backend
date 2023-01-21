
module.exports = (sequelize, DataTypes) => {
  const budgetAndDurations = sequelize.define(
    "budgetAndDurations",
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
      dailyBudget: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("dailyBudget")) {
            return "";
          }
          return this.getDataValue("dailyBudget");
        },
      },
      timeZone: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.DATE,
        get() {
          if (!this.getDataValue("startDate")) {
            return "";
          }
          return this.getDataValue("startDate");
        },
      },
      endDate: {
        type: DataTypes.DATE,
        get() {
          if (!this.getDataValue("endDate")) {
            return "";
          }
          return this.getDataValue("endDate");
        },
      },
      totalAmountToBePaid: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("totalAmountToBePaid")) {
            return "";
          }
          return this.getDataValue("totalAmountToBePaid");
        },
      },
    },
    {}
  );
  budgetAndDurations.associate = (models) => {
    budgetAndDurations.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });4
    budgetAndDurations.belongsTo(models.adManagers, { foreignKey: "adManagerId", targetKey: "id" });4
  };
  return budgetAndDurations;
};

