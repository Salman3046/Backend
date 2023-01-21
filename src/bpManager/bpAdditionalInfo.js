const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpAdditionalInfo', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
      
    },
    heading: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
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
    },
    type: {
      type: DataTypes.ENUM('description','pointer'),
      allowNull: true
    },
    businessPageId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    bpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bpAdditionalInfo',
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
        name: "fk_bpAdditionalInfo_businessPage1_idx",
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
        ]
      },
      {
        name: "fk_bpAdditionalInfo_users1_idx",
        using: "BTREE",
        fields: [
          { name: "bpAdminId" },
        ]
      },
    ]
  });
};
