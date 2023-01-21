const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const adPostReactions = sequelize.define(
    "adPostReactions",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(36),
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
      reactionId: {
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
  adPostReactions.associate = (models) => {
    adPostReactions.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
  };
  return adPostReactions;
};
