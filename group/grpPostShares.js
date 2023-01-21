const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpPostShares', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    postId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPosts',
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
    tableName: 'grpPostShares',
    hasTrigger: true,
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
        name: "fk_grpPostShares_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
      {
        name: "fk_grpPostShares_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
