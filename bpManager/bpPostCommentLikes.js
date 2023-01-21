const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpPostCommentLikes', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    postCommentId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    likeReactionId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    userId: {
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
    tableName: 'bpPostCommentLikes',
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
          { name: "postCommentId" },
        ]
      },
      {
        name: "fk_bpPostCommentLike_bpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "postCommentId" },
        ]
      },
      {
        name: "fk_bpPostCommentLike_likeReactions1_idx",
        using: "BTREE",
        fields: [
          { name: "likeReactionId" },
        ]
      },
      {
        name: "fk_bpPostCommentLike_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
