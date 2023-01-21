module.exports = (sequelize, DataTypes) => {
  const adTypes = sequelize.define(
    "adTypes", {
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
      adTypes: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("adTypes")) {
            return "";
          }
          return this.getDataValue("adTypes");
        },
      },
      descriptions: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("descriptions")) {
            return "";
          }
          return this.getDataValue("descriptions");
        },
      },
      note: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("note")) {
            return "";
          }
          return this.getDataValue("note");
        },
      },
      adMastrerTypesId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adMastrerTypes",
          key: "id",
        },
      },
      typeofPage: {
        type: DataTypes.ENUM(["1", "2", "3", "4", "5"]),
        defaultValue: "1",
        get() {
          if (!this.getDataValue("typeofPage")) {
            return "";
          }
          return this.getDataValue("typeofPage");
        },
      },
    }, {}
  );
  adTypes.associate = (models) => {
    adTypes.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
    adTypes.belongsTo(models.adMastrerTypes, {
      foreignKey: 'adMastrerTypesId',
      targetKey: "id"
    })
  };
  return adTypes;
};