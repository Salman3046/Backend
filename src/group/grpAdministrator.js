const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpAdministrator', {
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
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.ENUM('superAdmin','admin','manager'),
      allowNull: true
    },
    roleAdd: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    roleDelete: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    roleUpdate: {
      type: DataTypes.TINYINT,
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
    tableName: 'grpAdministrator',
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
          { name: "userId" },
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpAdministrator_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpAdministrator_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
