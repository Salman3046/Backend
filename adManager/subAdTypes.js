module.exports = (sequelize, DataTypes) => {
  const adSubTypes = sequelize.define(
    "adSubTypes", {
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
      file: {
        type: DataTypes.STRING,
        get() {
          if (!this.getDataValue("file")) {
            return "";
          }
          return this.getDataValue("file");
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
      adFormat: {
        type: DataTypes.ENUM(['Video', 'FullScreenVideo', 'caroselImage', 'SingelImage', 'WebSiteVisit']),
        allowNull: true,  
        defaultValue: "SingelImage"
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
      adTypesId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "adTypes",
          key: "id",
        },
      },
    }, {}
  );
  adSubTypes.associate = (models) => {
    adSubTypes.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
  };
  return adSubTypes;
};