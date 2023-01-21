
module.exports = (sequelize, DataTypes) => {
  const adInterestsMasters = sequelize.define(
    "adInterestsMasters",
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
      intrestId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "interests",
          key: "id",
        },
      },
      priceForAudiance: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
      },
      name: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("name")) {
            return "";
          }
          return this.getDataValue("name");
        },
      },
      discriptions: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("discriptions")) {
            return "";
          }
          return this.getDataValue("discriptions");
        },
      },
     
    },
    {}
  );
  adInterestsMasters.associate = (models) => {
    adInterestsMasters.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adInterestsMasters.belongsTo(models.interests, { foreignKey: "intrestId", targetKey: "id" });
  };
  return adInterestsMasters;
};
