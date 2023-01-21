const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpManagementHistory', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    groupId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id'
      }
    },
    grpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    eventKey: {
      type: DataTypes.STRING(255),
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
    }
  }, {
    sequelize,
    tableName: 'grpManagementHistory',
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
        name: "fk_grpManagementHistory_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpManagementHistory_users1_idx",
        using: "BTREE",
        fields: [
          { name: "grpAdminId" },
        ]
      },
    ]
  });
};
