module.exports = (sequelize, DataTypes) => {
  const adTargetAges = sequelize.define(
    "adTargetAges", {
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
      adRangemasterId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adRangemasters",
          key: "id",
        },
      },
      startAge: {
        type: DataTypes.STRING,
      },
      endAge: {
        type: DataTypes.STRING,
      },
    }, {}
  );
  adTargetAges.associate = (models) => {
    adTargetAges.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
    adTargetAges.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id"
    });
    adTargetAges.belongsTo(models.adRangemasters, {
      foreignKey: "adRangemasterId",
      targetKey: "id"
    });
    
  };
  return adTargetAges;
};