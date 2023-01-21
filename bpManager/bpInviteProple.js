const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpInviteProple', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    usersId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    businessPageId: {
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
    },
    bpAdminId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'bpInviteProple',
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
        name: "fk_table2_businessPage1_idx",
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
        ]
      },
      {
        name: "fk_table2_users1_idx",
        using: "BTREE",
        fields: [
          { name: "usersId" },
        ]
      },
      {
        name: "fk_bpInviteProple_users1_idx",
        using: "BTREE",
        fields: [
          { name: "bpAdminId" },
        ]
      },
    ]
  });
};
