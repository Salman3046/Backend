const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const adPeopleReacheds = sequelize.define(
    "adPeopleReacheds",
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
      age: {
        type: DataTypes.NUMBER,
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
  adPeopleReacheds.associate = (models) => {
    adPeopleReacheds.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id",
    });
    adPeopleReacheds.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };
  return adPeopleReacheds;
};
