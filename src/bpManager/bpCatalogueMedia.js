const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpCatalogueMedia = sequelize.define(
    "bpCatalogueMedia",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      mediaType: {
        type: DataTypes.BLOB,
        allowNull: true,
      },
      mediaURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thumbURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      capation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      viewsCount:{
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: 0
      },
      isActive: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 1,
      },
      isDeleted: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        defaultValue: 0,
      },
      bpCatalogueId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpCatalogueMedia",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_table1_bpCatalogue1_idx",
          using: "BTREE",
          fields: [{ name: "bpCatalogueId" }],
        },
      ],
    }
  );
  bpCatalogueMedia.associate = (models) => {
    bpCatalogueMedia.belongsTo(models.bpCatalogue, {
      foreignKey: "bpCatalogueId",
      targetKey: "id",
    });
    //bpVisitors.hasMany(models.users);
  };
  return bpCatalogueMedia;
};
