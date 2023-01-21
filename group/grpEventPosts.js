const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpEventPosts', {
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
    eventCategoryId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'eventCategory',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coverPicURL: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eventStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    eventEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    eventStartTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    eventEndTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    link: {
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
    tableName: 'grpEventPosts',
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
        name: "fk_grpEventPosts_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
      {
        name: "fk_grpEventPosts_eventCategory1_idx",
        using: "BTREE",
        fields: [
          { name: "eventCategoryId" },
        ]
      },
    ]
  });
};
