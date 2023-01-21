const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grpThoughtPosts', {
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
    textColorId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'textColors',
        key: 'id'
      }
    },
    backgroundColorId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'backgroundColors',
        key: 'id'
      }
    },
    thoughtText: {
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
    tableName: 'grpThoughtPosts',
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
        name: "fk_grpThoughtPosts_textColors1_idx",
        using: "BTREE",
        fields: [
          { name: "textColorId" },
        ]
      },
      {
        name: "fk_grpThoughtPosts_backgroundColors1_idx",
        using: "BTREE",
        fields: [
          { name: "backgroundColorId" },
        ]
      },
      {
        name: "fk_grpThoughtPosts_grpPosts1_idx",
        using: "BTREE",
        fields: [
          { name: "postId" },
        ]
      },
    ]
  });
};
