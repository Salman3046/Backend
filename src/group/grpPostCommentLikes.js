const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpPostCommentLikes', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
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
    postCommentId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPostComments',
        key: 'id'
      }
    },
    likeReactionId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'likeReactions',
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
    }
  }, {
    sequelize,
    tableName: 'grpPostCommentLikes',
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
        name: "fk_grpPostCommentLikes_grpPostComments1_idx",
        using: "BTREE",
        fields: [
          { name: "postCommentId" },
        ]
      },
      {
        name: "fk_grpPostCommentLikes_likeReactions1_idx",
        using: "BTREE",
        fields: [
          { name: "likeReactionId" },
        ]
      },
      {
        name: "fk_grpPostCommentLikes_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
