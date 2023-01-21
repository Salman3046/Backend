const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const adPostImpressions = sequelize.define(
    "adPostImpressions",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      adManagerId: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "adManagers",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.STRING(36),
        allowNull: true,
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
  adPostImpressions.associate = (models) => {
    adPostImpressions.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
  };
  return adPostImpressions;
};
