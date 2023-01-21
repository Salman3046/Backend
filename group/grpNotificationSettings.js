const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpNotificationSettings', {
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
    notificationType: {
      type: DataTypes.JSON,
      allowNull: true
    },
    isAllowed: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'grpNotificationSettings',
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
        name: "fk_grpNotificationSettings_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpNotificationSettings_users1_idx",
        using: "BTREE",
        fields: [
          { name: "grpAdminId" },
        ]
      },
    ]
  });
};
