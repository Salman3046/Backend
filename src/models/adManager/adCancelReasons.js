module.exports = (sequelize, DataTypes) => {
  const adCancelReasons = sequelize.define(
    "adCancelReasons",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      desc: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {}
  );
  //   adCancelReasonsMasters.associate = (models) => {
  //     adCancelReasonsMasters.belongsTo(models.users, {
  //       foreignKey: "userId",
  //       targetKey: "id",
  //     });
  //};
  return adCancelReasons;
};
