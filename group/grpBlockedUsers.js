const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpBlockedUsers', {
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
    grpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'grpBlockedUsers',
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
        name: "fk_grpBlockedUsers_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpBlockedUsers_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_grpBlockedUsers_users2_idx",
        using: "BTREE",
        fields: [
          { name: "grpAdminId" },
        ]
      },
    ]
  });
};
