const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('groups', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    grpCategoryId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'grpCategory',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coverPic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coverThumb: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    privacy: {
      type: DataTypes.ENUM('public','private'),
      allowNull: true
    },
    visibility: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    allowMessage: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    allowNotificationOnEmail: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    blockedByAdmin: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    blockCode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    blockMessage: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isPostReviewed: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    isMemberReviewed: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0
    },
    isPostSharedToStory: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "0"
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
    tableName: 'groups',
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
        name: "fk_groups_users1_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "fk_groups_grpCategory1_idx",
        using: "BTREE",
        fields: [
          { name: "grpCategoryId" },
        ]
      },
    ]
  });
};
