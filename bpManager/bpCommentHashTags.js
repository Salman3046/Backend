const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpCommentHashTags', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    commentId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    hashTagId: {
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
    tableName: 'bpCommentHashTags',
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
          { name: "commentId" },
          { name: "hashTagId" },
        ]
      },
      {
        name: "fk_bpCommentHashTags_bpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "commentId" },
        ]
      },
      {
        name: "fk_bpCommentHashTags_hashTags1_idx",
        using: "BTREE",
        fields: [
          { name: "hashTagId" },
        ]
      },
    ]
  });
};
