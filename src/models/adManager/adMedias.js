module.exports = (sequelize, DataTypes) => {
  const adMedias = sequelize.define(
    "adMedias", {
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
      file: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("file")) {
            return "";
          }
          return process.env.AWS_S3_URL + '/' + this.getDataValue("file");
        },
      },
      fileType: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("fileType")) {
            return "";
          }
          return this.getDataValue("fileType");
        },
      },
      heading: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("heading")) {
            return "";
          }
          return this.getDataValue("heading");
        },
      },
      subHeading: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("subHeading")) {
            return "";
          }
          return this.getDataValue("subHeading");
        },
      },
      callToActionId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'adCallToActionMasters',
          key: 'id'
        },
        get() {
          if (!this.getDataValue("callToAction")) {
            return "";
          }
          return this.getDataValue("callToAction");
        },
      },
    }, {}
  );
  adMedias.associate = (models) => {
    adMedias.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
    adMedias.belongsTo(models.adManagers, {
      foreignKey: "adManagerId",
      targetKey: "id"
    });
    adMedias.belongsTo(models.adCallToActionMasters, {
      foreignKey: "callToActionId",
      targetKey: "id"
    });
  };
  return adMedias;
};