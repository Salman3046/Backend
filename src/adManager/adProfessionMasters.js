
module.exports = (sequelize, DataTypes) => {
  const adProfessionMasters = sequelize.define(
    "adProfessionMasters",
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
      professionId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "professions",
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
  adProfessionMasters.associate = (models) => {
    adProfessionMasters.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    adProfessionMasters.belongsTo(models.professions, { foreignKey: "professionId", targetKey: "id" });
  };
  return adProfessionMasters;
};

