module.exports = (sequelize, DataTypes) => {
    const adMastrerTypes = sequelize.define(
      "adMastrerTypes",
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
        name: {
          type: DataTypes.STRING,
          get() {
            if (!this.getDataValue("name")) {
              return "";
            }
            return this.getDataValue("name");
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
    
      },
      {}
    );
    adMastrerTypes.associate = (models) => {
      adMastrerTypes.belongsTo(models.users, { foreignKey: "userId", targetKey: "id" });
    };
    return adMastrerTypes;
  };
  