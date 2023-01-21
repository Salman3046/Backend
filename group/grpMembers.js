const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpMembers', {
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
    memberId: {
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
    },
    staus: {
      type: DataTypes.ENUM('accepted','pending'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grpMembers',
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
        name: "fk_grpMembers_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpMembers_users1_idx",
        using: "BTREE",
        fields: [
          { name: "memberId" },
        ]
      },
    ]
  });
};
