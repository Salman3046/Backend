const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpCommentHashTags', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    postCommentId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPostComments',
        key: 'id'
      }
    },
    hashTagId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'hashTags',
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
    tableName: 'grpCommentHashTags',
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
        name: "fk_grpCommentHashTags_grpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "postCommentId" },
        ]
      },
      {
        name: "fk_grpCommentHashTags_hashTags1_idx",
        using: "BTREE",
        fields: [
          { name: "hashTagId" },
        ]
      },
    ]
  });
};
