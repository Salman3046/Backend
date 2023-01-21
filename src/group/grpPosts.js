const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpPosts', {
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
    rePostId: {
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
    feelingId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'feelings',
        key: 'id'
      }
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    schedule: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isScheduled: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    postType: {
      type: DataTypes.ENUM('media','podcast','recommendation','threat','thought','event','blog','poll'),
      allowNull: true
    },
    articleTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pollQuestion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pollStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    pollEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    blockedByAdmin: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    blockedMessage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    blockedCode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isReposted: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    allowedComment: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    locationLAT: {
      type: DataTypes.DECIMAL(20,10),
      allowNull: true
    },
    locationLONG: {
      type: DataTypes.DECIMAL(20,10),
      allowNull: true
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    sharesCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    thumbnailURL: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'grpPosts',
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
        name: "fk_grpPosts_groups1_idx",
        using: "BTREE",
        fields: [
          { name: "groupId" },
        ]
      },
      {
        name: "fk_grpPosts_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "rePostId" },
        ]
      },
      {
        name: "fk_grpPosts_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_grpPosts_feelings1_idx",
        using: "BTREE",
        fields: [
          { name: "feelingId" },
        ]
      },
    ]
  });
};
