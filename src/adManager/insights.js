const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const insights = sequelize.define(
    "insights",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      peopleReached: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      impressions: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      messageConvos: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      adManagerId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "adManagers",
          key: "id",
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
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
  insights.associate = (models) => {
    insights.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
  };
  return insights;
};
