const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const adPostEngagements = sequelize.define(
    "adPostEngagements",
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
      likeId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      shareId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      commentId: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
      age: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(45),
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
  adPostEngagements.associate = (models) => {
    adPostEngagements.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
  };
  return adPostEngagements;
};
