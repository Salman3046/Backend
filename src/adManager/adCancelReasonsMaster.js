module.exports = (sequelize, DataTypes) => {
  const adCancelReasonsMasters = sequelize.define(
    "adCancelReasonsMasters",
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
          if (!this.getDataValue("discriptions")) {
            return "";
          }
          return this.getDataValue("discriptions");
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
      reasonId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adManagerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  adCancelReasonsMasters.associate = (models) => {
    adCancelReasonsMasters.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id",
    });
  };
  return adCancelReasonsMasters;
};
