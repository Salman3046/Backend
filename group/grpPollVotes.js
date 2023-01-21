const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpPollVotes', {
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
    optionId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpPollPosts',
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
    tableName: 'grpPollVotes',
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
        name: "fk_grpPollVotes_grpPollPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "optionId" },
        ]
      },
      {
        name: "fk_grpPollVotes_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_grpPollVotes_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
    ]
  });
};
