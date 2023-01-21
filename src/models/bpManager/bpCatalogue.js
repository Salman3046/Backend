const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bpCatalogue = sequelize.define(
    "bpCatalogue",
    {
      id: {
        type: DataTypes.STRING(36),
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      catalogueName: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
      businessPageId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
      bpAdminId: {
        type: DataTypes.STRING(36),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "bpCatalogue",
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
          name: "fk_bpCatalogue_businessPage1_idx",
          using: "BTREE",
          fields: [{ name: "businessPageId" }],
        },
        {
          name: "fk_bpCatalogue_users1_idx",
          using: "BTREE",
          fields: [{ name: "bpAdminId" }],
        },
      ],
    }
  );
  bpCatalogue.associate = (models) => {
    // bpCatalogueMedia.belongsTo(models.bpCatalogue, {
    //   foreignKey: "bpCatalogueId",
    //   targetKey: "id",
    // });
    bpCatalogue.hasMany(models.bpCatalogueMedia);
  };
  return bpCatalogue;
};
