const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const bpBlockedUsers =  sequelize.define('bpBlockedUsers', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    bpAdminId: {
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
    }
  }, {
    sequelize,
    tableName: 'bpBlockedUsers',
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
          { name: "businessPageId" },
        ]
      },
      {
        name: "fk_bpBlockedUsers_businessPage1_idx",
        using: "BTREE",
        fields: [
          { name: "businessPageId" },
        ]
      },
      {
        name: "fk_bpBlockedUsers_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_bpBlockedUsers_users2_idx",
        using: "BTREE",
        fields: [
          { name: "bpAdminId" },
        ]
      },
    ]
  });

  bpBlockedUsers.associate = (models) => {
    bpBlockedUsers.belongsTo(models.businessPages, {
      foreignKey: "businessPageId",
      targetKey: "id"
    });
    bpBlockedUsers.belongsTo(models.users, {
      foreignKey: "userId",
      targetKey: "id"
    });
  }

  return bpBlockedUsers;

};
