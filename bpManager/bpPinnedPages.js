const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpPinnedPages', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    businessPageId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    bpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    isActive: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 1
    },
    isDeleted: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'bpPinnedPages',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "uniqueCol",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
          { name: "bpAdminId" },
        ]
      },
      {
        name: "fk_bpPinPage_businessPage1_idx",
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
        ]
      },
      {
        name: "fk_bpPinPage_users1_idx",
        using: "BTREE",
        fields: [
          { name: "bpAdminId" },
        ]
      },
    ]
  });
};
