const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bpEventPosts', {
    id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    },
    postId: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    eventCategoryId: {
      type: DataTypes.STRING(36),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bpEventPosts',
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
        name: "fk_bpEventPosts_bpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
      {
        name: "fk_bpEventPosts_eventCategory1_idx",
        using: "BTREE",
        fields: [
          { name: "eventCategoryId" },
        ]
      },
    ]
  });
};
